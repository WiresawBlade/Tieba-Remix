import { Component, createApp } from "vue";
import { createNewElement } from "./domlib";
import { forEach, includes } from "lodash-es";
import dialogWrapperVue from "@/components/utils/dialog-wrapper.vue";

export function renderComponent(
    root: Component,
    container: string | Element,
    rootProps?: LiteralObject) {
    const app = createApp(root, rootProps);
    app.mount(container);
    return app;
}

export function renderPage(root: Component, rootProps?: LiteralObject) {
    if (document.getElementsByTagName("body").length === 0) {
        document.documentElement.appendChild(createNewElement("body"));
    }

    removeDefault();

    document.body.appendChild(createNewElement("div", {
        "id": "carousel_wrap"
    }));

    return renderComponent(root, "body", rootProps);
}

export function renderDialog(dialog: Component, childProps?: LiteralObject, wrapperProps?: LiteralObject) {
    const dialogWrapper = createApp(dialogWrapperVue, {
        dialog: dialog,
        childProps: childProps,
        ...wrapperProps
    });

    if (!document.getElementById("dialog-wrapper")) {
        document.body.insertBefore(createNewElement("div", {
            "id": "dialog-wrapper"
        }), document.body.firstChild);
    }

    dialogWrapper.mount("#dialog-wrapper");
    return dialogWrapper;
}

export function unloadDialog() {
    const dialogWrapper = document.getElementById("dialog-wrapper");
    if (dialogWrapper)
        dialogWrapper.remove();
}

export function removeDefault() {
    forEach(document.head.children, (el) => {
        if (el && el.tagName.toUpperCase() === "LINK"
            && includes(el.getAttribute("href"), "static-common/style")) {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "SCRIPT"
            && includes(el.getAttribute("src"), "static-common/lib")) {
            el.remove();
        }
    });

    document.getElementById("com_userbar")?.remove();

    forEach(document.body.children, (el) => {
        if (el && el.tagName.toUpperCase() === "STYLE") {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "SCRIPT") {
            el.remove();
        }

        if (el && el.tagName.toUpperCase() === "IFRAME") {
            el.remove();
        }

        if (el && includes(el.className, "translatorExtension")) {
            el.remove();
        }

        if (el && includes(el.className, "dialogJ")) {
            el.remove();
        }
    });
}
