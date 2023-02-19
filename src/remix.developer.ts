/// <reference path="./greasy-init.ts" />
/// <reference path="./lib/observers.ts" />

(() => {
    "use strict";

    const REMIXED =
        "\n" +
        "██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n" +
        "██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n" +
        "██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n" +
        "██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n" +
        "██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n" +
        "╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";

    ///////////////////////////////////////////////////////////////////////////

    let darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 监听颜色主题切换
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        if (event.matches) {
            darkmode = true;
        } else {
            darkmode = false;
        }
    });

    ///////////////////////////////////////////////////////////////////////////

    try {
        // 加载功能模块
        tiebaTags();
        biliBridge();

        // favicon
        const favElem = document.createElement("link");
        favElem.type = "image/icon";
        favElem.rel = "shortcut icon";
        favElem.href = giteeResourcesMain() + "images/main/favicon.ico";

        // 元素操作，等待 DOM 加载完毕
        document.addEventListener("DOMContentLoaded", () => {
            // 添加标签
            document.head.appendChild(favElem);

            // 开启监控
            if (location.href.indexOf("tieba.baidu.com/p/") !== -1) {
                __remixedObservers.postsObserver._observe();
                __remixedObservers.commentsObserver._observe();
            }

            // 修改元素
            $(".post-tail-wrap .icon-jubao").toArray().forEach(elem => {
                elem.removeAttribute("src");
                elem.after("举报");
            });

            // 为吧务和自己的等级染色
            __remixedObservers.postsObserver.addEvent(() => {
                const lvlClassHead = "tieba-lvl-";
                const lvlGreen = lvlClassHead + "green";
                const lvlBlue = lvlClassHead + "blue";
                const lvlYellow = lvlClassHead + "yellow";
                const lvlOrange = lvlClassHead + "orange";

                $(
                    ".d_badge_bawu1 .d_badge_lv, .d_badge_bawu2 .d_badge_lv, .badge_index"
                ).toArray().forEach(elem => {
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
            });

            // 远古用户没有等级则隐藏等级标签
            __remixedObservers.postsObserver.addEvent(() => {
                $(".d_badge_lv").toArray().forEach(elem => {
                    if (elem.textContent === "") {
                        let parent = elem;
                        while (!parent.classList.contains("l_badge")) {
                            parent = parent.parentElement!;
                        }
                        parent.style.display = "none";
                    }
                });
            });
        });

        // 等待网页完全加载完毕
        window.addEventListener("load", () => {
            // 注入元素
            // 为功能按钮注入 svg 容器
            $(".tbui_aside_float_bar li a").toArray().forEach(elem => {
                // @ts-ignore
                GM_addElement(elem, "div", {
                    class: "svg-container"
                });
            });

            // body 动画处理
            $("body").addClass("fade-in-elem");
            $("body").one("animationend", () => {
                $("body").get(0)!.style.opacity = "1";
                $("body").removeClass("fade-in-elem");
            });
        });

        // 全部任务激活完毕，打印信息
        console.info(REMIXED);
    } catch (error) {
        console.error(error);
    }
})();
