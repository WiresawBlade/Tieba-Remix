/**
 * Bili Bridge
 * 为贴子中的b站番号添加跳转链接
 * @WiresawBlade
*/

import { DOMSelector } from "@/lib/dom-control";
import { remixedObservers } from "@/lib/observers";

"use strict";

export const Main: UserModule = {
    id: "bili-bridge",
    name: "Bili 番号跳转",
    author: "锯刃Blade",
    version: "1.1",
    description: `为贴子中的b站番号添加跳转链接`,
    scope: "tieba.baidu.com/p/",
    runAt: "immediately",
    entry: main
};

function main(): void {
    const LINKED_CLASS = "linked";
    const avRegExp = /(?<!:\/\/www.bilibili.com\/video\/)av[1-9]\d*/gi;
    const BVRegExp = /(?<!:\/\/www.bilibili.com\/video\/)BV[A-Za-z0-9]{10}/g;

    document.addEventListener("DOMContentLoaded", () => {
        remixedObservers.commentsObserver.addEvent(biliEnhanced);
    });

    /* av/BV 快速跳转 */
    function biliEnhanced() {
        addBiliLinks(".d_post_content");
        addBiliLinks(".lzl_cnt .lzl_content_main");

        function addBiliLinks(selector: string): void {
            DOMSelector(selector).forEach(elem => {
                if (elem.classList.contains(LINKED_CLASS)) return;
                elem.classList.add(LINKED_CLASS);

                // av号
                if (elem.textContent?.toLowerCase().indexOf("av") !== -1) {
                    const avs = elem.textContent?.match(avRegExp);
                    bindingLinks(avs, true);
                }

                // BV号
                if (elem.textContent?.indexOf("BV") !== -1) {
                    const BVs = elem.textContent?.match(BVRegExp);
                    bindingLinks(BVs);
                }

                function bindingLinks(array: RegExpMatchArray | null | undefined, lowerCase = false) {
                    if (array === null || array === undefined) return;

                    const hadHyperLink: string[] = [];
                    array?.forEach(videoID => {
                        if (hadHyperLink.indexOf(videoID) === -1) {
                            hadHyperLink.push(videoID);
                            const htmlArray = elem.innerHTML.split(RegExp(
                                "(?<!://www.bilibili.com/video/)" + videoID, "g"
                            ));
                            if (lowerCase) videoID = videoID.toLowerCase();
                            const linkedID = "<a href='https://www.bilibili.com/video/"
                                + videoID + "/'>" + videoID + "</a>";
                            elem.innerHTML = htmlArray.join(linkedID);
                        }
                    });
                }
            });
        }
    }
}
