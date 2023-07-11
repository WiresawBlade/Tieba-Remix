declare module "*.json";

interface LiteralObject {
    [prop: string]: any
}

type Mapped<T> = {
    [prop in keyof T]: T[prop]
}

type KeyMapped<T, U> = {
    [prop in keyof T]: U
}

type OptionalMapped<T> = {
    [prop in keyof T]?: T[prop];
}

type PageType = "index" | "thread" | "forum" | "user" | "unhandled"

/** 用户模块 */
interface UserModule {
    [prop: string]: any

    id: string
    /** 需要显示给用户的模块名称 */
    name: string
    author: string
    version: string
    brief: string
    description: string

    switch?: boolean
    scope: true | PageType[] | RegExp
    runAt: "immediately" | "afterHead" | "DOMLoaded" | "loaded"

    entry: (() => void)
}

/** 贴子 */
interface TiebaPost {
    id: string
    forum: {
        id: string
        name: string
        href: string
    }

    author: {
        portrait: string
        name: string
        href: string
    }
    time: string

    title: string
    content: string
    replies: number | string
    images: {
        thumb: string
        original: string
    }[]
}

/** 用户模块其他信息 */
interface UserModulesInfo {
    /** 本次被解析的模块数 */
    length: number
    /** 当前被解析的模块信息 */
    current: {
        /** 模块是否被允许运行 */
        runnable: boolean
        /** 模块所在位置 */
        url: string
    }
}

type DropdownMenu = {
    title: string
    href?: string
    click?: (() => void)
    icon?: string
} | "separator"

/**
 * 屏蔽规则对象
 */
interface ShieldObject {
    /** 匹配规则，它可能是直接的屏蔽词，也可能是正则表达式 */
    rule: string
    /** 描述当前规则的类型 */
    type: "string" | "regex"
    /** 作用域，屏蔽规则作用于贴子或用户 */
    scope: "posts" | "users"
    /** 是否启用该规则 */
    switch: boolean
    /** 是否忽略大小写，默认忽略 */
    ignoreCase?: boolean
    /** 是否匹配 innerHTML？默认匹配 textContent */
    matchHTML?: boolean
}

interface UserValueTS<T> {
    value: T
    invalidTime: number
}

type ScriptGetInfo = {
    downloadMode: string,
    isFirstPartyIsolation?: boolean,
    isIncognito: boolean,
    sandboxMode: SandboxMode,
    scriptHandler: string,
    scriptMetaStr: string | null,
    scriptUpdateURL: string | null,
    scriptWillUpdate: boolean,
    version?: string,
    script: {
        antifeatures: { [antifeature: string]: { [locale: string]: string } },
        author: string | null,
        blockers: string[],
        connects: string[],
        copyright: string | null,
        deleted?: number | undefined,
        description_i18n: { [locale: string]: string } | null,
        description: string,
        downloadURL: string | null,
        excludes: string[],
        fileURL: string | null,
        grant: string[],
        header: string | null,
        homepage: string | null,
        icon: string | null,
        icon64: string | null,
        includes: string[],
        lastModified: number,
        matches: string[],
        name_i18n: { [locale: string]: string } | null,
        name: string,
        namespace: string | null,
        position: number,
        resources: Resource[],
        supportURL: string | null,
        system?: boolean | undefined,
        'run-at': string | null,
        unwrap: boolean | null,
        updateURL: string | null,
        version: string,
        webRequest: WebRequestRule[] | null,
        options: {
            check_for_updates: boolean,
            comment: string | null,
            compatopts_for_requires: boolean,
            compat_wrappedjsobject: boolean,
            compat_metadata: boolean,
            compat_foreach: boolean,
            compat_powerful_this: boolean | null,
            sandbox: string | null,
            noframes: boolean | null,
            unwrap: boolean | null,
            run_at: string | null,
            tab_types: string | null,
            override: {
                use_includes: string[],
                orig_includes: string[],
                merge_includes: boolean,
                use_matches: string[],
                orig_matches: string[],
                merge_matches: boolean,
                use_excludes: string[],
                orig_excludes: string[],
                merge_excludes: boolean,
                use_connects: string[],
                orig_connects: string[],
                merge_connects: boolean,
                use_blockers: string[],
                orig_run_at: string | null,
                orig_noframes: boolean | null
            }
        }
    }
};

type SandboxMode = 'js' | 'raw' | 'dom';

type Resource = {
    name: string,
    url: string,
    error?: string,
    content?: string,
    meta?: string
};

type WebRequestRule = {
    selector: { include?: string | string[], match?: string | string[], exclude?: string | string[] } | string,
    action: string | {
        cancel?: boolean,
        redirect?: {
            url: string,
            from?: string,
            to?: string
        } | string
    }
};

const GM_info: ScriptGetInfo = {};

const unsafeWindow: Window;

function GM_setValue<T>(key: string, value: T): void;
function GM_getValue<T>(key: string): T | undefined;
function GM_getValue<T>(key: string, defaultValue?: T): T;
function GM_listValues(): string[];
function GM_deleteValue(key: string): void;
function GM_addElement(tag_name: string, attributes: object): void;
function GM_addElement(parent_node: Element, tag_name: string, attributes: object): void;
function GM_openInTab(url: string, options: {
    active?: boolean; insert?: boolean; setParent?: boolean;
    incognito?: boolean; loadInBackground?: boolean;
}): { close: () => unknown; onclose: (listener: EventListenerOrEventListenerObject) => unknown; closed: boolean; };
function GM_openInTab(url: string, loadInBackground: boolean): {
    close: () => unknown; onclose: (listener: EventListenerOrEventListenerObject) => unknown; closed: boolean;
};
function GM_registerMenuCommand(
    name: string, callback: (event: MouseEvent | KeyboardEvent) => unknown, accessKey?: string
): number;
