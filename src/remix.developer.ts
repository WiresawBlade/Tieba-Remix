(() => {
    "use strict";
    ///////////////////////////////////////////////////////////////////////////

    // 脚本相关设置，如果没有则创建默认值到 localStorage
    if (localStorage.getItem("enable_bold_font") == null) {
        localStorage.setItem("enable_bold_font", "1");
        localStorage.setItem("extreme_purif", "0");
        localStorage.setItem("default_font_type", "1");
    }

    // 自定义 FLAG，可自行决定开启或关闭某些功能
    const ENABLE_BOLD_FONT  = localStorage["enable_bold_font"]  == 0 ? 0 : 1;  /* 对部分文字进行加粗，不同字体显示质量不同 */
    const EXTREME_PURIF     = localStorage["extreme_purif"]     == 0 ? 0 : 1;  /* 更极端地纯净化网页，只保留基础功能 */
    const DEFAULT_FONT_TYPE = localStorage["default_font_type"] == 0 ? 0 : 1;  /* 让网页的一些字体替换为浏览器默认字体 */

    // 开发用常量
    const DBG_MODE         = 1;  /* 调试模式 */
    const EXPLICIT_LOG     = 0;  /* 是否以对话框的形式打印日志 */

    // 全局变量
    let darkmode  = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let tiebaHost = "tieba.baidu.com";

    ///////////////////////////////////////////////////////////////////////////

    // CSS START
    // CSS END

    ///////////////////////////////////////////////////////////////////////////
    // 监听颜色主题切换
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        if (event.matches) {
            darkmode = true;
        } else {
            darkmode = false;
        }
    })
    ///////////////////////////////////////////////////////////////////////////
    function _devlog(msg: string): void {
        if (!DBG_MODE) return;

        if (EXPLICIT_LOG) {
            alert(msg);
        } else {
            console.log(msg);
        }
    }

    function switchModeString(flag: number): string {
        if (flag == 0) {
            return "关";
        } else {
            return "开";
        }
    }

    function registerMenu() {
        // @ts-ignore
        GM_registerMenuCommand("部分元素字体加粗：" + switchModeString(ENABLE_BOLD_FONT),
        (event: MouseEvent) => {
            if (event.button == 0) {
                localStorage["enable_bold_font"] = ENABLE_BOLD_FONT == 1 ? 0 : 1;
                location.reload();
            }
        })

        // @ts-ignore
        GM_registerMenuCommand("极端净化：" + switchModeString(EXTREME_PURIF),
        (event: MouseEvent) => {
            if (event.button == 0) {
                localStorage["extreme_purif"] = EXTREME_PURIF == 1 ? 0 : 1;
                location.reload();
            }
        })

        // @ts-ignore
        GM_registerMenuCommand("使用浏览器默认字体：" + switchModeString(DEFAULT_FONT_TYPE),
        (event: MouseEvent) => {
            if (event.button == 0) {
                localStorage["default_font_type"] = DEFAULT_FONT_TYPE == 1 ? 0 : 1;
                location.reload();
            }
        })
    }

    function addStyleSheets(): void {
        // @ts-ignore
        GM_addStyle(_global);
        // @ts-ignore
        GM_addStyle(tieba_home);
        // @ts-ignore
        GM_addStyle(tieba_post);
        // @ts-ignore
        GM_addStyle(tieba_tags);

        // @ts-ignore
        if (ENABLE_BOLD_FONT) GM_addStyle(_bold_font);
        // @ts-ignore
        if (EXTREME_PURIF) GM_addStyle(_extreme);
        // @ts-ignore
        if (DEFAULT_FONT_TYPE) GM_addStyle(_unset_font);
    }
    ///////////////////////////////////////////////////////////////////////////

    // 申请菜单
    registerMenu();

    // 注入样式表
    addStyleSheets();

    // 元素操作，等待网页加载完毕
    window.addEventListener("load", () => {
        // 注入元素
        let floatButtons = document.querySelectorAll(".tbui_aside_float_bar li a");
        floatButtons.forEach(elem => {
            // @ts-ignore
            GM_addElement(elem, "div", {
                class: "svg-container",
            });
        })

        // 修改元素
        let postBubbles = document.querySelectorAll(".post_bubble_middle");
        postBubbles.forEach(elem => {
            elem.removeAttribute("style");
        });

        let postReportTags = document.querySelectorAll(".post-tail-wrap .icon-jubao");
        postReportTags.forEach(elem => {
            elem.removeAttribute("src");
            elem.after("举报");
        });
    });
})();
