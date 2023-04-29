<template>
    <button class="user-button" type="button" :title="props.title">
        {{ props.title }}
        <slot></slot>
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
@use "@/stylesheets/main/palette" as _;

.user-button {
    box-sizing: border-box;
    padding: 2px 8px;
    border: none;
    border: 1px solid _.$borderColor;
    border-radius: 6px;
    background: none;
    background-color: _.$defaultBack;
    cursor: pointer;
}

.user-button:hover {
    background-color: _.$elemColor;
}

.user-button:focus {
    border: 2px solid _.$tiebaThemeColor;
}
</style>
