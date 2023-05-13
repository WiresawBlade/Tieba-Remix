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

function onClick(e: Event) {
    // 防止事件穿透
    if (!includes((e.target as HTMLElement).classList, "dialog-toggle")) return;
    if (!props.forced) {
        emit("RequestClose");
        unloadDialog();
    }
}

function onWheel(e: Event) {
    if (!includes((e.target as HTMLElement).classList, "dialog-wrapper"))
        return;
    e.preventDefault();
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/remixed-main" as _main;

.dialog-wrapper {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 72%);

    @include _main.fade-in(0.2s);
}

.blur-effect {
    @include _main.blur-effect;
}
</style>
