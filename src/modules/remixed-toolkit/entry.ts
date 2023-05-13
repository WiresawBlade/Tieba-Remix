import { forEach } from "lodash-es";
import { DOMS } from "@/lib/domlib";

export const Main: UserModule = {
    id: "remixed-toolkit",
    name: "实用工具库",
    author: "锯刃Blade",
    version: "1.0",
    brief: "优化原版贴吧体验的一组功能",
    description: "这是一个轻量级的工具库，包含了诸如自动展开长图等实用功能。",
    scope: true,
    runAt: "immediately",
    entry: function () {
        autoExpand();
    }
};

/**
 * 自动展开长图
 */
function autoExpand() {
    window.addEventListener("load", () => {
        forEach(DOMS(".replace_tip"), (el) => {
            (el as HTMLDivElement).click();
        });
    });
}
