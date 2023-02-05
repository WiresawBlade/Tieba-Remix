// ==UserScript==
// @name         Tieba Remix
// @namespace    https://github.com/WiresawBlade/tieba-remix
// @version      0.0.1dev
// @description  提升贴吧网页端的体验
// @author       锯刃Blade
// @updateURL    https://raw.githubusercontent.com/WiresawBlade/tieba-remix/main/dist/tieba-remix.js
// @downloadURL  https://raw.githubusercontent.com/WiresawBlade/tieba-remix/main/dist/tieba-remix.js
// @match        *://tieba.baidu.com/*
// @icon         https://github.com/WiresawBlade/tieba-remix/raw/main/images/main/icon16.png
// @icon64       https://github.com/WiresawBlade/tieba-remix/raw/main/images/main/icon64.png
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(() => {
    "use strict";
    ///////////////////////////////////////////////////////////////////////////
    // 脚本相关设置，如果没有则创建默认值到 localStorage
    if (localStorage.getItem("enable_bold_font") == null) {
        localStorage.setItem("enable_bold_font", "1");
        localStorage.setItem("extreme_purif", "0");
        localStorage.setItem("default_font_type", "1");
    }
    // 自定义 FLAG，可自行决定开启或关闭某些功能
    const ENABLE_BOLD_FONT = localStorage["enable_bold_font"] == 0 ? 0 : 1; /* 对部分文字进行加粗，不同字体显示质量不同 */
    const EXTREME_PURIF = localStorage["extreme_purif"] == 0 ? 0 : 1; /* 更极端地纯净化网页，只保留基础功能 */
    const DEFAULT_FONT_TYPE = localStorage["default_font_type"] == 0 ? 0 : 1; /* 让网页的一些字体替换为浏览器默认字体 */
    // 开发用常量
    const DBG_MODE = 1; /* 调试模式 */
    const EXPLICIT_LOG = 0; /* 是否以对话框的形式打印日志 */
    // 全局变量
    let darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let tiebaHost = "tieba.baidu.com";
    ///////////////////////////////////////////////////////////////////////////
    // CSS START
	let tieba_home = 'body {background-color: var(--default-background);color: var(--default-fore);}/* 导航栏 */.head_inner {/* 导航栏额头 */background-color: var(--default-background);}.u_menu_item a {/* 顶部超链接 */color: var(--default-fore);}.head_inner .search_logo {/* logo */background-image: var(--img-tieba-icon);left: 72px;height: 60px;width: 60px;}.search_top {border: none;}.search_nav a:link,.search_nav a:hover,.search_nav a:visited {/* 导航栏超链接 */color: var(--default-fore);}.u_menu_item a:hover,.u_menu_item a:visited {color: var(--default-fore);}/* 搜索 */.search_main {padding-bottom: 96px;}.search_bright .search_inp_border {/* 搜索框 */border-top-left-radius: 8px;border-bottom-left-radius: 8px;border-color: var(--border-color);color: var(--default-fore);}.search_bright .search_inp_border:focus {border-color: var(--tieba-theme-color);}.search_bright .search_btn {/* 搜索相关按钮 */border-radius: 8px;background-color: var(--tieba-theme-background);border-color: var(--trans-tieba-theme-color);color: var(--tieba-theme-fore);}.search_bright .search_btn_enter_ba {/* “进入贴吧”按钮 */background-color: var(--tieba-theme-color);color: var(--default-background);border-top-left-radius: 0;border-bottom-left-radius: 0;}.search_bright .search_btn:visited {color: var(--tieba-theme-fore);}.search_bright .search_btn_enter_ba:visited {background-color: var(--tieba-theme-color);color: var(--default-background);}.search_bright .search_btn:hover {/* 搜索相关 hover */background-color: var(--tieba-theme-background);border-color: var(--trans-tieba-theme-color);box-shadow: 0px 0px 0px 2px var(--trans-tieba-theme-color);}.search_bright .search_btn_enter_ba:hover {background-color: var(--tieba-theme-color);color: var(--default-background);}.suggestion {/* 搜索推荐 */background-color: var(--elem-color);color: var(--default-fore);border-radius: 0 0 16px 16px;border-color: var(--border-color);box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);}.suggestion .break_tip {background-color: var(--default-background);}.suggestion .highlight {/* 高亮文本 */color: var(--tieba-theme-color);}.suggestion .operation_title {/* 热议文字 */color: var(--default-fore);}.suggestion .forum_image {/* 推荐图标 */border-radius: 8px;}.suggestion .forum_name {/* 推荐标题 */color: var(--highlight-fore);}.suggestion .on {/* 搜索推荐：选中 */background-color: var(--light-background);}/* 首页横幅 */.page-container .top-sec {display: none;}/* 内容 */.page-container .content-sec {background: none;}/* 左侧悬停 */.page-container .left-sec {background: none;background-color: var(--elem-color);border-top: none;border-radius: 24px;}.f-d-w {/* 左侧悬停 2 */background-color: var(--elem-color);border-radius: 24px;}.f-d-w .f-d-item {background: none;}.u-f-t .gap {/* “贴吧分类”分隔符 */background: none;border: none;}.f-d-w .all {/* “查看全部”按钮 */background: none;}.forum_rcmd {/* 热门吧卡片 */background-color: var(--elem-color);border-radius: 24px;border: 0;}.region_bright .region_header {/* “我在贴吧”标题 */color: var(--default-fore);}.page-container .left-sec .region_bright {border-radius: 24px;}.my_tieba_mod .media_left,.my_tieba_mod .media-left {/* 头像边框 */border: none;}.media_left img,.media-left img {/* 头像 */border-radius: 16px;}#nameValue {/* 我的用户名 */color: var(--default-fore);}#j_tcharge_dialog {/* “获取”超链接 */color: var(--default-fore);}#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn {/* 签到按钮 */background: none;border-radius: 8px;background-color: var(--tieba-theme-color);color: var(--elem-color);text-align: center;margin-right: -5px;}#onekey_sign .onekey_btn::after {content: "一键签到";}#onekey_sign a.signed_btn .icon_signed {/* 已签到标记 */background: var(--svg-checkmark);background-repeat: no-repeat;background-size: 20px;margin-top: 2px;filter: drop-shadow(var(--elem-color) 0 9999px);transform: translateY(-9999px);}#onekey_sign .onekey_btn:hover {box-shadow: 0px 0px 10px var(--tieba-theme-color);}.u-f-w {/* 进吧 div */padding-bottom: 20px;}.left-cont-fixed {/* 进吧 div 固定 */position: relative;bottom: 0;}.u-f-w .sign,.u-f-w .unsign,.always-forum-item .sign,.always-forum-item .unsign {/* 进吧按钮 */background: none;background-color: var(--light-background);color: var(--default-fore);border-radius: 8px;}.u-f-w .sign,.always-forum-item .sign {/* 已签到 */background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);}.u-f-w .sign,.u-f-w .unsign {margin-bottom: 8px;}.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover {background: none;background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);text-decoration: none;}.u-f-w .more {/* “查看更多”按钮 */background: none;border: none;box-shadow: none;border-radius: 8px;background-color: var(--elem-color);color: var(--default-fore);}.more-txt {/* “查看更多”按钮文字 */color: var(--default-fore);}.u-f-w .more-hover {margin: auto;width: 188px;background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.u-f-w .more-hover .more-txt,.u-f-w .more:hover .more-txt {margin-left: 60px;color: var(--elem-color);}.always-forum-title {/* 展开标题 */border: none;margin-top: 10px;}#alwayforum-wraper {/* 关注吧展开 */background-color: var(--elem-color);}.pop-up-frame {/* 展开页面 */background-color: var(--elem-color);box-shadow: none;border: none;border-radius: 24px;border-bottom-left-radius: 0;}.always-forum-close {/* 展开叉号 */display: none;}.always-forum-item .addnewforumbtn {/* “添加爱逛的吧”按钮 */background: none;background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);border-radius: 8px;font-size: 20px;text-align: center;padding-left: 0;width: 110px;}.always-forum-item .addnewforumbtn::after {content: "+";}.always-forum-item .addnewforumbtn:hover {background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.tbui_scroll_panel .tbui_scroll_button {/* 展开滚动条 */background-color: var(--very-light-background);width: 6px;border-radius: 24px;border: none;}.tbui_scroll_panel .tbui_scroll_bar {/* 滚动条背景 */background: none;width: 6px;}.forum_rcmd .class_title>div {/* 热门吧 icon */color: var(--default-fore);}.rcmd_forum_item .forum_name {/* 热门吧标题 */color: var(--default-fore);}.rcmd_forum_item .rcmd_forum_logo {/* 热门吧图片 */border: none;border-radius: 16px;}/* 动态 */.page-container .r-left-sec,.sub_nav_wrap,.title-tag-wraper,.thread-name-wraper,.n_reply {width: 780px;}.n_txt {width: 720px;}.sub_nav_wrap {/* 动态切换 */background: none;box-shadow: none;background-color: var(--trans-default-background);backdrop-filter: blur(24px);}.sub_nav_list a.cur {/* 当前标签 */border: none;color: var(--tieba-theme-color);}.sub_nav_list .nav_hover {/* 标签色块 */border-bottom: 3px solid var(--tieba-theme-color);}.sub_nav_list li.sub_nav_line {/* 标签分隔符 */background: none;}/* 右侧悬停 */.page-container .r-right-sec {display: none;}.item_hd {/* “贴吧热议榜”标题 */border: none;background-color: var(--default-background);color: var(--default-fore);border-radius: 24px;}.item_hd .title {color: var(--default-fore);}.topic_list .topic_item .topic_flag_hot {/* 热点数字编号 */border-radius: 4px;}.item .item_hd {/* 公告板标题 */border: none;background-color: var(--default-background);color: var(--default-fore);}.item .item_hd .title {color: var(--default-fore);}.notice-wrap-fixed {/* 公告板悬停 */background-color: var(--default-color);border-bottom-left-radius: 24px;border-bottom-right-radius: 24px;}.notice,.notice img {/* 公告板图片 */border-radius: 24px;}/* 动态内容 */.new_list .title {/* 贴子标题 */color: var(--tieba-theme-color);}.new_list .title:hover {color: var(--tieba-theme-color);text-decoration: none;}.title-tag-wraper a {/* 动态贴吧名 */background-color: var(--light-background);color: var(--light-fore);padding: 4px 10px;font-size: 12px;border-radius: 24px;}.list-post-num {/* 贴子回复数 */background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);padding: 4px 10px;border-radius: 16px;border: none;top: 0;}.list-triangle-border,.list-triangle-body {/* 贴子回复数三角 */display: none;}.n_txt {/* 动态正文 */color: var(--light-fore);}.new_list .post_author {/* 作者 */background: none;color: var(--default-fore);text-decoration: none;padding: 0;margin-bottom: 24px;}.new_list .time {/* 时间 */background: none;padding: 0;}.n_img img {/* 动态图片 */border-radius: 16px;border: none;cursor: pointer;}.n_img li {border-radius: 16px;}.n_img li .feed_highlight {/* 图片放大 */background: none;cursor: pointer;}.media_box {/* 图片控件 */background-color: var(--light-background);border: none;border-radius: 16px;}.media_box img {border-radius: 16px;cursor: pointer;}.ui_btn {/* “进入贴子”按钮 */background: none;border: none;background-color: var(--tieba-theme-color);color: var(--default-background);border-radius: 24px;}.ui_btn:hover {background: none;text-decoration: none;background-color: var(--tieba-theme-color);color: var(--default-background);box-shadow: 0px 0px 10px var(--tieba-theme-color);}/* 功能按钮 */.tbui_aside_float_bar li {background-color: var(--light-background);border-radius: 24px;height: 40px;width: 40px;margin: 8px 0;}.tbui_aside_float_bar li:hover {background-color: var(--tieba-theme-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.tbui_aside_float_bar li:hover .svg-container {filter: drop-shadow(var(--default-background) 0 -9999px);}.tbui_aside_float_bar li a {border-radius: 24px;height: 40px;width: 40px;background: none;}.tbui_aside_float_bar .svg-container {/* 功能按钮 svg 容器 */height: 40px;width: 40px;background-size: 20px;background-repeat: no-repeat;background-position: center;filter: drop-shadow(var(--minimal-fore) 0 -9999px);transform: translateY(9999px);}.tbui_aside_float_bar .svg-container:hover {filter: drop-shadow(var(--default-fore) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_auxiliaryCare a {/* 无障碍模式 */height: 40px;background: none;}.tbui_fbar_auxiliaryCare .svg-container {background-image: var(--svg-accessibility);}.tbui_aside_float_bar .tbui_fbar_auxiliaryCare a:hover {background: none;}.tbui_fbar_top .svg-container {/* 回到顶部 */background-image: var(--svg-arrow-up);filter: drop-shadow(var(--tieba-theme-fore) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_top a,.tbui_aside_float_bar .tbui_fbar_top a:hover {background: none;}.tbui_aside_float_bar .tbui_fbar_top a {background-color: var(--tieba-theme-background);}.tbui_fbar_post .svg-container {/* 回贴 */background-image: var(--svg-message);filter: drop-shadow(var(--default-background) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_post a,.tbui_aside_float_bar .tbui_fbar_post a:hover {background: none;background-color: var(--tieba-theme-color);}.tbui_fbar_feedback .svg-container {/* 反馈 */background-image: var(--svg-infomation-outline);background-size: 24px;}.tbui_aside_float_bar .tbui_fbar_feedback a,.tbui_aside_float_bar .tbui_fbar_feedback a:hover {background: none;}.tbui_aside_float_bar .tbui_fbar_down,.tbui_aside_float_bar .tbui_fbar_props,.tbui_aside_float_bar .tbui_fbar_tsukkomi,.tbui_aside_float_bar .tbui_fbar_share,.tbui_aside_float_bar .tbui_fbar_favor {display: none;}/* 页脚 */.bottom-bg {background: none;}.footer {background-color: var(--light-background);border-top: 1px solid var(--light-background);}/* 无关内容 */.f-d-w,.left-cont-wraper .ufw-gap {display: none;}';
	let tieba_post = 'a {color: var(--tieba-theme-color);}.content {border-radius: 24px;background: unset;}.card_top_wrap {border-radius: 24px 24px 0 0;background: none;background-color: var(--elem-color);}.card_top_theme2 {border: none;margin-right: 0;}/* 去除无关内容 */#novel-ranking .novel-ranking-frs-body,.novel-award-aside {/* 百度小说人气榜相关 */display: none;}.card_top_theme2 .card_title_fname {/* 吧名 */color: var(--highlight-fore);}/* 标题 */.left_section {background: none;}.core_title_wrap_bright,/* 部分吧 */.core_title_theme_bright,.core_title_absolute_bright .core_title_theme_bright {/* 标题栏 */background-color: var(--trans-default-background);border-color: var(--border-color);backdrop-filter: blur(24px);}.core_title_txt {/* 标题文字 */background: none;margin-left: 24px;}.tittle_fill_dom.filled {background-color: var(--default-background);}.core_title h1 {/* 部分吧标题 */margin-left: 0;color: var(--highlight-fore);}.nav_wrap {/* 导航 */background-image: none;background-color: var(--light-background);border-color: var(--border-color);}.nav_list a.nav_icon,.nav_list .tbnav_arrow {/* 部分吧导航栏 */background: unset;padding-left: 22px;}.nav_wrap,.nav_list .space,.nav_list .focus,.nav_list li:hover,.nav_list li:hover .tbnav_tab_inner,.nav_list .focus .tbnav_tab_inner {background: unset;}.nav_list a {color: var(--default-fore);}.pager_theme_4 span.tP {/* 当前页 */color: var(--highlight-fore);}.thread_theme_5 {/* 跳页 */background-color: var(--light-background);border-color: var(--border-color);border-left: none;border-right: none;width: unset;}.btn_sub,.btn-sub,.btn-sub-b,/* 部分吧 */.core_title_btns li a,.p_favthr_main {/* 部分按钮 */background: none;background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);border-radius: 8px;border: none;}.btn_sub:hover,.btn-sub:hover,.btn-sub-b:hover,.btn_sub:active,.btn-sub:active,.btn-sub-b:active,.btn_sub:focus,.btn-sub:focus,.btn-sub-b:focus {background-color: var(--tieba-theme-color);color: var(--default-background);}#quick_reply {/* 回复按钮 */display: none;}.d_lzonly_bdaside,.p_favthr_main p,.j_quick_reply,.j_lzl_p a {/* 部分吧按钮字体 */color: unset;}.j_quick_reply {/* 部分吧额头 */padding-left: unset;}.l_post_bright {/* 左侧用户信息 */background: none;border-color: var(--border-color);width: unset;}.p_author_face {/* 层主头像边框 */background: none;border: none;}.icon_relative img {/* 层主头像 */border-radius: 16px;}.d_name .p_author_name {/* 层主名 */color: var(--tieba-theme-fore);}.d_badge_bright {/* 等级头衔 */background-color: var(--light-background);border-radius: 24px;border: 1px solid var(--border-color);}.d_badge_bright .d_badge_title {color: var(--default-fore);padding-left: 4px;}.d_author .d_pb_icons {/* 印记 */display: none;}.icon_book_link_icon {/* 查看我的印记 */display: none;}.region_bright {/* 右侧信息 */background-color: var(--elem-color);border: none;}.topic_list_box {/* 右侧贴吧热议榜 */background-color: var(--default-background);display: none;}.pb_content {/* 容器：右侧剩余部分 */background: none;background-color: var(--elem-color);border: none;}.tieba_notice li {/* 右侧反馈 */background: unset;padding-left: unset;}/* 正文 */.p_content {background-color: var(--default-background);border: none;}.BDE_Image {/* 正文图片 */border-radius: 24px;}.share_btn_wrapper {/* 分享控件 */display: none;}.post-tail-wrap .icon-jubao {/* 楼层举报 */display: none;}.post-tail-wrap .tail-info {/* 楼层举报等超链接 */color: var(--minimal-fore);}.post_bubble_top,.post_bubble_bottom {/* 特殊气泡 */display: none;}.post_bubble_middle {width: unset;padding: unset;}.save_face_bg_2 {/* 会员右上角标记 */display: none;}.replace_div .replace_tip {/* 展开图片 */background-color: var(--elem-color);border-color: var(--border-color);}/* 回复 */.d_post_content_main {background-color: var(--default-background);}.lzl_p_p {/* 回复头像边框 */border: none;}.lzl_p_p img {/* 回复头像 */border-radius: 8px;}.lzl_cnt .at {/* 回复用户名 */color: var(--tieba-theme-fore);}.core_reply_wrapper {/* 回复 */background: none;border-radius: 16px;background-color: var(--light-background);border-top-right-radius: 0;border: 1px solid var(--border-color);margin-bottom: 16px;}.lzl_link_fold {/* 收起回复 */background-color: var(--light-background);color: var(--tieba-theme-fore);border-radius: 8px 8px 0 0;border: 1px solid var(--border-color);border-bottom: none;}.lzl_cnt .lzl_s_r {/* 回复超链接 */color: var(--tieba-theme-fore);}.lzl_li_pager_s .lzl_more {/* 还有x条回复 */color: unset;}.j_lzl_m {/* 点击查看 */color: var(--tieba-theme-fore);}.lzl_cnt .lzl_time {color: var(--minimal-fore);}.lzl_jb_in {/* 评论举报 */background: none;color: var(--tieba-theme-fore);}.lzl_jb_in::after {content: "举报";}';
	let tieba_tags = '.tag-elem {display: inline-block;}.tag-elem::after {padding: 2px 6px;margin: 0 4px;border-radius: 24px;font-size: 4px;}.tieba-tags-me::after {background-color: var(--myself-theme-background);color: var(--myself-theme-fore);content: "我";}.tieba-tags-lz::after {background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);content: "楼主";}';
	let _bold_font = '.search_bright .search_btn {/* 搜索相关按钮 */font-weight: bold;}#nameValue {/* 我的用户名 */font-weight: bold;}#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn {/* 签到按钮 */font-weight: bold;}.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover {/* 已签到 */font-weight: bold;}.u-f-w .more-hover {/* “查看更多”按钮文字 */font-weight: bold;}.always-forum-title {/* 展开标题 */font-weight: bold;}.always-forum-item .addnewforumbtn:hover {/* “添加爱逛的吧”按钮 */font-weight: bold;}.rcmd_forum_item .forum_name {/* 热门吧标题 */font-weight: bold;}.sub_nav_list a.cur {/* 当前标签 */font-weight: bold;}.new_list .title {/* 贴子标题 */font-weight: bold;}.list-post-num {/* 贴子回复数 */font-weight: bold;}.new_list .post_author {/* 作者 */font-weight: bold;}/* ////////////////////////////////////////////// */.card_top_theme2 .card_title_fname {/* 吧名 */font-weight: bold;}.core_title_txt {/* 标题 */font-weight: bold;}.core_title h1 {/* 部分吧标题 */font-weight: bold;}.lzl_cnt .at {/* 用户名 */font-weight: bold;}.d_name .p_author_name {/* 层主名 */font-weight: bold;}';
	let _extreme = '';
	let _global = '/* 全局 */:root {--default-background: rgb(255, 255, 255);--trans-default-background: rgba(255, 255, 255, 0.8);--deep-background: rgb(200, 200, 200);--trans-deep-background: rgba(200, 200, 200, 0.6);--light-background: rgb(246, 246, 246);--trans-light-background: rgba(230, 230, 230, 0.6);--very-light-background: rgb(180, 180, 180);--elem-color: rgb(240, 240, 240);--default-fore: rgb(10, 10, 10);--light-fore: rgb(20, 20, 20);--minimal-fore: rgb(60, 60, 60);--highlight-fore: rgb(0, 0, 0);--border-color: rgb(210, 210, 210, 0.6);--tieba-theme-color: rgb(97, 78, 194);--trans-tieba-theme-color: rgba(97, 78, 194, 0.6);--tieba-theme-background: rgba(97, 78, 194, 0.3);--tieba-theme-fore: rgb(58, 46, 116);--myself-theme-background: rgba(25, 110, 153, 0.3);--myself-theme-fore: rgb(16, 73, 101);--svg-accessibility: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/accessibility.svg");--svg-checkmark: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/checkmark.svg");--svg-arrow-up: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/arrow-up-sharp.svg");--svg-message: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/chatbox-ellipses.svg");--svg-infomation: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/information-circle.svg");--svg-infomation-outline: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/svg/information-sharp.svg");--img-tieba-icon: url("https://raw.githubusercontent.com/WiresawBlade/deepmode-remix/main/images/main/icon.png");color-scheme: light dark;}/* 深色模式 */@media (prefers-color-scheme: dark) {:root {--default-background: rgb(32, 32, 32);--trans-default-background: rgba(32, 32, 32, 0.6);--deep-background: rgb(26, 26, 26);--trans-deep-background: rgba(20, 20, 20, 0.6);--light-background: rgb(60, 60, 60);--trans-light-background: rgba(60, 60, 60, 0.6);--very-light-background: rgb(160, 160, 160);--elem-color: rgb(26, 26, 26);--default-fore: rgb(230, 230, 230);--light-fore: rgb(200, 200, 200);--minimal-fore: rgb(120, 120, 120);--highlight-fore: rgb(255, 255, 255);--border-color: rgba(96, 96, 96, 0.6);--tieba-theme-color: rgb(113, 97, 194);--trans-tieba-theme-color: rgba(113, 97, 194, 0.6);--tieba-theme-background: rgba(113, 97, 194, 0.3);--tieba-theme-fore: rgb(147, 125, 255);--myself-theme-background: rgba(34, 135, 204, 0.3);--myself-theme-fore: rgb(40, 160, 242);}}';
	let _unset_font = '.u_menu_item a {/* 顶部超链接 */font-family: unset;}.new_list .title, .n_name {/* 吧名/标题字体 */font-family: unset;}.d_badge_title {/* 等级头衔 */font-family: unset;}';
    // CSS END
    ///////////////////////////////////////////////////////////////////////////
    // 监听颜色主题切换
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        if (event.matches) {
            darkmode = true;
        }
        else {
            darkmode = false;
        }
    });
    ///////////////////////////////////////////////////////////////////////////
    function _devlog(msg) {
        if (!DBG_MODE)
            return;
        if (EXPLICIT_LOG) {
            alert(msg);
        }
        else {
            console.log(msg);
        }
    }
    function switchModeString(flag) {
        if (flag == 0) {
            return "关";
        }
        else {
            return "开";
        }
    }
    function registerMenu() {
        // @ts-ignore
        GM_registerMenuCommand("部分元素字体加粗：" + switchModeString(ENABLE_BOLD_FONT), (event) => {
            if (event.button == 0) {
                localStorage["enable_bold_font"] = ENABLE_BOLD_FONT == 1 ? 0 : 1;
                location.reload();
            }
        });
        // @ts-ignore
        GM_registerMenuCommand("极端净化：" + switchModeString(EXTREME_PURIF), (event) => {
            if (event.button == 0) {
                localStorage["extreme_purif"] = EXTREME_PURIF == 1 ? 0 : 1;
                location.reload();
            }
        });
        // @ts-ignore
        GM_registerMenuCommand("使用浏览器默认字体：" + switchModeString(DEFAULT_FONT_TYPE), (event) => {
            if (event.button == 0) {
                localStorage["default_font_type"] = DEFAULT_FONT_TYPE == 1 ? 0 : 1;
                location.reload();
            }
        });
    }
    function addStyleSheets() {
        // @ts-ignore
        GM_addStyle(_global);
        // @ts-ignore
        GM_addStyle(tieba_home);
        // @ts-ignore
        GM_addStyle(tieba_post);
        // @ts-ignore
        GM_addStyle(tieba_tags);
        // @ts-ignore
        if (ENABLE_BOLD_FONT)
            GM_addStyle(_bold_font);
        // @ts-ignore
        if (EXTREME_PURIF)
            GM_addStyle(_extreme);
        // @ts-ignore
        if (DEFAULT_FONT_TYPE)
            GM_addStyle(_unset_font);
    }
    ///////////////////////////////////////////////////////////////////////////
    // 申请菜单
    registerMenu();
    // 注入样式表
    addStyleSheets();
    // 元素操作，等待网页加载完毕
    window.addEventListener("load", () => {
        // 注入元素
        let floatButtons = document.querySelectorAll(".tbui_aside_float_bar li a");
        floatButtons.forEach(elem => {
            // @ts-ignore
            GM_addElement(elem, "div", {
                class: "svg-container",
            });
        });
        // 修改元素
        let postBubbles = document.querySelectorAll(".post_bubble_middle");
        postBubbles.forEach(elem => {
            elem.removeAttribute("style");
        });
        let postReportTags = document.querySelectorAll(".post-tail-wrap .icon-jubao");
        postReportTags.forEach(elem => {
            elem.removeAttribute("src");
            elem.after("举报");
        });
    });
})();
// ParamObject 类
class ParamObject {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }
    static getFromString(paramString) {
        let req = paramString;
        let pObj = new ParamObject();
        if (req.indexOf('?') != -1) {
            let paramArray = req.substring(1).split('&');
            for (let i = 0; i < paramArray.length; i++) {
                let key = paramArray[i].split('=')[0];
                let val = paramArray[i].split('=')[1];
                pObj[key] = decodeURIComponent(val);
            }
        }
        return pObj;
    }
    static getCurrent() {
        return this.getFromString(location.search);
    }
    toString() {
        let pString = '?';
        for (let key in this) {
            pString += key + '=' + this[key] + '&';
        }
        return pString.slice(0, pString.length - 1);
    }
}
/*
 * Tieba Tags 1.0
 * 在楼中楼为楼主等用户显示特殊标签
*/
/// <reference path="./web-calsses.ts" />
(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") == -1)
        return;
    const TAGGED = "is-tagged";
    const TB_TAG = "tag-elem";
    const LZ_TAG = "tieba-tags-lz";
    const MY_TAG = "tieba-tags-me";
    let myUserName;
    let louzhu;
    let fPageElem;
    // 判断当前是否在第一页
    let pObj = ParamObject.getCurrent();
    if (pObj.pn == undefined || pObj.pn == "1") {
        // 当前在贴子第一页，直接读取当前页面
        window.addEventListener("load", () => {
            // 等待网页加载完毕再抓数据
            tiebaTagsMain(document);
        });
    }
    else {
        // 当前不在帖子第一页，先等待当前页面加载完毕
        window.addEventListener("load", () => {
            pObj.pn = 1;
            fPageElem = document.createElement("iframe");
            fPageElem.style.display = "none";
            document.body.appendChild(fPageElem);
            fPageElem.src = location.href.split("?")[0] + pObj.toString();
            fPageElem.addEventListener("load", () => {
                // 等待 iframe 中网页加载完毕，开始抓数据
                tiebaTagsMain(fPageElem.contentDocument);
            });
        });
    }
    function tiebaTagsMain(docElem) {
        var _a, _b;
        // 判断信息是否抓取过，避免重复抓取
        if (myUserName == undefined) {
            myUserName = (_a = docElem.getElementById("nameValue")) === null || _a === void 0 ? void 0 : _a.textContent;
            // louzhu = JSON.parse(
            //     docElem.querySelector(".d_name .p_author_name")
            //         ?.getAttribute("data-field")?.split("'").join("\"")!
            // ).id.split("?")[0]!;
            louzhu = (_b = docElem.querySelector(".d_name .p_author_name")) === null || _b === void 0 ? void 0 : _b.textContent;
        }
        else {
            // 已抓取数据，销毁 iframe
            fPageElem.remove();
        }
        let observer = new MutationObserver(addTiebaTags);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: [
                "style"
            ],
            subtree: true
        });
        function addTiebaTags() {
            document.querySelectorAll(".lzl_cnt .at").forEach(elem => {
                if (elem.className.indexOf(TAGGED) != -1)
                    return;
                elem.classList.add(TAGGED);
                // 我
                if (elem.textContent == myUserName) {
                    makeTag(MY_TAG);
                }
                // 楼主
                if (elem.textContent == louzhu) {
                    makeTag(LZ_TAG);
                }
                function makeTag(tagClass) {
                    let tagElem = document.createElement("div");
                    tagElem.classList.add(TB_TAG);
                    tagElem.classList.add(tagClass);
                    elem.appendChild(tagElem);
                }
            });
        }
    }
})();
