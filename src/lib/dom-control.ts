export {
    afterHead, fadeInLoad,
    injectCSSRule, injectCSSList, injectCSSFile,
    defaultStyle, fadeInElems
};

"use strict";

const defaultStyle = document.createElement("style");  // 默认默认样式
const fadeInElems: string[] = [];
const fadeInClass = "fade-in-elem";

class _stringKeyObj {
    [prop: string]: unknown;
}

// 插入默认样式
afterHead(() => {
    document.head.appendChild(defaultStyle);
});

function injectCSSRule(tag: string, selector: string, cssObject: _stringKeyObj) {
    if (selector === "") return;

    const cssTag = document.getElementById(tag);

    let styleString = selector + " {\n";
    for (const prop in cssObject) {
        const cssProp = prop.replace(/[A-Z]/, (c) => {
            return "-" + c.toLowerCase();
        });
        styleString += cssProp + ": " + cssObject[prop] + "\n";
    }
    styleString += "}";

    if (cssTag === null) {
        const head = document.getElementsByTagName("head");
        const cssheet = document.createElement("style");
        cssheet.id = tag;

        if (head && head.length) {
            head[0].appendChild(cssheet);
        }
    }

    document.styleSheets[0].insertRule(styleString);
}

/**
 * 让函数等待 `head` 标签可操作后执行。若当前已可操作 `head` 则会立即执行
 * @param callbackfn 回调函数
 */
function afterHead(callbackfn: () => void) {
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
function injectCSSList(css: string): HTMLStyleElement {
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
function injectCSSFile(filename: string): HTMLLinkElement {
    const linkElem = document.createElement("link");
    linkElem.rel = "stylesheet";
    linkElem.href = filename;
    afterHead(() => {
        document.head.appendChild(linkElem);
    });
    return linkElem;
}

/**
 * 元素淡入动画
 * @param selector QuerySelector 字符串
 */
function fadeInLoad(selector: string) {
    $(selector).toArray().forEach(elem => {
        elem.classList.add(fadeInClass);
        elem.addEventListener("animationend", () => {
            elem.style.opacity = "1";
            elem.classList.remove(fadeInClass);
        });
    });
}
