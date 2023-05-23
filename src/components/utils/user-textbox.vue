<template>
    <component :is="props.mutiLines? 'textarea' : 'input'" class="user-textbox" type="text" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" autocomplete="off"></component>
</template>

<script setup lang="ts">
interface Props {
    modelValue?: string
    mutiLines?: true
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: ""
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;

.user-textbox {
    box-sizing: border-box;
    padding: 4px;
    border: 2px solid _.$borderColor;
    border-radius: 6px;
    background-color: _.$defaultBack;
    outline: none;
    transition: 0.4s ease;
}

.user-textbox:hover {
    border-color: _.$lightBack;
}

.user-textbox:focus {
    border-color: _.$tiebaThemeColor;
}
</style>
