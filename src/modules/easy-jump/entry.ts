/**
 * Easy Jump
 * 直接获取贴吧中超链接的直链，不再进行中转
 * @WiresawBlade
*/

import { DOMS, injectCSSRule } from "@/lib/domlib";

"use strict";

export const Main: UserModule = {
    id: "easy-jump",
    name: "直链跳转",
    author: "锯刃Blade",
    version: "1.0",
    brief: "链接跳转避免二次确认",
    description: `自动跳转至分享链接的原始地址，不再进行中转（不处理被严重警告的链接）`,
    scope: ["jump.bdimg.com/safecheck/", "jump2.bdimg.com/safecheck/"],
    runAt: "immediately",
    entry: main
};

function main(): void {
    injectCSSRule(".warning_wrap", {
        display: "none"
    });

    document.addEventListener("DOMContentLoaded", () => {
        const realUrl = DOMS(".btn-next", "a")[0].href;
        if (realUrl) location.href = realUrl;
    });
}
