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
                    <UserButton class="config-menu-btn" :unset-background="true">menu</UserButton>

                    <DropdownMenu v-if="configToggle" :menu-items="configMenu!" class="config-menu" :blur-effect="true"
                        @request-close="configToggle = false">
                    </DropdownMenu>
                </div>

                <!-- 搜索组件 -->
                <div class="search-controls">
                    <UserTextbox v-model="searchText" class="search-box" placeholder="搜索 百度贴吧" autocomplete="none"
                        @focus="searchBoxFocus" @input="searchMatch">
                    </UserTextbox>

                    <UserButton class="search-button">搜索</UserButton>

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
                        <UserButton class="panel-btn icon sign-btn" :unset-background="true">task_alt</UserButton>
                        <UserButton class="panel-btn icon settings" :unset-background="true">settings</UserButton>
                    </div>
                </div>

                <div class="block-container followed-list">
                    <a v-for=" forum  in  followed?.like_forum " :href="tiebaAPI.URL_forum(forum.forum_name)"
                        target="_blank">
                        <UserButton class="followed-btn" :shadow-border="true">
                            <div v-if="forum.is_sign === 1" class="icon signed">check</div>
                            <div class="forum-title">{{ forum.forum_name }}</div>
                            <div class="forum-level" :class="'level-' + levelToClass(forum.user_level)">
                                {{ forum.user_level }}
                            </div>
                        </UserButton>
                    </a>
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
                    <a v-for="topic in take(topicList, 10)" :href="topic.topic_url" target="_blank">
                        <UserButton class="topic-btn" :shadow-border="true">
                            <img class="topic-img" :src="topic.topic_pic">
                            <div class="topic-content">
                                <div class="topic-title">
                                    <div :class="'topic-rank-' + topic.idx_num">{{ topic.idx_num }}</div>
                                    <div class="topic-name">{{ topic.topic_name }}</div>
                                </div>
                                <div class="topic-desc">{{ topic.topic_desc }}</div>
                            </div>
                        </UserButton>
                    </a>
                </div>
            </div>

            <div id="carousel_wrap"></div>
        </div>

        <div class="masonry-container">
            <!-- 推送 -->
            <div v-if="feeds.length > 0 || isFetchingFeeds" class="block-controls feeds">
                <div class="block-panel feeds">
                    <UserButton class="panel-btn icon refresh" :unset-background="true" @click="refreshFeeds">refresh
                    </UserButton>
                    <UserButton class="panel-btn icon settings" :unset-background="true">settings</UserButton>
                </div>
            </div>

            <div ref="feedsContainer" class="feeds-container">
                <PostContainer v-for="post in feeds" :key="post.id" :post="post" class="post-elem" :async-load="true"
                    :shadow-border="true" @click-image="showImages">
                </PostContainer>
            </div>

            <div v-if="feeds.length === 0" class="empty-container">
                <p class="no-feed-content">没有更多了</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    tiebaAPI,
    FeedListResponse,
    SuggestionResponse, UserInfoResponse,
    FollowedForumsResponse,
    levelToClass, parsePostsFromString,
    TopicListResponse, TopicList
} from "@/lib/api.tieba";

import { nextTick, onMounted, ref } from "vue";
import { debounce, forEach, map, take, throttle } from "lodash-es";

import { findParentByClass } from "@/lib/domlib";
import { renderDialog } from "@/lib/render";
import { MainModules } from "@/main";
import { getUserValueTS, setUserValueTS } from "@/lib/userlib";
import { BaiduPassport, GiteeRepo, GithubRepo, spawnOffsetTS } from "@/lib/utils";

import PostContainer from "../post-container.vue";
import ImagesViewer from "../images-viewer.vue";
import UserTextbox from "../utils/user-textbox.vue";
import UserButton from "../utils/user-button.vue";
import Masonry from "masonry-layout";
import DropdownMenu from "../utils/dropdown-menu.vue";
import ModuleControl from "../module-control.vue";

const feeds = ref<TiebaPost[]>([]);
const userInfo = ref<UserInfoResponse["data"]>();
const followed = ref<FollowedForumsResponse["data"]>();

const postImages = ref<string[]>([]);
const defaultIndex = ref(0);
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

// 状态
let isFetchingFeeds = false;
let signedForums = 0;

let msnry: Masonry;

// 初始化
onMounted(async () => {
    // 用户信息
    userInfo.value = await (async () => {
        try {
            const userInfoResp = (await (await tiebaAPI.userInfo()).json() as UserInfoResponse);
            if (userInfoResp) {
                return userInfoResp.data;
            }
        } catch (error) {
            console.warn(error);
        }
    })();
    console.log("user info", userInfo.value);

    // 配置菜单
    configMenu.value = [
        {
            title: "设置"
        },
        {
            title: "模块管理",
            click() {
                renderDialog(ModuleControl, {
                    modules: MainModules
                });
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
        tiebaAPI.followedForums().then((response) => {
            if (response.ok) {
                response.json().then((value: FollowedForumsResponse) => {
                    if (value) {
                        followed.value = value.data;

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
        });
    }

    // 贴吧热议
    tiebaAPI.topicList().then((response) => {
        if (response.ok) {
            response.json().then((value: TopicListResponse) => {
                if (value) {
                    topicList.value.push(...value.data.bang_topic.topic_list);
                }
            });
        }
    });

    // 页面
    if (!feedsContainer.value) return;

    const unread = getUserValueTS("unreadFeeds", <TiebaPost[]>[]);
    if (userInfo.value) {
        if (unread.length > 0) {
            // 有未读推送则直接使用
            addFeedList(unread);
        } else {
            // 异步加载推荐并计算布局
            addFeedList();
        }
    } else {
        unread.length = 0;
    }

    const fetchFeeds = debounce(() => {
        addFeedList().then(() => {
            console.log(feeds.value);
        });
    }, 1000, { leading: true });

    // 页面滚动到底部加载新的推送
    window.addEventListener("scroll", () => {
        if (isFetchingFeeds) return;

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // 在距离屏幕底部约 320px的位置请求下一次推送，这个距离在不故意快速滑动的情况下基本保证无感
        if (scrollTop + clientHeight >= scrollHeight - 320) {
            fetchFeeds();
        }
    });
});

window.addEventListener("focusin", (ev) => toggleSuggControls(ev));
window.addEventListener("mousedown", (ev) => toggleSuggControls(ev));

function toggleSuggControls(payload: Event) {
    const el = payload.target as HTMLElement;
    const pt = findParentByClass(el, "search-controls");
    if (pt) {
        suggToggle.value = true;
    } else {
        suggToggle.value = false;
    }
}

/**
 * 将一次推荐请求获取到的贴子加入 `feeds`
 */
async function addFeedList(newFeeds?: TiebaPost[]) {
    if (!newFeeds) {
        isFetchingFeeds = true;
        const response = await tiebaAPI.feedlist();
        if (response.ok) {
            await response.json().then((value: FeedListResponse) => {
                const newFeeds = parsePostsFromString(value.data.html);
                feeds.value.push(...newFeeds);
                isFetchingFeeds = false;

                renderFeeds();
                // 将新的推送设置为未读推送，失效时间为2小时后
                setUserValueTS("unreadFeeds", newFeeds, spawnOffsetTS(0, 0, 0, 2));
            });
        }
    } else {
        feeds.value.push(...newFeeds);
        renderFeeds();
    }
}

function renderFeeds() {
    nextTick(() => {
        if (!feedsContainer.value) return;

        msnry = new Masonry(feedsContainer.value, {
            itemSelector: ".post-elem",
            columnWidth: 360,
            gutter: 12,
            fitWidth: true,
            transitionDuration: 0
        });

        // 由于未知原因，在页面真正挂载到贴吧时 resize事件会产生问题，所以不得不特殊处理
        const rerender = throttle(() => {
            // 当推送过多（百度 > 150，开发服务器 > 300），重排布会消耗很长时间，导致页面阻塞
            // (async () => {
            //     if (typeof msnry.layout === "function") {
            //         msnry.layout();
            //     }
            // })();

            setTimeout(() => {
                requestAnimationFrame(() => {
                    if (typeof msnry.layout === "function") {
                        msnry.layout();
                    }
                    console.log(feeds.value.length);
                });
            }, 0);
        }, 100, { leading: true });

        window.addEventListener("resize", rerender, {
            passive: true
        });

        clearInterval(0);
        clearInterval(1);
    });
}

function refreshFeeds() {
    feeds.value.length = 0;
    addFeedList();
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

function showImages(images: string[], index: number) {
    postImages.value = images;
    defaultIndex.value = index;

    renderDialog(ImagesViewer, {
        content: postImages.value,
        defaultIndex: defaultIndex.value
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
                    background-color: _.$tiebaThemeColor;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                    color: _.$defaultBack;
                    font-size: 16px;
                    font-weight: bold;
                }

                .search-button:hover {
                    background-color: _.$tiebaThemeHover;
                }

                .search-button:active {
                    background-color: _.$tiebaThemeActive;
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
                font-family: "Material Icons", monospace;
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
                    padding: 6px;
                    border-radius: 12px;
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
                    }
                }
            }
        }

        .topic-list {
            display: grid;
            gap: 4px;
            grid-auto-rows: max-content;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(auto-fill, minmax(1px, 1fr));

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
                    }
                }
            }
        }
    }

    .masonry-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .feeds-container {
            margin: auto;

            .post-elem {
                margin-bottom: 12px;
            }

            .post-elem:not(:hover, :active, :focus) {
                box-shadow: none;
            }
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
