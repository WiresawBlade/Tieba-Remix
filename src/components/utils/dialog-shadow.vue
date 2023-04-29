<template>
    <div ref="dialogShadow" class="dialog-shadow" @click="onClick">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { includes } from 'lodash-es';
import { ref } from 'vue';

interface Props {
    forced?: boolean,
    toggleElems: Element[]
}
const props = withDefaults(defineProps<Props>(), {
    forced: false,
    toggleElems: <any>[]
});

const emit = defineEmits(["RequestClose"]);

const dialogShadow = ref<HTMLDivElement>();

if (dialogShadow.value) {
    props.toggleElems.push(dialogShadow.value);
}

function onClick(e: Event) {
    // 防止事件穿透
    if (!includes(props.toggleElems, e.target)) return;
    if (!props.forced) {
        emit("RequestClose");
    }
}
</script>

<style scoped lang="scss">
.dialog-shadow {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 80%);
}
</style>
