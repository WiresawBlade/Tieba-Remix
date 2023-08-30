<template>
    <div class="index-wrapper">
        <div class="grid-container">
            <div class="head-controls">
                <div class="main-title">
                    <img src="/images/main/icon.png" alt="icon" class="main-icon">
                    <div class="title">百度贴吧</div>
                </div>

                <!-- 用户按钮 -->
                <div class="profile-menu-container" @click="profileToggle = !profileToggle">
                    <UserButton class="curr-user">
                        <img :src="userInfo ? tiebaAPI.URL_profile(userInfo.user_portrait) : tiebaAPI.URL_profile('un')"
                            alt="用户头像" class="user-profile">
                    </UserButton>

                    <DropdownMenu v-if="profileToggle" :menu-items="profileMenu!" class="profile-menu" :blur-effect="true"
                        @request-close="profileToggle = false">
                    </DropdownMenu>
                </div>

                <!-- 配置按钮 -->
                <div class="config-menu-container" @click="configToggle = !configToggle">
                    <UserButton class="config-menu-btn icon" :unset-background="true">menu</UserButton>

                    <DropdownMenu v-if="configToggle" :menu-items="configMenu!" class="config-menu" :blur-effect="true"
                        @request-close="configToggle = false">
                    </DropdownMenu>
                </div>

                <!-- 搜索组件 -->
                <div class="search-controls">
                    <UserTextbox v-model="searchText" class="search-box" placeholder="搜索 百度贴吧" autocomplete="none"
                        @focus="searchBoxFocus" @input="searchMatch">
                    </UserTextbox>

                    <UserButton class="search-button" :theme-style="true">搜索</UserButton>

                    <!-- 搜索建议组件 -->
                    <div v-show="suggToggle && suggestions.length > 0" class="search-suggestions">
                        <UserButton :is-anchor="true" class="search-elem" v-for="sugg in suggestions" :href="sugg.href"
                            target="_blank">
                            <img class="sugg-img" :src="sugg.image" alt="">
                            <div class="sugg-content">
                                <p class="sugg-title">{{ sugg.title }}</p>
                                <p class="sugg-desc">{{ sugg.desc }}</p>
                            </div>
                        </UserButton>
                    </div>
                </div>
            </div>

            <!-- 关注的吧 -->
            <div v-if="followed" class="block-wrapper followed-container">
                <div class="block-controls followed">
                    <p class="block-title">关注的吧</p>
                    <div class="block-panel signed-count left-align">{{ signedForums }} / {{ followed?.like_forum.length }}
                    </div>

                    <div class="block-panel followed">
                        <UserButton class="panel-btn icon sign-btn" :unset-background="true" @click="oneKeySignInstance">
                            task_alt</UserButton>
                        <UserButton class="panel-btn icon settings" :unset-background="true">settings</UserButton>
                    </div>
                </div>

                <div class="block-container followed-list">
                    <UserButton v-for="forum in followed.like_forum" :is-anchor="true" class="followed-btn"
                        :shadow-border="true" :href="tiebaAPI.URL_forum(forum.forum_name)" target="_blank">
                        <div v-if="forum.is_sign === 1" class="icon signed">check</div>
                        <div class="forum-title">{{ forum.forum_name }}</div>
                        <div class="forum-level" :class="'level-' + levelToClass(forum.user_level)">
                            {{ forum.user_level }}
                        </div>
                    </UserButton>
                </div>
            </div>

            <!-- 贴吧热议 -->
            <div v-if="topicList.length > 0" class="block-wrapper topic-container">
                <div class="block-controls topics">
                    <p class="block-title">贴吧热议</p>

                    <div class="block-panel topics">
                        <UserButton class="panel-btn icon switch" :unset-background="true">tune</UserButton>
                        <UserButton class="panel-btn icon more" :unset-background="true">more_horiz</UserButton>
                        <UserButton class="panel-btn icon settings" :unset-background="true">settings</UserButton>
                    </div>
                </div>

                <div class="block-container topic-list">
                    <UserButton v-for="topic in take(topicList, 10)" :is-anchor="true" class="topic-btn"
                        :shadow-border="true" :href="topic.topic_url" target="_blank">
                        <img class="topic-img" :src="topic.topic_pic">
                        <div class="topic-content">
                            <div class="topic-title">
                                <div :class="'topic-rank-' + topic.idx_num">{{ topic.idx_num }}</div>
                                <div class="topic-name">{{ topic.topic_name }}</div>
                            </div>
                            <div class="topic-desc">{{ topic.topic_desc }}</div>
                        </div>
                    </UserButton>
                </div>
            </div>

            <div id="carousel_wrap"></div>
        </div>

        <div ref="masonryContainer" class="masonry-container">
            <!-- 推送 -->
            <FeedsMasonry :init-feeds="initFeeds"></FeedsMasonry>

            <div v-if="initFeeds.length === 0" class="empty-container">
                <p class="no-feed-content">没有更多了</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    tiebaAPI,
    SuggestionResponse, UserInfoResponse,
    FollowedForumsResponse,
    levelToClass,
    TopicListResponse, TopicList
} from "@/lib/api.tieba";

import { onMounted, ref } from "vue";
import { debounce, forEach, map, take } from "lodash-es";

import { findParentByClass } from "@/lib/domlib";
import { messageBox, renderDialog, toast } from "@/lib/render";
import { errorMessage, requestInstance } from "@/lib/utils";

import UserTextbox from "../utils/user-textbox.vue";
import UserButton from "../utils/user-button.vue";
import DropdownMenu from "../utils/dropdown-menu.vue";
import { OneKeySignResponse } from "@/lib/api.tieba";
import { FlexMasonry } from "@/layouts/flex-masonry";
import Settings from "../settings.vue";
import { BaiduPassport, GiteeRepo, GithubRepo, unreadFeeds } from "@/lib/user-values";
import FeedsMasonry from "../feeds-masonry.vue";

const initFeeds = ref<TiebaPost[]>([]);
const userInfo = ref<UserInfoResponse["data"]>();
const followed = ref<FollowedForumsResponse["data"]>();

const masonryContainer = ref<HTMLDivElement>();
const feedsContainer = ref<HTMLAnchorElement>();
const searchText = ref<string>("");
const suggToggle = ref(false);
const suggestions = ref<{
    image: string
    title: string
    desc: string
    href: string
}[]>([]);
const configToggle = ref(false);
const configMenu = ref<DropdownMenu[]>();
const profileToggle = ref(false);
const profileMenu = ref<DropdownMenu[]>();
const topicList = ref<TopicList[]>([]);
const feedsIntersecting = ref(false);

// 状态
let signedForums = 0;

initFeeds.value = unreadFeeds.get();
console.log("🚀 ~ file: index.vue:197 ~ initFeeds.value:", initFeeds.value);

// 初始化
onMounted(async () => {
    init().then(() => {
        // 监控
        if (masonryContainer.value) {
            const iObs = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    feedsIntersecting.value = true;
                } else {
                    feedsIntersecting.value = false;
                }
            });
            iObs.observe(masonryContainer.value);
        }
    });
});

window.addEventListener("focusin", (ev) => toggleSuggControls(ev));
window.addEventListener("mousedown", (ev) => toggleSuggControls(ev));

async function init() {
    // 用户信息
    userInfo.value = await (async () => {
        try {
            const userInfoResp = (await (await tiebaAPI.userInfo()).json() as UserInfoResponse);
            if (userInfoResp) {
                return userInfoResp.data;
            }
        } catch (error) {
            toast({
                message: errorMessage(error as Error),
                type: "error",
                duration: 6000
            });
        }
    })();
    console.log("user info", userInfo.value);

    // 配置菜单
    configMenu.value = [
        {
            title: "设置",
            click() {
                renderDialog(Settings);
            }
        },
        "separator",
        {
            title: "源代码 (GitHub)",
            href: GithubRepo
        },
        {
            title: "源代码 (Gitee)",
            href: GiteeRepo
        }
    ];

    // 用户菜单
    profileMenu.value = [
        {
            title: "登录",
            icon: "login",
            href: BaiduPassport
        }
    ];

    if (userInfo.value) {
        profileMenu.value = [
            {
                title: "我的收藏",
                icon: "star"
            },
            "separator",
            {
                title: "主页",
                icon: "home",
                href: tiebaAPI.URL_userHome(userInfo.value.user_portrait)
            },
            {
                title: "修改",
                icon: "settings"
            },
            "separator",
            {
                title: "退出登录",
                icon: "logout"
            }
        ];
    }

    // 获取关注的吧
    if (userInfo.value) {
        getFollowedInstance();
    }

    // 贴吧热议
    requestInstance(tiebaAPI.topicList()).then((response: TopicListResponse) => {
        if (response) {
            topicList.value.push(...response.data.bang_topic.topic_list);
        }
    });

    // 页面
    if (!feedsContainer.value) return;
}

function toggleSuggControls(e: Event) {
    const el = e.target as HTMLElement;
    const pt = findParentByClass(el, "search-controls");
    if (pt) {
        suggToggle.value = true;
    } else {
        suggToggle.value = false;
    }
}

/**
 * 加载搜索建议
 * @param query 搜索关键字
 */
async function loadSuggestions(query?: string) {
    const response = await tiebaAPI.suggestions(query);
    if (response.ok) {
        response.json().then((value: SuggestionResponse) => {
            // 没有输入搜索内容则获取热门搜索
            if (!query || query === "") {
                const topicList = value.hottopic_list.search_data;
                if (topicList)
                    suggestions.value = map(topicList, (topic) => ({
                        image: topic.topic_pic,
                        title: topic.topic_name,
                        desc: topic.topic_desc,
                        href: topic.topic_url
                    }));
            } else {
                const matchList = value.query_match.search_data;
                if (matchList)
                    suggestions.value = map(matchList, (match) => ({
                        image: match.fpic,
                        title: match.fname,
                        desc: match.forum_desc,
                        href: tiebaAPI.URL_forum(match.fname)
                    }));
            }
        });
    }
}

// 事件处理
function searchBoxFocus() {
    if (suggestions.value.length <= 0) {
        loadSuggestions().then(() => {
            suggToggle.value = true;
        });
    } else {
        suggToggle.value = true;
    }
}

function searchTextChange() {
    loadSuggestions(searchText.value);
}

const searchMatch = debounce(searchTextChange, 500);

// function showImages(images: string[], index: number) {
//     postImages.value = images;
//     defaultIndex.value = index;

//     renderDialog(ImagesViewer, {
//         content: postImages.value,
//         defaultIndex: defaultIndex.value
//     });
// }

function getFollowedInstance() {
    requestInstance(tiebaAPI.followedForums()).then((response: FollowedForumsResponse) => {
        if (response) {
            signedForums = 0;
            followed.value = response.data;

            // 已签到计数
            forEach(followed.value.like_forum, forum => {
                if (forum.is_sign === 1) signedForums++;
            });
            // 排序关注吧
            followed.value.like_forum.sort((a, b) =>
                parseInt(b.user_exp) - parseInt(a.user_exp));
        }
    });
}

async function oneKeySignInstance() {
    messageBox({
        title: "一键签到",
        message: "需要注意，Web端签到获取到的经验远少于移动端，建议使用其他设备进行签到。",
        type: "OkCancel"
    }).then((tag) => {
        if (tag === "positive") {
            requestInstance(tiebaAPI.oneKeySign()).then((response: OneKeySignResponse) => {
                toast({
                    message: `本次共签到成功 ${response.data.signedForumAmount} 个吧，未签到 ${response.data.unsignedForumAmount} 个吧，签到失败 ${response.data.signedForumAmountFail} 个吧，共获得 ${response.data.gradeNoVip} 经验。`,
                    type: "check",
                    blurEffect: true
                });

                // 刷新关注的吧
                getFollowedInstance();
            });
        }
    });
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;
@use "@/stylesheets/main/remixed-main" as _main;

$menu-margin: 24px;
$menu-button-size: 32px;

a {
    color: unset;
    text-decoration: none;
}

.block-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .block-controls {
        display: flex;
        align-items: center;
        gap: 8px;

        .block-title {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
    }

    .block-container {
        padding: 8px;
        border-radius: 12px;
        background-color: _.$transLightBack;
    }
}

.block-panel {
    display: flex;
    min-width: 30px;
    height: 26px;
    align-items: center;
    justify-content: center;
    padding: 2px 8px;
    border-radius: 24px;
    margin-left: auto;
    background-color: _.$transLightBack;
    font-size: 14px;
    gap: 4px;
    text-align: center;

    .icon {
        color: _.$lightFore;
        font-size: 18px;
    }

    .panel-btn {
        padding: 4px;
        border: none;
        border-radius: 48px;
    }
}

.block-panel.left-align {
    margin-left: 0;
}

.index-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .grid-container {
        display: grid;
        margin: 16px;
        gap: 36px;
        grid-template-rows: repeat(1, 1fr);

        .head-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px;
            gap: 24px;

            .main-title {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;

                .main-icon {
                    height: 64px;
                }

                .title {
                    font-size: 36px;
                    font-style: italic;
                    font-weight: bold;
                }
            }

            .search-controls {
                position: relative;
                display: grid;
                width: 100%;
                max-width: 420px;
                justify-content: center;
                grid-template-columns: 1fr 72px;

                .search-box {
                    width: 100%;
                    padding: 8px;
                    border-bottom-right-radius: 0;
                    border-top-right-radius: 0;
                    font-size: 16px;
                }

                .search-button {
                    border: none;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                    font-size: 16px;
                    font-weight: bold;
                }

                .search-suggestions {
                    position: absolute;
                    z-index: 1;
                    top: 100%;
                    display: flex;
                    overflow: hidden;
                    width: 100%;
                    box-sizing: border-box;
                    flex-direction: column;
                    border: 1px solid _.$borderColor;
                    border-radius: 6px;
                    margin-top: 4px;
                    background-color: _.$defaultBack;
                    box-shadow: 0 0 20px rgb(0 0 0 / 20%);

                    @include _main.fade-in(0.2s);

                    .search-elem {
                        $img-size: 42px;
                        $gap: 8px;
                        display: flex;
                        overflow: hidden;
                        box-sizing: border-box;
                        padding: 0;
                        padding: $gap;
                        border: none;
                        border-radius: 0;

                        @keyframes stretch {
                            0% {
                                padding: calc($gap / 2) $gap;
                            }

                            100% {
                                padding: $gap;
                            }
                        }

                        animation: stretch 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
                        gap: $gap;
                        text-align: justify;

                        .sugg-img {
                            width: $img-size;
                            height: $img-size;
                            border-radius: 8px;
                        }

                        .sugg-content {
                            position: relative;
                            display: flex;
                            width: calc(100% - $img-size - $gap);
                            flex-direction: column;
                            justify-content: center;
                            gap: 4px;

                            .sugg-title {
                                overflow: hidden;
                                margin: 0;
                                font-size: 14px;
                                font-weight: bold;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            .sugg-desc {
                                overflow: hidden;
                                margin: 0;
                                color: _.$lightFore;
                                font-size: 12px;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }

        .profile-menu-container {
            position: absolute;
            z-index: 1;

            .curr-user {
                position: fixed;
                top: $menu-margin;
                left: $menu-margin;
                overflow: hidden;
                width: 36px;
                height: 36px;
                padding: 0;
                border: 3px solid _.$borderColor;
                border-radius: 36px;

                .user-profile {
                    width: 100%;
                    object-fit: fill;
                }
            }

            .profile-menu {
                top: 64px;
                left: 24px;
            }
        }

        .config-menu-container {
            position: absolute;
            z-index: 1;
            display: flex;

            .config-menu-btn {
                position: fixed;
                top: $menu-margin;
                right: $menu-margin;
                height: 32px;
                border: none;
                border-radius: 36px;
                background-color: _.$pageBack;
                font-size: 24px;
            }

            .config-menu-btn:hover {
                background-color: _.$defaultBack;
            }

            .config-menu-btn:active {
                background-color: _.$defaultHover;
            }

            .config-menu {
                top: 64px;
                right: 24px;
                opacity: 1;
            }
        }

        .signed-count {
            font-weight: bold;
        }

        .block-panel.followed {
            margin-left: auto;
        }

        .followed-container {
            margin-top: -16px;

            .followed-list {
                display: flex;
                flex-wrap: wrap;
                padding: 8px;
                border-radius: 12px;
                background-color: _.$transLightBack;
                gap: 4px;

                .followed-btn {
                    display: flex;
                    align-items: center;
                    padding: 6px 8px;
                    border-radius: 12px;
                    font-size: 14px;
                    gap: 6px;

                    .signed {
                        color: green;
                        font-weight: bold;
                    }

                    .forum-level {
                        min-width: 24px;
                        padding: 0 2px;
                        border-radius: 24px;
                        font-weight: bold;
                        text-align: center;
                    }
                }
            }
        }

        .topic-list {
            display: grid;
            gap: 4px;
            grid-auto-rows: max-content;
            grid-template-columns: repeat(2, 1fr);

            .topic-btn {
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
                padding: 12px;
                border-radius: 12px;
                gap: 8px;

                .topic-img {
                    width: 72px;
                    border-radius: 12px;
                }

                .topic-content {
                    display: flex;
                    flex-flow: column wrap;
                    gap: 4px;
                    text-align: justify;

                    .topic-title {
                        display: flex;
                        align-items: center;
                        gap: 6px;

                        [class^="topic-rank"] {
                            padding: 0 4px;
                            border-radius: 4px;
                            background-color: orange;
                            color: _.$defaultBack;
                            font-weight: bold;
                            text-align: center;
                        }

                        .topic-name {
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }

                    .topic-desc {
                        color: _.$lightFore;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .masonry-container {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .feeds-container {
            width: 100%;
            margin: auto;

            @keyframes feeds-in {
                0% {
                    transform: scale(0.72);
                }

                100% {
                    transform: scale(1);
                }
            }

            @keyframes refresh-btn-in {
                0% {
                    padding: 0 18px;
                    opacity: 0;
                }

                100% {
                    padding: 8px 18px;
                    opacity: 1;
                }
            }

            .feeds-refresh-btn {
                position: fixed;
                z-index: 1;
                bottom: 24px;
                left: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 8px 18px;
                border-width: 2px;
                border-radius: 16px;
                animation: refresh-btn-in 0.4s ease;
                box-shadow: 0 6px 20px rgb(0 0 0 / 30%);
                font-size: 14px;
                font-weight: bold;
                gap: 6px;
                transform: translateX(-50%);

                .icon {
                    font-size: 18px;
                }
            }
        }

        .post-elem {
            animation: feeds-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.2);
        }

        .post-elem:not(:hover, :active, :focus) {
            box-shadow: none;
        }

        .empty-container {
            .no-feed-content {
                color: _.$minimalFore;
                font-size: small;
                text-align: center;
            }
        }
    }
}
</style>
