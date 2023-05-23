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

const GM_info: {
    script: {
        name: string
        version: string
        description: string
        namespace: string
        author: string
        license: string
        homepageURL: string
        icon: string
        includes: string[]
        matches: string[]
        excludeMatches: string[]
        grant: string[]
    }
};

const unsafeWindow: Window;

function GM_setValue<T>(key: string, value: T): void;
function GM_getValue<T>(key: string): T | undefined;
function GM_getValue<T>(key: string, defaultValue?: T): T;
function GM_listValues(): unknown[];
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
