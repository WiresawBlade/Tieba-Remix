<template>
    <div class="dialog-wrapper dialog-toggle" :class="{ 'blur-effect': props.blurEffect }" @click="onClick"
        @wheel="onWheel">
    </div>
</template>

<script setup lang="ts">
import { unloadDialog } from "@/lib/render";
import { includes } from "lodash-es";
import { Component, createApp, onMounted } from "vue";

interface Props {
    dialog: Component
    childProps?: LiteralObject
    blurEffect?: true
    forced?: true
}
const props = defineProps<Props>();

const emit = defineEmits(["RequestClose"]);

onMounted(() => {
    const dialog = createApp(props.dialog, props.childProps);
    dialog.mount(".dialog-wrapper");
});

function onClick(payload: Event) {
    // 防止事件穿透
    if (!includes((payload.target as HTMLElement).classList, "dialog-toggle")) return;
    if (!props.forced) {
        emit("RequestClose");
        unloadDialog();
    }
}

function onWheel(payload: Event) {
    if (!includes((payload.target as HTMLElement).classList, "dialog-wrapper"))
        return;
    payload.preventDefault();
}
</script>

<style scoped lang="scss">
.dialog-wrapper {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 60%);
}

.blur-effect {
    backdrop-filter: blur(24px);
}
</style>
