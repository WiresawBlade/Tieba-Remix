import { includes } from "lodash-es";
import { LatestReleaseFromGitee, Owner, RepoName, latestRelease, setUserValueTS, updateConfig } from "./user-values";
import { spawnOffsetTS } from "./utils";

export type PageType = "index" | "thread" | "forum" | "user" | "unhandled"

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

export async function getLatestReleaseFromGitee(owner = Owner, repo = RepoName, forceUpdate = false): Promise<LatestReleaseFromGitee | undefined> {
    if (latestRelease && !forceUpdate) {
        return latestRelease;
    } else {
        const TTL = (function () {
            switch (updateConfig.time) {
                case "1h": return 1;
                case "3h": return 3;
                case "6h": return 6;
                case "never": return -1;
            }
        })();

        if (TTL < 0) return;

        const response = await fetch(`https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest/`);

        if (response.ok) {
            const result = await response.json() as LatestReleaseFromGitee;
            setUserValueTS("latestRelease", result, spawnOffsetTS(0, 0, 0, TTL));
            return result;
        } else {
            return undefined;
        }
    }
}
