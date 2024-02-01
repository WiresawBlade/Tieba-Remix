<template>
    <UserButton ref="toggleButton" class="toggle-button"
        :class="{ 'toggle-on': currentValue, 'toggle-off': !currentValue, 'filled-icon': iconType && currentValue, 'outline-icon': iconType && !currentValue }"
        @click="toggleValue" :value="currentValue">
        <slot></slot>
    </UserButton>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import UserButton from "./user-button.vue";

interface Props {
    defaultValue?: boolean;
    iconType?: boolean;
    event?: ((now: boolean) => void);
}

const props = defineProps<Props>();

const toggleButton = ref<HTMLButtonElement>();
const currentValue = ref(props.defaultValue);

function toggleValue() {
    currentValue.value = !currentValue.value;
    props.event && props.event(currentValue.value);
}
</script>

<style lang="scss" scoped>
.toggle-button {
    color: var(--default-fore);

    .icon,
    .outline-icon {
        color: var(--minimal-fore);
    }

    &.toggle-on {
        background-color: var(--tieba-theme-color);
        color: var(--default-background);
    }
}
</style>
