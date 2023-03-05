declare module "*.css";
declare module "*.css?inline";
declare module "*.svg";
declare module "*.ico";

interface ModuleType {
    [prop: string]: unknown;

    id: string;
    /** 需要显示给用户的模块名称 */
    name: string;
    author: string;
    version: string;
    description: string;

    switch?: boolean;
    scope: true | string | string[];
    runAt: "immediately" | "afterHead" | "DOMLoaded" | "loaded";
    entry: () => void;
}

/**
 * 屏蔽规则对象
 */
interface ShieldObject {
    /** 匹配规则，它可能是直接的屏蔽词，也可能是正则表达式 */
    rule: string;
    /** 描述当前规则的类型 */
    type: "string" | "RegExp";
    /** 作用域，屏蔽规则作用于贴子或用户 */
    scope: "posts" | "users";
    /** 是否启用该规则 */
    switch: boolean;
    /** 是否忽略大小写，默认忽略 */
    ignoreCase?: boolean;
    /** 是否匹配 innerHTML？默认匹配 textContent */
    matchHTML?: boolean;
}

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
