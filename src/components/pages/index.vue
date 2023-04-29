<template>
    <div class="index-wrapper">
        <div class="head-controls">
            <div class="main-title">
                <img src="/images/main/icon.png" alt="icon" class="main-icon">
                <div class="title">百度贴吧</div>
            </div>

            <div class="search-controls">
                <UserTextbox v-model="searchText" class="search-box" placeholder="搜索 百度贴吧" autocomplete="none"
                    @focus="searchBoxFocus" @input="searchMatch">
                </UserTextbox>
                <UserButton class="search-button" title="搜索"></UserButton>
                <div v-show="suggToggle" class="search-suggestions">
                    <a v-for="sugg in suggestions" class="search-elem" :href="sugg.href" target="_blank" tabindex="0">
                        <img class="sugg-img" :src="sugg.image" alt="">
                        <div class="sugg-content">
                            <p class="sugg-title">{{ sugg.title }}</p>
                            <p class="sugg-desc">{{ sugg.desc }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <a class="curr-user" :href="tiebaAPI.userHome(userInfo?.user_portrait!)" target="_blank">
            <img :src="tiebaAPI.profile(userInfo!.user_portrait)" alt="用户头像" class="user-profile">
        </a>

        <div class="menu-container">
            <UserButton class="main-menu">menu</UserButton>

            <div class="menu-content">
                <template v-for="menuItem in menuArray">
                    <template v-if="typeof menuItem === 'string'">
                        <div class="menu-separator"></div>
                    </template>

                    <template v-else>
                        <a class="menu-item" :href="menuItem.href ? menuItem.href : 'javascript:;'" @click="menuItem.click">
                            <div v-if="menuItem.icon" class="icon">{{ menuItem.icon }}</div>
                            <div>{{ menuItem.title }}</div>
                        </a>
                    </template>
                </template>
            </div>
        </div>

        <ImagesViewer v-if="viewerToggle" class="main-imgviewer" :content="postImages" :default-index="defaultIndex"
            @request-close="closeViewer">
        </ImagesViewer>

        <div ref="postContainer" class="posts-container">
            <PostContainer ref="components" v-for="post in posts" :key="post.id" :post="post" class="post-elem"
                @click-image="showImages">
            </PostContainer>
        </div>

        <div v-if="posts.length === 0" class="empty-container">
            <p class="no-feed-content">没有更多了</p>
        </div>

        <div id="carousel_wrap"></div>
    </div>
</template>

<script setup lang="ts">
import {
    FeedListResponse,
    SuggestionResponse, UserInfoResponse,
    parsePostsFromString, tiebaAPI
} from "@/lib/api.tieba";
import PostContainer from "../post-container.vue";
import ImagesViewer from "../images-viewer.vue";
import UserTextbox from "../utils/user-textbox.vue";
import UserButton from "../utils/user-button.vue";
import { onMounted, ref, watch } from "vue";
import Masonry from "masonry-layout";
import { debounce, map } from "lodash-es";
import { findParentByClass } from "@/lib/domlib";

const posts = ref<TiebaPost[]>([]);
const userInfo = ref<UserInfoResponse["data"]>();
const viewerToggle = ref(false);
const postImages = ref<string[]>([]);
const defaultIndex = ref(0);
const postContainer = ref<HTMLAnchorElement>();
const searchText = ref<string>("");
const suggToggle = ref(false);
const suggestions = ref<{
    image: string
    title: string
    desc: string
    href: string
}[]>([]);
const menuArray = ref<({
    title: string
    href?: string
    click?: (() => void)
    icon?: string
} | "separator")[]>();

// 状态
let isFetchingFeeds = false;

let msnry: Masonry;

// 初始化
// 用户信息
if (!userInfo.value) {
    userInfo.value = <UserInfoResponse["data"]>{};
}
fetch(tiebaAPI.userInfo()).then((response) => {
    if (response.ok) {
        response.json().then((value?: UserInfoResponse) => {
            if (value) userInfo.value = value.data;
        });
    }
});

// 配置菜单
menuArray.value = [
    {
        title: "设置",
        click() {
            alert("settings");
        },
        icon: "settings"
    },
    {
        title: "模块管理",
        click() {
            alert("module control");
        }
    },
    "separator",
    {
        title: "检查更新..."
    }
];

onMounted(() => {
    if (!postContainer.value) return;

    // 第一次加载首页时异步加载推荐并计算布局
    addFeedList().then(() => {
        if (!postContainer.value) return;

        msnry = new Masonry(postContainer.value, {
            itemSelector: ".post-elem",
            gutter: 12,
            fitWidth: true,
            transitionDuration: 0
        });

        window.addEventListener("resize", () => {
            if (typeof msnry.layout === "function") msnry.layout();
        });

        watch(posts.value, () => {
            if (msnry.layout) msnry.layout();
        });
    });

    window.addEventListener("scroll", () => {
        if (isFetchingFeeds) return;

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            isFetchingFeeds = true;
            addFeedList().then(() => {
                rerender();
                isFetchingFeeds = false;
            });
        }
    });
});

window.addEventListener("focusin", (ev) => toggleSuggControls(ev));
window.addEventListener("mousedown", (ev) => toggleSuggControls(ev));

// window.addEventListener("mousedown", (ev) => {
//     const el = ev.target as HTMLElement;
//     const pt = findParentByClass(el, "search-controls");
//     if (pt) {
//         console.log(pt);
//         (pt as HTMLElement).focus();
//         suggToggle.value = true;
//         console.log(suggToggle.value, pt);
//     } else {
//         // suggToggle.value = false;
//     }
// });

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
 * 将一次推荐请求获取到的贴子加入 `posts`
 */
async function addFeedList() {
    const response = await fetch(tiebaAPI.feedlist());
    if (response.ok) {
        await response.json().then((value: FeedListResponse) => {
            posts.value.push(...parsePostsFromString(value.data.html));
        });
    }
}

/**
 * 重新渲染布局
 */
function rerender() {
    if (msnry.reloadItems) msnry.reloadItems();
    if (msnry.layout) msnry.layout();
}

/**
 * 加载搜索建议
 * @param query 搜索关键字
 */
async function loadSuggestions(query?: string) {
    const response = await fetch(tiebaAPI.suggestions(query));
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
                        href: tiebaAPI.forum(match.fname)
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
    viewerToggle.value = true;
}

function closeViewer() {
    viewerToggle.value = false;
}
</script>

<style scoped lang="scss">
@use "@/stylesheets/main/palette" as _;

$menu-margin: 24px;
$menu-button-size: 32px;

.icon {
    font-family: "Material Icons", monospace;
}

a {
    color: unset;
    text-decoration: none;
}

.index-wrapper {
    display: grid;
    margin: 0;
    gap: 12px;
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
                background-color: _.$lightBack;
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
                font-size: 16px;
            }

            .search-button:hover {
                background-color: _.$defaultBack;
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
                border-radius: 8px;
                margin-top: 4px;
                background-color: _.$defaultBack;
                box-shadow: 0 0 20px rgb(0 0 0 / 20%);

                .search-elem {
                    $img-size: 42px;
                    $gap: 8px;

                    display: flex;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding: $gap;
                    gap: $gap;

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
                        gap: 8px;

                        .sugg-title {
                            overflow: hidden;
                            max-height: 14px;
                            margin: 0;
                            font-size: 14px;
                            font-weight: bold;
                            line-height: 14px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .sugg-desc {
                            overflow: hidden;
                            max-height: 12px;
                            margin: 0;
                            color: _.$lightFore;
                            font-size: 12px;
                            line-height: 12px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }

                .search-elem:hover {
                    background-color: _.$lightBack;
                }
            }
        }
    }

    .curr-user {
        position: fixed;
        top: $menu-margin;
        left: $menu-margin;
        overflow: hidden;
        width: $menu-button-size;
        height: $menu-button-size;
        border: 3px solid _.$borderColor;
        border-radius: 36px;

        .user-profile {
            width: 100%;
        }
    }

    .menu-container {
        position: relative;
        display: flex;

        .main-menu {
            position: fixed;
            top: $menu-margin;
            right: $menu-margin;
            height: $menu-button-size;
            border: none;
            border-radius: 36px;
            background-color: unset;
            font-family: "Material Icons", monospace;
            font-size: 24px;
        }

        .main-menu:hover {
            background-color: _.$defaultBack;
        }

        .menu-content {
            position: fixed;
            display: flex;
            overflow: hidden;
            min-width: 120px;
            flex-direction: column;
            border: 1px solid _.$borderColor;
            border-radius: 8px;
            background-color: _.$defaultBack;

            .menu-item {
                display: flex;
                align-items: center;
                padding: 6px 10px;
                gap: 4px;
            }

            .menu-item:hover {
                background-color: _.$lightBack;
            }

            .menu-separator {
                height: 1px;
                background-color: _.$borderColor;
            }
        }
    }

    .posts-container {
        margin: auto;

        .post-elem {
            margin-bottom: 12px;
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
</style>
