import { GM_addStyle } from "$";
import { findIndex, join } from "lodash-es";
import { currentPageType, getResource } from "../api/remixed";
import { afterHead, templateCreate } from "../elemental";
import { defaultStyle, injectCSSRule, parseMultiCSS, removeCSSRule } from "../elemental/styles";
import { customBackground, monospaceFonts, themeColor, userFonts, wideScreen } from "../user-values";
import { waitUtil } from "../utils";
import { hexToRGBA, rgbaToHSLA } from "../utils/color";

import materialSymbolsCSS from "@/stylesheets/main/material-symbols.css?inline";
import paletteCSS from "@/stylesheets/main/palette.scss?inline";
import mainCSS from "@/stylesheets/main/remixed-main.scss?inline";
import utilCSS from "@/stylesheets/main/util-classes.scss?inline";

import errorCSS from "@/stylesheets/tieba/tieba-error.scss?inline";
import forumCSS from "@/stylesheets/tieba/tieba-forum.scss?inline";
import homeCSS from "@/stylesheets/tieba/tieba-home.scss?inline";
import tiebaCSS from "@/stylesheets/tieba/tieba-main.scss?inline";
import threadCSS from "@/stylesheets/tieba/tieba-thread.scss?inline";

import themePlusCSS from "@/stylesheets/main/element-plus.scss?inline";
import darkVarsCSS from "element-plus/theme-chalk/dark/css-vars.css?inline";

export const darkPrefers = matchMedia("(prefers-color-scheme: dark)");

const dynCSSRules = {
    customBackground: () => findIndex(Array.from(defaultStyle.sheet?.cssRules ?? { length: 0 }), rule => (rule as CSSStyleRule).selectorText === "body.custom-background"),
};

/** 需要第一时间加载以保证正常显示的样式 */
export function loadBaseCSS() {
    GM_addStyle(paletteCSS);
    GM_addStyle(mainCSS);
    GM_addStyle(utilCSS);
    GM_addStyle(materialSymbolsCSS);
}

/** 动态样式 */
export async function loadDynamicCSS() {
    const theme = themeColor.get();
    const darkRGBA = hexToRGBA(theme.dark);
    const lightRGBA = hexToRGBA(theme.light);
    const darkHSLA = rgbaToHSLA(darkRGBA);
    const lightHSLA = rgbaToHSLA(lightRGBA);

    const dynCSS = parseMultiCSS({
        ":root": {
            "--content-max": wideScreen.get().noLimit
                ? "100vw"
                : `${wideScreen.get().maxWidth}px`,
            "--code-zh": `${join(userFonts.get(), ",")}`,
            "--code-monospace": `${join(monospaceFonts.get(), ",")}`,
        },

        "html.dark-theme": {
            "--tieba-theme-color": theme.dark,
            "--trans-tieba-theme-color": `rgb(${darkRGBA.r} ${darkRGBA.g} ${darkRGBA.b} / 80%)`,
            "--tieba-theme-hover": `hsl(${darkHSLA.h}deg ${parseInt(darkHSLA.s) + 40}% ${parseInt(darkHSLA.l) + 10}%)`,
            "--tieba-theme-active": `hsl(${darkHSLA.h}deg ${parseInt(darkHSLA.s) + 50}% ${parseInt(darkHSLA.l) + 20}%)`,
            "--tieba-theme-background": `rgb(${darkRGBA.r} ${darkRGBA.g} ${darkRGBA.b} / 24%)`,
            "--tieba-theme-fore": `hsl(${darkHSLA.h}deg 100% 75%)`,
        },

        "html.light-theme": {
            "--tieba-theme-color": theme.light,
            "--trans-tieba-theme-color": `rgb(${lightRGBA.r} ${lightRGBA.g} ${lightRGBA.b} / 80%)`,
            "--tieba-theme-hover": `hsl(${lightHSLA.h}deg ${parseInt(lightHSLA.s) - 40}% ${parseInt(lightHSLA.l) - 10}%)`,
            "--tieba-theme-active": `hsl(${lightHSLA.h}deg ${parseInt(lightHSLA.s) - 50}% ${parseInt(lightHSLA.l) - 20}%)`,
            "--tieba-theme-background": `rgb(${lightRGBA.r} ${lightRGBA.g} ${lightRGBA.b} / 24%)`,
            "--tieba-theme-fore": `hsl(${lightHSLA.h}deg 60% 32%)`,
        },
    });

    GM_addStyle(dynCSS);
}

export async function loadTiebaCSS() {
    GM_addStyle(tiebaCSS);
    GM_addStyle(homeCSS);
    GM_addStyle(errorCSS);
    GM_addStyle(threadCSS);

    switch (currentPageType()) {
        case "forum":
            GM_addStyle(forumCSS);
            break;
    }

    document.head.appendChild(templateCreate("link", {
        type: "image/icon",
        rel: "shortcut icon",
        href: getResource("/assets/images/main/favicon32.ico"),
    }));
}

export async function loadExtensionCSS() {
    GM_addStyle(themePlusCSS);
    GM_addStyle(darkVarsCSS);
}

export async function setCustomBackground() {
    afterHead(function () {
        if (dynCSSRules.customBackground() !== -1) {
            removeCSSRule(dynCSSRules.customBackground());
        }
        injectCSSRule("body.custom-background", {
            backgroundImage: `url('${customBackground.get()}') !important`,
            backgroundRepeat: "no-repeat !important",
            backgroundAttachment: "fixed !important",
            backgroundSize: "cover !important",
        }) ?? -1;

        waitUtil(() => document.body !== null).then(function () {
            if (customBackground.get()) {
                document.body.classList.add("custom-background");
            } else {
                document.body.classList.remove("custom-background");
            }
        });
    });
}
