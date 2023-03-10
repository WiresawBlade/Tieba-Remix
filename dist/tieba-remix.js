// ==UserScript==
// @name         Tieba Remix
// @namespace    https://github.com/WiresawBlade/Tieba-Remix
// @version      0.0.1-beta
// @description  提升贴吧网页端的体验：为贴吧添加昼夜主题及功能增强
// @author       锯刃Blade
// @license      MIT
// @updateURL    https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/dist/tieba-remix.js
// @downloadURL  https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/dist/tieba-remix.js
// @icon         https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon16.png
// @icon64       https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon64.png
// @match        *://tieba.baidu.com/*
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==
// @WiresawBlade

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ENABLE_BOLD_FONT = parseInt(GM_getValue("ENABLE_BOLD_FONT", "1"));
const EXTREME_PURIF = parseInt(GM_getValue("EXTREME_PURIF", "0"));
const DEFAULT_FONT_TYPE = parseInt(GM_getValue("DEFAULT_FONT_TYPE", "1"));
function githubResourcesMain() {
    return "https://raw.githubusercontent.com/WiresawBlade/Tieba-Remix/main/";
}
function giteeResourcesMain() {
    return "https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/";
}
(() => {
    "@CSS START";
    let bold_font = '.search_bright .search_btn {/* 搜索相关按钮 */font-weight: bold;}#nameValue {/* 我的用户名 */font-weight: bold;}#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn {/* 签到按钮 */font-weight: bold;}.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover {/* 已签到 */font-weight: bold;}.u-f-w .more-hover {/* “查看更多”按钮文字 */font-weight: bold;}.always-forum-title {/* 展开标题 */font-weight: bold;}.always-forum-item .addnewforumbtn:hover {/* “添加爱逛的吧”按钮 */font-weight: bold;}.rcmd_forum_item .forum_name {/* 热门吧标题 */font-weight: bold;}.sub_nav_list a.cur {/* 当前标签 */font-weight: bold;}.new_list .title {/* 贴子标题 */font-weight: bold;}.list-post-num {/* 贴子回复数 */font-weight: bold;}.new_list .post_author {/* 作者 */font-weight: bold;}/* ////////////////////////////////////////////// */.d_post_content a,.lzl_cnt .lzl_content_main a {/* 贴子和评论的超链接 */font-weight: bold;}.card_top_theme2 .card_title_fname {/* 吧名 */font-weight: bold;}.sign_box_bright {/* 签到按钮文本 */font-weight: bold;}.core_title_txt {/* 标题 */font-weight: bold;}.core_title h1 {/* 部分吧标题 */font-weight: bold !important;}.lzl_cnt .at {/* 用户名 */font-weight: bold;}.d_name .p_author_name {/* 层主名 */font-weight: bold;}.islike_focus {/* 关注吧按钮 */font-weight: bold;}.cancel_focus {/* 取关吧按钮 */font-weight: bold;}/* ////////////////////////////////////////////// */.card_title_fname {/* 吧标题 */font-weight: bold;}.j_th_tit  {/* 帖子标题 */font-weight: bold;}.threadlist_rep_num {/* 回贴数 */font-weight: bold;}';
    let extreme = '';
    let tieba_tags = '.tag-elem {display: inline-block;}.tag-elem::after {padding: 2px 6px;margin: 0 4px;border-radius: 24px;font-size: 4px;}.tieba-tags-me::after {background-color: var(--myself-theme-background);color: var(--myself-theme-fore);content: "我";}.tieba-tags-lz::after {background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);content: "楼主";}.tieba-tags-cz::after {background-color: var(--cengzhu-theme-background);color: var(--cengzhu-theme-fore);content: "层主";}';
    let unset_font = '.u_menu_item a {/* 顶部超链接 */font-family: unset;}.new_list .title, .n_name {/* 吧名/标题字体 */font-family: unset;}.d_badge_title {/* 等级头衔 */font-family: unset;}';
    let _global = '/* 全局 */:root {--default-background: rgb(255, 255, 255);--trans-default-background: rgba(255, 255, 255, 0.6);--deep-background: rgb(200, 200, 200);--trans-deep-background: rgba(200, 200, 200, 0.6);--light-background: rgb(230, 230, 230);--trans-light-background: rgba(230, 230, 230, 0.6);--very-light-background: rgb(245, 245, 245);--elem-color: rgb(240, 240, 240);--default-fore: rgb(10, 10, 10);--light-fore: rgb(20, 20, 20);--minimal-fore: rgb(60, 60, 60);--highlight-fore: rgb(0, 0, 0);--border-color: rgb(210, 210, 210, 0.6);--tieba-theme-color: rgb(97, 78, 194);--trans-tieba-theme-color: rgba(97, 78, 194, 0.6);--tieba-theme-background: rgba(97, 78, 194, 0.2);--tieba-theme-fore: rgb(58, 46, 116);--myself-theme-background: rgba(25, 110, 153, 0.2);--myself-theme-fore: rgb(16, 73, 101);--cengzhu-theme-background: rgba(255, 89, 107, 0.2);--cengzhu-theme-fore: rgb(178, 62, 90);--level-green-background: rgba(84, 130, 53, 0.3);--level-green-fore: rgb(51, 78, 32);--level-blue-background: rgba(0, 153, 213, 0.3);--level-blue-fore: rgb(0, 81, 111);--level-yellow-background: rgb(164, 139, 63, 0.3);--level-yellow-fore: rgb(124, 105, 46);--level-orange-background: rgba(255, 153, 0, 0.3);--level-orange-fore: rgb(178, 104, 0);--svg-accessibility: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/accessibility.svg");--svg-checkmark: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/checkmark.svg");--svg-arrow-up: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/arrow-up-sharp.svg");--svg-message: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/chatbox-ellipses.svg");--svg-infomation: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/information-circle.svg");--svg-infomation-outline: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/information-sharp.svg");--svg-search: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/svg/search.svg");--img-tieba-icon: url("https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon.png");color-scheme: light dark;}/* 深色模式 */@media (prefers-color-scheme: dark) {:root {--default-background: rgb(32, 32, 32);--trans-default-background: rgba(32, 32, 32, 0.6);--deep-background: rgb(26, 26, 26);--trans-deep-background: rgba(20, 20, 20, 0.6);--light-background: rgb(60, 60, 60);--trans-light-background: rgba(60, 60, 60, 0.6);--very-light-background: rgb(60, 60, 60);--elem-color: rgb(26, 26, 26);--default-fore: rgb(230, 230, 230);--light-fore: rgb(200, 200, 200);--minimal-fore: rgb(120, 120, 120);--highlight-fore: rgb(255, 255, 255);--border-color: rgba(96, 96, 96, 0.6);--tieba-theme-color: rgb(113, 97, 194);--trans-tieba-theme-color: rgba(113, 97, 194, 0.6);--tieba-theme-background: rgba(113, 97, 194, 0.2);--tieba-theme-fore: rgb(147, 125, 255);--myself-theme-background: rgba(34, 135, 204, 0.2);--myself-theme-fore: rgb(40, 160, 242);--cengzhu-theme-background: rgba(204, 71, 103, 0.2);--cengzhu-theme-fore: rgb(255, 89, 118);--level-green-background: rgba(96, 153, 59, 0.3);--level-green-fore: rgb(133, 206, 84);--level-blue-background: rgba(0, 165, 227, 0.3);--level-blue-fore: rgb(0, 169, 255);--level-yellow-background: rgb(229, 193, 90, 0.3);--level-yellow-fore: rgb(242, 205, 96);--level-orange-background: rgba(204, 122, 0, 0.3);--level-orange-fore: rgb(255, 170, 0);}}';
    let _tieba_bar = '.threadlist_title a,.threadlist_title a:hover,.threadlist_title a:visited {color: var(--tieba-theme-fore) !important;}.u_menu_item a {/* 顶部菜单 */color: unset !important;}.card_banner {/* 大卡 */display: none !important;}.search_main {/* 固定搜索栏 */padding-bottom: unset;}.search_bright {margin-bottom: 36px;}.search_bright .search_logo_fixed {/* 固定搜索栏 icon */width: 36px;height: 36px;margin-left: 56px;background-color: rgba(0, 0, 0, 0);background-image: var(--img-tieba-icon);background-repeat: no-repeat;}.search_main_fixed {background-color: var(--trans-default-background);backdrop-filter: blur(24px);border-color: var(--border-color);box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);}.card_top_theme {border: none !important;}.content {/* 容器 */width: 982px;}.card_top_theme .card_top {/* 吧标题容器 */padding-left: 120px !important;}.card_title_fname {/* 吧标题 */color: var(--tieba-theme-fore) !important;}.card_slogan {/* 吧 slogan */color: var(--light-fore) !important;}.islike_focus {/* 关注吧按钮 */background-image: none !important;background-color: var(--tieba-theme-color) !important;}.cancel_focus {/* 取关吧按钮 */background: none !important;background-color: var(--tieba-theme-background) !important;}.sign_box_bright,.sign_box_bright_hover {/* 签到按钮 */background: none !important;background-color: var(--tieba-theme-color) !important;}.sign_box_bright_signed,.sign_box_bright_noclass_hover {/* 签到按钮：已签到 */background: none !important;background-color: var(--tieba-theme-background) !important;}.sign_mod_bright .sign_keep_span {margin: unset !important;text-align: center !important;}.forum_content {/* 容器 */background: none !important;background-color: var(--elem-color) !important;border-color: var(--border-color) !important;border-right: none !important;}.nav_wrap {/* tab */border-color: var(--border-color) !important;}.nav_list li.focus {/* 焦点 tab */background: none !important;}.nav_list a {color: unset !important;}.j_tabnav_tab:hover {background: none;}.nav_list a:hover,.nav_list a:focus {/* tab hover */background-color: var(--elem-color) !important;}.search_internal_input {/* 吧内搜索 */color: var(--default-fore) !important;border-color: var(--border-color) !important;border-radius: 8px 0 0 8px;height: 24px !important;}.search_internal_btn {/* 吧内搜索按钮 */background-image: var(--svg-search) !important;background-size: 16px !important;background-repeat: no-repeat !important;background-position: center !important;background-color: var(--tieba-theme-color) !important;vertical-align: middle !important;border-radius: 0 8px 8px 0;height: 26px !important;}.aside_region {/* 右侧内容 */border-bottom: none !important;}.aside_region .region_header {color: var(--default-fore) !important;}.my_tieba .media_left,.my_tieba .media-left {/* 我的头像 */border: none !important;}.my_current_forum .badge {/* 我的等级 */background-color: var(--light-background) !important;color: var(--default-fore) !important;border: 1px solid var(--border-color) !important;}.my_current_forum .badge_name {color: var(--default-fore) !important;}.media_top img,.media-top img {/* 右侧图片 */border-radius: 16px;}.aside_media_horizontal a,.aside-media-horizontal a {/* 右侧超链接 */color: var(--tieba-theme-fore) !important;}.threadlist_bright li.thread_top_list_folder,.threadlist_bright li.thread_top_list_folder:hover {/* 置顶贴 */background-color: var(--very-light-background) !important;}.threadlist_bright>li {/* 贴子 */border: none !important;background-color: var(--default-background) !important;}.threadlist_bright>li:hover {background-color: var(--trans-light-background) !important;}.j_th_tit {/* 帖子标题 */color: var(--tieba-theme-fore);}.threadlist_bright .threadlist_abs_onlyline,.threadlist_bright .threadlist_abs {/* 帖子摘要 */color: var(--default-fore) !important;}.threadlist_bright .threadlist_media li {/* 贴子图片 hover */height: unset !important;border-radius: 8px !important;}.threadlist_media li:hover .threadlist_pic_highlight {border-radius: 8px;}.vpic_wrap img {border-radius: 8px;}.threadlist_bright .media_disp {background: none !important;border: none !important;}.threadlist_rep_num {/* 回贴数 */background: none !important;background-color: var(--tieba-theme-background) !important;color: var(--tieba-theme-fore);height: unset !important;border-radius: 24px;}.pagination-default .pagination-item {/* 跳页按钮 */background-color: var(--light-background) !important;color: var(--light-fore) !important;border: none !important;border-radius: 8px;}.pagination-default .pagination-current {/* 跳页按钮：当前 */background-color: var(--tieba-theme-color) !important;color: var(--default-background) !important;border: none !important;}.pagination-default .pagination-item:not(.pagination-current):hover {/* 跳页按钮：hover */background-color: var(--trans-light-background) !important;border: none !important;}/* 底部 */#tb_rich_poster_container {background-color: var(--very-light-background) !important;border-radius: 0 0 24px 24px;width: 982px !important;margin-left: -1px;}.tb_rich_poster .poster_body .editor_textfield {/* 标题文本框 */background-color: var(--default-background) !important;color: var(--default-fore) !important;border-color: var(--border-color) !important;border-radius: 8px;}.tb_rich_poster .poster_body .editor_textfield:focus {border-color: var(--tieba-theme-color) !important;}.old_style_wrapper {/* 编辑器容器 */background-color: var(--elem-color) !important;border-color: var(--border-color) !important;}.old_style_wrapper .edui-editor-body {background: none !important;}.edui-container .edui-toolbar {/* 编辑器工具栏 */background: none !important;}.edui-editor-body .edui-body-container {/* 编辑器 */background-color: var(--default-background) !important;border-color: var(--border-color) !important;}.frs_content_footer_pagelet {background: none !important;}.footer {display: none !important;}';
    let _tieba_home = 'body {background-color: var(--default-background);color: var(--default-fore);}/* 导航栏 */.head_inner {/* 导航栏额头 */background-color: var(--default-background);}.u_menu_item a {/* 顶部超链接 */color: var(--default-fore);}.head_inner .search_logo {/* logo */background-image: var(--img-tieba-icon);left: 72px;height: 60px;width: 60px;}.search_top {border: none;}.search_nav a:link,.search_nav a:hover,.search_nav a:visited {/* 导航栏超链接 */color: var(--default-fore);}.u_menu_item a:hover,.u_menu_item a:visited {color: var(--default-fore);}/* 搜索 */.search_main {padding-bottom: 96px;}.search_bright .search_inp_border {/* 搜索框 */border-top-left-radius: 8px;border-bottom-left-radius: 8px;border-color: var(--border-color);color: var(--default-fore);}.search_bright .search_inp_border:focus {border-color: var(--tieba-theme-color);}.search_bright .search_btn {/* 搜索相关按钮 */border-radius: 8px;background-color: var(--tieba-theme-background);border-color: var(--trans-tieba-theme-color);color: var(--tieba-theme-fore);}.search_bright .search_btn_enter_ba {/* “进入贴吧”按钮 */background-color: var(--tieba-theme-color);color: var(--default-background);border-top-left-radius: 0;border-bottom-left-radius: 0;}.search_bright .search_btn:visited {color: var(--tieba-theme-fore);}.search_bright .search_btn_enter_ba:visited {background-color: var(--tieba-theme-color);color: var(--default-background);}.search_bright .search_btn:hover {/* 搜索相关 hover */background-color: var(--tieba-theme-background);border-color: var(--trans-tieba-theme-color);box-shadow: 0px 0px 0px 2px var(--trans-tieba-theme-color);}.search_bright .search_btn_enter_ba:hover {background-color: var(--tieba-theme-color);color: var(--default-background);}.suggestion {/* 搜索推荐 */background-color: var(--elem-color);color: var(--default-fore);border-radius: 0 0 16px 16px;border-color: var(--border-color);box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);}.suggestion .break_tip {background-color: var(--default-background);}.suggestion .highlight {/* 高亮文本 */color: var(--tieba-theme-color);}.suggestion .operation_title {/* 热议文字 */color: var(--default-fore);}.suggestion .forum_image {/* 推荐图标 */border-radius: 8px;}.suggestion .forum_name {/* 推荐标题 */color: var(--highlight-fore);}.suggestion .on {/* 搜索推荐：选中 */background-color: var(--light-background);}/* 首页横幅 */.page-container .top-sec {display: none;}/* 内容 */.page-container .content-sec {background: none;}/* 左侧悬停 */.page-container .left-sec {background: none;background-color: var(--elem-color);border-top: none;border-radius: 24px;}.f-d-w {/* 左侧悬停 2 */background-color: var(--elem-color);border-radius: 24px;}.f-d-w .f-d-item {background: none;}.aggregate_entrance_wrap {/* 专题 */display: none;}.u-f-t .gap {/* “贴吧分类”分隔符 */background: none;border: none;}.f-d-w .all {/* “查看全部”按钮 */background: none;}.forum_rcmd {/* 热门吧卡片 */background-color: var(--elem-color);border-radius: 24px;border: 0;}.region_bright .region_header {/* “我在贴吧”标题 */color: var(--default-fore);}.page-container .left-sec .region_bright {border-radius: 24px;}.my_tieba_mod .media_left,.my_tieba_mod .media-left {/* 头像边框 */border: none;}.media_left img,.media-left img {/* 头像 */border-radius: 16px;}#nameValue {/* 我的用户名 */color: var(--default-fore);}#j_tcharge_dialog {/* “获取”超链接 */color: var(--default-fore);}#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn {/* 签到按钮 */background: none;border-radius: 8px;background-color: var(--tieba-theme-color);color: var(--elem-color);text-align: center;margin-right: -5px;}#onekey_sign .onekey_btn::after {content: "一键签到";}#onekey_sign a.signed_btn .icon_signed {/* 已签到标记 */background: var(--svg-checkmark);background-repeat: no-repeat;background-size: 20px;margin-top: 2px;filter: drop-shadow(var(--elem-color) 0 9999px);transform: translateY(-9999px);}#onekey_sign .onekey_btn:hover {box-shadow: 0px 0px 10px var(--tieba-theme-color);}.u-f-w {/* 进吧 div */padding-bottom: 20px;}.left-cont-fixed {/* 进吧 div 固定 */position: relative;bottom: 0;}.u-f-w .sign,.u-f-w .unsign,.always-forum-item .sign,.always-forum-item .unsign {/* 进吧按钮 */background: none;background-color: var(--light-background);color: var(--default-fore);border-radius: 8px;}.u-f-w .sign,.always-forum-item .sign {/* 已签到 */background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);}.u-f-w .sign,.u-f-w .unsign {margin-bottom: 8px;}.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover {background: none;background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);text-decoration: none;}.u-f-w .more {/* “查看更多”按钮 */background: none;border: none;box-shadow: none;border-radius: 8px;background-color: var(--elem-color);color: var(--default-fore);}.more-txt {/* “查看更多”按钮文字 */color: var(--default-fore);}.u-f-w .more-hover {margin: auto;width: 188px;background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.u-f-w .more-hover .more-txt,.u-f-w .more:hover .more-txt {margin-left: 60px;color: var(--elem-color);}.always-forum-title {/* 展开标题 */border: none;margin-top: 10px;}#alwayforum-wraper {/* 关注吧展开 */background-color: var(--elem-color);}.pop-up-frame {/* 展开页面 */background-color: var(--elem-color);box-shadow: none;border: none;border-radius: 24px;border-bottom-left-radius: 0;}.always-forum-close {/* 展开叉号 */display: none;}.always-forum-item .addnewforumbtn {/* “添加爱逛的吧”按钮 */background: none;background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);border-radius: 8px;font-size: 20px;text-align: center;padding-left: 0;width: 110px;}.always-forum-item .addnewforumbtn::after {content: "+";}.always-forum-item .addnewforumbtn:hover {background-color: var(--tieba-theme-color);color: var(--elem-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.tbui_scroll_panel .tbui_scroll_button {/* 展开滚动条 */background-color: var(--very-light-background);width: 6px;border-radius: 24px;border: none;}.tbui_scroll_panel .tbui_scroll_bar {/* 滚动条背景 */background: none;width: 6px;}.forum_rcmd .class_title>div {/* 热门吧 icon */color: var(--default-fore);}.rcmd_forum_item .forum_name {/* 热门吧标题 */color: var(--default-fore);}.rcmd_forum_item .rcmd_forum_logo {/* 热门吧图片 */border: none;border-radius: 16px;}/* 动态 */.page-container .r-left-sec,.sub_nav_wrap,.title-tag-wraper,.thread-name-wraper,.n_reply {width: 780px;}.n_txt {width: 720px;}.sub_nav_wrap {/* 动态切换 */background: none;box-shadow: none;background-color: var(--trans-default-background);backdrop-filter: blur(24px);-webkit-backdrop-filter: blur(24px);}.sub_nav_list a.cur {/* 当前标签 */border: none;color: var(--tieba-theme-color);}.sub_nav_list .nav_hover {/* 标签色块 */border-bottom: 3px solid var(--tieba-theme-color);}.sub_nav_list li.sub_nav_line {/* 标签分隔符 */background: none;}/* 右侧悬停 */.page-container .r-right-sec {display: none;}.item_hd {/* “贴吧热议榜”标题 */border: none;background-color: var(--default-background);color: var(--default-fore);border-radius: 24px;}.item_hd .title {color: var(--default-fore);}.topic_list .topic_item .topic_flag_hot {/* 热点数字编号 */border-radius: 4px;}.item .item_hd {/* 公告板标题 */border: none;background-color: var(--default-background);color: var(--default-fore);}.item .item_hd .title {color: var(--default-fore);}.notice-wrap-fixed {/* 公告板悬停 */background-color: var(--default-color);border-bottom-left-radius: 24px;border-bottom-right-radius: 24px;}.notice,.notice img {/* 公告板图片 */border-radius: 24px;}/* 动态内容 */.new_list .title {/* 贴子标题 */color: var(--tieba-theme-color);}.new_list .title:hover {color: var(--tieba-theme-color);text-decoration: none;}.title-tag-wraper a {/* 动态贴吧名 */background-color: var(--light-background);color: var(--light-fore);padding: 4px 10px;font-size: 12px;border-radius: 24px;}.list-post-num {/* 贴子回复数 */background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);padding: 4px 10px;border-radius: 16px;border: none;top: 0;}.list-triangle-border,.list-triangle-body {/* 贴子回复数三角 */display: none;}.n_txt {/* 动态正文 */color: var(--light-fore);}.new_list .post_author {/* 作者 */background: none;color: var(--default-fore);text-decoration: none;padding: 0;margin-bottom: 24px;}.new_list .time {/* 时间 */background: none;padding: 0;}.topic-tag {/* 动态话题 */display: none;}.n_img img {/* 动态图片 */border-radius: 16px;border: none;cursor: pointer;}.n_img li {border-radius: 16px;}.n_img li .feed_highlight {/* 图片放大 */background: none;cursor: pointer;}.media_box {/* 图片控件 */background-color: var(--light-background);border: none;border-radius: 16px;}.media_box img {border-radius: 16px;cursor: pointer;}.ui_btn {/* “进入贴子”按钮 */background: none;border: none;background-color: var(--tieba-theme-color);color: var(--default-background);border-radius: 24px;}.ui_btn:hover {background: none;text-decoration: none;background-color: var(--tieba-theme-color);color: var(--default-background);box-shadow: 0px 0px 10px var(--tieba-theme-color);}/* 功能按钮 */.tbui_aside_float_bar {border: none !important;background: none !important;}.tbui_aside_float_bar li {background-color: var(--light-background);border-radius: 24px;height: 40px;width: 40px;margin: 8px 0;}.tbui_aside_float_bar li:hover {background-color: var(--tieba-theme-color);box-shadow: 0px 0px 10px var(--tieba-theme-color);}.tbui_aside_float_bar li:hover .svg-container {filter: drop-shadow(var(--default-background) 0 -9999px);}.tbui_aside_float_bar li a {border-radius: 24px;height: 40px !important;width: 40px !important;background: none !important;}.tbui_aside_float_bar .svg-container {/* 功能按钮 svg 容器 */height: 40px !important;width: 40px !important;background-size: 20px;background-repeat: no-repeat;background-position: center;filter: drop-shadow(var(--minimal-fore) 0 -9999px);transform: translateY(9999px);}.tbui_aside_float_bar .svg-container:hover {filter: drop-shadow(var(--default-fore) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_auxiliaryCare a {/* 无障碍模式 */height: 40px !important;background: none !important;}.tbui_fbar_auxiliaryCare .svg-container {background-image: var(--svg-accessibility);}.tbui_aside_float_bar .tbui_fbar_auxiliaryCare a:hover {background: none !important;}.tbui_fbar_top .svg-container {/* 回到顶部 */background-image: var(--svg-arrow-up);filter: drop-shadow(var(--tieba-theme-fore) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_top a,.tbui_aside_float_bar .tbui_fbar_top a:hover {background: none !important;}.tbui_aside_float_bar .tbui_fbar_top a {background-color: var(--tieba-theme-background) !important;}.tbui_fbar_post .svg-container {/* 回贴 */background-image: var(--svg-message);filter: drop-shadow(var(--default-background) 0 -9999px);}.tbui_aside_float_bar .tbui_fbar_post a,.tbui_aside_float_bar .tbui_fbar_post a:hover {background: none !important;background-color: var(--tieba-theme-color) !important;}.tbui_fbar_feedback .svg-container {/* 反馈 */background-image: var(--svg-infomation-outline);background-size: 24px;}.tbui_aside_float_bar li.tbui_fbar_feedback a {/* 部分吧反馈 */background: none !important;}.tbui_aside_float_bar .tbui_fbar_feedback a,.tbui_aside_float_bar .tbui_fbar_feedback a:hover {background: none !important;}.tbui_aside_float_bar .tbui_fbar_down,.tbui_aside_float_bar .tbui_fbar_props,.tbui_aside_float_bar .tbui_fbar_tsukkomi,.tbui_aside_float_bar .tbui_fbar_share,.tbui_aside_float_bar .tbui_fbar_favor,.tbui_aside_float_bar .tbui_fbar_refresh {display: none;}.btn_more {/* 更多按钮 */background: none;background-color: var(--tieba-theme-background);border-radius: 24px;width: 200px;height: unset;}.btn_more:hover,.data_error_bar a:hover,.btn_more a:hover {background: none !important;background-color: var(--tieba-theme-color) !important;color: var(--default-background) !important;}.data_error_bar a,.btn_more a {color: var(--tieba-theme-fore);border: none;}/* 页脚 */.bottom-bg {background: none;}.footer {background-color: var(--light-background);border-top: 1px solid var(--light-background);}/* 无关内容 */.f-d-w,.left-cont-wraper .ufw-gap {display: none;}';
    let _tieba_post = 'a {color: var(--tieba-theme-fore);}.l_reply_num {/* 回帖信息 */color: unset !important;}#j_navtab_game,.nav_list .more-config-navtab {/* 游戏 tab */display: none;}#j_navtab_wanle {/* 玩乐 tab */display: none;}.nav_wrap_add_border {border: none;}#head {/* 背景 */background-color: var(--default-background);}/* 内容 */.content {border-radius: 24px;background: unset;box-shadow: 0 0 80px -32px rgba(0, 0, 0, 0.4);}.card_top_wrap {border-radius: 24px 24px 0 0;background: none !important;background-color: var(--elem-color) !important;}.card_top_theme2 {border: none;margin-right: 0;}/* 去除无关内容 */#novel-ranking .novel-ranking-frs-body,.novel-award-aside {/* 百度小说人气榜相关 */display: none;}/* 吧图标 */.card_head {width: 64px !important;height: 64px !important;border-radius: 24px !important;padding: unset !important;background: none !important;border: 4px solid var(--border-color) !important;top: -32px !important;}.card_head_img {width: 64px !important;height: 64px !important;}/* 吧名 */.card_title {margin: 5px 20px 0;}.card_top_theme2 .card_title_fname {color: var(--highlight-fore);}.islike_focus {/* 关注吧按钮 */background: none;background-color: var(--tieba-theme-color);color: var(--elem-color);border-radius: 24px;line-height: 28px;font-size: 14px;text-align: center;margin-top: 4px !important;}.islike_focus::after {content: "关注";}.cancel_focus {/* 取关吧按钮 */background: none;border: 2px solid var(--trans-tieba-theme-color);background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);border-radius: 24px;line-height: 28px;font-size: 14px;text-align: center;width: 72px;}.cancel_focus::after {content: "已关注";}.card_top_right {/* 签到按钮 container */margin-top: 20px;}.sign_box_bright {/* 签到按钮 */width: 140px !important;height: 40px !important;border: 2px solid var(--trans-tieba-theme-color);background: none;background-color: var(--tieba-theme-color);color: var(--default-background);text-align: center;border-radius: 24px;line-height: 40px;font-size: 18px;}.sign_btn_bright::before {content: "签到";color: var(--elem-color);}.sign_box_bright_signed {/* 签到按钮：已签到 */background-color: var(--tieba-theme-background);}.sign_today_date,.sign_month_lack_days {/* 签到日期等 */display: none;}.sign_keep_span {width: 140px !important;height: 40px;}.sign_keep_span,.sign_mod_bright .sign_keep_span {/* 已签到按钮文本 */margin: unset;color: var(--tieba-theme-fore);text-align: center;font-size: 12px;}.sign_box_bright_signed::before {content: none !important;}.sign_mod_bright .sign_keep_span::before {content: "已签到 | ";}.sign_box_bright_signed {text-align: unset;}.jump_input_bright {/* 跳页文本框 */border-color: var(--border-color);border-radius: 16px;padding: 0 10px;}/* 标题 */.left_section {background: none;}.core_title_wrap_bright {/* 标题栏 */background-color: var(--trans-default-background);border-color: var(--border-color);backdrop-filter: blur(24px);-webkit-backdrop-filter: blur(24px);}.core_title_theme_bright,.core_title_absolute_bright .core_title_theme_bright {/* 部分吧标题栏 */background: none;border-color: var(--border-color);}.left_section .core_title_absolute_bright {background-color: var(--trans-default-background);backdrop-filter: blur(24px);-webkit-backdrop-filter: blur(24px);}.core_title_txt {/* 标题文字 */background: none;margin-left: 24px;}.tittle_fill_dom.filled {background-color: var(--default-background);}.core_title h1 {/* 部分吧标题 */margin-left: 0;color: var(--highlight-fore);}.nav_wrap {/* 导航 */background-image: none !important;background-color: var(--light-background);border-color: var(--border-color);}.nav_list a.nav_icon,.nav_list .tbnav_arrow {/* 部分吧导航栏 */background: unset;padding-left: 22px;}.nav_wrap,.nav_list .space,.nav_list .focus,.nav_list li:hover,.nav_list li:hover .tbnav_tab_inner,.nav_list .focus .tbnav_tab_inner {background: unset;}.nav_list a {color: var(--default-fore);}span.tP {/* 强调字 */color: var(--highlight-fore) !important;}.thread_theme_5 {/* 跳页 */background-color: var(--light-background);border-color: var(--border-color);border-left: none;border-right: none;width: unset;}.btn_sub,.btn-sub,.btn-sub-b,/* 部分吧 */.core_title_btns li a,.p_favthr_main {/* 部分按钮 */background: none;background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);border-radius: 8px;border: none;}.btn_sub:hover,.btn-sub:hover,.btn-sub-b:hover,.btn_sub:active,.btn-sub:active,.btn-sub-b:active,.btn_sub:focus,.btn-sub:focus,.btn-sub-b:focus {background-color: var(--tieba-theme-color);color: var(--default-background);}.l_lzonly:hover,.p_favthr_main:hover {/* 部分吧按钮 hover */background-color: var(--tieba-theme-color) !important;color: var(--default-background) !important;}#quick_reply {/* 回复按钮 */display: none;}.d_lzonly_bdaside,.p_favthr_main p,.j_quick_reply,.j_lzl_p a {/* 部分吧按钮字体 */color: unset;}.j_quick_reply {/* 部分吧额头 */padding-left: unset;}.l_post_bright {/* 左侧用户信息 */background: none;border-color: var(--border-color);width: unset;}.p_author_face {/* 层主头像边框 */background: none;border: none;}.icon_relative img {/* 层主头像 */border-radius: 16px;}.d_name .p_author_name {/* 层主名 */color: var(--tieba-theme-fore);}.d_badge_bright,.user_level .badge {/* 等级头衔 */background-color: var(--light-background);border-radius: 24px;border: 1px solid var(--border-color);}.user_level .badge_name {/* 等级头衔文本 */color: unset;}.d_badge_bright .d_badge_title {color: var(--default-fore);padding-left: 4px;}.d_badge_bright .d_badge_lv,.user_level .badge_index {/* 等级图标 */background-image: none !important;background-color: var(--tieba-theme-background);color: var(--tieba-theme-fore);}.d_badge_lv,.user_level .badge_index {width: unset !important;height: 8px !important;margin: 12px 4px !important;padding: 0px 4px !important;border-radius: 16px;left: 60px !important;top: unset !important;font-family: unset !important;font-style: italic;font-size: 14px;line-height: 2px !important;}.d_badge_icon1 .d_badge_lv,.tieba-lvl-green {/* 绿牌 */background-color: var(--level-green-background) !important;color: var(--level-green-fore) !important;}.d_badge_icon2 .d_badge_lv,.d_badge_icon2_1 .d_badge_lv,.d_badge_icon2_2 .d_badge_lv,.tieba-lvl-blue {/* 蓝牌 */background-color: var(--level-blue-background) !important;color: var(--level-blue-fore) !important;}.d_badge_icon3 .d_badge_lv,.d_badge_icon3_1 .d_badge_lv,.d_badge_icon3_2 .d_badge_lv,.tieba-lvl-yellow {/* 黄牌 */background-color: var(--level-yellow-background) !important;color: var(--level-yellow-fore) !important;}.d_badge_icon4 .d_badge_lv,.d_badge_icon4_1 .d_badge_lv,.d_badge_icon4_2 .d_badge_lv,.tieba-lvl-orange {/* 橙牌 */background-color: var(--level-orange-background) !important;color: var(--level-orange-fore) !important;}.d_badge_bawu1 .d_badge_lv,.d_badge_bawu2 .d_badge_lv {/* 吧务 */text-indent: unset !important;}.d_author .d_pb_icons {/* 印记 */display: none;}.icon_book_link_icon {/* 查看我的印记 */display: none;}.region_bright {/* 右侧信息 */background: none;background-color: var(--elem-color);border: none;margin-top: 12px;}.region_bright .region_title {color: var(--default-fore) !important;}.balv_mod .media_left,.balv_mod .media-left {/* 我的头像 */border: none;}.right_section .tieba_notice {/* 右侧反馈 */background: none;}.topic_list_box {/* 右侧贴吧热议榜 */background-color: var(--default-background);display: none;}.pb_content {/* 容器：右侧剩余部分 */background: none;background-color: var(--elem-color);border: none;}.notice-icon,.right_section .tieba_notice {/* 右侧反馈 */background: none !important;padding-left: unset !important;}.tieba_notice li {background: none;}/* 正文 */.p_content {background-color: var(--default-background);border: none;}.forbid-speech-banner {/* 楼主屏蔽 */border-top: none;}.BDE_Image {/* 正文图片 */border-radius: 24px;}.share_btn_wrapper {/* 分享控件 */display: none;}.post-tail-wrap .icon-jubao {/* 楼层举报 */display: none;}.post-tail-wrap .icon-jubao::after {content: "举报";}.post-tail-wrap .tail-info {/* 楼层超链接 */color: var(--minimal-fore);}.j_jb_ele .tail-info {/* 举报超链接 */color: var(--tieba-theme-fore) !important;}.complaint {/* 部分吧楼层举报 */padding-right: 4px;background: none;color: var(--tieba-theme-fore) !important;}.complaint::after {content: "举报";}.post_bubble_top,.post_bubble_bottom {/* 特殊气泡 */display: none;}.post_bubble_middle {width: unset;padding: unset;background: none !important;}.save_face_bg_2 {/* 会员右上角标记 */display: none;}.replace_div .replace_tip {/* 展开图片 */background-color: var(--elem-color);border-color: var(--border-color);}.achievement_medal_section {/* 成就徽章 */display: none;}.l_post_bright .d_post_content_main .d_sign_split {/* 签名档分割线 */border-bottom: 1px solid var(--border-color);}/* 回复 */.d_post_content_main {background-color: var(--default-background) !important;}.lzl_p_p {/* 回复头像边框 */border: none;}.lzl_p_p img {/* 回复头像 */border-radius: 8px;}.lzl_cnt .at {/* 回复用户名 */color: var(--tieba-theme-fore);}.core_reply_wrapper {/* 回复 */background: none !important;border-radius: 16px !important;/* border-top-right-radius: 0 !important; */background-color: var(--very-light-background) !important;color: var(--default-fore) !important;border: 1px solid var(--border-color) !important;margin-bottom: 16px !important;}.core_reply_content li {border-top: unset;}.core_reply_content li.first_no_border {margin-top: 6px;}.lzl_content_main {/* 回复文字 */color: var(--default-fore);}.l_post_bright .core_reply_wrapper .core_reply_border_top,.core_reply_border_bottom,.l_post_bright .core_reply_wrapper .core_reply_content {border: none;background: none;}.lzl_link_fold {/* 收起回复 */background-color: var(--very-light-background) !important;color: var(--tieba-theme-fore);border-radius: 8px 8px 0 0;border: 1px solid var(--border-color) !important;border-bottom: none !important;display: none !important;}.core_reply div.hideLzl {/* 加载回复 */background: none;background-color: var(--very-light-background);}.core_reply_wrapper .loading_reply {/* 加载动画 */display: none;}.lzl_cnt .lzl_s_r {/* 回复超链接 */color: var(--tieba-theme-fore);}.lzl_li_pager_s .lzl_more {/* 还有x条回复 */color: unset;}.j_lzl_m {/* 点击查看 */color: var(--tieba-theme-fore);}.lzl_cnt .lzl_time {color: var(--minimal-fore);}.lzl_jb_in,.user-jubao-button {/* 楼中楼举报 */background: none;color: var(--tieba-theme-fore);}.lzl_jb_in::after,.user-jubao-button::after {content: "举报";}.d_post_content a:hover,.d_post_content a:focus,.lzl_cnt .lzl_content_main a:not(.at):hover,.lzl_cnt .lzl_content_main a:not(.at):focus {/* 楼与楼中楼超链接 */text-decoration: underline;}.pager_theme_5 a,.pager_theme_5 span,.jump_btn_bright {/* 跳页按钮 */background: none;background-color: var(--default-background);border-color: var(--default-background);border-radius: 8px;color: var(--minimal-fore);}.pager_theme_5 a:hover,.jump_btn_bright:hover {background-color: var(--tieba-theme-color);color: var(--default-background);border-color: var(--tieba-theme-color);}/* 底部 */.thread_theme_7 {/* 顶栏 */background-color: var(--light-background);border-color: var(--border-color);width: unset;}#pb-footer-header {background-color: var(--default-background);}#tb_rich_poster_container {/* 内容 */background-color: var(--default-background);width: unset;}.poster_head_text a.cur {color: var(--highlight-fore) !important;}.edui-editor-body {/* 文本框 */border-radius: 16px;border-color: var(--border-color) !important;background: none;}.edui-container .edui-editor-body.body-container-focus,.edui-container .edui-editor-body.body-container-focus .edui-body-container {border-color: var(--tieba-theme-color) !important;}.old_style_wrapper {background-color: var(--elem-color);border-color: var(--border-color);border-radius: 24px;}.edui-editor-body .edui-body-container {/* 全部文本框 */width: unset !important;}.edui-toolbar .edui-btn-toolbar {/* 工具栏 */background-color: var(--elem-color);margin-top: 4px;}.edui-editor-body .edui-body-container {background: var(--default-background);border-radius: 16px;}.pb_footer {background: none;width: unset;border-color: var(--border-color);border: none;}.save-to-quick-reply-btn {/* “保存至快速回贴”按钮 */background: none;color: unset;background-color: var(--light-background);border-color: var(--border-color);}.save-to-quick-reply-btn span {color: var(--tieba-theme-fore);}.footer {display: none;}.skin_normal .wrap2 {background: none;background-color: var(--default-background);}';
    "@CSS END";
    addStyleSheets();
    registerMenu();
    function addStyleSheets() {
        GM_addStyle(_global);
        GM_addStyle(_tieba_home);
        GM_addStyle(_tieba_post);
        if (location.href.indexOf("://tieba.baidu.com/f?kw=") !== -1)
            GM_addStyle(_tieba_bar);
        GM_addStyle(tieba_tags);
        if (ENABLE_BOLD_FONT)
            GM_addStyle(bold_font);
        if (EXTREME_PURIF)
            GM_addStyle(extreme);
        if (DEFAULT_FONT_TYPE)
            GM_addStyle(unset_font);
    }
    function registerMenu() {
        let greasyMenu = [
            ["ENABLE_BOLD_FONT", ENABLE_BOLD_FONT, "部分元素字体加粗"],
            ["EXTREME_PURIF", EXTREME_PURIF, "极端净化"],
            ["DEFAULT_FONT_TYPE", DEFAULT_FONT_TYPE, "使用浏览器默认字体"]
        ];
        greasyMenu.forEach(menu => {
            GM_registerMenuCommand(menu[2] + "：" + switchModeString(menu[1]), (event) => {
                if (event.button === 0) {
                    GM_setValue(menu[0], menu[1] === 1 ? 0 : 1);
                    location.reload();
                }
            });
        });
        function switchModeString(flag) {
            if (flag === 0) {
                return "关";
            }
            else {
                return "开";
            }
        }
    }
})();
const __remixedObservers = {
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
            observer.observe($("#j_p_postlist").get(0), {
                childList: true
            });
        },
        addEvent: function (event) {
            for (let i = 0; i < this.events.length; i++) {
                const func = this.events[i];
                if (event === func)
                    return;
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
            observer.observe($("#j_p_postlist").get(0), {
                childList: true,
                subtree: true
            });
        },
        addEvent: function (event) {
            for (let i = 0; i < this.events.length; i++) {
                const func = this.events[i];
                if (event === func)
                    return;
            }
            event();
            this.events.push(event);
        }
    }
};
(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") === -1)
        return;
    const TAGGED = "is-tagged";
    const TB_TAG = "tag-elem";
    const MY_TAG = "tieba-tags-me";
    const LZ_TAG = "tieba-tags-lz";
    const CZ_TAG = "tieba-tags-cz";
    let myUserName;
    let louzhuCard;
    let louzhuObj;
    if (location.search === null || location.search.indexOf("pn=") === -1) {
        window.addEventListener("load", () => {
            tiebaTagsMain(document);
        });
    }
    else {
        $.ajax({
            url: location.href.split("?")[0],
            success: (response) => {
                const fPageDoc = new DOMParser().parseFromString(response, "text/html");
                tiebaTagsMain(fPageDoc);
            }
        });
    }
    function tiebaTagsMain(docElem) {
        return __awaiter(this, void 0, void 0, function* () {
            (() => {
                var _a, _b;
                if (myUserName !== undefined)
                    return;
                myUserName = (_a = docElem.getElementById("nameValue")) === null || _a === void 0 ? void 0 : _a.textContent;
                louzhuCard = docElem.querySelector(".d_name .p_author_name");
                louzhuObj = JSON.parse((_b = louzhuCard === null || louzhuCard === void 0 ? void 0 : louzhuCard.getAttribute("data-field")) === null || _b === void 0 ? void 0 : _b.split("'").join("\""));
            })();
            __remixedObservers.commentsObserver.addEvent(addTiebaTags);
            function addTiebaTags() {
                $(".lzl_cnt .at").toArray().forEach(elem => {
                    if (elem.classList.contains(TAGGED))
                        return;
                    elem.classList.add(TAGGED);
                    let isMe = false;
                    let isLZ = false;
                    if (elem.textContent === myUserName) {
                        makeTag(MY_TAG);
                        isMe = true;
                    }
                    if (elem.textContent === louzhuCard.textContent ||
                        elem.getAttribute("username") !== "" &&
                            elem.getAttribute("username") === decodeURIComponent(louzhuObj.un) ||
                        elem.getAttribute("portrait") === louzhuObj.id.split("?")[0]) {
                        isLZ = true;
                        if (!isMe)
                            makeTag(LZ_TAG);
                    }
                    (() => {
                        var _a;
                        if (isLZ)
                            return;
                        const floorElem = findParent(elem, "l_post_bright");
                        const cengzhuCard = floorElem === null || floorElem === void 0 ? void 0 : floorElem.querySelector(".d_name .p_author_name");
                        const cengzhuObj = JSON.parse((_a = cengzhuCard === null || cengzhuCard === void 0 ? void 0 : cengzhuCard.getAttribute("data-field")) === null || _a === void 0 ? void 0 : _a.split("'").join("\""));
                        if (elem.textContent === (cengzhuCard === null || cengzhuCard === void 0 ? void 0 : cengzhuCard.textContent) ||
                            elem.getAttribute("username") !== "" &&
                                elem.getAttribute("username") === decodeURIComponent(cengzhuObj.un) ||
                            elem.getAttribute("portrait") === cengzhuObj.id.split("?")[0]) {
                            makeTag(CZ_TAG);
                        }
                    })();
                    function makeTag(tagClass) {
                        const tagElem = document.createElement("div");
                        tagElem.classList.add(TB_TAG);
                        tagElem.classList.add(tagClass);
                        elem.appendChild(tagElem);
                    }
                });
            }
            function findParent(elem, parentClassName) {
                var _a;
                while (((_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.className.indexOf(parentClassName)) === -1) {
                    elem = elem.parentElement;
                }
                return elem.parentElement;
            }
        });
    }
})();
(() => {
    "use strict";
    if (location.href.indexOf("tieba.baidu.com/p/") === -1)
        return;
    const LINKED_CLASS = "linked";
    const avRegExp = /(?<!:\/\/www.bilibili.com\/video\/)av[1-9]\d*/gi;
    const BVRegExp = /(?<!:\/\/www.bilibili.com\/video\/)BV[A-Za-z0-9]{10}/g;
    document.addEventListener("DOMContentLoaded", () => {
        __remixedObservers.commentsObserver.addEvent(biliEnhanced);
    });
    function biliEnhanced() {
        return __awaiter(this, void 0, void 0, function* () {
            addBiliLinks(".d_post_content");
            addBiliLinks(".lzl_cnt .lzl_content_main");
            function addBiliLinks(selector) {
                $(selector).toArray().forEach(elem => {
                    if (elem.classList.contains(LINKED_CLASS))
                        return;
                    elem.classList.add(LINKED_CLASS);
                    if (elem.innerHTML.toLowerCase().indexOf("av") !== -1) {
                        const avs = elem.innerHTML.match(avRegExp);
                        bindingLinks(avs, true);
                    }
                    if (elem.innerHTML.indexOf("BV") !== -1) {
                        const BVs = elem.innerHTML.match(BVRegExp);
                        bindingLinks(BVs);
                    }
                    function bindingLinks(array, lowerCase = false) {
                        const hadHyperLink = [];
                        array === null || array === void 0 ? void 0 : array.forEach(videoID => {
                            if (hadHyperLink.indexOf(videoID) === -1) {
                                hadHyperLink.push(videoID);
                                const htmlArray = elem.innerHTML.split(RegExp("(?<!://www.bilibili.com/video/)" + videoID));
                                if (lowerCase)
                                    videoID = videoID.toLowerCase();
                                const linkedID = "<a href='https://www.bilibili.com/video/"
                                    + videoID + "/'>" + videoID + "</a>";
                                elem.innerHTML = htmlArray.join(linkedID);
                            }
                        });
                    }
                });
            }
        });
    }
})();
(() => {
    "use strict";
    let darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        if (event.matches) {
            darkmode = true;
        }
        else {
            darkmode = false;
        }
    });
    const favElem = document.createElement("link");
    favElem.type = "image/icon";
    favElem.rel = "shortcut icon";
    favElem.href = giteeResourcesMain() + "images/main/favicon.ico";
    document.addEventListener("DOMContentLoaded", () => {
        document.head.appendChild(favElem);
        if (location.href.indexOf("tieba.baidu.com/p/") !== -1) {
            __remixedObservers.postsObserver._observe();
            __remixedObservers.commentsObserver._observe();
        }
        $(".post-tail-wrap .icon-jubao").toArray().forEach(elem => {
            elem.removeAttribute("src");
            elem.after("举报");
        });
        __remixedObservers.postsObserver.addEvent(() => {
            const lvlClassHead = "tieba-lvl-";
            const lvlGreen = lvlClassHead + "green";
            const lvlBlue = lvlClassHead + "blue";
            const lvlYellow = lvlClassHead + "yellow";
            const lvlOrange = lvlClassHead + "orange";
            $(".d_badge_bawu1 .d_badge_lv, .d_badge_bawu2 .d_badge_lv, .badge_index").toArray().forEach(elem => {
                if (elem.className.indexOf(lvlClassHead) !== -1)
                    return;
                const lvl = parseInt(elem.textContent);
                if (lvl >= 1 && lvl <= 3) {
                    elem.classList.add(lvlGreen);
                }
                else if (lvl >= 4 && lvl <= 9) {
                    elem.classList.add(lvlBlue);
                }
                else if (lvl >= 10 && lvl <= 15) {
                    elem.classList.add(lvlYellow);
                }
                else if (lvl >= 16) {
                    elem.classList.add(lvlOrange);
                }
            });
        });
    });
    window.addEventListener("load", () => {
        $(".tbui_aside_float_bar li a").toArray().forEach(elem => {
            GM_addElement(elem, "div", {
                class: "svg-container"
            });
        });
    });
})();
