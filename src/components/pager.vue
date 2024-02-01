<template>
    <div class="pager-wrapper">
        <div class="pager-button-container">
            <UserButton v-show="currIndex !== range[0]" class="pager-button pager-back-button icon" shadow-border>
                keyboard_arrow_left
            </UserButton>

            <UserButton v-for="(displayNumber, i) in Array.from({ length: pagerCount }, (_, k) => range[0] + k)"
                class="pager-button" :class="i === currIndex ? 'curr-pager-button' : undefined"
                @click="click ? currIndex = click(displayNumber, i) : void 0" shadow-border :theme-style="i === currIndex"
                :disabled="i === currIndex">
                {{ displayNumber }}
            </UserButton>

            <UserButton v-show="currIndex !== range[1]" class="pager-button pager-forward-button icon" shadow-border>
                keyboard_arrow_right
            </UserButton>
            <UserButton v-if="tailButton" class="pager-button pager-tail-button icon" shadow-border>
                keyboard_double_arrow_right
            </UserButton>

        </div>

        <div v-if="jumperBox" class="jumper-container">
            <UserTextbox class="jumper"></UserTextbox>
            <UserButton class="pager-button jumper-button icon">display_external_input</UserButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import UserButton from "./utils/user-button.vue";
import UserTextbox from "./utils/user-textbox.vue";

interface Props {
    range: [number, number];
    maxDisplay?: number;
    defaultIndex?: number;
    click?: ((value: number, index: number) => number);
    tailButton?: boolean;
    jumperBox?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    maxDisplay: 10,
    defaultIndex: 0,
    tailButton: true,
    jumperBox: false,
});

const pagerCount = Math.min(props.maxDisplay, props.range[1] - props.range[0] + 1);

const currIndex = ref(props.defaultIndex);
</script>

<style lang="scss" scoped>
.pager-wrapper {
    display: flex;
    width: fit-content;
    justify-content: center;
    padding: 4px;
    border-radius: 8px;
    margin: auto;
    background-color: var(--trans-light-background);
    gap: 6px;

    .pager-button-container {
        display: flex;
        align-items: center;
        gap: 4px;

        .pager-button {
            color: var(--default-fore);
        }

        .curr-pager-button {
            font-weight: bold;
        }
    }

    .jumper-container {
        display: flex;
        align-items: center;
        gap: 4px;

        .jumper {
            width: 36px;
        }
    }
}
</style>
