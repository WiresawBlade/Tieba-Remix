import { afterHead } from "../elemental";
import { injectCSSRule, removeCSSRule } from "../elemental/styles";
import { customBackground } from "../user-values";
import { waitUtil } from "../utils";

export const dynCSSRules = {
    customBackground: -1,
};

export function setCustomBackground() {
    afterHead(function () {
        if (dynCSSRules.customBackground !== -1) {
            removeCSSRule(dynCSSRules.customBackground);
        }
        dynCSSRules.customBackground = injectCSSRule("body", {
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
