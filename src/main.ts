import "./modules/remixed-theme/entry";
import { remixedObservers } from "./lib/observers";
import favicon from "/images/main/favicon32.ico";
import { afterHead } from "./lib/dom-control";
import { greasyInit, userSwitches } from "./greasy-init";

export { MainModules, afterModulesLoaded };

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

try {
    const remixedModules = import.meta.glob("./modules/**/entry.ts");
    // 加载功能模块
    (() => {
        const cnt = Object.keys(remixedModules).length;
        let i = 0;
        for (const key in remixedModules) {
            remixedModules[key]().then(
                (value: any) => {
                    const module = <UserModule>value.Main;
                    // 先判断模块是否开启
                    const runnable = (() => {
                        if (module.switch === true || module.switch === undefined) {
                            // 用户配置优先级最高，可以直接否决
                            if (userSwitches.length > 0) {
                                let index = -1;
                                for (let j = 0; j < userSwitches.length; j++) {
                                    if (userSwitches[j].id === module.id) {
                                        index = j;
                                    }
                                }
                                if (index !== -1) {
                                    if (!userSwitches[index].switch) {
                                        return false;
                                    }
                                }
                            }

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
                                for (const i in module.scope) {
                                    const str = module.scope[i];
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
                            unsafeWindow.addEventListener("load", () => {
                                module.entry();
                            });
                        }
                    };

                    module.runnable = runnable;
                    if (runnable) {
                        runModule[module.runAt]();
                    }

                    MainModules.push(module);
                    i++;
                    if (i === cnt) {
                        moduleLoadedFlag = true;
                        for (const fn of beforeModulesLoadedFns) {
                            fn();
                        }
                    }
                }
            );
        }
    })();

    greasyInit();

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
    });

    // unsafeWindow.addEventListener("load", () => {
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
