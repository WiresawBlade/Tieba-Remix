<template>
    <component :is="props.mutiLines? 'textarea' : 'input'" class="user-textbox"
        :class="{ 'lodash-style': props.lodashStyle }" type="text" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" autocomplete="off">
    </component>
</template>

<script setup lang="ts">
interface Props {
    modelValue?: string;
    mutiLines?: true;
    lodashStyle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: "",
    lodashStyle: false,
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss">
.user-textbox {
    box-sizing: border-box;
    padding: 4px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--default-background);
    outline: none;
    transition: 0.4s ease;

    &.lodash-style {
        padding: 0;
        border: none;
        border-radius: 0;
        border-bottom: 2px solid var(--border-color);
    }
}

.user-textbox:hover {
    border-color: var(--light-background);
}

.user-textbox:focus {
    border-color: var(--tieba-theme-color);
}
</style>
