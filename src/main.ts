import "element-plus/dist/index.css";
import { checkUpdateAndNotify, currentPageType, setTheme } from "./lib/api/remixed";
import { remixedObservers } from "./lib/observers";
import { loadBaseCSS, loadDynamicCSS, loadExtensionCSS, loadTiebaCSS } from "./lib/theme";
import index from "./lib/theme/page-extension/index";
import thread from "./lib/theme/page-extension/thread";
import { parseUserModules } from "./lib/unsafe";
import { REMIXED, themeType } from "./lib/user-values";
import { AllModules } from "./lib/utils";

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

console.info(REMIXED);
