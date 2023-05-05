<template>
    <button class="user-button" :class="{ 'shadow-border': props.shadowBorder, 'unset-background': props.unsetBackground }"
        type="button">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
interface Props {
    shadowBorder?: boolean
    unsetBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    shadowBorder: false,
    unsetBackground: false
});
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;

.user-button {
    box-sizing: border-box;
    padding: 2px 8px;
    border: 1px solid _.$borderColor;
    border-radius: 6px;
    background: none;
    background-color: _.$defaultBack;
    cursor: pointer;
    transition: 0.4s ease;
}

.unset-background {
    background-color: unset;
}

.shadow-border {
    border: none;
    box-shadow: 0 0 0 1px _.$borderColor;
}

.user-button:hover {
    background-color: _.$defaultHover;
}

.user-button:focus {
    border: 2px solid _.$tiebaThemeColor;
}

.user-button:active {
    background-color: _.$defaultActive;
}

.shadow-border:focus {
    border: none;
    box-shadow: 0 0 0 2px _.$tiebaThemeColor;
}
</style>
