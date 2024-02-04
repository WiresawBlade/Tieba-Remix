<template>
    <div class="theme-color-component">
        <el-config-provider :locale="zhCn">
            <div class="picker">
                <el-color-picker v-model="lightTheme" id="light-theme" popper-class="theme-picker" size="small"
                    @change="changeThemeColor"></el-color-picker>
                <label for="light-theme">浅色主题</label>
            </div>
            <div class="picker">
                <el-color-picker v-model="darkTheme" id="dark-theme" popper-class="theme-picker" size="small"
                    @change="changeThemeColor"></el-color-picker>
                <label for="dark-theme">深色主题</label>
            </div>
            <UserButton class="reset-button" @click="resetThemeColor">重置</UserButton>
        </el-config-provider>
    </div>
</template>

<script lang="ts" setup>
import { themeColor } from "@/lib/user-values";
import { ElColorPicker, ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ref } from "vue";
import UserButton from "../utils/user-button.vue";

const lightTheme = ref(themeColor.get().light);
const darkTheme = ref(themeColor.get().dark);
// const colorPicker = ref<InstanceType<typeof ElColorPicker>>();

function changeThemeColor() {
    themeColor.set({
        dark: darkTheme.value,
        light: lightTheme.value,
    });
}

function resetThemeColor() {
    themeColor.remove();
    lightTheme.value = themeColor.get().light;
    darkTheme.value = themeColor.get().dark;
}
</script>

<style lang="scss" scoped>
.theme-color-component {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;

    .title {
        margin: 0;
        color: var(--minimal-fore);
        text-align: center;
    }

    .picker {
        display: flex;
        gap: 6px;

        label {
            color: var(--minimal-fore);
        }
    }

    .reset-button {
        margin-left: auto;
    }
}
</style>

<style lang="scss">
.theme-picker {
    z-index: 9999 !important;
}
</style>
