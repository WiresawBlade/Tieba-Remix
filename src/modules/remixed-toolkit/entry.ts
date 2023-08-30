import { forEach } from "lodash-es";
import { DOMS } from "@/lib/domlib";
import { remixedObservers } from "@/lib/observers";
import { UserModuleExtended } from "@/global.module";
import { ref } from "vue";
import { UserKey } from "@/lib/user-values";

export const Main: UserModuleExtended = {
    id: "remixed-toolkit",
    name: "实用工具库",
    author: "锯刃Blade",
    version: "1.0",
    brief: "优化原版贴吧体验的一组功能",
    description: "这是一个轻量级的工具库，包含了诸如自动展开长图等实用功能。",
    scope: true,
    runAt: "immediately",
    settings: {
        "auto-expand": {
            title: "自动展开长图",
            description:
                `该功能会自动将帖子中所有的长图片自动展开，无需手动操作`,
            widgets: {
                type: "toggle",
                init: () => toolkitRef.value["auto-expand"],
                event() {
                    toolkitRef.value["auto-expand"] = !toolkitRef.value["auto-expand"];
                    toolkitToogles.set(toolkitRef.value);
                }
            }
        }
    },
    entry: function () {
        for (const key in toolkitFeatures) {
            const k = key as keyof typeof toolkitFeatures;
            if (toolkitRef.value[k]) toolkitFeatures[k]();
        }
    }
};

const toolkitFeatures = {
    /**
     * 自动展开长图
     */
    "auto-expand"() {
        remixedObservers.postsObserver.addEvent(() => {
            forEach(DOMS(".replace_tip"), (el) => {
                (el as HTMLDivElement).click();
            });
        });
    }
};

type ToolkitToogles = KeyMapped<typeof toolkitFeatures, boolean>

const toolkitToogles = new UserKey<ToolkitToogles>("toolkitToogles", {
    "auto-expand": true
});
const toolkitRef = ref(toolkitToogles.get());
