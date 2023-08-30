import { forEach, includes } from "lodash-es";
import { GiteeRelease, Owner, RepoName, ignoredTag, latestRelease, setUserValueTS, showUpdateToday, updateConfig } from "./user-values";
import { spawnOffsetTS } from "./utils";
import { messageBox, toast } from "./render";
import { marked } from "marked";

export type PageType = "index" | "thread" | "forum" | "user" | "unhandled"

marked.setOptions({
    mangle: false,
    headerIds: false
});

function dt2PageType(s: string): PageType {
    switch (s) {
        case "index":
            return "index";
        case "pb_bright":
            return "thread";
        case "frs":
            return "forum";
        case "main":
            return "user";
        default:
            return "unhandled";
    }
}

/**
 * 获取当前页面的类型
 * @returns 当前页面的类型
 */
export function currentPageType(): PageType {
    // if (PageData) return dt2PageType(PageData.page);

    if (location.hostname.toLowerCase() !== "tieba.baidu.com") return "unhandled";

    const pathname = location.pathname.toLocaleLowerCase();

    if (includes(["/", "/index.html"], pathname)) return "index";
    if (/\/p\/\d+/.test(pathname)) return "thread";
    if (pathname === "/f") return "forum";
    if (pathname === "/home/main") return "user";

    return "unhandled";
}

export async function getLatestReleaseFromGitee(owner = Owner, repo = RepoName, forceUpdate = false): Promise<GiteeRelease | undefined> {
    if (latestRelease.get() && !forceUpdate) {
        return latestRelease.get();
    } else {
        const TTL = (function () {
            switch (updateConfig.get().time) {
                case "1h": return 1;
                case "3h": return 3;
                case "6h": return 6;
                case "never": return -1;
            }
        })();

        if (TTL < 0) return;

        const response = await fetch(`https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest/`);

        if (response.ok) {
            const result = await response.json() as GiteeRelease;
            latestRelease.set(result, spawnOffsetTS(0, 0, 0, TTL));
            return result;
        } else {
            return undefined;
        }
    }
}

export function checkUpdateAndNotify() {
    // 不追踪发行信息
    if (updateConfig.get().time === "never") return;
    // 静默
    if (!updateConfig.get().notify) return;
    // 今日已不能再提醒
    if (!showUpdateToday.get()) return;

    // 开发者专用
    if (GM_info.script.version === "developer-only") return;

    getLatestReleaseFromGitee().then((latestRelease) => {
        if (latestRelease && latestRelease.tag_name.slice(1) !== GM_info.script.version) {
            // 忽略当前版本
            if (ignoredTag.get() === latestRelease.tag_name) return;

            messageBox({
                message: marked(latestRelease.body),
                embedded: true,
                type: "OkCancel",
                buttons: [
                    {
                        title: "安装",
                        event() {
                            installFromRelease(latestRelease);
                        }
                    },
                    {
                        title: "今日不再提醒",
                        event() {
                            showUpdateToday.set(false);
                        }
                    },
                    {
                        title: "跳过该版本",
                        event() {
                            ignoredTag.set(latestRelease.tag_name);
                        }
                    }
                ]
            });
        }
    });
}

export function installFromRelease(release: GiteeRelease) {
    function notFound() {
        toast({
            message: "安装失败：未找到可用的资源",
            type: "error",
            duration: 6000,
            blurEffect: true
        });
    }

    if (!release.assets || release.assets.length <= 0) {
        notFound();
        return;
    }

    const asset = (function () {
        for (const asset of release.assets) {
            if (asset.name && asset.name.endsWith(".user.js")) {
                return asset.browser_download_url;
            }
        }
    })();

    if (asset) {
        GM_openInTab(asset, {
            active: true
        });
    } else {
        notFound();
        return;
    }
}
