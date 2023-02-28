/**
 * Easy Jump
 * 直接获取贴吧中超链接的直链，不再进行中转
 * @WiresawBlade
*/

import { remixedObservers } from "../lib/observers";

"use strict";

export const Main: ModuleType = {
    id: "easy-jump",
    name: "直链跳转",
    author: "锯刃Blade",
    version: "1.0",
    description: `直接获取贴吧中超链接的直链，不再进行中转（不处理被严重警告的链接）`,
    scope: "/p/",
    runAt: "loaded",
    entry: main
};

function main(): void {
    remixedObservers.commentsObserver.addEvent(() => {
        $(`
            a[href*='jump.bdimg.com'],
            a[href*='jump2.bdimg.com']
        `).toArray().forEach(elem => {
            const rediUrl = elem.getAttribute("href")!;
            $.ajax({
                url: rediUrl,
                type: "POST",
                success: (data: string) => {
                    const rediDoc = new DOMParser().parseFromString(data, "text/html");
                    const orgiUrl = rediDoc.getElementsByClassName("link")[0]?.textContent;
                    alert(orgiUrl);
                    if (orgiUrl !== null) elem.setAttribute("href", orgiUrl);
                },
                error: (err) => {
                    console.log(err.status);
                    console.log(err.readyState);
                }
            });
        });
    });
}
