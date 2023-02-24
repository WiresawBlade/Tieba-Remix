/* eslint-disable indent */
// @ts-nocheck

export { githubResourcesMain, giteeResourcesMain };

// 开启或关闭某些功能
export const ENABLE_BOLD_FONT = parseInt(GM_getValue("ENABLE_BOLD_FONT", "1"));
export const EXTREME_PURIF = parseInt(GM_getValue("EXTREME_PURIF", "0"));
export const DEFAULT_FONT_TYPE = parseInt(GM_getValue("DEFAULT_FONT_TYPE", "1"));

function githubResourcesMain() {
    return "https://raw.githubusercontent.com/WiresawBlade/Tieba-Remix/main/";
}

function giteeResourcesMain() {
    return "https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/";
}

// 油猴相关初始化
registerMenu();

// 注册菜单
function registerMenu() {
    enum menuType {
        button = 0,
        switch
    }

    const greasyMenu = [
        ["CHECK_UPDATE", "获取更新...", menuType.button, () => {
            GM_openInTab("https://github.com/WiresawBlade/Tieba-Remix/releases/latest/", {
                active: true
            });
        }],
        ["ENABLE_BOLD_FONT", "部分元素字体加粗", menuType.switch, ENABLE_BOLD_FONT],
        ["EXTREME_PURIF", "极端净化", menuType.switch, EXTREME_PURIF],
        ["DEFAULT_FONT_TYPE", "使用浏览器默认字体", menuType.switch, DEFAULT_FONT_TYPE]
    ];

    greasyMenu.forEach(menu => {
        switch (menu[2]) {
            case menuType.button:
                GM_registerMenuCommand(
                    menu[1],
                    (event: MouseEvent) => {
                        if (event.button === 0) {
                            menu[3]();
                        }
                    }
                );
                break;
            case menuType.switch:
                GM_registerMenuCommand(
                    menu[1] + "：" + switchModeString(menu[3]),
                    (event: MouseEvent) => {
                        if (event.button === 0) {
                            GM_setValue(menu[0], menu[3] === 1 ? 0 : 1);
                            location.reload();
                        }
                    }
                );
                break;

            default:
                break;
        }
    });

    function switchModeString(flag: number): string {
        if (flag === 0) {
            return "关";
        } else {
            return "开";
        }
    }
}
