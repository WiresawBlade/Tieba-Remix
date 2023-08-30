import { forOwn, kebabCase, merge } from "lodash-es";
import { isRealObject } from "./utils";

const defaultStyle = document.createElement("style");  // 默认默认样式
export const fadeInElems: string[] = [];
const fadeInClass = "fade-in-elem";

defaultStyle.id = "default-stylesheet";

// 插入默认元素
afterHead(() => {
    document.head.appendChild(defaultStyle);
});

/**
 * 利用 CSS 选择器快速选择 DOM 元素
 * @param selector 选择器字符串
 * @param parent 从哪个元素开始查找
 */
export function DOMS(selector: string, parent?: Element): HTMLElement[];
/**
 * 该函数会根据 `type` 参数返回对应类型的元素数组，而不是 `NodeList`
 * @param selector 选择器字符串
 * @param type 选择的元素的标签名
 * @param parent 从哪个元素开始查找
 */
export function DOMS<T extends keyof HTMLElementTagNameMap>(
    selector: string, type: T, parent?: Element
): HTMLElementTagNameMap[T][];

export function DOMS<_T extends keyof HTMLElementTagNameMap>(...args: any[]): any {
    const selector = args[0];
    switch (args.length) {
        case 1:
            return document.querySelectorAll(selector);
        case 2:
            if (args[1] instanceof Element) {
                return (args[1] as Element).querySelectorAll(selector);
            } else {
                return document.querySelectorAll(selector);
            }
        case 3:
            return (args[2] as Element).querySelectorAll(selector);
    }
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
 * 获取某节点所有属性值
 * @param node 目标节点
 * @returns 包含该节点所有属性值的对象
 */
export function getNodeAttrs(node: HTMLElement) {
    const attrs = node.attributes;
    const des: LiteralObject = {};

    for (const attr of attrs) {
        des[attr.name] = attr.value;
    }

    return des;
}

/**
 * 获取某节点所有属性值，同时解析属性值中的对象
 * @param node 目标节点
 * @returns 包含该节点所有属性值的对象
 */
export function getNodeAttrsDeeply(node: HTMLElement) {
    const attrs = node.attributes;
    const des: LiteralObject = {};

    for (const attr of attrs) {
        if (typeof attr.value === "string") {
            try {
                const obj = JSON.parse(attr.value);
                if (isRealObject(obj)) {
                    des[attr.name] = obj;
                }
            } catch (error) {
                des[attr.name] = attr.value;
            }
        } else {
            des[attr.name] = attr.value;
        }
    }

    return des;
}

/**
 * 将一个属性对象与目标节点的属性进行合并
 * @param node 目标节点
 * @param attrs 待合并的属性对象
 * @returns 合并后的节点属性对象
 */
export function mergeNodeAttrs<T extends HTMLElement>(
    node: T, attrs: LiteralObject
) {
    forOwn(attrs, (value, key) => {
        if (value !== node.getAttribute(key)) {
            if (isRealObject(value)) {
                node.setAttribute(key, JSON.stringify(attrs[key]));
            } else {
                node.setAttribute(key, attrs[key]);
            }
        }
    });
}

/**
 * 将一个属性对象与目标节点的属性进行深度合并
 * @param node 目标节点
 * @param attrs 待合并的属性对象
 * @returns 合并后的节点属性对象
 */
export function mergeNodeAttrsDeeply<T extends HTMLElement>(
    node: T, attrs: LiteralObject
) {
    const src = getNodeAttrsDeeply(node);
    const des = merge(src, attrs);
    mergeNodeAttrs(node, des);
}

/**
 * 创建一个新节点
 * @param tag 待创建节点的标签
 * @param attrs 该节点的属性值
 * @param doc 从哪个 `Document` 创建节点
 * @returns 被创建的节点
 */
export function createNewElement<T extends keyof HTMLElementTagNameMap>(
    tag: T, attrs?: LiteralObject, children?: HTMLElement[], doc?: Document
): HTMLElementTagNameMap[T] {
    const DOC = doc ? doc : document;
    const elem = DOC.createElement(tag);

    if (attrs) {
        mergeNodeAttrs(elem, attrs);
    }

    if (children) {
        for (const child of children) {
            elem.appendChild(child);
        }
    }

    return elem;
}

export function parseCSSObject(
    cssObject: OptionalMapped<CSSStyleDeclaration>
): string {
    let css = "";
    forOwn(cssObject, (value, key) => {
        css += kebabCase(key) + ":" + value + ";";
    });
    return css;
}

/**
 * 将 CSS 字符串作为 `style` 标签注入 `head`
 * @param css CSS 字符串
 * @returns 被注入的 `style` 元素
 */
export function injectCSSList(css: string): HTMLStyleElement {
    const cssElem = document.createElement("style");
    cssElem.textContent = css;
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
    mergeNodeAttrs(linkElem, {
        rel: "stylesheet",
        href: filename
    });
    afterHead(() => {
        document.head.appendChild(linkElem);
    });
    return linkElem;
}

/**
 * 
 * @param selector 选择器
 * @param cssObject 包含 CSS 规则的对象，属性默认使用驼峰命名法
 * @returns 该规则的 index 或 `undefined`
 */
export function injectCSSRule(selector: string, cssObject: OptionalMapped<CSSStyleDeclaration>) {
    if (selector === "") return;
    if (cssObject.length === 0) return;
    if (!defaultStyle.sheet) return;

    const css = selector + "{" + parseCSSObject(cssObject) + "}";
    return defaultStyle.sheet.insertRule(css);
}

/**
 * 删除一个自定义 CSS 规则
 * @param index 需要删除的规则对应的 index
 */
export function removeCSSRule(index: number) {
    if (!defaultStyle.sheet) return;
    console.log("delete", index);
    defaultStyle.sheet.deleteRule(index);
}

export function findParentByClass(elem: Element, parentClassName: string): Element | null {
    while (elem.parentElement?.className.indexOf(parentClassName) === -1) {
        elem = elem.parentElement;
    }
    return elem.parentElement;
}

/**
 * 元素淡入动画
 * @param selector QuerySelector 字符串
 */
export function fadeInLoad(selector: string) {
    DOMS(selector).forEach(elem => {
        elem.classList.add(fadeInClass);
        elem.addEventListener("animationend", () => {
            elem.style.opacity = "1";
            elem.classList.remove(fadeInClass);
        });
    });
}
