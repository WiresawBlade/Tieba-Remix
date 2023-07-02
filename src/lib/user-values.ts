import { spawnOffsetTS } from "./utils";
import meta from "/meta.json";

export const META = meta;
export const MainTitle = "Tieba Remix";
export const Owner = "WiresawBlade";
export const RepoName = "Tieba-Remix";
export const GithubRepo = "https://github.com/WiresawBlade/Tieba-Remix";
export const GiteeRepo = "https://gitee.com/WiresawBlade/Tieba-Remix/";
export const BaiduPassport = "https://passport.baidu.com/";

/** 用户禁用的所有模块的 id */
export const disabledModules: string[] = GM_getValue("disabledModules", []);
/** 性能配置 */
export const perfProfile: "dataSaver" | "performance" = GM_getValue("perfProfile", "performance");
/** 未读推送 */
export const unreadFeeds: TiebaPost[] = getUserValueTS("unreadFeeds", <TiebaPost[]>[]);
/** 实验性功能配置 */
export const experimental: Experimental = GM_getValue<Experimental>("experimental", {
    "new-index": true,
    "dynamic-post-container": false
});
/** 最新发行版相关信息 */
export const latestRelease: LatestReleaseFromGitee | undefined = getUserValueTS("latestRelease", undefined);

export const updateConfig: UpdateConfig = GM_getValue("updateConfig", {
    time: "6h"
});

export interface Experimental {
    [props: string]: boolean

    "new-index": boolean
    "dynamic-post-container": boolean
}

export interface UpdateConfig {
    time: "1h" | "3h" | "6h" | "never"
}

const publicLib: LiteralObject = {};

export function getPublicLib<T>(key: string): T | undefined;
export function getPublicLib<T>(key: string, defaultValue: T): T;

export function getPublicLib<T>(key: string, defaultValue?: T) {
    if (publicLib[key]) {
        return publicLib[key];
    } else {
        if (defaultValue)
            return defaultValue;
    }
}

export function setPublicLib<T>(key: string, value: T) {
    publicLib[key] = value;
}

export interface LatestReleaseFromGitee {
    "id": number
    "tag_name": string
    "target_commitish": string
    "prerelease": boolean
    "name": string
    "body": string
    "author": {
        "id": number
        /** 原始用户名 */
        "login": string
        "name": string
        "avatar_url": string
        "url": string
        "html_url": string
        "remark": string
        "followers_url": string
        "following_url": string
        "gists_url": string
        "starred_url": string
        "subscriptions_url": string
        "organizations_url": string
        "repos_url": string
        "events_url": string
        "received_events_url": string
        "type": string
    },
    "created_at": string
    "assets": {
        "browser_download_url": string
        "name": string
    }[]
}

/**
 * 获取时间敏感的值
 * @param key 需要获取的值对应的键
 * @param def 未获取到值时返回的默认值
 * @returns 获取到的对应值 | 预先设置的默认值 | undefined
 */
export function getUserValueTS<T>(key: string, def: T): T {
    try {
        const valueTS = GM_getValue<UserValueTS<T>>(key, {
            value: def,
            invalidTime: 0
        });

        const timeStamp = Date.now();
        // 当前时间与失效时间匹配
        if (valueTS.invalidTime >= timeStamp) {
            return valueTS.value;
        } else {
            return def;
        }
    } catch (error) {
        return def;
    }
}

/**
 * 设置一个时间敏感的值进行存储
 * @param key 该值对应的键
 * @param value 需要设置的值
 * @param invalidTime 该值的失效时间
 */
export function setUserValueTS<T>(key: string, value: T, invalidTime: number): void;
/**
 * 设置一个时间敏感的值进行存储
 * @param key 该值对应的键
 * @param value 需要设置的值
 */
export function setUserValueTS<T>(key: string, value: UserValueTS<T>): void;

export function setUserValueTS<T>(key: string, value: any, invalidTime?: number): void {
    try {
        if (invalidTime) {
            // 时间戳 + 值
            GM_setValue<UserValueTS<T>>(key, {
                value: value,
                invalidTime: invalidTime
            });
        } else {
            // 直接传入 UserValueNS
            GM_setValue<UserValueTS<T>>(key, value);
        }
    } catch (error) {
        console.warn("setUserValueTS", error);
    }
}
