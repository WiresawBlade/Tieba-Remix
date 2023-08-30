declare module "*.json";

interface LiteralObject {
    [prop: string]: any
}

type ValueOf<T> = T[keyof T]

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

interface SimpleButton {
    title: string
    event: (() => void)
}

interface Meta {
    author: string;
    description: string;
    downloadURL: string;
    grant: string[];
    icon: string;
    icon64: string;
    license: string;
    match: string[];
    name: string;
    namespace: string;
    "run-at": string;
    updateURL: string;
    version: string;
}
