import { forEach, join, split } from "lodash-es";
import { DOMS } from "./domlib";
import { carryDefault } from "./userlib";

/** 贴吧 API 请求链接 */
export const tiebaAPI = {
    /** 首页推荐 */
    feedlist: () =>
        `/f/index/feedlist?is_new=1&tag_id=like`,

    /** 用户头像 */
    profile: (portrait: string) =>
        `https://gss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG/sys/portrait/item/${portrait}`,

    /** 当前登录用户信息 */
    userInfo: (serverTime?: string) =>
        `/f/user/json_userinfo${serverTime ? "?_=" + serverTime : ""}`,

    /** 用户主页 */
    userHome: (portrait: string) =>
        `https://tieba.baidu.com/home/main?id=${portrait}&fr=index`,

    /** 搜索建议 */
    suggestions: (query?: string, encoding = "UTF-8", serverTime?: string) =>
        `/suggestion?query=${query ? query : ""}&ie=${encoding}${serverTime
            ? "&_=" + serverTime : ""}`,

    /** 贴吧热议 */
    topicList: () =>
        `/hottopic/browse/topicList`,

    /** 吧跳转 */
    forum: (keywords: string, encoding = "utf-8") =>
        `/f?ie=${encoding}&kw=${keywords}`,

    /** 未读消息 */
    unreadMessages: (serverTime?: string) =>
        `/im/pcmsg/query/getAllUnread?_=${serverTime ? serverTime : ""}`
};

/** 贴吧请求收到的响应 */
export interface TiebaResponse {
    no: number
    error: string
    data: LiteralObject
}

/** 推荐贴子请求收到的响应 */
export interface FeedListResponse extends TiebaResponse {
    data: {
        total: number
        has_more: number
        html: string
        last_tid: string
    };
}

/** 请求用户信息收到的响应 */
export interface UserInfoResponse extends TiebaResponse {
    data: {
        emial: string
        is_half_user: number
        is_login: boolean
        mobilephone: string
        no_un: number
        open_uid: number
        session_id: string
        show_nickname: string
        source_id: number
        user_is_verify: number
        user_itieba_id: string
        user_name_link: string
        user_name_show: string
        user_name_url: string
        user_name_weak: string
        user_open_space: number
        user_portrait: string
        weak_pwd: boolean
    }
}

export interface SearchData1 {
    content_num: number
    idx_num: number
    real_discuss_num: number
    sug_type: number
    topic_desc: string
    topic_id: string
    topic_name: string
    topic_pic: string
    topic_title: string
    topic_url: string
}

export interface SearchData2 {
    fname: string
    fpic: string
    member_num: number
    thread_num: number
    forum_desc: string
    sug_type: number
    fclass1: string
    fclass2: string
}

export interface SuggestionResponse {
    error: string
    query_match: {
        search_data: SearchData2[] | null
    }
    query_tag: {
        search_data: SearchData1[] | null
    },
    query_tips: {
        search_data: SearchData2[] | null
    },
    query_operate: {
        search_data: SearchData1[] | null
    },
    suggest_game: {
        search_data: SearchData1[] | null
    },
    hottopic_list: {
        search_data: SearchData1[] | null
    }
}

/**
 * 将带有完整贴子信息的 HTML 元素解析为 `TiebaPost` 对象
 * @param elem 包含完整贴子信息的元素，一般是 `HTMLLIElement`
 * @returns `TiebaPost` 对象
 */
export function parsePostFromElement(elem: Element): TiebaPost {
    // console.log("🚀 ~ file: api.tieba.ts:19 ~ parsePostFromElement ~ elem:", elem);
    const titleTagWrapperAnch = DOMS(".title-tag-wraper a", "a", elem)[0];
    const threadNameWrapper = elem.getElementsByClassName("thread-name-wraper")[0];
    const threadNameWrapperAnch = threadNameWrapper.getElementsByTagName("a")[0];
    const listPostNum = DOMS(".list-post-num em", threadNameWrapper)[0];
    const imgs = DOMS("img:not(.nicknameEmoji)", "img", elem);
    const nReply = elem.getElementsByClassName("n_reply")[0];
    const nReplyAnch = nReply.getElementsByTagName("a")[0];

    // 图片
    const imgArray = <TiebaPost["images"]>[];
    if (imgs.length > 0) {
        forEach(imgs, (img) => {
            imgArray.push({
                thumb: img.src,
                original: carryDefault(img.getAttribute("original"), "")
            });
        });
    }

    return {
        id: carryDefault(elem.getAttribute("data-thread-id"), ""),
        forum: {
            id: carryDefault(elem.getAttribute("data-forum-id"), ""),
            name: titleTagWrapperAnch.title,
            href: titleTagWrapperAnch.href
        },
        author: {
            portrait: split(nReplyAnch.href, /(\?id=)|&/)[2],
            name: transEmojiFromDOMString(nReplyAnch.innerHTML),
            href: nReplyAnch.href
        },
        time: carryDefault(elem.getElementsByClassName("time")[0].textContent, ""),
        title: threadNameWrapperAnch.title,
        content: carryDefault(elem.getElementsByClassName("n_txt")[0].textContent, ""),
        replies: carryDefault(listPostNum.getAttribute("data-num"), 0),
        images: imgArray
    };
}

export function parsePostsFromString(
    responseString: string,
    callbackfn?: ((thread: TiebaPost) => void)
) {
    const feedList: TiebaPost[] = [];
    const dom = new DOMParser().parseFromString(responseString, "text/html");
    const threads = dom.getElementsByClassName("j_feed_li");
    const undesired = "home-place-item";
    // console.log("🚀 ~ file: api.tieba.ts:57 ~ awaitresponse.json ~ threads:", threads);

    forEach(threads, (thread) => {
        if (thread.classList.contains(undesired)) return;
        const post = parsePostFromElement(thread);
        if (callbackfn) callbackfn(post);
        feedList.push(post);
    });

    return feedList;
}

/**
 * 请求一次当前用户贴吧推荐列表，一般能获取到 10 个
 * @param callbackfn 回调函数
 * ```
 * callbackfn(thread: TiebaPost)
 * ```
 * 会在每个贴子被解析为 `TiebaPost` 对象时执行一次，并携带该对象作为参数
 * @returns 本次请求获取到的所有推荐贴子
 */
export async function getFeedList(
    callbackfn?: ((thread: TiebaPost) => void)
): Promise<TiebaPost[]> {
    const feedList: TiebaPost[] = [];
    // const undesired = "home-place-item";
    const response = await fetch(tiebaAPI.feedlist(), {
        mode: "cors",
        credentials: "include"
    });

    if (response.ok) {
        await response.json().then((value: FeedListResponse) => {
            // const dom = new DOMParser().parseFromString(value.data.html, "text/html");
            // const threads = dom.getElementsByClassName("j_feed_li");
            // // console.log("🚀 ~ file: api.tieba.ts:57 ~ awaitresponse.json ~ threads:", threads);

            // forEach(threads, (thread) => {
            //     if (thread.classList.contains(undesired)) return;
            //     const post = parsePostFromElement(thread);
            //     if (callbackfn) callbackfn(post);
            //     feedList.push(post);
            // });

            parsePostsFromString(value.data.html, (thread) => {
                if (callbackfn) callbackfn(thread);
                feedList.push(thread);
            });
        });
    }

    return feedList;
}

/**
 * 将带有 `img` 标签的字符串还原为带 emoji 的字符串
 * @param str 带有 `img` 标签的字符串
 * @returns 被还原的字符串
 */
export function transEmojiFromDOMString(str: string) {
    // 从 a标签提取emoji index
    const indexRegex = /(?<=nickemoji\/).*?(?=.png)/gi;

    if (!str.match(indexRegex)) return str;

    // 原 emoji
    const emojis = [
        "º", "\u25CE", "\u25AB", "\u25C6", "\u2664", "\u2640",
        "\u2642", "\u10DA", "\u266C", "\u261E", "\u261C", "\u2706", "\u260E",
        "\u264B", "\u03A9", "\u2103", "\u2109", "\uD83D\uDE04", "\uD83D\uDE0D",
        "\uD83D\uDE18", "\uD83D\uDE1A", "\uD83D\uDE1C", "\uD83D\uDE33", "\uD83D\uDE01",
        "\uD83D\uDE1E", "\uD83D\uDE22", "\uD83D\uDE02", "\uD83D\uDE2B", "\uD83D\uDE28",
        "\uD83D\uDE31", "\uD83D\uDE21", "\uD83D\uDE37", "\uD83D\uDE32", "\uD83D\uDE08",
        "\uD83D\uDC37", "\uD83D\uDC36", "\uD83D\uDC11", "\uD83D\uDC35", "\uD83D\uDC28",
        "\uD83D\uDC34", "\uD83D\uDC3C", "\uD83D\uDC2F", "\uD83C\uDF6A", "\uD83C\uDF7A",
        "\uD83C\uDF66", "\uD83C\uDF6D", "\uD83C\uDF57", "\uD83C\uDF7C", "\uD83D\uDD2F",
        "\uD83C\uDF52", "\uD83D\uDC40", "\uD83D\uDC2D", "\uD83D\uDE07", "\uD83D\uDE3A",
        "\uD83D\uDE3B", "\uD83D\uDE40", "\uD83D\uDE3F", "\uD83D\uDE39", "\uD83D\uDE3E",
        "\uD83D\uDC79", "\uD83D\uDC7A", "\uD83C\uDF1E", "\uD83C\uDF1D", "\uD83C\uDF1A",
        "\uD83C\uDF1C", "\uD83C\uDF1B", "\uD83D\uDC66", "\uD83D\uDC67", "\uD83C\uDF8E",
        "\uD83C\uDF38", "\uD83C\uDF40", "\uD83C\uDF39", "\uD83C\uDF3B", "\uD83C\uDF3A",
        "\uD83C\uDF41", "\uD83C\uDF3F", "\uD83C\uDF44", "\uD83C\uDF35", "\uD83C\uDF34",
        "\uD83C\uDF33", "\uD83C\uDF30", "\uD83C\uDF31", "\uD83C\uDF3C", "\uD83C\uDF10",
        "\uD83C\uDF19", "\uD83C\uDF0B", "\uD83C\uDF0C", "\u26C5", "\u26A1", "\u2614",
        "\u26C4", "\uD83C\uDF00", "\uD83C\uDF08", "\uD83C\uDF0A", "\uD83D\uDD25", "\u2728",
        "\uD83C\uDF1F", "\uD83D\uDCA5", "\uD83D\uDCAB", "\uD83D\uDCA2", "\uD83D\uDCA6",
        "\uD83D\uDCA7", "\uD83D\uDCA4", "\uD83D\uDCA8", "\uD83C\uDF80", "\uD83C\uDF02",
        "\uD83D\uDC84", "\uD83D\uDC95", "\uD83D\uDC96", "\uD83D\uDC9E", "\uD83D\uDC98",
        "\uD83D\uDC8C", "\uD83D\uDC8B", "\uD83D\uDC9D", "\uD83C\uDF92", "\uD83C\uDF93",
        "\uD83C\uDF8F", "\uD83C\uDF83", "\uD83D\uDC7B", "\uD83C\uDF85", "\uD83C\uDF84",
        "\uD83C\uDF81", "\uD83D\uDE48", "\uD83D\uDC12", "\uD83D\uDCAF", "\uD83D\uDC6F",
        "\uD83D\uDC8D"
    ];

    // 被替换的 emoji
    const transformed = [
        "1-1.png", "1-2.png", "1-4.png", "1-5.png", "1-6.png", "1-7.png", "1-8.png",
        "1-9.png", "1-10.png", "1-11.png", "1-12.png", "1-13.png", "1-14.png", "1-15.png",
        "1-16.png", "1-17.png", "1-18.png", "1-19.png", "1-20.png", "1-21.png", "1-22.png",
        "1-23.png", "1-24.png", "1-25.png", "1-26.png", "1-27.png", "1-28.png", "1-29.png",
        "1-30.png", "1-31.png", "1-32.png", "1-33.png", "1-34.png", "1-35.png", "2-1.png",
        "2-2.png", "2-3.png", "2-4.png", "2-5.png", "2-6.png", "2-7.png", "2-8.png", "2-9.png",
        "2-10.png", "2-11.png", "2-12.png", "2-13.png", "2-14.png", "2-15.png", "2-16.png",
        "2-17.png", "2-18.png", "2-19.png", "2-20.png", "2-21.png", "2-22.png", "2-23.png",
        "2-24.png", "2-25.png", "2-26.png", "2-27.png", "2-28.png", "2-29.png", "2-30.png",
        "2-31.png", "2-32.png", "2-33.png", "2-34.png", "2-35.png", "3-1.png", "3-2.png",
        "3-3.png", "3-4.png", "3-5.png", "3-6.png", "3-7.png", "3-8.png", "3-9.png",
        "3-10.png", "3-11.png", "3-12.png", "3-13.png", "3-14.png", "3-15.png", "3-16.png",
        "3-17.png", "3-18.png", "3-19.png", "3-20.png", "3-21.png", "3-22.png", "3-23.png",
        "3-24.png", "3-25.png", "3-26.png", "3-27.png", "3-28.png", "3-29.png", "3-30.png",
        "3-31.png", "3-32.png", "3-33.png", "3-34.png", "3-35.png", "4-1.png", "4-2.png",
        "4-3.png", "4-4.png", "4-5.png", "4-6.png", "4-7.png", "4-8.png", "4-9.png", "4-10.png",
        "4-11.png", "4-12.png", "4-13.png", "4-14.png", "4-15.png", "4-16.png", "4-17.png",
        "4-18.png", "4-19.png", "4-20.png", "4-21.png", "4-22.png", "4-23.png"
    ];

    const arrIndex = str.match(indexRegex);
    arrIndex?.forEach(index => {
        const emoji = emojis[transformed.indexOf(index + ".png")];
        const arrInner = split(str, RegExp(
            "<img[^>]*?" + index + ".png" + "(?:[^>]*?)*>", "g"
        ));
        str = join(arrInner, decodeURIComponent(emoji));
    });
    return str;
}
