import { GM_addStyle } from "$";
import indexVue from "@/components/pages/index.vue";
import { currentPageType } from "@/lib/api/remixed";
import { DOMS } from "@/lib/elemental";
import { parseMultiCSS } from "@/lib/elemental/styles";
import { renderPage } from "@/lib/render";
import { pageExtension } from "@/lib/user-values";
import { waitUtil } from "@/lib/utils";

export default async function () {
    if (currentPageType() !== "index") return;
    if (!pageExtension.get().index) return;

    const bodyMask = GM_addStyle(parseMultiCSS({
        "body": {
            display: "none",
        },
    }));

    await waitUtil(() => DOMS(true, ".wrap1") !== null, undefined, 4);
    renderPage(indexVue);
    DOMS(true, ".wrap1").remove();
    bodyMask.remove();
}
