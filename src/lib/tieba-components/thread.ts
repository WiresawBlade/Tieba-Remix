import { defaults, map } from "lodash-es";
import { DOMS } from "../elemental";
import { TiebaForum } from "./forum";
import { transEmojiFromDOMString } from "../api/tieba";

export interface ThreadContent {
    post: HTMLDivElement;
    replyButton: HTMLAnchorElement;
    dataField: string;
    isLouzhu: boolean;

    profile: {
        avatar: HTMLAnchorElement;
        nameAnchor: HTMLAnchorElement;
        level: number;
        badgeTitle: string;
    }

    tail: {
        location: string;
        platform: string;
        floor: string;
        time: string;
    }
}

export interface TiebaThread {
    title: string;
    reply: number;
    pages: number;

    displayWrapper: HTMLDivElement;
    lzOnlyButton: HTMLAnchorElement;
    favorButton: HTMLAnchorElement;

    forum: TiebaForum;
    cotents: ThreadContent[];

    pager: {
        listPager: HTMLLIElement;
        jumper: {
            textbox: HTMLInputElement;
            submitButton: HTMLButtonElement;
        }
    }
}

export interface PostDataField {
    author: {
        portrait: string;
        props: unknown;
        user_id: number;
        user_name: string;
        user_nickname: string;
    }

    content: {
        builderId: number;
        /** 评论数量 */
        comment_num: number;
        /** 待解析的 HTML */
        content: string;
        forum_id: number;
        isPlus: number;
        is_anonym: number;
        is_fold: number;
        pb_tpoint: unknown;
        post_id: number;
        /** 当前楼层在当前页的实际位置 */
        post_index: number;
        /** 一般意义上的楼层数 */
        post_no: number;
        props: unknown;
        thread_id: number;
        type: "0"
    }
}

export function threadParser(dom: Document): TiebaThread;
export function threadParser(html: string): TiebaThread;
export function threadParser(param: Document | string): TiebaThread {
    let dom: Document;
    if (typeof param === "string")
        dom = new DOMParser().parseFromString(transEmojiFromDOMString(param), "text/html");
    else
        dom = param;

    const postWrappers = DOMS(".l_post", "div", dom.body);
    const contents = DOMS(".d_post_content", "div", dom.body);
    const dAuthors = DOMS(".d_author", "div", dom.body);
    const avatars = DOMS(".p_author_face", "a", dom.body);
    const nameAnchors = DOMS(".p_author_name", "a", dom.body);
    const levels = DOMS(".d_badge_lv", "div", dom.body);
    const badgeTitles = DOMS(".d_badge_title", "div", dom.body);

    const replyButtons = DOMS(".lzl_link_unfold", "a", dom.body);

    const locations = map(DOMS(".post-tail-wrap span:first-child, .ip-location", "span", dom.body), el => el.innerText);
    const platforms = map(DOMS(".tail-info a, .p_tail_wap", "a", dom.body), el => el.innerText);
    const floors = map(DOMS(".j_jb_ele + .tail-info + .tail-info, .p_tail li:first-child span", "span", dom.body), el => el.innerText);
    const times = map(DOMS(".post-tail-wrap span:nth-last-child(2), .p_tail li:last-child span", "span", dom.body), el => el.innerText);

    const threadContents: ThreadContent[] = [];

    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.add("floor-content");
        avatars[i].classList.add("floor-avatar");
        nameAnchors[i].classList.add("floor-name");

        threadContents.push({
            post: contents[i],
            replyButton: replyButtons[i],
            dataField: defaults(postWrappers[i].getAttribute("data-field"), ""),
            isLouzhu: DOMS(".louzhubiaoshi_wrap", dAuthors[i]).length > 0,

            profile: {
                avatar: avatars[i],
                nameAnchor: nameAnchors[i],
                level: parseInt(levels[i].innerText),
                badgeTitle: badgeTitles[i].innerText,
            },
            tail: {
                location: locations[i],
                platform: platforms[i],
                floor: floors[i],
                time: times[i],
            },
        });
    }

    const thread: TiebaThread = {
        displayWrapper: DOMS(".wrap2", "div", dom.body)[0],
        title: PageData.thread.title,
        reply: parseInt(DOMS(".l_reply_num span:nth-child(1)", "span", dom.body)[0].innerText),
        pages: PageData.pager.total_page,
        lzOnlyButton: DOMS("#lzonly_cntn", "a", dom.body)[0],
        favorButton: DOMS(".j_favor", "a", dom.body)[0],

        cotents: threadContents,
        forum: {
            info: {
                name: PageData.forum.forum_name,
                // followersDisplay: DOMS(".card_menNum", "span", dom.body)[0].innerText,
                // postsDisplay: DOMS(".card_infoNum", "span", dom.body)[0].innerText,
            },

            components: {
                nameAnchor: DOMS(".card_title_fname", "a", dom.body)[0],
                iconContainer: DOMS(".card_head a, .plat_picbox", "a", dom.body)[0],
                followButton: DOMS(".card_head .focus_btn", "a", dom.body)[0],
                signButton: DOMS(".j_sign_box", "a", dom.body)[0],
            },
        },
        pager: {
            listPager: DOMS(".pb_list_pager", "li", dom.body)[0],
            jumper: {
                textbox: DOMS(".jump_input_bright", "input", dom.body)[0],
                submitButton: DOMS(".jump_btn_bright", "button", dom.body)[0],
            },
        },
    };

    return thread;
}
