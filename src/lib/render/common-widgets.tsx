import HeaderProgress, { HeaderProgressProps } from "@/components/header-progress.vue";
import { DOMS } from "../elemental";
import { waitUtil } from "../utils";
import { appendJSX, insertJSX } from "./jsx-extension";

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
                <div class="float-content">{message}</div>
            </div>, document.body);
    }
    const floatMessage = DOMS(".float-message", "div")[0];
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
            const x = e.clientX + 10;
            const y = e.clientY + 10;
            floatMessage.style.left = `${x}px`;
            floatMessage.style.top = `${y}px`;
            floatMessage.style.display = "block";
        }, delay);
    });
}
