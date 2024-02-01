import materialSymbols from "@/stylesheets/main/material-symbols.css?inline";
import palette from "@/stylesheets/main/palette.scss?inline";
import remixedMain from "@/stylesheets/main/remixed-main.scss?inline";
import utilClassesCSS from "@/stylesheets/main/util-classes.scss?inline";
import darkVars from "element-plus/theme-chalk/dark/css-vars.css?inline";
import ThemePlus from "@/stylesheets/main/element-plus.scss?inline";
import indexVue from "./components/pages/index.vue";
import { checkUpdateAndNotify, currentPageType, setTheme } from "./lib/api/remixed";
import { DOMS, afterHead, templateCreate } from "./lib/elemental";
import { injectCSSList, parseMultiCSS } from "./lib/elemental/styles";
import { remixedObservers } from "./lib/observers";
import { removeDefault, renderPage } from "./lib/render";
import { parseUserModules } from "./lib/unsafe";
import { REMIXED, experimental, themeColor, themeType, wideScreen } from "./lib/user-values";
import { AllModules, waitUtil } from "./lib/utils";
import { hexToRGBA, rgbaToHSLA } from "./lib/utils/color";
import favicon from "/assets/images/main/favicon32.ico";

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
            DOMS(".wrap1")[0].remove();
            removeDefault();
            bodyMask.remove();
        });
    });
})();

(function setColorTheme() {
    waitUtil(() => document.body !== null, undefined, 4).then(function () {
        setTheme(themeType.get());
    });
})();

(function loadBasicStyles() {
    afterHead(() => {
        injectCSSList(palette);
        injectCSSList(materialSymbols);
        injectCSSList(remixedMain);
        injectCSSList(utilClassesCSS);

        document.head.appendChild(templateCreate("link", {
            type: "image/icon",
            rel: "shortcut icon",
            href: favicon,
        }));

        document.head.appendChild(templateCreate("meta", {
            httpEquiv: "Content-Security-Policy",
            content: "upgrade-insecure-requests",
        }));

        document.head.appendChild(templateCreate("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
        }));
    });
})();

(function writeDynStyle() {
    const theme = themeColor.get();
    const darkRGBA = hexToRGBA(theme.dark);
    const lightRGBA = hexToRGBA(theme.light);
    const darkHSLA = rgbaToHSLA(darkRGBA);
    const lightHSLA = rgbaToHSLA(lightRGBA);

    const dynCSS = parseMultiCSS({
        ":root": {
            "--content-max": wideScreen.get().noLimit
                ? "100vw"
                : `${wideScreen.get().maxPX}px`,
        },

        ":root .dark-theme": {
            "--tieba-theme-color": theme.dark,
            "--trans-tieba-theme-color": `rgb(${darkRGBA.r} ${darkRGBA.g} ${darkRGBA.b} / 80%)`,
            "--tieba-theme-hover": `hsl(${darkHSLA.h}deg ${parseInt(darkHSLA.s) + 40}% ${parseInt(darkHSLA.l) + 10}%)`,
            "--tieba-theme-active": `hsl(${darkHSLA.h}deg ${parseInt(darkHSLA.s) + 50}% ${parseInt(darkHSLA.l) + 20}%)`,
            "--tieba-theme-background": `rgb(${darkRGBA.r} ${darkRGBA.g} ${darkRGBA.b} / 24%)`,
            "--tieba-theme-fore": `hsl(${darkHSLA.h}deg 100% 75%)`,
        },

        ":root .light-theme": {
            "--tieba-theme-color": theme.light,
            "--trans-tieba-theme-color": `rgb(${lightRGBA.r} ${lightRGBA.g} ${lightRGBA.b} / 80%)`,
            "--tieba-theme-hover": `hsl(${lightHSLA.h}deg ${parseInt(lightHSLA.s) - 40}% ${parseInt(lightHSLA.l) - 10}%)`,
            "--tieba-theme-active": `hsl(${lightHSLA.h}deg ${parseInt(lightHSLA.s) - 50}% ${parseInt(lightHSLA.l) - 20}%)`,
            "--tieba-theme-background": `rgb(${lightRGBA.r} ${lightRGBA.g} ${lightRGBA.b} / 24%)`,
            "--tieba-theme-fore": `hsl(${lightHSLA.h}deg 60% 32%)`,
        },
    });

    injectCSSList(dynCSS);
    injectCSSList(darkVars);
    injectCSSList(ThemePlus);
})();

(function loadUserModules() {
    let index = 0;
    parseUserModules(
        import.meta.glob("./modules/**/index.ts"),
        (_, module) => {
            AllModules().push(module);
            index++;
        }
    );
})();

(function observing() {
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
})();

window.addEventListener("load", function () {
    checkUpdateAndNotify();
});

console.info(REMIXED);
