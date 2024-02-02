import { keys, merge } from "lodash-es";
import { isRealObject, spawnOffsetTS } from "./utils";
// import meta from "/meta.json";
import { GM_getValue, GM_setValue, GM_deleteValue } from "$";

// export const META: Meta = meta;
export const MainTitle = "Tieba Remix";
export const Owner = "WiresawBlade";
export const RepoName = "Tieba-Remix";
export const GithubRepo = "https://github.com/WiresawBlade/Tieba-Remix";
export const GiteeRepo = "https://gitee.com/WiresawBlade/Tieba-Remix/";
export const BaiduPassport = "https://passport.baidu.com/";

export const REMIXED =
    "\n" +
    "██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n" +
    "██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n" +
    "██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n" +
    "██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n" +
    "██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n" +
    "╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";

export class UserKey<T> {
    public key: string;
    public defaultValue: T;

    constructor(key: string, defaultValue: T) {
        this.key = key;
        this.defaultValue = defaultValue;
    }

    public get() {
        let payload = GM_getValue<T>(this.key, this.defaultValue);
        if (isRealObject(payload) &&
            keys(payload).length < keys(this.defaultValue).length) {
            payload = { ...this.defaultValue, ...payload };
        }
        return payload;
    }

    public set(value: T) {
        GM_setValue(this.key, value);
    }

    public remove() {
        GM_deleteValue(this.key);
    }

    public merge(value: OptionalMapped<T>) {
        if (isRealObject(value)) {
            this.set({ ...this.get(), ...value });
        }
    }

    public mergeDeeply(value: OptionalMapped<T>) {
        if (isRealObject(value)) {
            this.set(merge(this.get(), value));
        }
    }
}

export class UserKeyTS<T> extends UserKey<T> {
    private defaultInvalid = () => spawnOffsetTS(0, 0, 0, 12);

    constructor(key: string, defaultValue: T, invalidfn?: (() => number)) {
        super(key, defaultValue);
        this.defaultInvalid = invalidfn ? invalidfn : this.defaultInvalid;
    }

    public get() {
        let payload = getUserValueTS<T>(this.key, this.defaultValue);
        if (isRealObject(payload) &&
            keys(payload).length < keys(this.defaultValue).length) {
            payload = { ...this.defaultValue, ...payload };
        }
        return payload;
    }

    /**
     * 设置时间敏感的用户 key
     * @param value 需要设置的值
     * @param invalidTime 失效时间，默认为函数执行 12 小时后
     */
    public set(value: T, invalidTime?: number) {
        setUserValueTS(this.key, value, invalidTime ? invalidTime : this.defaultInvalid());
    }

    public merge(value: OptionalMapped<T>, invalidTime?: number) {
        if (isRealObject(value)) {
            this.set({ ...this.get(), ...value }, invalidTime ? invalidTime : this.defaultInvalid());
        }
    }

    public mergeDeeply(value: OptionalMapped<T>, invalidTime?: number) {
        if (isRealObject(value)) {
            this.set(merge(this.get(), value), invalidTime ? invalidTime : this.defaultInvalid());
        }
    }
}

export interface UpdateConfig {
    time: "1h" | "3h" | "6h" | "never";
    notify: boolean;
}

export type PerfType = "dataSaver" | "performance";

/** 用户禁用的所有模块的 id */
export const disabledModules = new UserKey<string[]>("disabledModules", []);
/** 性能配置 */
export const perfProfile = new UserKey<PerfType>("prefProfile", "performance");
/** 未读推送 */
export const unreadFeeds = new UserKeyTS<TiebaPost[]>("unreadFeeds", []);
/** 实验性功能配置 */
export const experimental = new UserKey("experimental", {});
/** 最新发行版相关信息 */
export const latestRelease = new UserKeyTS<GiteeRelease | undefined>("latestRelease", undefined);
/** 更新配置 */
export const updateConfig = new UserKey<UpdateConfig>("updateConfig", {
    time: "6h",
    notify: true,
});
/** 今日是否提醒用户更新 */
export const showUpdateToday = new UserKeyTS("showUpdateToday", true, () => new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000);
/** 用户决定跳过更新的版本的标签 */
export const ignoredTag = new UserKey("ignoredTag", "");
/** 用户主题设置 */
export const themeType = new UserKey<"auto" | "dark" | "light">("themeType", "auto");
/** 紧凑布局 */
export const compactLayout = new UserKey("compactLayout", false);
/** 宽屏设置 */
export const wideScreen = new UserKey("wideScreen", {
    maxPX: 1080,
    noLimit: false,
});
/** 主题色 */
export const themeColor = new UserKey("themeColor", {
    light: "#614ec2",
    dark: "#7161c1",
});
/** 用户自定义背景图 */
export const customBackground = new UserKey<string | null>("customBackground", null);
/** 页面扩展 */
export const pageExtensions = new UserKey("pageExtension", {
    index: true,
    thread: true,
});

export const SymbolFont = "Material Symbols";

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

export interface GiteeRelease {
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
        "name"?: string
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
            invalidTime: 0,
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

export function setUserValueTS(key: string, value: any, invalidTime?: number): void {
    try {
        if (invalidTime) {
            // 时间戳 + 值
            GM_setValue(key, {
                value: value,
                invalidTime: invalidTime,
            });
        } else {
            // 直接传入 UserValueNS
            GM_setValue(key, value);
        }
    } catch (error) {
        console.warn("setUserValueTS", error);
    }
}
