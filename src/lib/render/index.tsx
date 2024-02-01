import dialogWrapperVue, { DialogWrapperProps } from "@/components/utils/dialog-wrapper.vue";
import { templateCreate } from "@/lib/elemental";
import { assignCSSRule, injectCSSRule } from "@/lib/elemental/styles";
import { Queue } from "@/lib/utils/queue";
import { forEach, includes, once } from "lodash-es";
import { App, Component, createApp } from "vue";

/** dialog 组件实例 */
export let publicDialogInstance: App<Element>;

const dialogQueue = new Queue<[Component, LiteralObject?, LiteralObject?]>();

export function renderComponent<T extends LiteralObject>(
    root: Component,
    container: string | Element,
    rootProps?: T) {
    const app = createApp(root, rootProps);
    app.mount(container);
    return app;
}

export const scrollbarWidth = once(function () {
    const temp = templateCreate("div");
    // assign(temp.style, {
    //     width: "100px",
    //     height: "100px",
    //     overflow: "scroll",
    //     position: "absolute",
    //     top: "-9999px",
    // } as OptionalMapped<CSSStyleDeclaration>);
    assignCSSRule(temp, {
        width: "100px",
        height: "100px",
        overflow: "scroll",
        position: "absolute",
        top: "-9999px",
    });

    document.body.appendChild(temp);
    const scrollbarWidth = temp.offsetWidth - temp.clientWidth;
    document.body.removeChild(temp);
    return scrollbarWidth;
});

export function renderPage(root: Component, rootProps?: LiteralObject) {
    if (document.getElementsByTagName("body").length === 0) {
        document.documentElement.appendChild(templateCreate("body"));
    }

    removeDefault();

    const page = templateCreate("div", { id: "remixed-page" });
    document.body.insertBefore(page, document.body.firstChild);

    document.body.appendChild(templateCreate("div", {
        "id": "carousel_wrap",
    }));

    injectCSSRule("#spage-tbshare-container, .tbui_aside_float_bar", {
        display: "none !important",
    });

    return renderComponent(root, page, rootProps);
}

export async function renderDialog<T extends LiteralObject, U extends LiteralObject = DialogWrapperProps>(dialog: Component, dialogProps?: T, wrapperProps?: OptionalMapped<U>) {
    const dialogWrapper = document.getElementById("dialog-wrapper");
    if (!dialogWrapper) {
        document.body.insertBefore(templateCreate("div", {
            "id": "dialog-wrapper",
        }), document.body.firstChild);
    }

    document.body.setAttribute("no-scrollbar", "");
    document.body.style.paddingRight = `${scrollbarWidth()}px`;

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
            ...wrapperProps,
        });

        const vm = publicDialogInstance.mount("#dialog-wrapper");
        return vm;
    }
}

export function unloadDialog() {
    document.body.removeAttribute("no-scrollbar");
    document.body.style.paddingRight = "";

    if (publicDialogInstance) publicDialogInstance.unmount();
    const next = dialogQueue.dequeue();
    if (next) {
        renderDialog(next[0], next[1], next[2]);
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

    // document.getElementById("com_userbar")?.remove();

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
