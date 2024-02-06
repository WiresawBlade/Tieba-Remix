import "element-plus/dist/index.css";
import { checkUpdateAndNotify, currentPageType, setTheme } from "./lib/api/remixed";
import { remixedObservers } from "./lib/observers";
import { loadBaseCSS, loadDynamicCSS, loadExtensionCSS, loadTiebaCSS } from "./lib/theme";
import index from "./lib/theme/page-extension/index";
import thread from "./lib/theme/page-extension/thread";
import { parseUserModules } from "./lib/unsafe";
import { REMIXED, perfProfile, themeType, wideScreen } from "./lib/user-values";
import { AllModules, waitUtil } from "./lib/utils";
import { throttle } from "lodash-es";

setTheme(themeType.get());
loadBaseCSS();

Promise.all([
    loadDynamicCSS(),
    loadTiebaCSS(),
    loadExtensionCSS(),
    index(),
    thread(),
    (async function loadUserModules() {
        let index = 0;
        parseUserModules(
            import.meta.glob("./modules/**/index.ts"),
            (_, module) => {
                AllModules().push(module);
                index++;
            }
        );
    })(),
    (async function observing() {
        document.addEventListener("DOMContentLoaded", function () {
            if (currentPageType() === "thread") {
                remixedObservers.postsObserver.observe();
                remixedObservers.commentsObserver.observe();
            }

            if (currentPageType() === "index") {
                remixedObservers.newListObserver.observe();
            }

            if (currentPageType() === "forum") {
                remixedObservers.threadListObserver.observe();
            }
        });
    })(),
]);

window.addEventListener("load", function () {
    checkUpdateAndNotify();
});

// 收缩视图检测
waitUtil(() => document.body !== null).then(function () {
    if (wideScreen.get().noLimit) {
        document.body.classList.add("shrink-view");
    } else {
        const shrinkListener = throttle(function () {
            if (window.innerWidth <= wideScreen.get().maxPX) {
                document.body.classList.add("shrink-view");
            } else {
                document.body.classList.remove("shrink-view");
            }
        }, 200);

        shrinkListener();
        window.addEventListener("resize", shrinkListener);
    }
});

if (perfProfile.get() === "performance") {
    if (currentPageType() === "thread") {
        waitUtil(() => typeof datalazyload !== "undefined").then(function () {
            datalazyload.userConfig.diff = 9999;
        });
    }
}

console.info(REMIXED);
