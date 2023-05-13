import { App, Component, createApp } from "vue";
import { forEach, includes } from "lodash-es";
import { createNewElement } from "./domlib";
import dialogWrapperVue from "@/components/utils/dialog-wrapper.vue";
import toastVue, { ToastProps } from "@/components/utils/toast.vue";
import { Queue } from "./util-types";
import messageBoxVue, { MessageBoxEvents, MessageBoxProps, MessageBoxType } from "@/components/utils/message-box.vue";
import { getPublicLib } from "./utils";

/** dialog 组件实例 */
export let publicDialogInstance: App<Element>;
/** toast 组件实例 */
export let publicToastInstance: App<Element>;

let isToasting = false;

const dialogQueue = new Queue<[Component, LiteralObject?, LiteralObject?]>();
const toastsQueue = new Queue<[ToastProps, number]>();

let messageInbox: MessageBoxEvents | undefined;

export function renderComponent(
    root: Component,
    container: string | Element,
    rootProps?: LiteralObject) {
    const app = createApp(root, rootProps);
    app.mount(container);
    return app;
}

export function renderPage(root: Component, rootProps?: LiteralObject) {
    if (document.getElementsByTagName("body").length === 0) {
        document.documentElement.appendChild(createNewElement("body"));
    }

    removeDefault();

    document.body.appendChild(createNewElement("div", {
        "id": "carousel_wrap"
    }));

    return renderComponent(root, "body", rootProps);
}

export async function renderDialog(dialog: Component, dialogProps?: LiteralObject, wrapperProps?: LiteralObject) {
    const dialogWrapper = document.getElementById("dialog-wrapper");
    if (!dialogWrapper) {
        document.body.insertBefore(createNewElement("div", {
            "id": "dialog-wrapper"
        }), document.body.firstChild);
    }

    if (dialogWrapper?.hasChildNodes()) {
        dialogQueue.enqueue([dialog, dialogProps, wrapperProps]);

        return new Promise((resolve) => {
            const peek = dialogQueue.peek();
            const interval = setInterval(() => {
                if (dialogQueue.peek() !== peek) {
                    clearInterval(interval);
                    resolve("");
                }
            });
        });
    } else {
        publicDialogInstance = createApp(dialogWrapperVue, {
            dialog: dialog,
            childProps: dialogProps,
            ...wrapperProps
        });

        const vm = publicDialogInstance.mount("#dialog-wrapper");
        return vm;
    }
}

export function unloadDialog() {
    if (publicDialogInstance) publicDialogInstance.unmount();
    const next = dialogQueue.dequeue();
    if (next) {
        renderDialog(next[0], next[1], next[2]);
    }
}

/**
 * 展示消息对话框
 * @param messageBoxProps 消息对话框的配置
 * @returns 对话框被关闭时的用户操作
 */
export function messageBox(messageBoxProps: MessageBoxProps): Promise<MessageBoxEvents> {
    renderDialog(messageBoxVue, {
        message: messageBoxProps.message,
        title: messageBoxProps.title,
        type: messageBoxProps.type
    }, {
        forced: messageBoxProps.type === "forceTrueFalse"
    });

    // 监听被创建的 App的 emit事件
    // const emitter = getPublicLib<Emitter<Record<EventType, MessageBoxEvents>>>("messageBoxEmitter");
    // return new Promise((resolve) => {
    //     emitter?.on("*", (tagOfEvent: MessageBoxEvents) => {
    //         if (callbackfn) callbackfn(tagOfEvent);
    //         alert(tagOfEvent);
    //         emitter.off("*");
    //         resolve(tagOfEvent);
    //     });
    // });

    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const inbox = getMessageInbox();
            if (inbox) {
                clearInterval(interval);
                resolve(inbox);
            }
        }, 10);
    });
}

export function getMessageInbox() {
    const inbox = messageInbox;
    messageInbox = undefined;
    return inbox;
}

export function setMessageInbox(value: MessageBoxEvents) {
    messageInbox = value;
}

/**
 * 展示 `toast` 通知
 * @param props `toast` 通知的属性
 */
export function toast(props: ToastProps) {
    toastsQueue.enqueue([props, -1]);
    const interval = setInterval(() => {
        if (!isToasting) {
            const peek = toastsQueue.peek();
            if (peek) renderToast(peek[0]);
            clearInterval(interval);
        }
    }, 100);
}

export function renderToast(toastProps: ToastProps) {
    isToasting = true;
    publicToastInstance = createApp(toastVue, toastProps as LiteralObject);

    // id 名带 "toast" 会被 AdBlock 直接暴力隐藏
    if (!document.getElementById("t-wrapper"/* toast-wrapper */)) {
        document.body.insertBefore(createNewElement("div", {
            "id": "t-wrapper",
            style: "display: block !important;"
        }), document.body.firstChild);
    }

    const vm = publicToastInstance.mount("#t-wrapper");

    const peek = toastsQueue.peek();
    if (!peek) return;

    peek[1] = setTimeout(() => {
        publicToastInstance.unmount();
        toastsQueue.dequeue();
        isToasting = false;
    }, toastProps.duration ? toastProps.duration as number : 6000);
    return vm;
}

export function passToNextToast() {
    publicToastInstance.unmount();
    const peek = toastsQueue.peek();
    if (peek) {
        clearTimeout(peek[1]);
    }

    toastsQueue.dequeue();
    isToasting = false;
    const next = toastsQueue.peek();
    if (next) {
        setTimeout(() => {
            renderToast(next[0]);
        }, 10);
    }
}

export function removeDefault() {
    forEach(document.head.children, (el) => {
        if (el && el.tagName.toUpperCase() === "LINK"
            && includes(el.getAttribute("href"), "static-common/style")) {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "SCRIPT"
            && includes(el.getAttribute("src"), "static-common/lib")) {
            el.remove();
        }
    });

    document.getElementById("com_userbar")?.remove();

    forEach(document.body.children, (el) => {
        if (el && el.tagName.toUpperCase() === "STYLE") {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "SCRIPT") {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "IFRAME") {
            el.remove();
        }

        if (el && includes(el.className, "translatorExtension")) {
            el.remove();
        }

        if (el && includes(el.className, "dialogJ")) {
            el.remove();
        }
    });
}
