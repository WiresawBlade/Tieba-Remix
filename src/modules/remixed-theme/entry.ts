/**
 * Tieba Remix 主题
 * @WiresawBlade
*/

import { DOMS, createNewElement, fadeInElems, fadeInLoad, injectCSSList, injectCSSRule } from "@/lib/domlib";
import { remixedObservers } from "@/lib/observers";
import { forEach } from "lodash-es";

import mainCSS from "./_tieba-main.css?inline";
import homeCSS from "./_tieba-home.css?inline";
import postsCSS from "./_tieba-post.css?inline";
import barCSS from "./_tieba-bar.css?inline";
import errorCSS from "./_tieba-error.css?inline";

import boldFontCSS from "./bold-font.css?inline";
import extremeCSS from "./extreme.css?inline";
import unsetFontCSS from "./unset-font.css?inline";

// import accessSVG from "/images/svgs/accessibility.svg?raw";
// import checkmarkSVG from "/images/svgs/checkmark.svg?raw";
// import arrowUpSVG from "/images/svgs/arrow-up-sharp.svg?raw";
// import arrowDnCircleSVG from "/images/svgs/arrow-down-circle.svg?raw";
// import messageSVG from "/images/svgs/chatbox-ellipses.svg?raw";
// import infoCircleSVG from "/images/svgs/information-circle.svg?raw";
// import infoLineSVG from "/images/svgs/information-sharp.svg?raw";
// import searchSVG from "/images/svgs/search.svg?raw";

"use strict";

export const Main: UserModule = {
    id: "remixed-theme",
    name: "Tieba Remix 主题",
    author: "锯刃Blade",
    version: "0.1.1",
    brief: "更现代的主题样式",
    description: `包含新的样式、昼夜主题及其自动切换等功能`,
    scope: true,
    runAt: "immediately",
    entry: main
};

const themeSheets: HTMLStyleElement[] = [];

function main(): void {
    // 全局加载
    themeSheets.push(injectCSSList(mainCSS));
    themeSheets.push(injectCSSList(postsCSS));
    themeSheets.push(injectCSSList(homeCSS));
    themeSheets.push(injectCSSList(errorCSS));

    // 用户配置
    themeSheets.push(injectCSSList(boldFontCSS));
    themeSheets.push(injectCSSList(extremeCSS));
    themeSheets.push(injectCSSList(unsetFontCSS));

    // 耗时加载元素
    fadeInElems.push(".tbui_aside_float_bar .svg-container");
    fadeInElems.push(".d_badge_bright .d_badge_lv, .user_level .badge_index");

    // 让耗时加载元素默认不透明度为0
    fadeInElems.forEach(selector => {
        injectCSSRule(selector, {
            opacity: "0"
        });
    });

    // 进吧页面
    if (location.href.indexOf("kw=") !== -1) {
        themeSheets.push(injectCSSList(barCSS));
    }

    document.addEventListener("DOMContentLoaded", () => {
        // 修改元素
        DOMS(".post-tail-wrap .icon-jubao").forEach(elem => {
            elem.removeAttribute("src");
            elem.after("举报");
        });

        // 远古用户没有等级则隐藏等级标签
        remixedObservers.postsObserver.addEvent(() => {
            DOMS(".d_badge_lv").forEach(elem => {
                if (elem.textContent === "") {
                    let parent = elem;
                    while (!parent.classList.contains("l_badge")) {
                        parent = parent.parentElement!;
                    }
                    parent.style.display = "none";
                }
            });
        });

        // 去除楼中楼用户发言的冒号
        remixedObservers.commentsObserver.addEvent(() => {
            forEach(DOMS(".lzl_cnt"), elem => {
                if (elem.childNodes.length < 4) return;

                const colon = elem.childNodes[1];
                if (colon.nodeName === "#text") colon.remove();
            });
        });
    });

    unsafeWindow.addEventListener("load", () => {
        // 为功能按钮注入 svg 容器
        DOMS(".tbui_aside_float_bar li a").forEach(elem => {
            elem.appendChild(createNewElement("div", {
                class: "material-icons svg-container"
            }));
        });

        // 功能按钮 svg 延迟
        fadeInLoad(".tbui_aside_float_bar .svg-container");

        // 为吧务和自己的等级染色
        remixedObservers.postsObserver.addEvent(() => {
            const lvlClassHead = "tieba-lvl-";
            const lvlGreen = lvlClassHead + "green";
            const lvlBlue = lvlClassHead + "blue";
            const lvlYellow = lvlClassHead + "yellow";
            const lvlOrange = lvlClassHead + "orange";

            DOMS(
                ".d_badge_bawu1 .d_badge_lv, .d_badge_bawu2 .d_badge_lv, .badge_index"
            ).forEach(elem => {
                if (elem.className.indexOf(lvlClassHead) !== -1) return;

                const lvl = parseInt(elem.textContent!);
                if (lvl >= 1 && lvl <= 3) {
                    elem.classList.add(lvlGreen);
                } else if (lvl >= 4 && lvl <= 9) {
                    elem.classList.add(lvlBlue);
                } else if (lvl >= 10 && lvl <= 15) {
                    elem.classList.add(lvlYellow);
                } else if (lvl >= 16) {
                    elem.classList.add(lvlOrange);
                }
            });

            // 等级图标延迟
            fadeInLoad(".d_badge_bright .d_badge_lv, .user_level .badge_index");
        });

        // 移动所有样式表到head底部，防止自定义样式表提前被加载导致冲突
        themeSheets.forEach(sheet => {
            document.head.appendChild(sheet);
        });
    });
}
