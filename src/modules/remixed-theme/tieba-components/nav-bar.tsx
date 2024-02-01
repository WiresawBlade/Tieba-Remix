import navBarVue from "@/components/nav-bar.vue";
import { DOMS } from "@/lib/elemental";
import { injectCSSList } from "@/lib/elemental/styles";
import { renderComponent } from "@/lib/render";
import { insertJSX } from "@/lib/render/jsx-extension";
import { waitUtil } from "@/lib/utils";

import navBarCSS from "./nav-bar.scss?inline";

export default function () {
    injectCSSList(navBarCSS);

    waitUtil(() => DOMS("#com_userbar").length > 0).then(function () {
        const elder = DOMS("#com_userbar")[0];
        const navWrapper = <div id="nav-wrapper" class="nav-wrapper"></div>;

        insertJSX(navWrapper, document.body, elder);
        renderComponent(navBarVue, DOMS("#nav-wrapper")[0]);
    });
}
