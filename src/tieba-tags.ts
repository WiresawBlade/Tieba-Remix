/*
 * Tieba Tags 1.0
 * @WiresawBlade
 * 在楼中楼为楼主等用户显示特殊标签
*/

/// <reference path="./web-calsses.ts" />

(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") == -1) return;

    const TAGGED = "is-tagged";
    const TB_TAG = "tag-elem";
    const LZ_TAG = "tieba-tags-lz";
    const MY_TAG = "tieba-tags-me";

    let myUserName: string;
    let louzhu: string;

    let fPageElem: HTMLIFrameElement;

    // 判断当前是否在第一页
    let pObj = ParamObject.getCurrent();
    if (pObj.pn == undefined || pObj.pn == "1") {
        // 当前在贴子第一页，直接读取当前页面
        window.addEventListener("load", () => {
            // 等待网页加载完毕再抓数据
            tiebaTagsMain(document);
        });
    } else {
        // 当前不在帖子第一页，先等待当前页面加载完毕
        window.addEventListener("load", () => {
            pObj.pn = 1;
            fPageElem = document.createElement("iframe");
            fPageElem.style.display = "none";
            document.body.appendChild(fPageElem);
            fPageElem.src = location.href.split("?")[0] + pObj.toString();
            fPageElem.addEventListener("load", () => {
                // 等待 iframe 中网页加载完毕，开始抓数据
                tiebaTagsMain(fPageElem.contentDocument!);
            });
        });
    }

    function tiebaTagsMain(docElem: Document) {
        // 判断信息是否抓取过，避免重复抓取
        if (myUserName == undefined) {
            myUserName = docElem.getElementById("nameValue")?.textContent!;
            // louzhu = JSON.parse(
            //     docElem.querySelector(".d_name .p_author_name")
            //         ?.getAttribute("data-field")?.split("'").join("\"")!
            // ).id.split("?")[0]!;
            louzhu = docElem.querySelector(".d_name .p_author_name")?.textContent!;
        } else {
            // 已抓取数据，销毁 iframe
            fPageElem.remove();
        }

        let observer = new MutationObserver(addTiebaTags);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: [
                "style"
            ],
            subtree: true
        });

        function addTiebaTags(): void {
            document.querySelectorAll(".lzl_cnt .at").forEach(elem => {
                if (elem.className.indexOf(TAGGED) != -1) return;
                elem.classList.add(TAGGED);

                // 我
                if (elem.textContent == myUserName) {
                    makeTag(MY_TAG);
                }

                // 楼主
                if (elem.textContent == louzhu) {
                    makeTag(LZ_TAG);
                }

                function makeTag(tagClass: string): void {
                    let tagElem = document.createElement("div");
                    tagElem.classList.add(TB_TAG);
                    tagElem.classList.add(tagClass);
                    elem.appendChild(tagElem);
                }
            });
        }
    }
})();
