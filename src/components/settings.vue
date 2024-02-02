<template>
    <div class="settings-wrapper remove-default">
        <div class="left-container">
            <div class="search-controls">
                <div class="title">设置</div>

                <!-- 搜索文本框 -->
                <UserTextbox v-model="searchText" class="search-box" placeholder="输入需要搜索的设置"
                    @update:model-value="debSearchKey"></UserTextbox>
            </div>

            <div class="left-panel">
                <UserButton v-for="setting in settings" class="key-button main-key"
                    :class="{ 'selected': selectedKey?.name === setting.name }" @click="selectMainKey(setting)" no-border>
                    <div class="icon">{{ setting.icon }}</div>

                    <div class="key-info">
                        <div class="key-title">{{ setting.name }}</div>
                        <div class="key-desc">{{ setting.description }}</div>
                    </div>
                </UserButton>
            </div>
        </div>

        <div class="middle-container">
            <UserButton v-for="setting in selectedKey?.sub" class="key-button sub-key"
                :class="{ 'selected': selectedSubKey?.name === setting.name }" @click="selectSubKey(setting)" no-border>
                <div class="key-title">{{ setting.name }}</div>
            </UserButton>
        </div>

        <div v-if="selectedSubKey?.name" class="right-container">
            <div v-if="selectedSubKey?.name" v-for="content in selectedSubKey.content" class="setting-content">
                <div v-if="content?.title" class="content-title">{{ content?.title }}</div>
                <div v-if="content?.description" class="content-desc">
                    <div v-if="content?.description" v-for="line in content.description.split('\n')" class="line">{{ line }}
                    </div>
                </div>

                <div v-if="content?.widgets" v-for="widget in content.widgets" class="setting-control">
                    <!-- Toggle -->
                    <ToggleButton v-if="widget.type === 'toggle'" class="settings-toggle-button icon"
                        :default-value="widget.init ? widget.init() : undefined" @click="widget.event" icon-type no-border>
                    </ToggleButton>

                    <!-- Icon -->
                    <div v-if="widget.type === 'icon'" class="icon-component icon">{{ widget.content }}
                    </div>

                    <!-- Button -->
                    <UserButton v-if="widget.type === 'button'" @click="widget.event" shadow-border>
                        {{ widget.content }}</UserButton>

                    <!-- Select -->
                    <select v-if="widget.type === 'select' && isRealObject(widget.content)" @change="widget.event">
                        <option v-for="(value, key) in widget.content" :value="value"
                            :selected="widget.init && value === widget.init()">
                            {{ key }}</option>
                    </select>

                    <!-- SubTitle -->
                    <div v-if="widget.type === 'subTitle'" class="content-sub-title">{{ widget.content }}</div>

                    <!-- Description -->
                    <div v-if="widget.type === 'desc'" class="content-desc">
                        <div v-if="widget.content" v-for="line in widget.content.split('\n')" class="line">
                            {{ line }}
                        </div>
                    </div>

                    <!-- Textbox -->
                    <UserTextbox v-if="widget.type === 'textbox'" class="content-textbox"
                        :value="widget.init ? widget.init() : ''" :placeholder="widget.placeHolder" @change="widget.event">
                    </UserTextbox>

                    <img v-if="widget.type === 'image'" class="content-image" :src="widget.content?.toString()"
                        :alt="widget.altContent" :title="widget.altContent" @load="widget.init">

                    <!-- Component -->
                    <component v-if="widget.component" :is="widget?.component" @change-view="changeView">
                    </component>
                </div>
            </div>
        </div>
        <div v-else class="empty-container icon">settings</div>
    </div>
</template>

<script lang="tsx" setup>
import { GM_deleteValue, GM_getValue, GM_listValues, GM_setValue } from "$";
import { setTheme } from "@/lib/api/remixed";
import { UpdateConfig, compactLayout, disabledModules, experimental, pageExtensions, themeType, updateConfig, wideScreen } from "@/lib/user-values";
import { AllModules, isRealObject, outputFile, selectLocalFile } from "@/lib/utils";
import { debounce, filter, find, forEach, includes, map, pull, zipObject } from "lodash-es";
import type { Component, VNode } from "vue";
import { markRaw, ref } from "vue";
import { JSX } from "vue/jsx-runtime";
import AboutDetail from "./setting-widgets/about.detail.vue";
import AboutUpdate from "./setting-widgets/about.update.vue";
import LayoutCustomBack from "./setting-widgets/layout.custom-back.vue";
import ThemeColor from "./setting-widgets/theme.color.vue";
import ToggleButton from "./utils/toggle-button.vue";
import UserButton from "./utils/user-button.vue";
import UserTextbox from "./utils/user-textbox.vue";

export interface UserSettings {
    [props: string]: MainSettingKey
}

export interface SettingKey {
    name: string
    icon?: string
    description?: string
}

export interface MainSettingKey extends SettingKey {
    sub: {
        [props: string]: SubSettingKey
    }
}

export interface SubSettingKey extends SettingKey {
    content: {
        [props: string]: SettingContent | undefined
    }
}

export interface SettingContent {
    title?: string
    description?: string
    widgets?: {
        type: "toggle" | "icon" | "button" | "select" | "subTitle" | "desc" | "textbox" | "image" | "component"
        init?: (() => any)
        event?: ((e: Event) => any)
        content?: string | LiteralObject
        component?: Component | VNode | JSX.Element
        placeHolder?: string
        altContent?: string
    }[]
}

const disabledModulesRef = ref(disabledModules.get());
const experimentalRef = ref(experimental.get());
const updateConfigRef = ref(updateConfig.get());
const searchText = ref("");

const settings: UserSettings = {
    "visibility": {
        name: "显示",
        icon: "visibility",
        description: "主题、显示设置",
        sub: {
            "theme": {
                name: "主题",
                content: {
                    "switch-theme": {
                        title: "主题偏好设置",
                        description:
                            `在自动模式下，将根据当前系统设置自动选择合适的主题。你也可以手动应用某一种主题。`,
                        widgets: [{
                            type: "select",
                            content: {
                                "自动": "auto",
                                "深色": "dark",
                                "浅色": "light",
                            } as { [props: string]: ReturnType<typeof themeType.get> },
                            init() {
                                return themeType.get();
                            },
                            event(e) {
                                const newValue = (e.target as HTMLSelectElement).value;
                                themeType.set(newValue as ReturnType<typeof themeType.get>);
                                setTheme(newValue as ReturnType<typeof themeType.get>);
                            },
                        }],
                    },

                    "color": {
                        title: "主题颜色",
                        description:
                            `自定义主题色。由于存在深浅两种主题，需要设置两种主题色。`,
                        widgets: [{
                            type: "component",
                            component: markRaw(ThemeColor),
                        }],
                    },
                },
            },

            "layout": {
                name: "页面布局",
                content: {
                    "compact-layout": {
                        title: "紧凑布局",
                        description:
                            `在尽量保证视觉观感的请款下，针对部分页面应用更加紧凑的布局，以提高信息密度。当前会受到影响的页面有：新版看贴页面。`,
                        widgets: [{
                            type: "toggle",
                            init() {
                                return compactLayout.get();
                            },
                            event() {
                                compactLayout.set(!compactLayout.get());
                                document.body.toggleAttribute("compact-layout");
                                return compactLayout.get();
                            },
                        }],
                    },


                    "custom-background": {
                        title: "自定义背景图",
                        description:
                            `上传图片作为页面背景图`,
                        widgets: [{
                            type: "component",
                            component: markRaw(LayoutCustomBack),
                        }],
                    },

                    "wide-screen-title": {
                        title: "宽屏设置",
                        description:
                            `针对宽屏设备进行配置`,
                        widgets: [
                            {
                                type: "subTitle",
                                content: "强制拉伸画幅",
                            },
                            {
                                type: "desc",
                                content:
                                    `对于宽屏设备，不一定需要页面内容宽度始终等于屏幕宽度。如果你想应用强制宽屏，可以开启此项。`,
                            },
                            {
                                type: "toggle",
                                init() {
                                    return wideScreen.get().noLimit;
                                },
                                event() {
                                    const value = wideScreen.get().noLimit;
                                    wideScreen.merge({
                                        noLimit: !value,
                                    });
                                    return !value;
                                },
                            },
                            {
                                type: "subTitle",
                                content: "最大宽度",
                            },
                            {
                                type: "desc",
                                content:
                                    `配置页面元素跟随屏幕拉伸的最大宽度，若开启了 “强制拉伸画幅” 则此项失效`,
                            },
                            {
                                type: "textbox",
                                placeHolder: "输入最大宽度像素值",
                                init() {
                                    return String(wideScreen.get().maxPX);
                                },
                                event(e) {
                                    const newValue = (e.target as HTMLInputElement).value;
                                    if (!isNaN(+newValue)) {
                                        wideScreen.merge({
                                            maxPX: +newValue,
                                        });
                                    }
                                },
                            },
                        ],
                    },
                },
            },

            "page-extensions": {
                name: "页面扩展",
                content: {
                    "index": {
                        title: "新版主页",
                        description:
                            `新版主页旨在提供纯粹的浏览体验，它通过 Vue 构建。
                            在新版主页上我们目前会更激进地测试一些新功能，包括尚未被广泛使用的新 Web API，以及自构建的 JavaScript 库。`,
                        widgets: [{
                            type: "toggle",
                            init() {
                                return pageExtensions.get().index;
                            },
                            event() {
                                pageExtensions.merge({ index: !pageExtensions.get().index });
                                return pageExtensions.get().index;
                            },
                        }],
                    },

                    "thread": {
                        title: "新版看帖页面",
                        description:
                            `新版看帖页面使用了全新的 UI 界面，并试图改进屏幕空间利用率。`,
                        widgets: [{
                            type: "toggle",
                            init() {
                                return pageExtensions.get().thread;
                            },
                            event() {
                                pageExtensions.merge({ thread: !pageExtensions.get().thread });
                                return pageExtensions.get().thread;
                            },
                        }],
                    },
                } as Record<keyof ReturnType<typeof pageExtensions.get>, SettingContent>,
            },
        },
    },
    "modules": {
        name: "模块",
        icon: "deployed_code",
        description: "用户模块管理及部署",
        sub: AllModules().reduce((accu, curr, index) => {
            function toSubSettingKey(module: UserModule): SubSettingKey {
                return {
                    name: module.name,
                    description: module.brief,
                    content: {
                        "module-info": {
                            title: module.name,
                            description:
                                `${module.id} ${module.version}
                                ${module.description}`,
                            widgets: [{
                                type: "toggle",
                                init() {
                                    return includes(disabledModulesRef.value, module.id) ? false : true;
                                },
                                event() {
                                    if (includes(disabledModulesRef.value, module.id)) {
                                        pull(disabledModulesRef.value, module.id);
                                        disabledModules.set([...new Set(disabledModulesRef.value)]);
                                        return true;
                                    } else {
                                        disabledModulesRef.value.push(module.id);
                                        disabledModules.set([...new Set(disabledModulesRef.value)]);
                                        return false;
                                    }
                                },
                            }],
                        },

                        ...module.settings,
                    },
                };
            }

            if (index === 1) {
                const accuObject = toSubSettingKey(accu);
                accu = {} as any;
                accu[accuObject.name] = accuObject;
            }

            accu[curr.name] = toSubSettingKey(curr);
            return accu;
        }) as MainSettingKey["sub"],
    },

    "enhanced": {
        name: "高级",
        icon: "labs",
        description: "提前测试一些尚不稳定的新功能",
        sub: {
            "experimental": {
                name: "实验性功能",
                content: {
                    "title": {
                        title: "实验室",
                        description:
                            `本版块列举了一些实验性功能，这些功能正处于开发阶段，它们当中的大部分都是默认关闭的。
                            这些功能可能会产生已知、未知的错误或性能问题，如果这些问题能被更及时全面地反馈，将有助于整个项目的发展。
                            需要注意的是，这些特性并不保证会保留到后续版本中。`,
                        widgets: [{
                            type: "icon",
                            content: "lab_research",
                        }],
                    },
                } /* as KeyMapped<ReturnType<typeof experimental.get>, SettingContent> */,
            },

            "backup-recover": {
                name: "备份与恢复",
                content: {
                    "data-backup": {
                        title: "数据备份",
                        description:
                            `备份脚本所有自定义配置`,
                        widgets: [{
                            type: "button",
                            content: "备份",
                            event() {
                                const userKeys = filter(GM_listValues(), key => {
                                    return !includes([
                                        "unreadFeeds",
                                        "latestRelease",
                                        "showUpdateToday",
                                    ], key);
                                });
                                const userValues = map(userKeys, key => {
                                    return GM_getValue(key);
                                });
                                const configs = zipObject(GM_listValues(), userValues);
                                outputFile(`tieba-remix-backup@${new Date().getTime()}.json`, JSON.stringify(configs));
                            },
                        }],
                    },

                    "recover-backup": {
                        title: "数据恢复",
                        description:
                            `从备份文件中恢复脚本所有自定义配置`,
                        widgets: [{
                            type: "button",
                            content: "恢复",
                            async event() {
                                const backupData = JSON.parse(await selectLocalFile());
                                forEach(Object.entries(backupData), ([key, value]) => {
                                    GM_setValue(key, value);
                                });
                            },
                        }],
                    },
                },
            },

            "factory-reset": {
                name: "重置所有配置",
                content: {
                    "title": {
                        title: "重置所有配置",
                        description:
                            `如果你需要将脚本的一切配置恢复默认，请使用此功能。`,
                    },

                    "reset": {
                        widgets: [{
                            type: "button",
                            content: "重置",
                            event() {
                                if (confirm("该操作是不可逆的，请做最后一次确认")) {
                                    forEach(GM_listValues(), (key) => {
                                        GM_deleteValue(key);
                                    });
                                    location.reload();
                                }
                            },
                        }],
                    },
                },
            },
        },
    },

    "about": {
        name: "关于",
        icon: "person",
        description: "开发信息与检查更新",
        sub: {
            "update": {
                name: "检查更新",
                content: {
                    "update-time": {
                        title: "检查更新设置",
                        description:
                            `发行信息追踪频率`,
                        widgets: [{
                            type: "select",
                            content: {
                                "1 小时": "1h",
                                "3 小时": "3h",
                                "6 小时": "6h",
                                "从不": "never",
                            } as { [props: string]: UpdateConfig["time"] },
                            init() {
                                return updateConfig.get().time;
                            },
                            event(e: Event) {
                                const newValue = (e.target as HTMLSelectElement).value;
                                updateConfig.merge({ time: newValue as any });
                            },
                        }],
                    },

                    "update-notify": {
                        description: `启用一个对话框提示用户更新。该对话框可以立即安装更新，也可以推迟更新操作。`,
                        widgets: [{
                            type: "toggle",
                            init() {
                                return updateConfigRef.value.notify;
                            },
                            event() {
                                const newValue = !updateConfig.get().notify;
                                updateConfigRef.value.notify = newValue;
                                updateConfig.merge({ notify: newValue });
                            },
                        }],
                    },

                    "update-component": {
                        widgets: [{
                            type: "component",
                            component: markRaw(AboutUpdate),
                        }],
                    },
                },
            },

            "about": {
                name: "关于项目",
                content: {
                    "about-component": {
                        widgets: [{
                            type: "component",
                            component: markRaw(AboutDetail),
                        }],
                    },
                },
            },
        },
    },
};

const selectedKey = ref<MainSettingKey>();
const selectedSubKey = ref<SubSettingKey>();

function selectMainKey(key: MainSettingKey) {
    selectedKey.value = key;
    selectedSubKey.value = undefined;
}

function selectSubKey(key: SubSettingKey) {
    selectedSubKey.value = key;
}

function changeView(key: string, sub: string) {
    selectedKey.value = settings[key];
    selectedSubKey.value = settings[key].sub[sub];
}

function clearSelections() {
    selectedKey.value = undefined;
    selectedSubKey.value = undefined;
}

function searchKey() {
    if (searchText.value.length <= 0) {
        clearSelections();
        return;
    }

    if (!find(settings, (mainKey) => {
        if (find(mainKey.sub, (subKey) => {
            if (subKey.name.toLowerCase().includes(searchText.value.toLowerCase())) {
                selectedKey.value = mainKey;
                selectedSubKey.value = subKey;
                return true;
            } else {
                return false;
            }
        })) return true;
        else return false;
    })) clearSelections();
}

const debSearchKey = debounce(searchKey, 500);
</script>

<style lang="scss" scoped>
@use "@/stylesheets/main/remixed-main" as *;

$wrapper-padding: 16px;

@keyframes content-in {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
    }
}

.key-button {
    display: flex;
    overflow: hidden;
    min-width: 80px;
    align-items: center;
    padding: 12px $wrapper-padding;
    border-radius: 0;
    box-shadow: none;
    font-size: 16px;
    gap: 12px;
    text-align: justify;
    white-space: nowrap;

    .icon {
        font-size: 20px;
        font-variation-settings: "FILL" 0, "wght" 300;
        transition: font-variation-settings 0.2s ease;
    }

    .key-info {
        display: flex;
        width: calc(100% - 2 * $wrapper-padding);
        flex-direction: column;
    }

    .key-title,
    .key-desc {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .key-desc {
        color: var(--minimal-fore);
        font-size: 14px;
    }

    &.selected {
        background-color: var(--tieba-theme-color) !important;
        color: var(--default-background) !important;
        font-weight: bold;

        .icon {
            font-variation-settings: "FILL" 1, "GRAD" 48, "wght" 300;
            font-weight: normal;
        }

        .key-desc {
            color: var(--default-background);
        }
    }
}

.settings-wrapper {
    display: flex;
    overflow: hidden;
    width: 72%;
    min-width: 720px;
    height: 72%;
    min-height: 400px;
    box-sizing: border-box;
    border: 1px solid var(--light-border-color);
    border-radius: 18px;
    margin: auto;
    animation: kf-dialog-in 0.4s ease;
    background-color: var(--default-background);
    box-shadow: 0 0 24px rgb(0 0 0 / 20%);

    .left-container {
        display: flex;
        width: 30%;
        max-width: 280px;
        flex-direction: column;

        .search-controls {
            display: flex;
            flex-direction: column;
            padding: $wrapper-padding;
            gap: 8px;

            .title {
                margin-top: 8px;
                font-size: 20px;
                font-weight: bold;
            }

            .search-box {
                padding: 6px;
                font-size: 14px;
            }
        }

        .left-panel {
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
        }
    }

    .middle-container {
        display: flex;
        width: 20%;
        max-width: 220px;
        flex-direction: column;
        padding: $wrapper-padding 6px;
        background-color: var(--deep-background);
        gap: 6px;

        .sub-key {
            display: flex;
            padding: 8px 16px;
            border-radius: 12px;
            gap: 4px;

            .key-title {
                font-size: 14px;
            }
        }

        .sub-key:not(:hover, :active, :focus) {
            background-color: unset;
        }
    }

    .right-container {
        display: flex;
        overflow: auto;
        width: 50%;
        flex-direction: column;
        flex-grow: 1;
        padding: $wrapper-padding;
        animation: content-in 0.2s cubic-bezier(0, 0, 0.2, 1);
        background-color: var(--default-background);
        gap: 32px;

        .setting-content {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .content-title {
                color: var(--highlight-fore);
                font-size: 18px;
                font-weight: bold;
            }

            .content-sub-title {
                color: var(--default-fore);
                font-size: 16px;
                font-weight: bold;
            }

            .content-desc {
                display: flex;
                flex-direction: column;
                color: var(--light-fore);
                gap: 6px;
            }

            .content-textbox {
                margin-left: auto;
            }

            .content-image {
                max-width: 100%;
                max-height: 320px;
                border-radius: 8px;
                margin: 0 auto;
            }

            .setting-control {
                display: flex;

                .settings-toggle-button {
                    margin-left: auto;
                    background: none;
                    font-size: 36px;

                    &.toggle-on {
                        color: var(--tieba-theme-color);
                    }

                    &.toggle-on:hover {
                        color: var(--tieba-theme-fore);
                    }
                }

                .icon-component {
                    margin-left: auto;
                    font-size: 64px;
                    font-variation-settings: "FILL" 1;
                }
            }
        }
    }

    .empty-container {
        margin: auto;
        color: var(--minimal-fore);
        font-size: 72px;
    }
}
</style>
