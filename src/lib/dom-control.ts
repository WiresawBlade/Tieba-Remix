import { kebabCase, trim } from "lodash-es";

const defaultStyle = document.createElement("style");  // 默认默认样式
export const fadeInElems: string[] = [];
const fadeInClass = "fade-in-elem";

type Mapped<T> = {
    [prop in keyof T]?: T[prop];
}

defaultStyle.id = "default-stylesheet";

// 插入默认元素
afterHead(() => {
    document.head.appendChild(defaultStyle);
});

/**
 * 利用 CSS 选择器快速选择 DOM 元素
 * @param selector 选择器字符串
 */
export function DOMSelector(selector: string): HTMLElement[];
/**
 * 该函数会根据 `type` 参数返回对应类型的元素数组，而不是 `NodeList`
 * @param selector 选择器字符串
 * @param type 选择的元素的标签名
 */
export function DOMSelector<T extends keyof HTMLElementTagNameMap>(
    selector: string, type: T
): HTMLElementTagNameMap[T][];

export function DOMSelector<T extends keyof HTMLElementTagNameMap>(selector: string, _type?: T): any {
    const sel = trim(selector);

    // switch (sel[0]) {
    //     case "#":
    //         return document.getElementById(sel);

    //     case ".":
    //         if (!includes(sel, " ") && !includes(sel, "."))
    //             return document.getElementsByClassName(sel);
    // }

    console.log("DOMSelector", "DEFAULT", sel);
    return document.querySelectorAll(sel);
}

/**
 * 让函数等待 `head` 标签可操作后执行。若当前已可操作 `head` 则会立即执行
 * @param callbackfn 回调函数
 */
export function afterHead(callbackfn: () => void) {
    new Promise<void>((_resolve, reject) => {
        try {
            const head = document.getElementsByTagName("head");
            if (head && head.length) {
                callbackfn();
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * 将 CSS 字符串作为 `style` 标签注入 `head`
 * @param css CSS 字符串
 * @returns 被注入的 `style` 元素
 */
export function injectCSSList(css: string): HTMLStyleElement {
    const cssElem = document.createElement("style");
    cssElem.innerText = css;
    afterHead(() => {
        document.head.appendChild(cssElem);
    });
    return cssElem;
}

/**
 * 将 CSS 路径作为 `link` 标签注入 `head`
 * @param css CSS 文件路径
 * @returns 被注入的 `link` 元素
 */
export function injectCSSFile(filename: string): HTMLLinkElement {
    const linkElem = document.createElement("link");
    linkElem.rel = "stylesheet";
    linkElem.href = filename;
    afterHead(() => {
        document.head.appendChild(linkElem);
    });
    return linkElem;
}

/**
 * 
 * @param selector 选择器
 * @param cssObject 包含 CSS 规则的对象，属性默认使用驼峰命名法
 * @returns 该规则的 index
 */
export function injectCSSRule(selector: string, cssObject: Mapped<CSSStyleDeclaration>) {
    if (selector === "") return;
    if (cssObject.length === 0) return;

    let css = selector + "{";

    for (const key in cssObject) {
        const value = cssObject[key];
        css += kebabCase(key) + ":" + value + ";";
    }

    css += "}";

    return defaultStyle.sheet?.insertRule(css);
}

/**
 * 删除一个自定义 CSS 规则
 * @param index 需要删除的规则对应的 index
 */
export function removeCSSRule(index: number) {
    defaultStyle.sheet?.deleteRule(index);
}

/**
 * 元素淡入动画
 * @param selector QuerySelector 字符串
 */
export function fadeInLoad(selector: string) {
    DOMSelector(selector).forEach(elem => {
        elem.classList.add(fadeInClass);
        elem.addEventListener("animationend", () => {
            elem.style.opacity = "1";
            elem.classList.remove(fadeInClass);
        });
    });
}

export function injectWidget(html: string) {
    const widget = document.createElement("div");
    widget.classList.add("user-widget");
    widget.innerHTML = html;
    document.addEventListener("DOMContentLoaded", () => {
        document.body.insertBefore(widget, document.body.firstChild);
    });
    return widget;
}
