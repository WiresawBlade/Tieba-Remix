import { kebabCase, merge } from "lodash-es";

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
export function DOMS(selector: string): HTMLElement[];
/**
 * 该函数会根据 `type` 参数返回对应类型的元素数组，而不是 `NodeList`
 * @param selector 选择器字符串
 * @param type 选择的元素的标签名
 */
export function DOMS<T extends keyof HTMLElementTagNameMap>(
    selector: string, type: T
): HTMLElementTagNameMap[T][];

export function DOMS<T extends keyof HTMLElementTagNameMap>(selector: string, _type?: T): any {
    return document.querySelectorAll(selector);
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
                if (({}).toString.call(obj) === "[object Object]" && obj) {
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
    for (const key in attrs) {
        const value = attrs[key];

        if (value !== node.getAttribute(key)) {
            if (({}).toString.call(value) === "[object Object]") {
                node.setAttribute(key, JSON.stringify(attrs[key]));
            } else {
                node.setAttribute(key, attrs[key]);
            }
        }
    }
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

// type ChildElementPosition = "first" | "last" | HTMLElement;

// /**
//  * 快速插入元素
//  * @param parent 被插入元素的父元素
//  * @param tag 待插入元素的 tag
//  * @param position 将元素插入到父元素的哪个位置
//  * @param attrs 被插入元素属性初始化
//  * @deprecated
//  */
// export function injectNode<T extends keyof HTMLElementTagNameMap>(
//     parent: HTMLElement, tag: T, position?: ChildElementPosition, attrs?: { [prop: string]: any }
// ): HTMLElementTagNameMap[T] {
//     const elem = createNode(tag, attrs);

//     switch (position) {
//         case undefined: {
//             parent.appendChild(elem);
//             break;
//         }

//         case "first": {
//             parent.prepend(elem);
//             break;
//         }

//         case "last": {
//             parent.appendChild(elem);
//             break;
//         }

//         default: {
//             parent.insertBefore(elem, position);
//             break;
//         }
//     }

//     return elem;
// }

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
export function injectCSSRule(selector: string, cssObject: Mapped<CSSStyleDeclaration>) {
    if (selector === "") return;
    if (cssObject.length === 0) return;
    if (!defaultStyle.sheet) return;

    let css = selector + "{";

    for (const key in cssObject) {
        const value = cssObject[key];
        css += kebabCase(key) + ":" + value + ";";
    }

    css += "}";

    return defaultStyle.sheet.insertRule(css);
}

/**
 * 删除一个自定义 CSS 规则
 * @param index 需要删除的规则对应的 index
 */
export function removeCSSRule(index: number) {
    defaultStyle.sheet?.deleteRule(index);
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

/** @deprecated */
export function injectWidget(html: string) {
    const widget = document.createElement("div");
    widget.classList.add("user-widget");
    widget.innerHTML = html;
    document.addEventListener("DOMContentLoaded", () => {
        document.body.insertBefore(widget, document.body.firstChild);
    });
    return widget;
}
