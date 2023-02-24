import { tiebaTags } from "./modules/tieba-tags";
import { biliBridge } from "./modules/bili-bridge";
import { remixedObservers } from "./lib/observers";
import "./modules/remixed-theme";

import favicon from "../images/main/favicon32.ico";

"use strict";

const REMIXED =
    "\n" +
    "██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n" +
    "██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n" +
    "██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n" +
    "██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n" +
    "██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n" +
    "╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";

try {
    // 加载功能模块
    tiebaTags();
    biliBridge();

    // favicon
    const favElem = document.createElement("link");
    favElem.type = "image/icon";
    favElem.rel = "shortcut icon";
    favElem.href = favicon;

    // 元素操作，等待 DOM 加载完毕
    document.addEventListener("DOMContentLoaded", () => {
        // 添加标签
        document.head.appendChild(favElem);

        // 开启监控
        if (location.href.indexOf("tieba.baidu.com/p/") !== -1) {
            remixedObservers.postsObserver._observe();
            remixedObservers.commentsObserver._observe();
        }
    });

    // window.addEventListener("load", () => {
    //     setTimeout(() => {
    //         $("script").toArray().forEach(function (elem) {
    //             if (elem.textContent?.indexOf("var PageData") !== -1) {
    //                 eval(elem.textContent!);
    //                 alert(PageData.user.id);
    //             }
    //         });
    //     }, 10000);
    // });

    // 全部任务激活完毕，打印信息
    console.info(REMIXED);
} catch (error) {
    console.error(error);
}
