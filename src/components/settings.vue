<template>
    <div class="settings-wrapper">
        <div class="left-container">
            <div class="search-controls">
                <div class="title">设置</div>

                <!-- 搜索文本框 -->
                <UserTextbox v-model="searchText" class="search-box" placeholder="输入需要搜索的设置"
                    @update:model-value="debSearchKey"></UserTextbox>
            </div>

            <div class="left-panel">
                <UserButton v-for="setting in settings" class="key-button main-key"
                    :class="{ 'selected': selectedKey?.name === setting.name }" @click="selectMainKey(setting)">
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
                :class="{ 'selected': selectedSubKey?.name === setting.name }" @click="selectSubKey(setting)">
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

                <div v-if="content?.widgets" class="setting-control">
                    <!-- Toggle -->
                    <UserButton v-if="content?.widgets?.type === 'toggle'" class="toggle-button icon" :class="content.widgets.init
                        ? content.widgets.init() ? 'toggle-on' : 'toggle-off'
                        : 'toggle-off'" @click="content.widgets.event">
                    </UserButton>

                    <!-- Icon -->
                    <div v-if="content?.widgets?.type === 'icon'" class="icon-component icon">{{ content.widgets.content }}
                    </div>

                    <!-- Select -->
                    <select
                        v-if="content.widgets.type === 'select' && {}.toString.call(content.widgets.content) === '[object Object]'"
                        @change="content.widgets.event">
                        <option v-for="(value, key) in content.widgets.content" :value="value"
                            :selected="content.widgets.init && value === content.widgets.init()">
                            {{ key }}</option>
                    </select>

                    <!-- Component -->
                    <component v-if="content?.widgets?.component" :is="content.widgets?.component"
                        @change-view="changeView">
                    </component>
                </div>
            </div>
        </div>
        <div v-else class="empty-container icon">settings</div>
    </div>
</template>

<script lang="ts" setup>
import { markRaw, ref } from "vue";
import type { Component } from "vue";
import UserButton from "./utils/user-button.vue";
import UserTextbox from "./utils/user-textbox.vue";
import { MainModules } from "@/main";
import { disabledModules, experimental, updateConfig } from "@/lib/user-values";
import { conforms, debounce, find, forEach, includes, pull } from "lodash-es";

import AboutDetail from "./setting-widgets/about.detail.vue";
import { UserModule } from "@/global.module";
import AboutUpdate from "./setting-widgets/about.update.vue";

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
        type: "toggle" | "icon" | "select" | "component"
        init?: (() => any)
        event?: ((e: Event) => any)
        content?: string | LiteralObject
        component?: Component
    }
}

const disabledModulesRef = ref(disabledModules);
const experimentalRef = ref(experimental);
const searchText = ref("");

const settings: UserSettings = {
    "modules": {
        name: "模块",
        icon: "deployed_code",
        description: "用户模块管理及部署",
        sub: MainModules.reduce((accu, curr, index) => {
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
                            widgets: {
                                type: "toggle",
                                init() {
                                    return includes(disabledModulesRef.value, module.id) ? false : true;
                                },
                                event() {
                                    if (includes(disabledModulesRef.value, module.id)) {
                                        pull(disabledModulesRef.value, module.id);
                                        GM_setValue("disabledModules", [...new Set(disabledModulesRef.value)]);
                                        return true;
                                    } else {
                                        disabledModulesRef.value.push(module.id);
                                        GM_setValue("disabledModules", [...new Set(disabledModulesRef.value)]);
                                        return false;
                                    }
                                }
                            }
                        },

                        ...module.settings
                    }
                };
            }

            if (index === 1) {
                const accuObject = toSubSettingKey(accu);
                accu = {} as any;
                accu[accuObject.name] = accuObject;
            }

            accu[curr.name] = toSubSettingKey(curr);
            return accu;
        }) as MainSettingKey["sub"]
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
                        widgets: {
                            type: "icon",
                            content: "lab_research"
                        }
                    },

                    "new-index": {
                        title: "新版主页",
                        description:
                            `新版主页旨在提供纯粹的浏览体验，它通过 Vue 构建，拥有较高的理论性能。
                            在新版主页上我们目前会更激进地测试一些新功能，包括尚未被广泛使用的新 Web API，以及自构建的 JavaScript 库。
                            现阶段，新版主页仍然不稳定，同时有大量功能尚未实装。以及，未来也很有可能将其完全放弃。`,
                        widgets: {
                            type: "toggle",
                            init() {
                                return experimentalRef.value["new-index"];
                            },
                            event() {
                                experimentalRef.value["new-index"] = !experimentalRef.value["new-index"];
                                GM_setValue("experimental", experimentalRef.value);
                                return experimentalRef.value["new-index"];
                            }
                        }
                    },

                    "dynamic-post-container": {
                        title: "弹性贴子容器",
                        description:
                            `弹性贴子容器是贴子容器组件的另一种布局，它拥有更灵活的呈现方式。
                            但更多变的布局也带来了更多的问题。由于其在渲染完毕前变得完全不可预测，在将组件呈现给用户前难以做到必要的预先计算工作，这会导致诸如瀑布流布局排版错位等问题。`,
                        widgets: {
                            type: "toggle",
                            init() {
                                return experimentalRef.value["dynamic-post-container"];
                            },
                            event() {
                                experimentalRef.value["dynamic-post-container"] = !experimentalRef.value["dynamic-post-container"];
                                GM_setValue("experimental", experimentalRef.value);
                                return experimentalRef.value["dynamic-post-container"];
                            }
                        }
                    }
                } as KeyMapped<typeof experimental, SettingContent>
            }
        }
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
                        description:
                            `发行信息追踪频率`,
                        widgets: {
                            type: "select",
                            content: {
                                "1 小时": "1h",
                                "3 小时": "3h",
                                "6 小时": "6h",
                                "从不": "never"
                            } as { [props: string]: typeof updateConfig["time"] },
                            init() {
                                return updateConfig.time;
                            },
                            event(e: Event) {
                                const newValue = (e.target as HTMLSelectElement).value;
                                updateConfig.time = newValue as typeof updateConfig["time"];
                                GM_setValue("updateConfig", { ...updateConfig, time: (e.target as HTMLSelectElement).value });
                            }
                        }
                    },

                    "update-component": {
                        widgets: {
                            type: "component",
                            component: markRaw(AboutUpdate)
                        }
                    }
                }
            },

            "about": {
                name: "关于项目",
                content: {
                    "about-component": {
                        widgets: {
                            type: "component",
                            component: markRaw(AboutDetail)
                        }
                    }
                }
            }
        }
    }
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
@use "@/stylesheets/main/remixed-main" as _main;
@include _main.remove-default;

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
    border: none !important;
    border-radius: 0;
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
}

.key-button.selected {
    background-color: var(--tieba-theme-color) !important;
    color: var(--default-background) !important;
    font-weight: bold;

    .icon {
        font-variation-settings: "FILL" 1, "GRAD" 48, "wght" 300;
    }

    .key-desc {
        color: var(--default-background);
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
    animation: dialog-in 0.4s ease;
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

            .content-desc {
                display: flex;
                flex-direction: column;
                color: var(--light-fore);
                gap: 6px;
            }

            .setting-control {
                display: flex;

                .toggle-button {
                    margin-left: auto;
                    font-size: 36px;
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
