import { disabledModules } from "./user-config";
import { afterHead } from "./domlib";
import { indexOf } from "lodash-es";

/**
 * 解析用户模块，并根据默认情况按需执行模块
 * @param glob 
 * @param callbackfn 
 * @returns 
 */
export function parseUserModules(
    glob: Record<string, () => Promise<unknown>>,
    callbackfn?: ((info: UserModulesInfo, module: UserModule) => void)
): UserModule[] {
    const modules: UserModule[] = [];
    const moduleList = glob;

    const info: UserModulesInfo = {
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
                        if (indexOf(disabledModules, m.id) !== -1) {
                            return false;
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
                            for (const scope in m.scope) {
                                const str = scope;
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
                        window.addEventListener("load", () => {
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
