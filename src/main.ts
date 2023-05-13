import favicon from "/images/main/favicon32.ico";
import palette from "@/stylesheets/main/_palette.scss?inline";
import materialIcons from "@/stylesheets/main/material-icons.css?inline";
import remixedMain from "@/stylesheets/main/_remixed-main.scss?inline";

import { forEach, includes } from "lodash-es";

import { remixedObservers } from "./lib/observers";
import { greasyInit } from "./greasy-init";
import { parseUserModules } from "./lib/unsafe";
import { DOMS, afterHead, createNewElement, injectCSSList, injectCSSRule } from "./lib/domlib";
import { removeDefault, renderDialog, renderPage, toast } from "./lib/render";
import { errorMessage } from "./lib/utils";

import indexVue from "./components/pages/index.vue";
import moduleControlVue from "./components/module-control.vue";

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

(() => {
    if (location.hostname.toLowerCase() !== "tieba.baidu.com") return;
    if (!includes(["/", "/index.html"], location.pathname.toLowerCase())) return;

    const bodyMask = injectCSSList(`
        body {
            display: none;
        }
    `);

    const userbarMask = injectCSSList(`
        #com_userbar {
            display: none;
        }
    `);

    document.addEventListener("DOMContentLoaded", () => {
        removeDefault();
        renderPage(indexVue);
        bodyMask.remove();
    });

    window.addEventListener("load", () => removeDefault());
    window.onload = () => {
        removeDefault();
        userbarMask.remove();
    };
})();

try {
    // 加载基本样式表
    afterHead(() => {
        injectCSSList(palette);
        injectCSSList(materialIcons);
        injectCSSList(remixedMain);
    });

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
        try {
            const floatBar = DOMS(".tbui_aside_float_bar")[0];

            if (floatBar) {
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
                DOMS(".tbui_aside_float_bar .module-settings")[0].addEventListener("click", () => {
                    renderDialog(moduleControlVue, {
                        modules: MainModules
                    });
                });
            }
        } catch (error) {
            toast({
                message: errorMessage(error as Error),
                type: "error"
            });
        }
    });

    // 全部任务激活完毕，打印信息
    console.info(REMIXED);
} catch (error) {
    toast({
        message: errorMessage(error as Error),
        type: "error"
    });
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
