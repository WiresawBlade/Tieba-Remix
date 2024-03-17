import HeaderProgress, { HeaderProgressProps } from "@/components/header-progress.vue";
import imagesViewerVue, { ImageViewerProps } from "@/components/images-viewer.vue";
import { renderDialog, scrollbarWidth } from ".";
import { DOMS } from "../elemental";
import { waitUtil } from "../utils";
import { appendJSX, insertJSX } from "./jsx-extension";

export function imagesViewer(props: ImageViewerProps) {
    renderDialog(imagesViewerVue, props, { blurEffect: false });
}

export function headerProgress(props: HeaderProgressProps, delay = 2000, timeout = 10000) {
    const progressBar = <HeaderProgress calc={props.calc}></HeaderProgress>;
    const rendered = insertJSX<HTMLDivElement>(progressBar, document.body, document.body.firstChild);
    const timeoutTimer = setTimeout(() => {
        rendered.el.remove();
    }, timeout);
    waitUtil(() => rendered.el.style.width === "100vw", timeout).then(function () {
        setTimeout(() => {
            rendered.el.remove();
            clearTimeout(timeoutTimer);
        }, delay);
    });
    return rendered;
}

/**
 * 将元素和浮动消息框进行绑定
 * @param target 需要绑定的元素
 * @param message 信息
 * @param delay 展示延迟。默认为 500
 */
export function bindFloatMessage(target: HTMLElement, message: string, delay = 500) {
    if (DOMS(".float-message").length <= 0) {
        appendJSX(
            <div class="float-message">
                <div class="float-content"></div>
            </div>, document.body);
    }
    const floatMessage = DOMS(true, ".float-message", "div");
    let timeout = -1;

    target.addEventListener("mouseenter", function () {
        if (timeout >= 0)
            clearTimeout(timeout);
    });

    target.addEventListener("mouseleave", function () {
        if (timeout >= 0)
            clearTimeout(timeout);

        floatMessage.style.display = "none";
    });

    target.addEventListener("mousemove", function (e) {
        if (timeout >= 0)
            clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (floatMessage.style.display !== "block") {
                floatMessage.innerText = message;
                floatMessage.style.visibility = "hidden";
                floatMessage.style.display = "block";
                floatMessage.style.top = "0";
                floatMessage.style.left = "0";

                const clientRect = floatMessage.getClientRects()[0];
                const PointerMargin = 10;

                const x = Math.min(
                    e.clientX + PointerMargin,
                    window.innerWidth - scrollbarWidth()
                    - Math.ceil(clientRect.width) // 修正误差
                );
                const y =
                    e.clientY + PointerMargin + clientRect.height > window.innerHeight
                        ? e.clientY - PointerMargin - clientRect.height
                        : e.clientY + PointerMargin;

                floatMessage.style.left = `${x}px`;
                floatMessage.style.top = `${y}px`;
                floatMessage.style.visibility = "";
            }
        }, delay);
    });
}
