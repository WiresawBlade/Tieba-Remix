import { DOMS } from "./domlib";

export class ObsType {
    constructor(selector: string, options?: MutationObserverInit, initEvent?: keyof WindowEventMap) {
        this.selector = selector;
        this.options = options;
        this.initEvent = initEvent;
    }

    private readonly selector: string;
    private readonly options: MutationObserverInit | undefined;
    private readonly initEvent: keyof WindowEventMap | undefined;

    readonly events: (() => void)[] = [];

    readonly _observe: () => void = () => {
        const eventFuncs = () => {
            this.events.forEach(func => {
                func();
            });
        };

        if (typeof this.initEvent === "undefined") {
            eventFuncs();
        } else {
            window.addEventListener(this.initEvent, eventFuncs);
        }

        const observer = new MutationObserver(eventFuncs);
        const obsElem = DOMS(this.selector)[0];
        if (obsElem !== undefined) observer.observe(obsElem, this.options);
    };

    readonly addEvent: (event: () => void) => void = (event: () => void) => {
        if (this.events.includes(event)) return;
        if (typeof this.initEvent === "undefined") {
            event();
        } else {
            window.addEventListener(this.initEvent, event);
        }
        this.events.push(event);
    };
}

/** 贴吧监控 */
export const remixedObservers = {
    /** 楼层监控 */
    postsObserver: new ObsType("#j_p_postlist", { childList: true }),
    /** 楼中楼监控 */
    commentsObserver: new ObsType("#j_p_postlist", { childList: true, subtree: true }),
    /** 首页动态监控 */
    newListObserver: new ObsType("#new_list", { childList: true }),
    /** 进吧页面贴子监控 */
    threadListObserver: new ObsType("#pagelet_frs-list\\/pagelet\\/thread", { attributes: true }, "load")
};

Object.freeze(remixedObservers);
