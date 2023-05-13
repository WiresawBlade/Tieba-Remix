<template>
    <component :is="isAnchor ? 'a' : 'button'" class="user-button"
        :class="{ 'shadow-border': props.shadowBorder, 'unset-background': props.unsetBackground, 'theme-style': props.themeStyle }"
        type="button">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
interface Props {
    isAnchor?: true
    shadowBorder?: true
    unsetBackground?: true
    themeStyle?: true
}

const props = defineProps<Props>();
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

.user-button:hover {
    background-color: _.$defaultHover;
}

.user-button:active {
    background-color: _.$defaultActive;
}

.user-button:focus {
    border: 2px solid _.$tiebaThemeColor;
}

.theme-style {
    background-color: _.$tiebaThemeColor;
    color: _.$defaultBack;
}

.theme-style:hover {
    background-color: _.$tiebaThemeHover;
}

.theme-style:active {
    background-color: _.$tiebaThemeActive;
}

.theme-style:focus {
    border-color: var(--tieba-theme-active);
}

.unset-background {
    background-color: unset;
}

.shadow-border {
    border: none;
    box-shadow: 0 0 0 1px _.$borderColor;
}

.shadow-border:focus {
    border: none;
    box-shadow: 0 0 0 2px _.$tiebaThemeColor;
}

.shadow-border.theme-style:focus {
    border: none;
    box-shadow: 0 0 0 2px var(--tieba-theme-active);
}
</style>
