<template>
    <div id="nav-bar" class="nav-bar">
        <div class="left-container">
            <UserButton class="nav-button nav-title-container" is-anchor href="/" no-border>
                <img :src="getResource('/assets/images/main/icon64.png')" alt="" class="nav-icon">
                <p class="nav-title">贴吧</p>
            </UserButton>
        </div>

        <div class="right-container">
            <div class="middle-container">
                <UserButton v-for="(menu, key) in middleMenu" class="menu-container middle-menu-container" no-border>
                    {{ key }}
                    <DropdownMenu :menu-items="menu"></DropdownMenu>
                </UserButton>
            </div>
            <UserButton class="nav-button menu-container avatar-button" shadow-border>
                <img ref="navAvatar" class="nav-avatar">
                <DropdownMenu :menu-items="userMenu!"></DropdownMenu>
            </UserButton>

            <UserButton class="nav-button menu-container nav-menu icon" shadow-border no-border>
                menu
                <DropdownMenu :menu-items="extendMenu!" style="font-family: initial;"></DropdownMenu>
            </UserButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { checkUpdateAndNotify, getResource } from "@/lib/api/remixed";
import { tiebaAPI } from "@/lib/api/tieba";
import { DOMS } from "@/lib/elemental";
import { renderDialog } from "@/lib/render";
import { messageBox } from "@/lib/render/message-box";
import { toast } from "@/lib/render/toast";
import { GiteeRepo, GithubRepo } from "@/lib/user-values";
import { waitUtil } from "@/lib/utils";
import { onMounted, ref } from "vue";
import Settings from "./settings.vue";
import DropdownMenu from "./utils/dropdown-menu.vue";
import UserButton from "./utils/user-button.vue";

const navAvatar = ref<HTMLImageElement>();
const userPortrait = ref<string>("");

const middleMenu = ref<{ [props: string]: DropdownMenu[] } | undefined>({});
const userMenu = ref<DropdownMenu[]>([]);
const extendMenu = ref<DropdownMenu[]>([]);

init();
onMounted(async function () {
    {
        waitUtil(() => userPortrait.value !== "").then(function () {
            if (navAvatar.value !== undefined)
                navAvatar.value.src = tiebaAPI.URL_profile(userPortrait.value);
        });
    }
});

async function init() {
    await waitUtil(() => PageData !== undefined).then(() => {
        userPortrait.value = PageData.user.portrait;
        loadNavMenuContent();
    });
}

async function login() {
    const loginButton = DOMS(".u_login");
    const directLoginButton = DOMS("#TANGRAM__PSP_24__submit");

    if (directLoginButton.length > 0) {
        const confirmDirect = await messageBox({
            title: "快速登录",
            message: "检测到快速登录入口，是否尝试直接登录？",
            type: "OkCancel",
        });

        if (confirmDirect === "positive") {
            directLoginButton[0].click();
        } else {
            regularLogin();
        }
    } else {
        regularLogin();
    }

    function regularLogin() {
        loginButton.length > 0
            ? DOMS("a", loginButton[0])[0].click()
            : cannotLogin();
    }

    function cannotLogin() {
        toast({ message: "未检测到可用的登录入口，请刷新重试", type: "warning" });
    }
}

function loadNavMenuContent() {
    middleMenu.value = {
        "消息": [
            {
                title: "查看私信",
                href: "/im/pcmsg",
            },
            {
                title: "查看回复",
                href: `/i/sys/jump?u=${userPortrait.value}&type=replyme`,
            },
            {
                title: "查看 @",
                href: `/i/sys/jump?u=${userPortrait.value}&type=atme`,
            },
            "separator",
            {
                title: "查看好友申请",
                href: `/i/sys/jump?u=${userPortrait.value}&type=friendapply`,
            },
            {
                title: "查看新粉丝",
                href: `/i/sys/jump?u=${userPortrait.value}&type=fans`,
            },
            "separator",
            {
                title: "我的收藏",
                href: `/i/sys/jump?u=${userPortrait.value}&type=storethread`,
            },
            {
                title: "我的通知",
                href: "/sysmsg/index?type=notity",
            },
        ],

        "更多": [
            {
                title: "账号设置",
                href: "//passport.baidu.com/?center&tpl=tb&aid=6&default_tab=3#3,0",
            },
            {
                title: "贴吧设置",
                href: `/home/profile?un=${PageData.user.name_url}`,
            },
            "separator",
            {
                title: "服务中心",
                href: "//tieba.baidu.com/pmc",
            },
            {
                title: "问题反馈",
                href: "//tieba.baidu.com/hermes/feedback",
            },
        ],
    };
    userMenu.value = [
        {
            title: "我的贴吧",
            href: `/home/main?id=${userPortrait.value}&fr=userbar`,
        },
        {
            title: "我的收藏",
            href: `/i/sys/jump?un=${PageData.user.user_name}${PageData.user.name_url}&type=storethread&st_mod=userbar&fr=tb0_pb`,
        },
    ];

    PageData.user.is_login
        ? userMenu.value.push("separator", {
            title: "退出登录",
            click() {
                DOMS("a", "a", DOMS(".u_logout")[0])[0].click();
            },
        })
        : userMenu.value.push("separator", {
            title: "登录",
            click() {
                login();
            },
        });

    extendMenu.value = [
        {
            title: "脚本设置",
            click() {
                renderDialog(Settings);
            },
        },
        {
            title: "检查更新",
            click() {
                checkUpdateAndNotify(true);
            },
        },
        "separator",
        {
            title: "源代码仓库",
            innerText: "GitHub",
            href: GithubRepo,
        },
        {
            title: "源代码仓库",
            innerText: "Gitee",
            href: GiteeRepo,
        },
        {
            title: "切换至 GreasyFork",
            href: "https://greasyfork.org/zh-CN/scripts/460113",
        },
    ];
}
</script>

<style lang="scss" scoped>
@use "@/stylesheets/main/animations" as *;
@use "@/stylesheets/main/remixed-main" as *;

$nav-height: 48px;

#nav-bar {
    position: fixed;
    z-index: 1200;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: $nav-height;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-around;
    padding: 4px;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--trans-page-background);

    @include blur-effect;
    @include main-box-shadow(0, 10px);

    .nav-button:not(:hover, :active, :focus) {
        background-color: rgba($color: #000, $alpha: 0%);
    }

    .left-container {
        .nav-title-container {
            display: flex;
            align-items: center;
            border: none;
            background: none;
            gap: 8px;
            text-decoration: underline 3px var(--tieba-theme-color);

            .nav-icon {
                width: 36px;
            }

            .nav-title {
                color: var(--default-fore);
                font-size: 20px;
                font-style: italic;
                font-weight: bold;
                transition: 0.2s;
            }

            &:hover .nav-title,
            &:active .nav-title,
            &:focus .nav-title {
                color: var(--highlight-fore);
            }
        }
    }

    .middle-container {
        display: flex;
        height: 100%;
        justify-content: center;

        .middle-menu-container {
            height: 100%;
            padding: 0 10px;
            border: none;
            background: none;
            color: var(--default-fore);
            font-size: 15px;
            font-weight: bold;
            text-decoration: underline 2px rgba($color: #000, $alpha: 0%);

            &:hover {
                text-decoration: underline 2px var(--tieba-theme-color);
            }
        }
    }

    .right-container {
        display: flex;
        align-items: center;
        gap: 8px;

        .avatar-button {
            width: 32px;
            height: 32px;
            padding: 0;
            border: 4px;
            border-radius: 32px;

            .nav-avatar {
                width: 100%;
                border-radius: 24px;
            }
        }

        .nav-menu {
            padding: 2px 8px;
            border: none;
            border-radius: 24px;
            color: var(--highlight-fore);
            font-size: 26px;

            &:not(:active, :focus) {
                box-shadow: none;
            }
        }
    }
}

.menu-container:hover > .dropdown-menu,
.menu-container:active > .dropdown-menu {
    display: block;

    @include fade-in(0.2s);
}

.dropdown-menu {
    z-index: 1201;
    display: none;
    cursor: default;
    font-weight: normal;

    @include fade-out(0.2s);
}
</style>
