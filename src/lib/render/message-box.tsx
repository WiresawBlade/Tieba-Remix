import { DialogWrapperProps } from "@/components/utils/dialog-wrapper.vue";
import messageBoxVue, { MessageBoxEvents, MessageBoxProps } from "@/components/utils/message-box.vue";
import { renderDialog } from ".";

let messageInbox: MessageBoxEvents | undefined;

/**
 * 展示消息对话框
 * @param messageBoxProps 消息对话框的配置
 * @returns 对话框被关闭时的用户操作
 */
export function messageBox(messageBoxProps: MessageBoxProps): Promise<MessageBoxEvents> {
    renderDialog<MessageBoxProps, DialogWrapperProps>(messageBoxVue, {
        message: messageBoxProps.message,
        title: messageBoxProps.title,
        type: messageBoxProps.type,
        embedded: messageBoxProps.embedded,
        buttons: messageBoxProps.buttons,
    }, {
        forced: messageBoxProps.type === "forceTrueFalse",
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
