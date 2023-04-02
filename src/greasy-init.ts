export { greasyInit };

try {
    // 开启或关闭某些功能
    GM_deleteValue("ENABLE_BOLD_FONT");
    GM_deleteValue("EXTREME_PURIF");
    GM_deleteValue("DEFAULT_FONT_TYPE");
    GM_deleteValue("userSwitches");
} catch (error) {
    console.warn(error);
}

interface MenuObject {
    id: string;
    title: string;
    type: "button" | "switch";
    state?: boolean;
    event?: () => void;
}

// 插件菜单
export const greasyMenu: MenuObject[] = [
    {
        id: "checkUpdate",
        title: "获取更新...",
        type: "button",
        event: () => {
            GM_openInTab("https://github.com/WiresawBlade/Tieba-Remix/releases/", {
                active: true
            });
        }
    },
    {
        id: "setShieldList",
        title: "设置屏蔽列表",
        type: "button",
        event: () => {
            const shieldList = GM_getValue("shieldList", <ShieldObject[]>[]);
            const listStr = (() => {
                let str = "";
                if (shieldList.length > 0) {
                    for (const sh of shieldList) {
                        str += sh.rule + "\n";
                    }
                    return str;
                } else {
                    return "\n";
                }
            })();
            const userInput = prompt(`
            设置屏蔽列表（临时方案）
            当前共有 ${shieldList.length} 条屏蔽规则被装载
            ${listStr}
            输入需要匹配的屏蔽词，它们目前会在首页动态和贴子楼层生效
            输入“REMOVE_ALL”清除当前所有屏蔽词
            `.split("    ").join(""));

            if (userInput !== null && userInput !== "") {
                if (userInput === "REMOVE_ALL") {
                    GM_deleteValue("shieldList");
                    location.reload();
                    return;
                }

                for (const sh of shieldList) {
                    if (sh.rule === userInput) {
                        location.reload();
                        return;
                    }
                }
                shieldList.push({
                    rule: userInput,
                    type: "string",
                    scope: "posts",
                    switch: true
                });
                GM_setValue("shieldList", shieldList);
                location.reload();
            }
        }
    }
];

// 注册菜单
function registerMenu() {
    greasyMenu.forEach(menu => {
        const menuState = menu.state;
        const menuEvent = menu.event;

        switch (menu.type) {
            case "button":
                if (menuEvent === undefined) break;
                GM_registerMenuCommand(
                    menu.title,
                    (event) => {
                        event = <MouseEvent>event;
                        if (event.button === 0) {
                            menuEvent();
                        }
                    }
                );
                break;

            case "switch":
                if (menuState === undefined) break;
                GM_registerMenuCommand(
                    menu.title + "：" + switchModeString(menuState),
                    (event) => {
                        event = <MouseEvent>event;
                        if (event.button === 0) {
                            if (menuEvent !== undefined) {
                                menuEvent();
                            }
                        }
                    }
                );
                break;

            default:
                break;
        }
    });

    function switchModeString(flag: boolean): string {
        return flag ? "开" : "关";
    }
}

function greasyInit() {
    // 油猴相关初始化
    registerMenu();
}
