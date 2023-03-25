import { userSwitches } from "@/greasy-init";
import { afterHead } from "./domlib";

/**
 * 解析用户模块，并根据默认情况按需执行模块
 * @param glob 
 * @param callbackfn 
 * @returns 
 */
export function parseUserModules(
    glob: Record<string, () => Promise<unknown>>, callbackfn?: ((info: userModulesInfo, module: UserModule) => void)
): UserModule[] {
    const modules: UserModule[] = [];
    const moduleList = glob;

    const info: userModulesInfo = {
        length: Object.keys(moduleList).length,
        current: {
            runnable: false,
            url: ""
        }
    };

    for (const key in moduleList) {
        moduleList[key]().then(
            (value: any) => {
                const m = <UserModule>value.Main;
                info.current.url = key;
                // 先判断模块是否开启
                const runnable = (() => {
                    if (m.switch === true || m.switch === undefined) {
                        // 用户配置优先级最高，可以直接否决
                        if (userSwitches.length > 0) {
                            let index = -1;
                            for (let j = 0; j < userSwitches.length; j++) {
                                if (userSwitches[j].id === m.id) {
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
                        if (m.scope === true) {
                            return true;
                        }

                        // 字符串
                        if (typeof m.scope === "string") {
                            if (location.href.indexOf(m.scope) !== -1) {
                                return true;
                            }
                        }

                        // 数组
                        if (Array.isArray(m.scope)) {
                            for (const i in m.scope) {
                                const str = m.scope[i];
                                if (location.href.indexOf(str) !== -1) {
                                    return true;
                                }
                            }
                        }
                    }

                    return false;
                })();

                info.current.runnable = runnable;

                // 根据模块 runAt 选择运行模式
                const runModule = {
                    "immediately": () => { m.entry(); },

                    "afterHead": () => {
                        afterHead(() => {
                            m.entry();
                        });
                    },

                    "DOMLoaded": () => {
                        document.addEventListener("DOMContentLoaded", () => {
                            m.entry();
                        });
                    },

                    "loaded": () => {
                        unsafeWindow.addEventListener("load", () => {
                            m.entry();
                        });
                    }
                };

                m.runnable = runnable;
                if (runnable) {
                    runModule[m.runAt]();
                }

                modules.push(m);

                // 处理回调函数
                if (callbackfn) callbackfn(info, m);
            }
        );
    }

    return modules;
}
