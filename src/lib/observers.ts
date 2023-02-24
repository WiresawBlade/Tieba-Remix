"use strict";

export const remixedObservers: RemixedObservers =  {
    postsObserver: {
        events: [],
        _observe: function () {
            const eventFuncs = () => {
                this.events.forEach(func => {
                    func();
                });
            };

            eventFuncs();

            const observer = new MutationObserver(eventFuncs);
            observer.observe($("#j_p_postlist").get(0)!, {
                childList: true
            });
        },
        addEvent: function (event: () => void) {
            for (let i = 0; i < this.events.length; i++) {
                const func = this.events[i];
                if (event === func) return;
            }

            event();
            this.events.push(event);
        }
    },

    commentsObserver: {
        events: [],
        _observe: function () {
            const eventFuncs = () => {
                this.events.forEach(func => {
                    func();
                });
            };

            eventFuncs();

            const observer = new MutationObserver(eventFuncs);
            observer.observe($("#j_p_postlist").get(0)!, {
                childList: true,
                subtree: true
            });
        },
        addEvent: function (event: () => void) {
            event();
            for (let i = 0; i < this.events.length; i++) {
                const func = this.events[i];
                if (event === func) return;
            }
            this.events.push(event);
        }
    }
};

interface RemixedObservers {
    // 回帖监视器
    postsObserver: ObsType,
    // 评论监视器
    commentsObserver: ObsType
}

interface ObsType {
    events: (() => void)[],
    _observe: () => void,
    addEvent: (event: () => void) => void
}
