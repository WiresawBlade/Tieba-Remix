import { findIndex } from "lodash-es";
import { afterHead } from "../elemental";
import { defaultStyle, injectCSSRule, removeCSSRule } from "../elemental/styles";
import { customBackground } from "../user-values";
import { waitUtil } from "../utils";

export const dynCSSRules = {
    customBackground: () => findIndex(Array.from(defaultStyle.sheet?.cssRules ?? { length: 0 }), rule => (rule as CSSStyleRule).selectorText === "body.custom-background"),
};

export function setCustomBackground() {
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

        waitUtil(() => document.body !== null, undefined, 4).then(function () {
            if (customBackground.get()) {
                document.body.classList.add("custom-background");
            } else {
                document.body.classList.remove("custom-background");
            }
        });
    });
}
