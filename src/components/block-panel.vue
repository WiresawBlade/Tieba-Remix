<template>
    <div class="block-panel">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@use "@/stylesheets/main/palette" as _;

.block-panel {
    display: flex;
    min-width: 30px;
    height: 26px;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 24px;
    margin: auto;
    background-color: _.$transLightBack;
    font-size: 14px;
    gap: 4px;
    text-align: center;

    .icon {
        color: _.$lightFore;
        font-size: 18px;
    }

    .panel-button {
        width: 30px;
        height: 30px;
        padding: 4px;
        border: none !important;
        border-radius: 48px;
    }

    &.left-align {
        margin-left: 0;
    }
}
</style>
