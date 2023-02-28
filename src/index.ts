import "./modules/remixed-theme";
import { remixedObservers } from "./lib/observers";
import favicon from "../images/main/favicon32.ico";
import { afterHead } from "./lib/dom-control";

"use strict";

const REMIXED =
    "\n" +
    "██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n" +
    "██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n" +
    "██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n" +
    "██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n" +
    "██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n" +
    "╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";

try {
    // 加载功能模块
    const remixedModules = import.meta.glob("./modules/**/*.ts");
    for (const key in remixedModules) {
        remixedModules[key]().then(
            (value: any) => {
                const module = <ModuleType>value.Main;

                // 先判断模块是否开启
                const runnable = (() => {
                    if (module.switch === true || module.switch === undefined) {
                        // 判断当前模块是否在作用域内
                        // 始终运行
                        if (module.scope === true) {
                            return true;
                        }

                        // 字符串
                        if (typeof module.scope === "string") {
                            if (location.href.indexOf(module.scope) !== -1) {
                                return true;
                            }
                        }

                        // 数组
                        if (Array.isArray(module.scope)) {
                            for (const str in module.scope) {
                                if (location.href.indexOf(str) !== -1) {
                                    return true;
                                }
                            }
                        }
                    }

                    return false;
                })();

                // 根据模块 runAt 选择运行模式
                const runModule = {
                    "immediately": () => { module.entry(); },

                    "afterHead": () => {
                        afterHead(() => {
                            module.entry();
                        });
                    },

                    "DOMLoaded": () => {
                        document.addEventListener("DOMContentLoaded", () => {
                            module.entry();
                        });
                    },

                    "loaded": () => {
                        window.addEventListener("load", () => {
                            module.entry();
                        });
                    }
                };

                if (runnable) {
                    runModule[module.runAt]();
                }
            }
        );
    }

    // favicon
    const favElem = document.createElement("link");
    favElem.type = "image/icon";
    favElem.rel = "shortcut icon";
    favElem.href = favicon;

    const secElem = document.createElement("meta");
    secElem.httpEquiv = "Content-Security-Policy";
    secElem.content = "upgrade-insecure-requests";

    // 元素操作，等待 DOM 加载完毕
    document.addEventListener("DOMContentLoaded", () => {
        // 添加标签
        document.head.appendChild(favElem);
        document.head.appendChild(secElem);

        // 开启监控
        if (location.href.indexOf("tieba.baidu.com/p/") !== -1) {
            remixedObservers.postsObserver._observe();
            remixedObservers.commentsObserver._observe();
        }

        if (location.href === "https://tieba.baidu.com/") {
            remixedObservers.newPostsObserver._observe();
        }
    });

    // window.addEventListener("load", () => {
    //     setTimeout(() => {
    //         $("script").toArray().forEach(function (elem) {
    //             if (elem.textContent?.indexOf("var PageData") !== -1) {
    //                 eval(elem.textContent!);
    //                 alert(PageData.user.id);
    //             }
    //         });
    //     }, 10000);
    // });

    // 全部任务激活完毕，打印信息
    console.info(REMIXED);
} catch (error) {
    console.error(error);
}
