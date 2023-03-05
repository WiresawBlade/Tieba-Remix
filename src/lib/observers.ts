export class ObsType {
    constructor(selector: string, options?: MutationObserverInit) {
        this.selector = selector;
        this.options = options;
    }

    readonly selector: string;
    readonly options: MutationObserverInit | undefined;

    readonly events: (() => void)[] = [];

    readonly _observe: () => void = () => {
        const eventFuncs = () => {
            this.events.forEach(func => {
                func();
            });
        };

        eventFuncs();

        const observer = new MutationObserver(eventFuncs);
        const obsElem = $(this.selector).get(0);
        if (obsElem !== undefined) observer.observe(obsElem, this.options);
    };

    readonly addEvent: (event: () => void) => void = (event: () => void) => {
        if (this.events.includes(event)) return;
        event();
        this.events.push(event);
    };
}

/** 贴吧监控 */
export const remixedObservers =  {
    /** 楼层监控 */
    postsObserver: new ObsType("#j_p_postlist", { childList: true }),
    /** 楼中楼监控 */
    commentsObserver: new ObsType("#j_p_postlist", { childList: true, subtree: true }),
    /** 首页动态监控 */
    newListObserver: new ObsType("#new_list", { childList: true })
};
