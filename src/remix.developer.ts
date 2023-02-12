/// <reference path="./greasy-init.ts" />
/// <reference path="./remixed-observers.ts" />

(() => {
    "use strict";

    ///////////////////////////////////////////////////////////////////////////

    let darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 监听颜色主题切换
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        if (event.matches) {
            darkmode = true;
        } else {
            darkmode = false;
        }
    })

    ///////////////////////////////////////////////////////////////////////////

    // favicon
    let favElem = document.createElement("link");
    favElem.type = "image/icon";
    favElem.rel = "shortcut icon";
    favElem.href = giteeResourcesMain() + "images/main/favicon.ico";

    ///////////////////////////////////////////////////////////////////////////

    // 元素操作，等待 DOM 加载完毕
    document.addEventListener("DOMContentLoaded", () => {
        // 添加标签
        document.head.appendChild(favElem);

        // 开启监控
        if (location.href.indexOf("tieba.baidu.com/p/") != -1) {
            __remixedObservers.postsObserver.observe();
            __remixedObservers.commentsObserver.observe();
        }

        // 修改元素
        // 删除特殊气泡的背景图
        // let observer = new MutationObserver(() => {
        //     _removePostBubbles();
        // });
        // observer.observe(document.getElementById("j_p_postlist")!, {
        //     childList: true
        // });

        // function _removePostBubbles() {
        //     let postBubbles = document.querySelectorAll(".post_bubble_middle");
        //     postBubbles.forEach(elem => {
        //         elem.removeAttribute("style");
        //     });
        // }
        // _removePostBubbles();

        // 删除举报链接的图片
        let postReportTags = document.querySelectorAll(".post-tail-wrap .icon-jubao");
        postReportTags.forEach(elem => {
            elem.removeAttribute("src");
            elem.after("举报");
        });
    });

    // 等待网页完全加载完毕
    window.addEventListener("load", () => {
        // 注入元素
        // 为功能按钮注入 svg 容器
        let floatButtons = document.querySelectorAll(".tbui_aside_float_bar li a");
        floatButtons.forEach(elem => {
            // @ts-ignore
            GM_addElement(elem, "div", {
                class: "svg-container",
            });
        })
    });
})();
