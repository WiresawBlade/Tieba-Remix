<template>
    <div ref="toastContainer" class="toast-container" :class="{ 'blur-effect': props.blurEffect }">
        <div v-if="chooseIcon()" class="toast-icon icon" :class="props.type">{{ chooseIcon() }}</div>

        <div class="toast-content" :class="props.type">{{ props.message }}</div>

        <span>|</span>

        <div class="toast-controls">
            <UserButton class="close-button icon" :shadow-border="true" @click="passToNextToast">close</UserButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { passToNextToast } from "@/lib/render";
import UserButton from "./user-button.vue";

export interface ToastProps {
    message: string
    duration?: number
    icon?: string
    type?: "basic" | "check" | "warning" | "error"
    blurEffect?: true
}
const props = withDefaults(defineProps<ToastProps>(), {
    duration: 6000
});

const toastContainer = ref<HTMLDivElement>();

function chooseIcon() {
    if (props.icon) {
        return props.icon;
    } else {
        if (props.type) {
            switch (props.type) {
                case "basic":
                    return undefined;
                case "check":
                    return "check";
                case "warning":
                    return "warning";
                case "error":
                    return "error";

                default:
                    return undefined;
            }
        }
    }
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;
@use "@/stylesheets/main/remixed-main" as _main;
@use "sass:color";

@keyframes stretch {
    0% {
        padding: 0 12px;
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        padding: 8px 12px;
    }
}

.check {
    color: _.$levelGreenFore;
}

.warning {
    color: _.$warning-color;
}

.error {
    color: _.$error-color;
}

.toast-container {
    $el-padding: 6px;
    $toast-height: 60vh;

    position: fixed;
    z-index: 999;
    bottom: 96px;
    left: 50%;
    display: flex;
    max-height: $toast-height;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid _.$borderColor;
    border-radius: 16px;
    animation: stretch 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.6);
    background-color: _.$defaultBack;
    box-shadow: 0 10px 24px rgb(0 0 0 / 20%);
    gap: 6px;
    text-overflow: ellipsis;
    transform: translateX(-50%);

    @include _main.default-transition(all ease);

    .toast-icon {
        font-size: 18px;
    }

    .toast-content {
        overflow: hidden;
        max-width: 80vw;
        max-height: $toast-height;
        padding: 0 $el-padding;
        text-align: left;
        text-overflow: ellipsis;
        white-space: pre-wrap;
    }

    span {
        color: _.$minimalFore;
        font-size: 12px;
    }

    .toast-controls {
        .close-button {
            padding: 6px;
            color: _.$error-color;
            font-weight: bold;
        }

        .close-button:not(:active, :focus) {
            box-shadow: none;
        }
    }
}

.blur-effect {
    background-color: _.$transDefaultBack;

    @include _main.blur-effect;
}
</style>
