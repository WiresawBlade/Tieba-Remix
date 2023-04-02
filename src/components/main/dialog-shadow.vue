<template>
    <div v-show="props.visible" class="dialog-shadow">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
    visible: true
});
</script>

<style scoped lang="scss">
.dialog-shadow {
    position: fixed;
    z-index: 99999;
    display: flex;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    background-color: rgba($color: #000, $alpha: 50%);
}
</style>