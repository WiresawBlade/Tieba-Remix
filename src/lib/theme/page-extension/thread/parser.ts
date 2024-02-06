import { DOMS } from "@/lib/elemental";
import { TiebaForum } from "@/lib/tieba-components/forum";
import { defaults, map } from "lodash-es";

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

export function threadParser(): TiebaThread {
    const postWrappers = DOMS(".l_post", "div");
    const contents = DOMS(".d_post_content", "div");
    const dAuthors = DOMS(".d_author", "div");
    const avatars = DOMS(".p_author_face", "a");
    const nameAnchors = DOMS(".p_author_name", "a");
    const levels = DOMS(".d_badge_lv", "div");
    const badgeTitles = DOMS(".d_badge_title", "div");

    const replyButtons = DOMS(".lzl_link_unfold", "a");

    const locations = map(DOMS(".post-tail-wrap span:first-child, .ip-location", "span"), el => el.innerText);
    const platforms = map(DOMS(".tail-info a, .p_tail_wap", "a"), el => el.innerText);
    const floors = map(DOMS(".j_jb_ele + .tail-info + .tail-info, .p_tail li:first-child span", "span"), el => el.innerText);
    const times = map(DOMS(".post-tail-wrap span:nth-last-child(2), .p_tail li:last-child span", "span"), el => el.innerText);

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
        displayWrapper: DOMS(true, ".wrap2", "div"),
        title: PageData.thread.title,
        reply: parseInt(DOMS(true, ".l_reply_num span:nth-child(1)", "span").innerText),
        pages: PageData.pager.total_page,
        lzOnlyButton: DOMS(true, "#lzonly_cntn", "a"),
        favorButton: DOMS(true, ".j_favor", "a"),

        cotents: threadContents,
        forum: {
            info: {
                name: PageData.forum.forum_name,
                // followersDisplay: DOMS(true, ".card_menNum", "span").innerText,
                // postsDisplay: DOMS(true, ".card_infoNum", "span").innerText,
            },

            components: {
                nameAnchor: DOMS(true, ".card_title_fname", "a"),
                iconContainer: DOMS(true, ".card_head a, .plat_picbox", "a"),
                followButton: DOMS(true, ".card_head .focus_btn", "a"),
                signButton: DOMS(true, ".j_sign_box", "a"),
            },
        },
        pager: {
            listPager: DOMS(true, ".pb_list_pager", "li"),
            jumper: {
                textbox: DOMS(true, ".jump_input_bright", "input"),
                submitButton: DOMS(true, ".jump_btn_bright", "button"),
            },
        },
    };

    return thread;
}
