const __remixedObservers: __obsInterface = {
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

interface __obsInterface {
    // 回帖监视器
    postsObserver: __obsType,
    // 评论监视器
    commentsObserver: __obsType
}

interface __obsType {
    events: (() => void)[],
    _observe: () => void,
    addEvent: (event: () => void) => void
}
