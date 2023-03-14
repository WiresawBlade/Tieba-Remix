/**
 * Easy Jump
 * 直接获取贴吧中超链接的直链，不再进行中转
 * @WiresawBlade
*/

import { defaultStyle } from "@lib/dom-control";

"use strict";

export const Main: UserModule = {
    id: "easy-jump",
    name: "直链跳转",
    author: "锯刃Blade",
    version: "1.0",
    description: `自动跳转至分享链接的原始地址，不再进行中转（不处理被严重警告的链接）`,
    scope: ["jump.bdimg.com/safecheck/", "jump2.bdimg.com/safecheck/"],
    runAt: "immediately",
    entry: main
};

function main(): void {
    defaultStyle.sheet?.insertRule(`
        .warning_wrap {
            display: none;
        }
    `);

    unsafeWindow.addEventListener("load", () => {
        const realUrl = $(".link").get(0)?.textContent;
        if (realUrl) location.href = realUrl;
    });
}
