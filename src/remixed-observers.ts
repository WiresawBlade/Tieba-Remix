const __remixedObservers: __obsInterface = {
    postsObserver: {
        events: [],
        observe: function () {
            const eventFuncs = () => {
                this.events.forEach(func => {
                    func();
                });
            };

            eventFuncs();

            const observer = new MutationObserver(eventFuncs);
            observer.observe(document.getElementById("j_p_postlist")!, {
                childList: true
            });
        },
        addEvent: function (event: () => void) {
            this.events.forEach(func => {
                if (event === func) return;
            });
            this.events.push(event);
        }
    },

    commentsObserver: {
        events: [],
        observe: function () {
            const eventFuncs = () => {
                this.events.forEach(func => {
                    func();
                });
            };

            eventFuncs();

            const observer = new MutationObserver(eventFuncs);
            observer.observe(document.getElementById("j_p_postlist")!, {
                childList: true,
                subtree: true
            });
        },
        addEvent: function (event: () => void) {
            this.events.forEach(func => {
                if (event === func) return;
            });
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
    observe: () => void,
    addEvent: (event: () => void) => void
}
