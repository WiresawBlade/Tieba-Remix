<template>
    <div class="mdoule-control-wrapper">
        <div class="left-container">
            <div class="head-controls">
                <p class="title">{{ headTitle }}</p>
                <UserTextbox v-model="searchText" class="search-box" :placeholder="searchPH" autocomplete="none">
                </UserTextbox>
            </div>

            <div class="module-list-container">
                <UserButton v-for="module in filteredModules" :key="module.id" class="module-item"
                    :class="selectedModule.id === module.id ? 'selected' : ''" @click="moduleItemClick(module)">
                    <p class="title">{{ module.name }}</p>
                    <p class="brief">{{ module.brief }}</p>
                </UserButton>
            </div>
        </div>

        <div class="right-container">
            <div v-show="selectedModule.id ? true : false" class="module-container">
                <div class="module-info">
                    <p class="title">{{ selectedModule.name }}</p>
                    <p class="info">{{ selectedModule.id }} {{ selectedModule.version }}</p>
                    <p class="brief">{{ selectedModule.brief }}</p>
                    <p class="desc">{{ selectedModule.description }}</p>
                </div>

                <!-- TODO: 模块标签 -->
                <div v-if="false" class="module-tags">
                </div>

                <div class="bottom-controls">
                    <UserButton class="toggle" :class="bottomToggle ? 'on' : 'off'" @click="toggleClick(selectedModule)">
                    </UserButton>
                    <UserButton class="settings"></UserButton>
                </div>
            </div>

            <div v-show="selectedModule.id ? false : true" class="empty-container">
                <p class="empty-icon"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isEqual, pull } from "lodash-es";
import UserButton from "./utils/user-button.vue";
import UserTextbox from "./utils/user-textbox.vue";
import { ref, watch } from "vue";
import { isModuleDisabled } from "@/lib/userlib";
import { disabledModules } from "@/lib/user-config";

interface Props {
    modules: UserModule[]
}

const props = defineProps<Props>();
const filteredModules = ref(props.modules);
const selectedModule = ref(<UserModule>{});

const headTitle = ref("搜索 用户模块");

const searchPH = ref("搜索模块关键字");
const searchText = ref("");

const bottomToggle = ref(true);

// 监听搜索框输入
watch(searchText, () => {
    if (searchText.value === "") {
        filteredModules.value = props.modules;
    } else {
        const searchRegex = RegExp(searchText.value, "i");
        filteredModules.value = props.modules.filter((module: UserModule) => {
            const indexes = [
                module.id.match(searchRegex),
                module.name.match(searchRegex),
                module.brief.match(searchRegex)
            ];

            if (isEqual(indexes,
                Array.from({ length: indexes.length }, () => null))) {
                return false;
            } else {
                return true;
            }
        });
    }
});

function moduleItemClick(module: UserModule) {
    selectedModule.value = module;
    bottomToggle.value = !isModuleDisabled(module);
}

function toggleClick(module: UserModule) {
    if (bottomToggle.value) {
        disabledModules.push(module.id);
        GM_setValue("disabledModules", [...new Set(disabledModules)]);
    } else {
        pull(disabledModules, module.id);
        GM_setValue("disabledModules", [...new Set(disabledModules)]);
    }
    bottomToggle.value = !bottomToggle.value;
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;
@use "@/stylesheets/main/remixed-main" as _main;

$dialog-height: 400px;
$dialog-radius: 12px;
$dialog-margin: 24px;
$head-height: 80px;
$left-width: 240px;
$right-width: 360px;
$item-margin: 4px;
$bottom-height: 60px;

.mdoule-control-wrapper {
    display: grid;
    overflow: hidden;
    width: 600px;
    height: 400px;
    border-width: 1px;
    border-style: solid;
    border-color: _.$borderColor;
    border-radius: $dialog-radius;
    margin: auto;
    animation: dialog-in 0.4s ease;
    background-color: _.$defaultBack;
    box-shadow: 0 0 40px rgba(0 0 0 / 20%);
    grid-template-columns: 240px 360px;

    .left-container {
        position: relative;
        display: flex;
        width: 240px;
        height: 400px;
        flex-direction: column;
        background-color: _.$deepBack;

        .head-controls {
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            padding: 16px $dialog-margin;
            background-color: _.$deepBack;
            gap: 8px;

            .title {
                margin: 0;
                color: _.$lightFore;
            }

            .search-box {
                width: 100%;
            }
        }

        .module-list-container {
            overflow: hidden;
            height: 100%;
            box-sizing: border-box;

            .module-item {
                display: flex;
                width: 240px;
                box-sizing: border-box;
                flex-direction: column;
                padding: 12px $dialog-margin;
                border: none;
                border-radius: 0;
                gap: 4px;
                text-align: justify;
                white-space: nowrap;

                .title {
                    margin: 0;
                    font-size: 16px;
                    font-weight: bold;
                }

                .brief {
                    overflow: hidden;
                    margin: 0;
                    color: _.$minimalFore;
                    font-size: 12px;
                    text-overflow: ellipsis;
                }
            }

            .module-item:not(:hover) {
                background-color: _.$deepBack;
            }

            .module-item.selected {
                background-color: _.$tiebaThemeColor;
                color: _.$deepBack;

                .brief {
                    color: inherit;
                    font-weight: bold;
                }
            }
        }

        .module-list-container:hover {
            overflow: hidden auto;
        }

        .module-list-container:nth-child(1) {
            padding-top: 80px;
        }
    }

    .right-container {
        overflow: hidden;

        .module-container {
            position: relative;
            top: 0;
            display: flex;
            overflow: hidden;
            height: 100%;
            box-sizing: border-box;
            flex-direction: column;
            flex-shrink: 0;
            padding: $dialog-margin;
            gap: 16px;

            .module-info {
                display: flex;
                overflow: hidden;
                flex-direction: column;
                padding-bottom: $bottom-height;
                gap: 8px;

                .title {
                    margin: 0;
                    font-size: 20px;
                    font-weight: bold;
                }

                .info {
                    color: _.$minimalFore;
                    font-family: monospace;
                    font-size: 14px;
                }

                .brief {
                    margin: 0;
                    color: _.$lightFore;
                    font-size: 14px;
                }

                .desc {
                    margin-top: 24px;
                }
            }

            .module-info:hover {
                overflow: hidden auto;
            }

            .module-tags {
                display: flex;
                flex-wrap: wrap;
                padding: 8px;
                border-radius: $dialog-radius;
                background-color: _.$elemColor;
                gap: 4px;

                .tag {
                    min-width: 36px;
                    padding: 2px 6px;
                    border: 1px solid _.$tiebaThemeColor;
                    border: none;
                    border-radius: 24px;
                    background-color: _.$transTiebaThemeColor;
                    color: _.$tiebaThemeFore;
                }

                .tag:hover,
                .tag:focus {
                    background-color: _.$tiebaThemeColor;
                    color: _.$elemColor;
                }
            }

            .bottom-controls {
                position: absolute;
                bottom: 0;
                left: 0;
                display: flex;
                width: 100%;
                box-sizing: border-box;
                justify-content: flex-end;
                padding: 12px $dialog-margin;
                border-radius: 0 0 $dialog-radius 0;
                backdrop-filter: brightness(0.8);
                background-color: _.$transDefaultBack;

                .toggle,
                .settings {
                    padding: 0;
                    border: none;
                    border-radius: 24px;
                    background-color: unset;
                    font-family: "Material Icons", monospace;
                }

                .toggle {
                    // 靠左
                    margin-right: auto;
                    font-size: 36px;
                }

                .toggle.on::after {
                    color: _.$tiebaThemeFore;
                    content: "toggle_on";
                }

                .toggle.off::after {
                    color: _.$minimalFore;
                    content: "toggle_off";
                }

                .settings::after {
                    padding: 6px;
                    color: _.$minimalFore;
                    content: "settings";
                    font-size: 24px;
                }

                .settings:hover {
                    background-color: _.$minimalBack;
                }
            }
        }

        .empty-container {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;

            .empty-icon {
                color: _.$minimalFore;
                font-family: "Material Icons", monospace;
                font-size: 64px;
                font-variation-settings:
                    "FILL" 0;
            }

            .empty-icon::after {
                content: "widgets";
            }
        }
    }
}
</style>
