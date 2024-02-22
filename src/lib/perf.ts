import { forEach, startsWith } from "lodash-es";
import { currentPageType } from "./api/remixed";
import { remixedObservers } from "./observers";
import { PerfType, perfProfile } from "./user-values";
import { waitUtil } from "./utils";

export function loadPerf() {
    setPerfAttr();
    setThreadLazyload();
}

export function setPerfAttr() {
    const perfAttr: Record<PerfType, string> = {
        default: "perf-default",
        saver: "perf-saver",
        performance: "perf-performance",
    };

    forEach(document.documentElement.attributes, attr => {
        if (startsWith(attr.name, "perf-")) {
            document.documentElement.removeAttribute(attr.name);
        }
    });
    document.documentElement.toggleAttribute(perfAttr[perfProfile.get()]);
}

/**
 * 帖子页面懒加载性能配置
 */
export async function setThreadLazyload() {
    if (currentPageType() !== "thread") return;
    const lazyloadDiff: Record<PerfType, number> = {
        default: 1000,
        saver: 500,
        performance: 9999,
    };
    await waitUtil(() => typeof datalazyload !== "undefined");

    remixedObservers.postsObserver.addEvent(setDiff);

    function setDiff() {
        datalazyload.userConfig.diff = lazyloadDiff[perfProfile.get()];
    }
}
