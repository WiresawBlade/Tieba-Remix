import ThreadEditor, { ThreadEditorProps } from "@/components/thread-editor.vue";
import togglePanelVue, { TogglePanelProps } from "@/components/toggle-panel.vue";
import UserButton from "@/components/utils/user-button.vue";
import { currentPageType } from "@/lib/api/remixed";
import { levelToClass } from "@/lib/api/tieba";
import { DOMS, templateCreate } from "@/lib/elemental";
import { injectCSSList } from "@/lib/elemental/styles";
import { remixedObservers } from "@/lib/observers";
import { renderDialog } from "@/lib/render";
import { bindFloatMessage } from "@/lib/render/common-widgets";
import { appendJSX, insertJSX } from "@/lib/render/jsx-extension";
import { floatBar } from "@/lib/tieba-components/float-bar";
import { compactLayout, pageExtension } from "@/lib/user-values";
import { waitUtil } from "@/lib/utils";
import { ElConfigProvider, ElPagination } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { find, forEach, some } from "lodash-es";
import { ref, watch } from "vue";
import compactCSS from "./compact.scss?inline";
import { threadParser } from "./parser";
import threadCSS from "./thread.scss?inline";

export default async function () {
    if (!pageExtension.get().thread) return;
    if (currentPageType() !== "thread") return;

    injectCSSList(threadCSS);
    injectCSSList(compactCSS);

    await waitUtil(() => document.body !== undefined).then(function () {
        // document.body.insertBefore(mainWrapper, document.body.firstChild);
        if (compactLayout.get()) {
            document.body.toggleAttribute("compact-layout");
        }
    });

    waitUtil(() => floatBar.get() !== undefined).then(function () {
        floatBar.add("other", function () {
            renderDialog<TogglePanelProps>(togglePanelVue, {
                toggles: [
                    {
                        icon: "favorite",
                        name: "收藏",
                        defaultValue: (function () {
                            return DOMS(".j_favor, #j_favthread .p_favthr_main")[0].innerText === "收藏" ? false : true;
                        })(),
                        event() {
                            DOMS(".j_favor, #j_favthread .p_favthr_main")[0].click();
                        },
                    },
                    {
                        icon: "face_6",
                        name: "只看楼主",
                        defaultValue: (function () {
                            return DOMS("#lzonly_cntn")[0].innerText === "只看楼主" ? false : true;
                        })(),
                        event() {
                            DOMS("#lzonly_cntn")[0].click();
                        },
                    },
                    {
                        icon: "compare_arrows",
                        name: "紧凑布局",
                        defaultValue: (() => compactLayout.get())(),
                        event() {
                            document.body.toggleAttribute("compact-layout");
                            compactLayout.set(!compactLayout.get());
                        },
                    },
                ],
            });
        }, "module-settings", "menu");

        document.body.insertBefore(templateCreate("div", {
            class: "vue-module-control",
            style: "display: none;",
        }), document.body.firstChild);
    });

    const content = DOMS(".content", "div")[0];
    const pbContent = DOMS("#pb_content", "div")[0];
    const postList = DOMS("#j_p_postlist")[0];

    createContents();
    async function createContents() {
        const threadList = (await waitUtil(() => DOMS("#j_p_postlist").length > 0).then(() => DOMS("#j_p_postlist")))[0];

        threadList.classList.add("content-wrapper");

        const thread = threadParser();

        const forumIconLink = (thread.forum.components.iconContainer.children[0] as HTMLImageElement).src;  // 分辨率比从 PageData 中获取到的更高

        insertJSX(
            <div id="title-wrapper" class="title-wrapper">
                <h3 class="thread-title">{PageData.thread.title}</h3>

                <div class="forum-container">
                    <img class="forum-icon" src={forumIconLink} alt="" />
                    <a class="forum-name" href={`/f?kw=${PageData.forum.name_url}`} target="_blank">{PageData.forum.forum_name} 吧</a>

                    <div class="button-container">
                        <UserButton class="icon forum-button add-forum-button" shadow-border>{PageData.user.is_like ? "check" : "add"}</UserButton>
                        {/* {PageData.user.is_like ? <UserButton class="outline-icon forum-button sign-in-button" shadow-border>{PageData.is_sign_in ? "assignment_turned_in" : "assignment"}</UserButton> : null} */}
                    </div>
                </div>
            </div>, DOMS(".content")[0], DOMS("#pb_content")[0]);

        // 绑定事件
        bindFloatMessage(DOMS(".forum-container")[0],
            `关注 ${PageData.forum.member_count}，帖子 ${PageData.forum.post_num}`);
        DOMS(".add-forum-button", "button")[0].addEventListener("click", function () {
            DOMS("#j_head_focus_btn", "button")[0].click();
        });
        DOMS(".sign-in-button", "button")[0]?.addEventListener("click", function () {
            DOMS(".j_signbtn", "button")[0].click();
        });

        remixedObservers.postsObserver.addEvent(function () {
            if (DOMS(".d_author").length === 0) return;

            // thread = threadParser(document);
            forEach(DOMS(".d_post_content_main", "div", threadList), (floor, i) => {
                const authorContainer = createAuthorContainer(i);
                floor.insertBefore(authorContainer, floor.firstChild);
            });

            // 去除左侧用户栏
            forEach(DOMS(".d_author"), el => el.remove());
        });

        function createAuthorContainer(index: number) {
            const authorContainer = templateCreate("div", {
                class: "author-container",
            });

            thread.cotents[index].profile.nameAnchor.classList.add("anchor");

            authorContainer.appendChild(thread.cotents[index].profile.avatar);
            authorContainer.appendChild(thread.cotents[index].profile.nameAnchor);

            const badgeContainer = appendJSX<HTMLDivElement>(<div class="badge-container"></div>, authorContainer);

            appendJSX(
                <div class={`floor-badge level-${levelToClass(thread.cotents[index].profile.level)}`}>
                    <div class="badge-level">{thread.cotents[index].profile.level}</div>
                    <div class="badge-title">{thread.cotents[index].profile.badgeTitle}</div>
                </div>, badgeContainer.el);

            if (thread.cotents[index].isLouzhu)
                appendJSX(<div class="floor-badge">楼主</div>, badgeContainer.el);

            return authorContainer;
        }

        // 头像 lazy load
        const avatarObserver = new IntersectionObserver(function (entries, observer) {
            forEach(entries, function (entry) {
                if (entry.isIntersecting) {
                    const avatar = entry.target.children[0] as HTMLImageElement;
                    const lazyLink = avatar.getAttribute("data-tb-lazyload");

                    if (avatar.src !== lazyLink) {
                        if (lazyLink)
                            avatar.src = lazyLink;
                        else
                            observer.unobserve(entry.target);
                    } else {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        });

        forEach(thread.cotents, content => {
            avatarObserver.observe(content.profile.avatar);
        });

        // 对于部分吧，无法自动加载楼中楼内容，需要手动激活
        // const lzlObserver = new IntersectionObserver(function (entries, observer) {
        //     forEach(entries, function (entry) {
        //         if (entry.isIntersecting) {
        //             const el = entry.target as HTMLDivElement;
        //             if (el.classList.contains("hideLzl")) {
        //                 el.classList.remove("hideLzl");
        //                 observer.unobserve(el);
        //             }
        //         }
        //     });
        // }, {
        //     root: null,
        //     rootMargin: "0px",
        //     threshold: 0.5,
        // });

        // forEach(DOMS(".l_post"), floorContainer => {
        //     const hidden = DOMS(".hideLzl", "div", floorContainer);
        //     if (hidden.length > 0)
        //         lzlObserver.observe(hidden[0]);
        // });

        // 图片绑定组件
        // remixedObservers.postsObserver.addEvent(function () {
        //     forEach(DOMS(".BDE_Image", "img"), function (el) {
        //         if (!el.classList.contains("image-component")) {
        //             el.classList.add("image-component");
        //             el.onclick = function () {
        //                 renderDialog<ImageViewerProps>(imagesViewerVue, {
        //                     content: el.src,
        //                 });
        //             };
        //         }
        //     });
        // });

        // 去除楼中楼用户发言的冒号
        remixedObservers.commentsObserver.addEvent(() => {
            forEach(DOMS(".lzl_cnt"), el => {
                forEach(el.childNodes, node => {
                    if (node)
                        node.nodeType === 3 ? node.remove() : void 0;
                });
            });
        });

        // 由于容器移动，需要重启 observer
        // remixedObservers.postsObserver.observe();
        // remixedObservers.commentsObserver.observe();
    }

    // pager 相关
    const currPage = ref(PageData.pager.cur_page);
    const createPager = () =>
        <ElConfigProvider locale={zhCn}>
            <ElPagination
                v-model:current-page={currPage.value}
                background={true}
                page-size={1}
                pager-count={11}
                total={PageData.pager.total_page}
                defaultCurrentPage={PageData.pager.cur_page}
                layout="prev, pager, next, jumper, ->"
                style="margin-bottom: 6px;">
            </ElPagination>
        </ElConfigProvider>;
    watch(currPage, newValue => {
        const search = new URLSearchParams(location.search);
        search.set("pn", newValue.toString());
        location.href = `${location.pathname}?${search.toString()}`;
    });
    insertJSX(createPager(), postList, postList.firstChild);

    createTextbox();
    async function createTextbox() {
        await waitUtil(() => floatBar.get() !== undefined);
        await waitUtil(() => DOMS("#ueditor_replace").length > 0);

        if (!some(floatBar.buttons(), { type: "post" })) {
            floatBar.add("post", showEditor, undefined, undefined, 2);
        }

        const postButton = find(floatBar.buttons(), button => {
            return button.type === "post";
        });
        postButton?.el.addEventListener("click", showEditor);

        // 添加末尾帖子回复入口
        appendJSX(
            <div id="thread-jsx-components">
                {createPager()}
                {/* @ts-ignore */}
                <UserButton class="dummy-button" noBorder onClick={showEditor}>回复帖子</UserButton>
            </div>, content);

        function showEditor() {
            const ueditor = (function () {
                if (DOMS(".edui-container").length > 0)
                    return DOMS(".edui-container")[0];
                return DOMS("#ueditor_replace")[0];
            })();
            renderDialog<ThreadEditorProps>(ThreadEditor, {
                ueditor: ueditor,
                type: "reply",
            }, { forced: true, blurEffect: false, darker: true });
        }
    }
}
