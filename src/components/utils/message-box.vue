<template>
    <div class="message-box">
        <div class="message-content">
            <div v-if="props.title" class="title">{{ props.title }}</div>
            <div v-if="props.message" class="message">{{ props.message }}</div>
            <slot></slot>
        </div>

        <div class="message-controls">
            <UserButton class="message-button" :shadow-border="true" :theme-style="true" @click="emitAndClose('positive')">
                确定</UserButton>

            <UserButton v-if="props.type === 'OkCancel'" class="message-button" :shadow-border="true"
                @click="emitAndClose('cancel')">取消</UserButton>

            <UserButton v-if="props.type === 'forceTrueFalse'" class="message-button" :shadow-border="true"
                @click="emitAndClose('cancel')">拒绝</UserButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { setMessageInbox, unloadDialog } from "@/lib/render";
import UserButton from "./user-button.vue";

export type MessageBoxType = "basic" | "OkCancel" | "forceTrueFalse";
export type MessageBoxEvents = Parameters<typeof emit>[0];

export interface MessageBoxProps {
    title?: string
    message?: string
    type?: MessageBoxType
}
const props = withDefaults(defineProps<MessageBoxProps>(), {
    type: "basic"
});

const emit = defineEmits(["positive", "cancel", "negative"]);

// const emitter = (() => {
//     const cache = getPublicLib<Emitter<Record<EventType, unknown>>>("messageBoxEmitter");
//     if (cache) {
//         return cache;
//     } else {
//         const _emitter = mitt();
//         setPublicLib("messageBoxEmitter", _emitter);
//         return _emitter;
//     }
// })();

function emitAndClose(emitName: MessageBoxEvents) {
    emit(emitName, emitName);
    setMessageInbox(emitName);
    unloadDialog();
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/remixed-main" as _main;

.message-box {
    display: flex;
    overflow: hidden;
    max-width: 80vw;
    box-sizing: border-box;
    flex-direction: column;
    border: 1px solid var(--light-border-color);
    border-radius: 16px;
    margin: auto;
    animation: dialog-in 0.4s ease;
    background-color: var(--default-background);
    box-shadow: 0 0 20px rgb(0 0 0 / 30%);
    font-size: 18px;
    transition: 0.4s ease;

    .message-content {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 8px;

        .title {
            color: var(--highlight-fore);
            font-weight: bold;
        }

        .message {
            font-size: 16px;
            white-space: pre-wrap;
        }
    }

    .message-controls {
        display: flex;
        padding: 16px;
        margin-top: auto;
        background-color: var(--deep-background);
        gap: 8px;

        .message-button {
            flex-grow: 1;
            padding: 6px 16px;
            font-size: 14px;
        }
    }
}
</style>
