<template>
    <DialogShadow :toggle-elems="[imageViewer!]" @request-close="unload">
        <div ref="imageViewer" class="images-viewer">
            <div class="image-container">
                <img ref="currImage" class="curr-image" :src="imageArray[curr]" alt="" @wheel="imageWheel">
            </div>

            <div class="control-panel head-controls">
                <UserButton class="zoom-in head-btn icon" title="zoom_in" @click="zoomImage(0.5)">
                </UserButton>
                <UserButton class="zoom-out head-btn icon" title="zoom_out" @click="zoomImage(-0.5)">
                </UserButton>
                <span class="zoom-size">{{ round(scale * 100) + "%" }}</span>
                <span>|</span>
                <UserButton class="turn-left head-btn icon" title="undo" @click="rotateImage(-90)"></UserButton>
                <UserButton class=" turn-right head-btn icon" title="redo" @click="rotateImage(90)">
                </UserButton>
                <span>|</span>
                <UserButton class="close head-btn icon" title="close" @click="unload"></UserButton>
            </div>

            <UserButton v-if="imageArray.length > 1" class="control-panel back icon" title="chevron_left" @click="listBack">
            </UserButton>
            <UserButton v-if="imageArray.length > 1" class="control-panel forward icon" title="chevron_right"
                @click="listForward"></UserButton>

            <div class="control-panel bottom-controls">
                <UserButton v-for="image, index in imageArray" class="bottom-btn" :class="index === curr ? 'selected' : ''">
                    <img class="image-list" :src="image" alt="" @click="changeCurr(index)">
                </UserButton>
            </div>
        </div>
    </DialogShadow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogShadow from './utils/dialog-shadow.vue';
import UserButton from './utils/user-button.vue';
import { map, round } from 'lodash-es';

interface Props {
    content: string | string[] | TiebaPost
    defaultIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
    defaultIndex: 0
});

const imageArray: string[] = [];
if (typeof props.content === "string") {
    imageArray.push(props.content);
} else if (Array.isArray(props.content)) {
    imageArray.push(...props.content);
} else {
    map(props.content.images, (value) => {
        imageArray.push(value.original);
    });
}

const emit = defineEmits(["RequestClose"]);

const imageViewer = ref<HTMLDivElement>();
const currImage = ref<HTMLImageElement>();
const curr = ref(props.defaultIndex);
const scale = ref(1.0);
const deg = ref(0);

/** 卸载组件 */
function unload() {
    emit("RequestClose");
}

/** 切换当前显示的图片 */
function changeCurr(newIndex: number) {
    curr.value = newIndex;
    transformDefault();
}

/** 上一张照片 */
function listBack() {
    if (curr.value > 0) changeCurr(--curr.value);
}

/** 下一张照片 */
function listForward() {
    if (curr.value < imageArray.length - 1) changeCurr(++curr.value);
}

/** 更新照片的变形状态 */
function transformImage() {
    if (currImage.value) {
        currImage.value.style.transform = `scale(${scale.value}) rotate(${deg.value}deg)`;
    }
}

/** 将照片的变形状态重置 */
function transformDefault() {
    scale.value = 1.0;
    deg.value = 0;
    transformImage();
}

/** 缩放图片 */
function zoomImage(delta: number) {
    scale.value += delta;
    scale.value < 0.5
        ? scale.value = 0.5
        : scale.value > 4.0
            ? scale.value = 4.0
            : true;
    transformImage();
}

/** 旋转图片 */
function rotateImage(delta: number) {
    deg.value += delta;
    deg.value % 360
        ? true
        : deg.value = 0;
    transformImage();
}

/** 鼠标滚轮事件 */
function imageWheel(event: WheelEvent) {
    event.preventDefault();
    zoomImage(event.deltaY > 0 ? -0.1 : 0.1);
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;

$panel-margin: 16px;
$panel-radius: 12px;

.images-viewer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
        color: _.$lightFore;
        font-family: "Material Icons", monospace;
    }

    .control-panel {
        position: absolute;
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid _.$lightBorderColor;
        border-radius: $panel-radius;
        backdrop-filter: blur(24px);
        background-color: _.$transDefaultBack;
        box-shadow: 0 0 32px rgb(0 0 0 / 40%);
        gap: 2px;
    }

    .head-controls {
        top: $panel-margin;
        margin-bottom: auto;

        .head-btn {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: $panel-radius;
            background-color: unset;
        }

        .head-btn:hover {
            background-color: _.$defaultBack;
            color: _.$tiebaThemeColor;
        }

        .close:hover {
            color: red;
        }

        span {
            color: _.$minimalFore;
            font-family: monospace;
        }

        .zoom-size {
            padding: 10px;
        }
    }

    .back,
    .forward {
        height: 60px;
        box-shadow: 0 0 20px rgb(0 0 0 / 10%);
        font-size: large;
    }

    .back {
        left: $panel-margin * 2;
    }

    .forward {
        right: $panel-margin * 2;
    }

    .back:hover,
    .forward:hover {
        background-color: _.$defaultBack;
    }

    .back:focus,
    .forward:focus {
        box-shadow: 0 0 0 2px _.$tiebaThemeColor;
    }

    .image-container {
        width: auto;
        margin: auto;

        .curr-image {
            object-fit: contain;
        }
    }

    .bottom-controls {
        bottom: $panel-margin;
        display: flex;
        margin-top: auto;
        gap: 4px;

        .bottom-btn {
            overflow: hidden;
            width: 100px;
            height: 75px;
            padding: 0;
            border: none;
            border-radius: $panel-radius - 6;
            background-color: _.$transDefaultBack;

            .image-list {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .bottom-btn.selected {
            border: 3px solid _.$tiebaThemeColor;
        }
    }
}
</style>
