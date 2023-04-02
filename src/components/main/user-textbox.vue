<template>
    <input class="user-textbox" type="text" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" autocomplete="off">
</template>

<script setup lang="ts">
interface Props {
    modelValue: string
}

withDefaults(defineProps<Props>(), {
    modelValue: ""
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.user-textbox {
    box-sizing: border-box;
    padding: 4px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--default-background);
    outline: none;
}

.user-textbox:hover {
    border-color: var(--light-background);
}

.user-textbox:focus {
    border-color: var(--tieba-theme-color);
}
</style>
