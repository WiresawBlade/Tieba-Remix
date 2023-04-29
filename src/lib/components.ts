import { Component, createApp } from "vue";
import { createNewElement } from "./domlib";
import { forEach, includes } from "lodash-es";

export function componentRender(
    root: Component,
    container: string | Element,
    rootProps?: LiteralObject) {
    const app = createApp(root, rootProps);
    app.mount(container);
    return app;
}

export function pageRender(root: Component, rootProps?: LiteralObject) {
    forEach(document.head.children, (el) => {
        if (el && el.tagName.toUpperCase() === "LINK"
            && includes(el.getAttribute("href"), "static-common/style")) {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "SCRIPT"
            && includes(el.getAttribute("src"), "static-common/lib")) {
            console.log(el);
            el.remove();
        }
    });

    document.body.appendChild(createNewElement("div", {
        "id": "carousel_wrap"
    }));

    return componentRender(root, "body", rootProps);
}
