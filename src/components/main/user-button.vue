<template>
    <button class="user-button">
        <slot></slot>
        {{ props.title }}
    </button>
</template>

<script setup lang="ts">
interface Props {
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: ""
});
</script>

<style scoped lang="scss">
.user-button {
    box-sizing: border-box;
    padding: 2px 8px;
    border: none;
    border-radius: 6px;
    background: none;
    background-color: var(--light-background);
    box-shadow: 0 0 0 1px var(--border-color);
    color: var(--default-fore);
    cursor: pointer;
}

.user-button:hover {
    background-color: var(--elem-color);
}

.user-button:focus {
    box-shadow: 0 0 0 2px var(--tieba-theme-color);
}
</style>
