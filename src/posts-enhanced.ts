/**
 * Tieba Posts Enhanced
 * 贴吧看贴功能增强
 * @WiresawBlade
*/

/// <reference path="./remixed-observers.ts" />

/* Tieba Tags */
(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") === -1) return;

    const TAGGED = "is-tagged";
    const TB_TAG = "tag-elem";
    const MY_TAG = "tieba-tags-me";
    const LZ_TAG = "tieba-tags-lz";
    const CZ_TAG = "tieba-tags-cz";

    let myUserName: string;
    let louzhuCard: any;
    let louzhuObj: any;

    // 判断当前是否在第一页
    if (location.search === null || location.search.indexOf("pn=") === -1) {
        // 当前在贴子第一页，直接读取当前页面
        window.addEventListener("load", () => {
            // 等待网页加载完毕再抓数据
            tiebaTagsMain(document);
        });
    } else {
        // 当前不在帖子第一页
        $.ajax({
            url: location.href.split("?")[0],
            success: (response: string) => {
                const fPageDoc = new DOMParser().parseFromString(response, "text/html");
                tiebaTagsMain(fPageDoc);
            }
        });

        // document.addEventListener("DOMContentLoaded", () => {
        //     fPageElem = document.createElement("iframe");
        //     fPageElem.style.display = "none";
        //     fPageElem.className = "iframe-fpage";
        //     fPageElem.src = location.href.split("?")[0];
        //     document.body.appendChild(fPageElem);

        //     fPageElem.contentWindow?.addEventListener("load", () => {
        //         // 等待 iframe 中网页加载完毕，开始抓数据
        //         tiebaTagsMain(fPageElem.contentDocument!);
        //     });

        //     let fPageDoc = $(fPageAjax.responseText).get(0);
        //     alert(fPageDoc?.innerHTML);
        // });
    }

    async function tiebaTagsMain(docElem: Document) {
        (() => {
            // 判断信息是否抓取过，避免重复抓取
            if (myUserName !== undefined) return;

            myUserName = docElem.getElementById("nameValue")?.textContent!;
            louzhuCard = docElem.querySelector(".d_name .p_author_name");
            louzhuObj = JSON.parse(
                louzhuCard?.getAttribute("data-field")?.split("'").join("\"")!
            );
        })();

        // addTiebaTags();

        // let observer = new MutationObserver(addTiebaTags);
        // observer.observe(document.getElementById("j_p_postlist")!, {
        //     childList: true,
        //     subtree: true
        // });

        __remixedObservers.commentsObserver.addEvent(addTiebaTags);

        function addTiebaTags(): void {
            $(".lzl_cnt .at").toArray().forEach(elem => {
                if (elem.classList.contains(TAGGED)) return;
                elem.classList.add(TAGGED);

                let isMe = false; let isLZ = false;

                // 我
                if (elem.textContent === myUserName) {
                    makeTag(MY_TAG);
                    isMe = true;
                }

                // 楼主，如果我是楼主则不显示楼主
                if (elem.textContent === louzhuCard.textContent ||
                    elem.getAttribute("username") !== "" &&
                    elem.getAttribute("username") === decodeURIComponent(louzhuObj.un) ||
                    elem.getAttribute("portrait") === louzhuObj.id.split("?")[0]) {
                    isLZ = true;
                    if (!isMe) makeTag(LZ_TAG);
                }

                // 层主，如果楼主是层主则不显示
                (() => {
                    if (isLZ) return;

                    const floorElem = findParent(elem, "l_post_bright");
                    const cengzhuCard = floorElem?.querySelector(".d_name .p_author_name");
                    const cengzhuObj = JSON.parse(cengzhuCard
                        ?.getAttribute("data-field")?.split("'").join("\"")!);
                    if (elem.textContent === cengzhuCard?.textContent ||
                        elem.getAttribute("username") !== "" &&
                        elem.getAttribute("username") === decodeURIComponent(cengzhuObj.un) ||
                        elem.getAttribute("portrait") === cengzhuObj.id.split("?")[0]) {
                        makeTag(CZ_TAG);
                    }
                })();

                function makeTag(tagClass: string): void {
                    const tagElem = document.createElement("div");
                    tagElem.classList.add(TB_TAG);
                    tagElem.classList.add(tagClass);
                    elem.appendChild(tagElem);
                }
            });
        }

        function findParent(elem: Element, parentClassName: string): Element | null {
            while (elem.parentElement?.className.indexOf(parentClassName) === -1) {
                elem = elem.parentElement;
            }
            return elem.parentElement;
        }
    }
})();

/* Tieba Bridge */
(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") === -1) return;

    const LINKED_CLASS = "linked";

    const avRegExp = /(?<!:\/\/www.bilibili.com\/video\/)av[1-9]\d*/gi;
    const BVRegExp = /(?<!:\/\/www.bilibili.com\/video\/)BV[A-Za-z0-9]{10}/g;

    document.addEventListener("DOMContentLoaded", () => {
        __remixedObservers.commentsObserver.addEvent(biliEnhanced);
    });

    /* av/BV 快速跳转 */
    async function biliEnhanced() {
        addBiliLinks(".d_post_content");
        addBiliLinks(".lzl_cnt .lzl_content_main");

        function addBiliLinks(selector: string): void {
            $(selector).toArray().forEach(elem => {
                if (elem.classList.contains(LINKED_CLASS)) return;
                elem.classList.add(LINKED_CLASS);

                // av号
                if (elem.innerHTML.toLowerCase().indexOf("av") !== -1) {
                    const avs = elem.innerHTML.match(avRegExp);
                    bindingLinks(avs, true);
                }

                // BV号
                if (elem.innerHTML.indexOf("BV") !== -1) {
                    const BVs = elem.innerHTML.match(BVRegExp);
                    bindingLinks(BVs);
                }

                function bindingLinks(array: RegExpMatchArray | null, lowerCase = false) {
                    const hadHyperLink: string[] = [];
                    array?.forEach(videoID => {
                        if (hadHyperLink.indexOf(videoID) === -1) {
                            hadHyperLink.push(videoID);
                            const htmlArray = elem.innerHTML.split(RegExp(
                                "(?<!://www.bilibili.com/video/)" + videoID
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
})();
