import "element-plus/dist/index.css";
import indexVue from "./components/pages/index.vue";
import { checkUpdateAndNotify, currentPageType, setTheme } from "./lib/api/remixed";
import { DOMS, afterHead } from "./lib/elemental";
import { injectCSSList } from "./lib/elemental/styles";
import { remixedObservers } from "./lib/observers";
import { removeDefault, renderPage } from "./lib/render";
import { loadBaseCSS, loadDynamicCSS, loadExtensionCSS, loadTiebaCSS } from "./lib/theme";
import { parseUserModules } from "./lib/unsafe";
import { REMIXED, pageExtension, themeType } from "./lib/user-values";
import { AllModules, waitUtil } from "./lib/utils";
import thread from "./lib/theme/page-extension/thread";

setTheme(themeType.get());
loadBaseCSS();

Promise.all([
    loadDynamicCSS(),
    loadTiebaCSS(),
    loadExtensionCSS(),
    thread(),
    (async function loadNewIndex() {
        if (!pageExtension.get().index) return;
        if (currentPageType() !== "index") return;

        afterHead(function () {
            const bodyMask = injectCSSList(`
            body {
                display: none;
            }
        `);

            injectCSSList(`
            #com_userbar {
                display: none;
            }

            .tbui_aside_float_bar {
                display: none;
            }
        `);

            waitUtil(() => document.body !== null).then(function () {
                renderPage(indexVue);
                DOMS(".wrap1")[0].remove();
                removeDefault();
                bodyMask.remove();
            });
        });
    })(),
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
