import favicon from "/images/main/favicon32.ico";
import { remixedObservers } from "./lib/observers";
import { greasyInit } from "./greasy-init";
import { parseUserModules } from "./lib/unsafe";

import { createApp } from "vue";
import moduleControlVue from "./components/module-control.vue";
import { DOMS, afterHead, createNewElement, injectCSSList, injectCSSRule } from "./lib/domlib";

import palette from "@/stylesheets/main/_palette.scss?inline";
import materialIcons from "@/stylesheets/main/material-icons.css?inline";
import indexVue from "./components/pages/index.vue";
import { pageRender } from "./lib/components";

export { afterModulesLoaded, MainModules };

"use strict";

const REMIXED =
    "\n" +
    "██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n" +
    "██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n" +
    "██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n" +
    "██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n" +
    "██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n" +
    "╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";

const MainModules: UserModule[] = [];
let moduleLoadedFlag = false;
const beforeModulesLoadedFns: (() => void)[] = [];

unsafeWindow.addEventListener("load", () => {
    if (PageData.page !== "index") return;
    pageRender(indexVue);
});

try {
    // 加载基本样式表
    afterHead(() => {
        injectCSSList(palette);
        injectCSSList(materialIcons);
    });

    // 调试模块
    // parseUserModules(import.meta.glob("./debug/deb.um.ts"));

    // 加载功能模块
    (() => {
        let i = 0;
        parseUserModules(
            import.meta.glob("./modules/**/entry.ts"),
            (info, module) => {
                MainModules.push(module);
                i++;
                if (i === info.length) {
                    moduleLoadedFlag = true;
                    for (const fn of beforeModulesLoadedFns) {
                        fn();
                    }
                }
            }
        );
    })();

    greasyInit();

    afterHead(() => {
        document.head.appendChild(createNewElement("link", {
            type: "image/icon",
            rel: "shortcut icon",
            href: favicon
        }));

        document.head.appendChild(createNewElement("meta", {
            httpEquiv: "Content-Security-Policy",
            content: "upgrade-insecure-requests"
        }));

        document.head.appendChild(createNewElement("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
        }));
    });

    // 元素操作，等待 DOM 加载完毕
    document.addEventListener("DOMContentLoaded", () => {
        // 开启监控
        if (location.href.indexOf("/p/") !== -1) {
            remixedObservers.postsObserver._observe();
            remixedObservers.commentsObserver._observe();
        }

        if (location.href === "https://tieba.baidu.com/") {
            remixedObservers.newListObserver._observe();
        }

        if (location.href.indexOf("/f?kw=") !== -1) {
            remixedObservers.threadListObserver._observe();
        }

        // 临时设置按钮
        const floatBar = DOMS(".tbui_aside_float_bar")[0];

        floatBar.insertBefore(createNewElement("li", {
            class: "tbui_aside_fbar_button module-settings"
        }, [createNewElement("a", {
            href: "javascript:;"
        })]), floatBar.firstChild);

        injectCSSRule(".tbui_aside_float_bar .module-settings", {
            backgroundColor: "rgb(53, 73, 94)"
        });

        injectCSSRule(".module-settings .svg-container::after", {
            content: `"settings"`,
            color: "rgb(240, 240, 240)"
        });

        document.body.insertBefore(createNewElement("div", {
            class: "vue-module-control",
            style: "display: none;"
        }), document.body.firstChild);

        // 临时绑定 Vue 组件
        // TODO: 好呃呃的写法，快点把入口写好然后改掉吧
        const ModuleControl = createApp(moduleControlVue, {
            modules: MainModules
        });
        ModuleControl.mount(".vue-module-control");

        DOMS(".tbui_aside_float_bar .module-settings")[0].addEventListener("click", () => {
            DOMS(".vue-module-control")[0].style.display = "block";
        });

        const moduleControlShadow = DOMS(".vue-module-control .dialog-shadow")[0];
        moduleControlShadow.addEventListener("click", (event) => {
            if (event.target !== moduleControlShadow) return;
            DOMS(".vue-module-control")[0].style.display = "none";
        });
    });

    // 全部任务激活完毕，打印信息
    console.info(REMIXED);
} catch (error) {
    console.error(error);
}

/**
 * 所有模块加载完毕后执行
 * @param callbackfn 回调函数
*/
function afterModulesLoaded(callbackfn: () => void) {
    if (moduleLoadedFlag) {
        callbackfn();
    } else {
        beforeModulesLoadedFns.push(callbackfn);
    }
}
