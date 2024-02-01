<template>
    <div ref="headerProgress" id="header-progress" :style="`width: ${valueRef}vw;`"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

export interface HeaderProgressProps {
    calc: (() => number);
}

const props = defineProps<HeaderProgressProps>();

const headerProgress = ref<HTMLDivElement>();
const valueRef = ref(0);

onMounted(function () {
    if (headerProgress.value) {
        requestAnimationFrame(function () {
            calcValue();
        });
    }
});

function calcValue() {
    valueRef.value = props.calc();
    console.log(valueRef.value);
    if (valueRef.value < 100)
        requestAnimationFrame(calcValue);
}
</script>

<style lang="scss" scoped>
#header-progress {
    position: fixed;
    z-index: 99999;
    top: 0;
    max-width: 100vw;
    height: 4px;
    background-color: var(--tieba-theme-color);
    transition: 0.4s;
}
</style>
