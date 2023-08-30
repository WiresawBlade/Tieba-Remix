import favicon from "/images/main/favicon32.ico";
import palette from "@/stylesheets/main/_palette.scss?inline";
import materialSymbols from "@/stylesheets/main/material-symbols.css?inline";
import remixedMain from "@/stylesheets/main/_remixed-main.scss?inline";

import { remixedObservers } from "./lib/observers";
import { greasyInit } from "./greasy-init";
import { parseUserModules } from "./lib/unsafe";
import { afterHead, createNewElement, injectCSSList } from "./lib/domlib";
import { removeDefault, renderDialog, renderPage, toast } from "./lib/render";
import { errorMessage, waitUtil } from "./lib/utils";

import indexVue from "./components/pages/index.vue";
import { REMIXED, experimental } from "./lib/user-values";
import settingsVue from "./components/settings.vue";
import { checkUpdateAndNotify, currentPageType } from "./lib/api.remixed";
import { addFloatButton, floatBar } from "./lib/api.abstract";

export { afterModulesLoaded, MainModules };

"use strict";

const MainModules: UserModule[] = [];
let moduleLoadedFlag = false;
const beforeModulesLoadedFns: (() => void)[] = [];

/**
 * 所有模块加载完毕后执行
 * @param callbackfn 回调函数
*/
function afterModulesLoaded(callbackfn: () => void) {
    if (moduleLoadedFlag) {
        callbackfn();
    } else {
        beforeModulesLoadedFns.push(callbackfn);
    }
}

(function loadNewIndex() {
    if (!experimental.get()["new-index"]) return;
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
            removeDefault();
            bodyMask.remove();
        });
    });
})();

(function loadBasicStyles() {
    afterHead(() => {
        injectCSSList(palette);
        injectCSSList(materialSymbols);
        injectCSSList(remixedMain);

        document.head.appendChild(createNewElement("link", {
            type: "image/icon",
            rel: "shortcut icon",
            href: favicon
        }));

        document.head.appendChild(createNewElement("meta", {
            httpEquiv: "Content-Security-Policy",
            content: "upgrade-insecure-requests"
        }));

        document.head.appendChild(createNewElement("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
        }));
    });
})();

(function loadUserModules() {
    let index = 0;
    parseUserModules(
        import.meta.glob("./modules/**/entry.ts"),
        (info, module) => {
            MainModules.push(module);
            index++;
            if (index === info.length) {
                moduleLoadedFlag = true;
                for (const fn of beforeModulesLoadedFns) {
                    fn();
                }
            }
        }
    );
})();

(function observing() {
    document.addEventListener("DOMContentLoaded", function () {
        if (currentPageType() === "thread") {
            remixedObservers.postsObserver._observe();
            remixedObservers.commentsObserver._observe();
        }

        if (currentPageType() === "index") {
            remixedObservers.newListObserver._observe();
        }

        if (currentPageType() === "forum") {
            remixedObservers.threadListObserver._observe();
        }
    });
})();

(function tempSettingFloatButton() {
    waitUtil(() => floatBar.get() !== undefined).then(function () {
        const fbSettings = addFloatButton("other", function () {
            renderDialog(settingsVue, { modules: MainModules });
        }, "module-settings", "settings");

        fbSettings.el.style.backgroundColor = "rgb(53, 73, 94)";
        fbSettings.el.style.color = "rgb(240, 240, 240)";

        document.body.insertBefore(createNewElement("div", {
            class: "vue-module-control",
            style: "display: none;"
        }), document.body.firstChild);
    });
})();

window.addEventListener("load", function () {
    checkUpdateAndNotify();
});

greasyInit();
console.info(REMIXED);
