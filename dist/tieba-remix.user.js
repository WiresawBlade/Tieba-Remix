// ==UserScript==
// @name         Tieba Remix
// @namespace    https://github.com/WiresawBlade/Tieba-Remix
// @version      0.2.2-beta
// @description  提升贴吧网页端的体验：新的主题样式及功能增强
// @author       锯刃Blade
// @license      MIT
// @updateURL    https://gitee.com/WiresawBlade/Tieba-Remix/raw/beta/dist/tieba-remix.user.js
// @downloadURL  https://gitee.com/WiresawBlade/Tieba-Remix/raw/beta/dist/tieba-remix.user.js
// @icon         https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon16.png
// @icon64       https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon64.png
// @match        *://tieba.baidu.com/*
// @match        *://jump.bdimg.com/*
// @match        *://jump2.bdimg.com/*
// @grant        unsafeWindow
// @grant        GM_addElement
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @run-at       document-start
// @require      https://code.jquery.com/jquery-3.6.3.min.js
// ==/UserScript==
// @WiresawBlade

var TiebaRemix = function(exports) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = '.dialog-shadow[data-v-1fb4b209]{position:fixed;z-index:99999;display:flex;width:100%;height:100%;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);background-color:#00000080}.user-button[data-v-0f7e47fd]{box-sizing:border-box;padding:2px 8px;border:none;border-radius:6px;background:none;background-color:var(--light-background);box-shadow:0 0 0 1px var(--border-color);color:var(--default-fore);cursor:pointer}.user-button[data-v-0f7e47fd]:hover{background-color:var(--elem-color)}.user-button[data-v-0f7e47fd]:focus{box-shadow:0 0 0 2px var(--tieba-theme-color)}.user-textbox[data-v-16956fda]{box-sizing:border-box;padding:4px;border:2px solid var(--border-color);border-radius:6px;background-color:var(--default-background);outline:none}.user-textbox[data-v-16956fda]:hover{border-color:var(--light-background)}.user-textbox[data-v-16956fda]:focus{border-color:var(--tieba-theme-color)}[data-v-2250b574]:root{--default-background: rgb(255, 255, 255);--trans-default-background: rgba(255, 255, 255, .6);--deep-background: rgb(200, 200, 200);--trans-deep-background: rgba(200, 200, 200, .6);--light-background: rgb(230, 230, 230);--trans-light-background: rgba(230, 230, 230, .6);--very-light-background: rgb(245, 245, 245);--elem-color: rgb(240, 240, 240);--default-fore: rgb(10, 10, 10);--light-fore: rgb(20, 20, 20);--minimal-fore: rgb(60, 60, 60);--highlight-fore: rgb(0, 0, 0);--border-color: rgba(210, 210, 210, .6);--tieba-theme-color: rgb(97, 78, 194);--trans-tieba-theme-color: rgba(97, 78, 194, .6);--tieba-theme-background: rgba(97, 78, 194, .2);--tieba-theme-fore: rgb(58, 46, 116);--level-green-background: rgba(84, 130, 53, .3);--level-green-fore: rgb(51, 78, 32);--level-blue-background: rgba(0, 153, 213, .3);--level-blue-fore: rgb(0, 81, 111);--level-yellow-background: rgba(164, 139, 63, .3);--level-yellow-fore: rgb(124, 105, 46);--level-orange-background: rgba(255, 153, 0, .3);--level-orange-fore: rgb(178, 104, 0);--img-tieba-icon: url(https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon.png);color-scheme:light dark}@media (prefers-color-scheme: dark){[data-v-2250b574]:root{--default-background: rgb(32, 32, 32);--trans-default-background: rgba(32, 32, 32, .6);--deep-background: rgb(26, 26, 26);--trans-deep-background: rgba(20, 20, 20, .6);--light-background: rgb(60, 60, 60);--trans-light-background: rgba(60, 60, 60, .6);--very-light-background: rgb(60, 60, 60);--elem-color: rgb(26, 26, 26);--default-fore: rgb(230, 230, 230);--light-fore: rgb(200, 200, 200);--minimal-fore: rgb(144, 144, 144);--highlight-fore: rgb(255, 255, 255);--border-color: rgba(96, 96, 96, .6);--tieba-theme-color: rgb(113, 97, 193);--trans-tieba-theme-color: rgba(113, 97, 193, .6);--tieba-theme-background: rgba(113, 97, 193, .2);--tieba-theme-fore: rgb(150, 128, 255);--level-green-background: rgba(96, 153, 59, .3);--level-green-fore: rgb(133, 206, 84);--level-blue-background: rgba(0, 165, 227, .3);--level-blue-fore: rgb(0, 169, 255);--level-yellow-background: rgba(229, 193, 90, .3);--level-yellow-fore: rgb(242, 205, 96);--level-orange-background: rgba(204, 122, 0, .3);--level-orange-fore: rgb(255, 170, 0)}}.dialog-warp[data-v-2250b574]{display:grid;width:600px;height:400px;border-width:1px;border-style:solid;border-color:#d2d2d299;border-color:var(--border-color);border-radius:12px;margin:auto;background-color:#fff;background-color:var(--default-background);box-shadow:0 0 40px #0000001a;grid-template-columns:240px 360px}.dialog-warp .left-container[data-v-2250b574]{position:relative;display:flex;width:240px;height:400px;border-radius:12px 0 0 12px;background-color:#f0f0f0;background-color:var(--elem-color)}.dialog-warp .left-container .head-controls[data-v-2250b574]{position:absolute;top:0;width:100%;height:80px;box-sizing:border-box;padding:0 24px;border-radius:12px 0 0;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}.dialog-warp .left-container .head-controls .title[data-v-2250b574]{padding-top:14px;color:#141414;color:var(--light-fore)}.dialog-warp .left-container .head-controls .search-box[data-v-2250b574]{width:100%;margin-top:8px;margin-bottom:8px}.dialog-warp .left-container .module-list-container[data-v-2250b574]{overflow:hidden;height:100%;box-sizing:border-box;border-radius:12px 0 0 12px}.dialog-warp .left-container .module-list-container .module-item[data-v-2250b574]{overflow:hidden;width:240px;box-sizing:border-box;padding:12px 24px;border-radius:0;background-color:transparent;background-color:initial;box-shadow:none;text-align:justify;white-space:nowrap}.dialog-warp .left-container .module-list-container .module-item .title[data-v-2250b574]{font-size:16px;font-weight:700}.dialog-warp .left-container .module-list-container .module-item .brief[data-v-2250b574]{overflow:hidden;margin-top:2px;color:#3c3c3c;color:var(--minimal-fore);font-size:12px;text-overflow:ellipsis}.dialog-warp .left-container .module-list-container .module-item[data-v-2250b574]:hover{background-color:#614ec299;background-color:var(--trans-tieba-theme-color)}.dialog-warp .left-container .module-list-container .module-item.selected[data-v-2250b574]{background-color:#614ec2;background-color:var(--tieba-theme-color);color:#f0f0f0;color:var(--elem-color)}.dialog-warp .left-container .module-list-container .module-item.selected .brief[data-v-2250b574]{color:inherit;font-weight:700}.dialog-warp .left-container .module-list-container[data-v-2250b574]:hover{overflow-x:hidden;overflow-y:auto;overflow:hidden auto}.dialog-warp .left-container .module-list-container[data-v-2250b574]:nth-child(1){padding-top:80px}.dialog-warp .right-container[data-v-2250b574]{overflow:hidden}.dialog-warp .right-container .module-container[data-v-2250b574]{position:relative;top:0;display:flex;overflow:hidden;height:100%;box-sizing:border-box;flex-direction:column;flex-shrink:0;padding:24px;gap:16px}.dialog-warp .right-container .module-container .module-info[data-v-2250b574]{overflow:hidden;padding-bottom:60px}.dialog-warp .right-container .module-container .module-info .title[data-v-2250b574]{padding-bottom:8px;font-size:20px;font-weight:700}.dialog-warp .right-container .module-container .module-info .title span[data-v-2250b574]{margin-left:8px;color:#3c3c3c;color:var(--minimal-fore);font-family:monospace;font-size:16px;font-weight:400}.dialog-warp .right-container .module-container .module-info .brief[data-v-2250b574]{color:#3c3c3c;color:var(--minimal-fore);font-size:14px}.dialog-warp .right-container .module-container .module-info .desc[data-v-2250b574]{margin-top:24px}.dialog-warp .right-container .module-container .module-info[data-v-2250b574]:hover{overflow-x:hidden;overflow-y:auto;overflow:hidden auto}.dialog-warp .right-container .module-container .module-tags[data-v-2250b574]{display:flex;flex-wrap:wrap;padding:8px;border-radius:12px;background-color:#f0f0f0;background-color:var(--elem-color);gap:4px}.dialog-warp .right-container .module-container .module-tags .tag[data-v-2250b574]{min-width:36px;padding:2px 6px;border:1px solid rgb(97,78,194);border:1px solid var(--tieba-theme-color);border-radius:24px;background-color:#614ec299;background-color:var(--trans-tieba-theme-color);box-shadow:none;color:#3a2e74;color:var(--tieba-theme-fore)}.dialog-warp .right-container .module-container .module-tags .tag[data-v-2250b574]:hover,.dialog-warp .right-container .module-container .module-tags .tag[data-v-2250b574]:focus{background-color:#614ec2;background-color:var(--tieba-theme-color);color:#f0f0f0;color:var(--elem-color)}.dialog-warp .right-container .module-container .bottom-controls[data-v-2250b574]{position:absolute;bottom:0;left:0;display:flex;width:100%;box-sizing:border-box;justify-content:flex-end;padding:12px 24px;border-radius:0 0 12px;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);background-color:#fff9;background-color:var(--trans-default-background)}.dialog-warp .right-container .module-container .bottom-controls .toggle[data-v-2250b574],.dialog-warp .right-container .module-container .bottom-controls .settings[data-v-2250b574]{padding:0;border-radius:24px;background-color:transparent;background-color:initial;box-shadow:none;font-family:Material Icons,monospace}.dialog-warp .right-container .module-container .bottom-controls .toggle[data-v-2250b574]{margin-right:auto;font-size:36px}.dialog-warp .right-container .module-container .bottom-controls .toggle.on[data-v-2250b574]:after{color:#3a2e74;color:var(--tieba-theme-fore);content:"toggle_on"}.dialog-warp .right-container .module-container .bottom-controls .toggle.off[data-v-2250b574]:after{color:#3c3c3c;color:var(--minimal-fore);content:"toggle_off"}.dialog-warp .right-container .module-container .bottom-controls .settings[data-v-2250b574]:after{padding:6px;color:#3c3c3c;color:var(--minimal-fore);content:"settings";font-size:24px}.dialog-warp .right-container .module-container .bottom-controls .settings[data-v-2250b574]:hover{background-color:#f5f5f5;background-color:var(--very-light-background)}.dialog-warp .right-container .empty-container[data-v-2250b574]{display:flex;height:100%;align-items:center;justify-content:center}.dialog-warp .right-container .empty-container .empty-icon[data-v-2250b574]{color:#3c3c3c;color:var(--minimal-fore);font-family:Material Icons,monospace;font-size:64px;font-variation-settings:"FILL" 0}.dialog-warp .right-container .empty-container .empty-icon[data-v-2250b574]:after{content:"widgets"}\n';
  document.head.appendChild(__vite_style__);
  const favicon = "data:image/x-icon;base64,AAABAAMAEBAAAAEAIABoBAAANgAAABgYAAABACAAiAkAAJ4EAAAgIAAAAQAgAKgQAAAmDgAAKAAAABAAAAAgAAAAAQAgAAAAAAAABAAAvzIAAL8yAAAAAAAAAAAAAAAAAAAAAAAA/7grAP+4KwD/uCsA/7grAP+4K1D/uCub/7grKP+4KwD/uCsA/7grAP+4KwD/uCsA/7grAP+4KwAAAAAA/7grAP+4KwD/uSsA/7krGv+6K2f/uyu0/7or/v+6K9b/uSuU/7grjP+4K43/uCuB/7grPv+4KwP/uCsAAAAAALRviwD9ty8A/8IpIv63K8H1qS7/6pow/+eVMf/uny//+rAs//+5K///uCv//7gq//+4K+7/uCtn/7svAIJZ/wCgab0ApF+fAOOPNInLazn/skhE/6k7Rv+lNEL/qz1E/75cSf/agjX/+rIw//+8NP//uCv//7gr3P+4KyeCWf8AilTaAIZY70mhQGjloi5B/7RZaf/QlqD/s1Vl/82Qm//hvMT/2Kes//DQtv//24///7gq//+4K/b/uCtOgln/AIJZ/zCDWPncmjx3/6MwQf+nOkz/2Kiw/+fIzf/Yp6//48DG/75ue//NkqD/88+l//yzK///uCv3/7grUoJZ/wWCWf+fg1j6/5o8dv+jLj//sE9f/+PAxf/kwsj/4b3D/+bGy/+4YW//zI2Y/9usrP/lkjH//7or9/+4K1GCWf8sgln/44NY+v+aPHb/oi4//7RWZv/kw8j/5MLH/+XFyv/csLf/79ve/9+4vv/CeIf/x2Y5//+4K/f/uCtRgln/V4JZ//iDWPr/mjx2/6IuP/+0Vmb/5MHH/+XFyv/ds7r/rEVW/+C6wP+8aXf/q0VY/7hRQP/6sSz3/7krUYJZ/2SCWf/7g1j5/5o8dv+iLj//tFdm/+PBx//etbv/3ra9/6tEVf/lxcr/5cTJ/8+Vof+3UEX/+K4s9/+6K1KCWf9Pgln/9oNY+/+ZPXv/oy4//7BOX//iv8T/47/F/9mqsv+qQlP/3rW8/7RWZv+kNUr/ulM+//uzLPX/uStMgln/IoJZ/9mCWf//kkal/6MwQv+kM0b/qT5Q/6pBUv+oPE7/pTVH/7Vaaf+nOkz/oS5E/85wOP//uSvV/7grIYJY/gCCWf+Hgln//4VV7v+YPoH/ojJH/6MwQf+jMEH/ozBB/6MwQv+iLkD/oy9C/6w+Qv/qmTHj/7wqV/+4KwCCWf8Agln/HIJZ/8OCWf//hFf0/4xNxP+RR6v/kUep/5FHqf+RR6n/kUeq/5FGp/qqVXSR/7UkLP//AAD/uCsAgln/AIJZ/wCCWf8qgln/t4JZ//yCWv//gVr//4Fa//+BWv//gVr//4Fa/+yBWv97YV3/B96aWwD/xigA/7grAIJZ/wCCWf8Agln/AIJZ/xSCWf91gln/z4JZ//eCWf/+gln/64JZ/6+CWf9Hgln/AoJZ/wCCWf8Ak2XgAAAAAADAAAAAgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAKAAAABgAAAAwAAAAAQAgAAAAAAAACQAAvzIAAL8yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAYBAP+4KwD/uCsA/7grAP+4Kx3/uCun/7grS/+4KwT/uCsA/7grAP+4KwD/uCsA/7grAP+4KwD/uCsA/7grAP+4KwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+uCsA/7grAP+4KwD/uCsA/7grAv+4Kyn/uCvi/7gr7/+4K5f/uCsu/7grDf+4Kw3/uCsN/7grDf+4Kwv+tysA/7grAP+4KwD/uCsAjGYXAAAAAAAAAAAAAAAAAP+4KwD/uCsA/7grAP+4Kwr/uCtZ/7grqf+4K83/uCv4/7gr//+4K///uCvl/7gryP+4K8j/uCvI/7gryP+4K8L/uCuW/7grO/64KgH/uCsA/7grAAAAAAAAAAAAAAAAAP+4KwD/uCsA/7grD/+5K5j/uiv6/7kr//22K//7siz/+7Ms//62K///uiv//7or//+4K///uCv//7gr//+4K///uCv//7gr6v+4K2X/uCsB/7grAAAAAAAAAAAAgln+AP/VIQDllTkA/7wqd/uyLP/mlDL/z3E4/79aPP+5UT7/uVI+/8FdPP/RdTf/6Zgw//y0LP//uiv//7gr//+4Kv//uCv//7gr//+4K+v/uCs8/7grAAAAAACCWP8Agln/AMqJdQD6rSMW4Is0071XPf+nNkP/ozFG/6MxR/+hLkP/oS9E/6AsQv+mOEz/rUNM/8BaOf/ply3//rgu//+8Nv//uCz//7gr//+4K///uCuY/rcrAQEBAgCCWf8Agln/AG9i/weUUbWBpjlL+qIvRP+iLkL/wHF+/9iosP+qQVP/qDtN/8J2g//RmaL/4r/G/8eEkf/Sk4z/9tOk///ntP7/vDb//7gq//+4K///uCvD/7grDoJZ/wCCWf8Agln/A4Fa/36JUNX6oTNO/6MxQ/+iMEP/slJi/+rP1P/YqLD/yYaR/+7a3f/ft73/+fLz/+zU2P/r0tf/8uPp///y2P//vTn//7gq//+4K///uCvJ/7grEYJZ/wCCWf8Agln/U4Ja//OJUNb/oTNN/6MxQ/+jMUT/ozFE/8Bxfv/16Or/7tnc/86Qmv/VoKn/4bzC/6g9T/+mOEv/x4KO//Th2P/wpj3//7kq//+4K///uCvJ/7grEYJZ/wCCWf8Ugln/yIJa//+JUNX/oTNN/6MxQ/+iL0L/s1Vk/+PBx//u2d3/2Kiw/9+4v//nys7/37e+/6U2SP+jMUT/xX6K/+zV2v/Ha0j//LMr//+4K///uCvJ/7grEYJZ/wCCWf9Zgln/+4Ja//+JUNX/oTNN/6MxQ/+iLkL/t11s/+3W2v/kw8j/3ra8/+zV2P/s1Nj/9+zu/+XEyv/kw8n/8N3g/+7Z3f+uRk//6Zcw//+6K///uCvJ/7grEYJZ/gKCWf+fgln//4Ja//+JUNX/oTNN/6MxQ/+iLkL/tlxr/+zT1//hvML/4bzC/+zV2f/Sm6T/0Jag//Pj5v/q0dX/0Zeh/8eCjf+lNkr/0HM3//+5K///uCvJ/7grEYJZ/xKCWf/Kgln//4Ja//+JUNX/oTNN/6MxQ/+iLkL/tlxr/+zT1//hvML/4bzC/+3W2v+7Z3T/oi5B/+PBx//TnKX/nyk9/6EsQP+hLkT/wFs8//22K///uCvJ/7grEYJZ/x+CWf/bgln//4Ja//+JUNX/oTNN/6MxQ/+iLkL/tlxr/+vT1//ivcP/4r7D/+3W2v+8aHb/ozFE/+PBxv/s1Nj/1J+n/9Odpv+wTmD/t049//uyLP//uCvJ/7grEYJZ/yCCWf/cgln//4Ja//+JUNX/oTNN/6MxQ/+iLkL/tlxr/+3W2v/Tnqf/052m/+7Z3P+8aHb/ozFE/+PAxv/z5Of/48DG/+K9w/+0WGn/tk08//uxLP//uCvJ/7grEYJZ/xWCWf/Ogln//4Ja//+JUdf/oTNO/6MxQ/+iLkL/tltq//bs7f/v297/7trd//nx8v+7ZnT/ozFE/+XEyf/Voar/ozFE/6Q0R/+iMEX/vlg9//21LP//uCvI/7grEIJZ/wSCWf+pgln//4JZ//+GVOj/nzZc/6MxQv+jMEP/qT9R/8F1gv/EfIj/xHuI/8J3hP+rQ1X/pDNF/9mqsf/MjJf/oi9C/6MxRP+iL0T/zW85//+5K///uCut/7grBYJZ/wCCWf9mgln//oJZ//+CWf3/lkGQ/6QwQf+jMUT/ozBD/6IuQf+hLUH/oS1B/6EuQf+jMEP/ozFE/6g9T/+nOkz/ozFE/6MxRP+mNUP/5ZIy//+6K/v/uCte/7grAIJZ/wCCWf8dgln/1oJZ//+CWf//h1Pk/5w6bf+kMEH/ozFC/6MxQ/+jMUT/ozFE/6MxRP+jMUT/ozFD/6MwQ/+jMEP/ozFE/6IvRP+8VT3/+rEs//+5K53/uCsM/7grAIJZ/wCCWf8Agln/aIJZ//uCWf//gln//4dT5P+WQY7/nzZa/6EzTf+iM0z/ojNM/6IzTP+iM0z/ojNM/6IzTP+iM0z/oTNN/6U4S/vfiTTX/7sqff+4KxD/uCsA/7grAIJZ/wCCWf8Agln/CYJZ/5iCWf//gln//4JZ//+CWf3/hlTm/4lQ1f+KUNP/ilDT/4pQ0/+KUNP/ilDT/4pQ0/+KUNP/ik/S+5RQtIb2qCcZt1dTAP+4KwD/uCsA/7grAIJZ/gCCWf8Agln/AIJZ/xKCWf+Zgln/+4JZ//+CWf//gln//4Ja//+CWv//glr//4Ja//+CWv//glr//4Ja//+CWv/1gVr/hHFh/wnKh3UA/9EjAP+4KwD/uCsAAAAAAAAAAACCWf8Agln/AIJZ/wCCWf8Jgln/aIJZ/9WCWf/9gln//4JZ//+CWf//gln//4JZ//+CWf//gln/+4JZ/8uCWf9Xgln/BIJZ/wCCWf8Agln/AAAAAAAAAAAAAAAAAAAAAAAAAAAAgln+AIJZ/wCCWf8Agln/AIJZ/yOCWf94gln/xIJZ/+6CWf/+gln//YJZ/+qCWf+8gln/bIJZ/xuCWf8Agln/AIJZ/wCCWf8AAAAAAAAAAAAAAAAAAAAAAPgAAwDwAAAA4AAAAOAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCAAAcAwAAPACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAL8yAAC/MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+4KwD+uCsC/7griv+4K3j/uCsS/7grAP+4KwD/uCsA/7grAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7grAP+4KwD/uCsA/7grAP+4KwD/uCui/7gr/v+4K7v/uCtN/7grB/+4KwD/uCsA/7grAP+4KwD/uCsA/7grAP+4KwD/uCsA/7grAP+4KwD/uCsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/rgrAP+4KwD/uCsA/7grAP+4KwP/uCsc/7grMf+4K7X/uCv//7gr//+4K/T/uCum/7grRf+4KzL/uCsz/7grM/+4KzP/uCsz/7grL/+4Kxr/uCsC/7grAP+4KwD/uCsA/bgqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+5KwD/uCsA/7grAP63KgH/uCs8/7grof+4K9v/uCvu/7gr+f+4K///uCv//7gr//+4K///uCv1/7gr7/+4K+//uCvv/7gr7/+4K+//uCvt/7gr2f+4K5r/uCs1/7ksAP+4KwD/uCsAJBoGAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7grAP+4KwD/uCsD/7grav+4K+r/uCv//7kr//+6K///uiv//7or//+6K///uiv//7or//+5K///uCv//7gr//+4K///uCv//7gr//+4K///uCv//7gr//+4K+X/uCte/7grAf+4KwD/uCsAAAAAAAAAAAAAAAAAAAAAAG5QEwD+tyoA/7grAP+4K1f/uSvy/7or//uyLP/voS//4o4z/9mBNf/WfDb/2YA1/+GMM//tnjD/+bAs//+5K///uSv//7gr//+4K///uCv//7gr//+4K///uCv//7gr//+4K+z/uCtJ/7grAP+4KwAAAAAAAAAAAAAAAAAAAAAAdE//AP+7KwD/vioX/7krzfSoLv/WfTb+u1Q+/6s9Qv+lM0P/ozBE/6IwRP+jMET/pDNE/6k6Qv+3Tj7/0XU3/vCiL///uCv//7kr//+4K///uCr//7gr//+4K///uCv//7gr//+4K8D/uCsQ/7grAAAAAAAAAAAAAAAAAIJZ/wCCWf4A0I1pAPOmLFLZgDX6skdA/6MxRP+iL0T/ozFF/6QzRv+iMEP/ozFE/6MxRP+iLkL/ozFF/6g9Uf+lN0v/rD4+/9F0Nf73qyr//7ku//+7Nf//uS3//7gr//+4K///uCv//7gr9v+4K0T/uCsAAAAAAAAAAACCWf4Agln/AIJZ/wB9XP8eokt9tqU0Q/+iMET/ozFE/6MwQ//Ee4f/2amx/61HWP+iL0L/pTVI/7ljcf+1WGf/5sjN/9elrv+3Xm//uGFv/9KGZv7605L+/+3J/v/FUf//tyn//7gr//+4K///uCv//7grb/+4KwAAAAAAgln+AIJZ/wCCWf8Agln/IIJa/7yUQ5r/ozBB/6MxRP+jMUT/ozFE/8mFkP/79vf/48DG/6k+T/+5Y3H/9+zu/9qrs/716Or///////z4+P/8+Pn/+/f5//79/f///fj//8ld//+3KP//uCv//7gr//+4K///uCt7/7grAAAAAACCWf8Agln/AIJZ/xCCWf+tgln//5RDmf+kMEH/ozFE/6MxRP+jMUT/ozFE/8uKlf/9+vr/05yl/+TCyP/26uz/wXWB//Tn6f/q0NT/zpKc/8+Tnf/OkZv/5MPJ///89v/9xlz//7co//+4K///uCv//7gr//+4K3v/uCsAglj9AIJZ/wCEW/8Agln/fIJZ//6CWf//lEOZ/6QwQf+jMUT/ozFE/6MxRP+kNEb/rkla/+jM0f/68/T/8d/i/8+TnP+yUmL/9urs/9aiq/+hLD//oi5B/6ArPv/Li5b/+/f4/96ZZf78syn//7gr//+4K///uCv//7gre/+4KwCCWf8Agln/AIJZ/zCCWf/lgln//4JZ//+UQ5n/pDBB/6MxRP+jMUT/oi9C/7VZaP/pzdH/4bzC//rz9P/Hgo3/4b3D/9uutv726uz/1aKq/6EsP/+hLUH/oCo+/8uLlv/79/j/vWhu/+WRL///uiv//7gr//+4K///uCt7/7grAIJZ/wCCWf8Agln/jYJZ//+CWf//gln//5RDmf+kMEH/ozFE/6MxRP+iLkH/uWJw//ny8//Xpa3/+fLz/82Pmf/v3N//6MvQ//Xp6//lxMr/w3iF/8N5hv/Cd4T/3ra8//v3+P+3X3D/wVw5//21LP//uCv//7gr//+4K3v/uCsAgln/AIJZ/xqCWf/Xgln//4JZ//+CWf//lEOZ/6QwQf+jMUT/ozFE/6IuQf+4YW//+PDy/9GYof/37e//052m/+/a3v/nyc7/8+Xn///+/v/+/f3//v7+//78/P/+/f3/+vT1/7hgb/+qOj//7qAw//+5K///uCv//7gre/+4KwCCWf8Agln/SoJZ//iCWf//gln//4JZ//+UQ5n/pDBB/6MxRP+jMUT/oi5B/7hhb//48PL/0JWf//bs7f/UoKj/79zf/9+4vv++bnv/wneD/+jL0P/58/T/yomU/8J2gv/Bc4D/qkFT/6MwQ//agTX//7or//+4K///uCt7/7grAIJZ/wCCWf93gln//4JZ//+CWf//gln//5RDmf+kMEH/ozFE/6MxRP+iLkH/uGFv//jw8v/Qlp//9uzu/9SgqP7v3N//26+2/6EtQf+hLUH/26+3//bs7f+tSFn/oCo9/6EsP/+iL0L/oS9E/8loOv//uCv//7gr//+4K3v/uCsAgln/AIJZ/5WCWf//gln//4JZ//+CWf//lEOZ/6QwQf+jMUT/ozFE/6IuQf+4YW//+PDy/9CWn//37O7/1KCo/u/c3//br7b/ozBD/6MxRP/csbj/+O/x/7tmdP+vTFz/sE5e/6tDVP+iL0T/vlk9//21LP//uCv//7gre/+4KwCAWf0Bgln/oIJZ//+CWf//gln//4JZ//+UQ5n/pDBB/6MxRP+jMUT/oi5B/7hhb//48PL/0Jaf//ju8P/Voan+79zf/9uvtv+jMEP/ozFE/9uvt///////+O/x//ft7v/48PH/2Kiw/6IwRf+6Uz7//LMs//+4K///uCt7/7grAH1X+QCCWf+dgln//4JZ//+CWf//gln//5RDmf+kMEH/ozFE/6MxRP+iLkH/uGFv//ny8//MjZf/1KCo/8Z+iv/x3+L/26+2/6MwQ/+jMUT/3LC3//36+v/gusD/2661/9yxuP/HgYz/oi9F/7tVPf/8tCz//7gr//+4K3v/uCsAgln/AIJZ/4qCWf//gln//4JZ//+CWf//lESa/6QwQf+jMUT/ozFE/6IuQf+5YnD//Pj5//Lj5f/q0dX/7dfa///+/v/br7f/ozBD/6MxRP/csbj/9+zu/69MXf+iL0L/ozBE/6MxRP+hL0T/wl88//63K///uCv//7grev+4KwCCWf8Agln/ZIJZ//+CWf//gln//4Ja//+RR6v/ozFC/6MxRP+jMUT/oi9C/7NUY//jwMb/58nO/+fKz//nyc7/58rP/8uLlv+jMUT/ozFE/92zuv/47/H/sE1e/6IvQv+jMUT/ozFE/6IvRP/Pcjj//7kr//+4K///uCto/7grAIJZ/wCCWf80gln/7oJZ//+CWf//glr//4pP0f+hM03/ozFD/6MxRP+jMUT/pDJF/6U3Sf+mN0n/pjdJ/6Y3Sf+mN0n/pTVH/6MxRP+jMUT/wneE/9GYof+qQFL/ozBD/6MxRP+jMUT/pTRD/+OPM///uiv//7gr8P+4Kzj/uCsAgln/AIJZ/wuCWf+7gln//4JZ//+CWf//g1f3/5k9ff+kMEH/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ozFE/6MxRP+iMEP/oi9C/6MxRP+jMUT/ozFE/6IwRP+zSED/9qst//+5K///uCus/7grCP+4KwCCWf8Agln/AIJZ/2KCWf/8gln//4JZ//+CWf//iVHY/543Xv+kMEH/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ozFE/6MxRP+jMUT/ojBE/9J1N///uSv//7gr2P+4KzH/uCsA/7grAIJZ/wCCWf8Agln/EoJZ/7+CWf//gln//4JZ//+CWf//ik/R/5w6bP+jMUT/pDBB/6MxQv+jMUL/ozFC/6MxQv+jMUL/ozFC/6MxQv+jMUL/ozFC/6MxQv+jMUL/ozFC/6IvQv+0Sj//9Kcu//+5K8j/uCs8/7grAP+4KwD/uCsAgln+AIJZ/wCCWf8Agln/Q4JZ/+qCWf//gln//4JZ//+CWf//hVXs/5BIr/+ZPX3/nTlo/504Zf+dOGX/nThl/504Zf+dOGX/nThl/504Zf+dOGX/nThl/504Zf+dOGX/njlk99F3Pbj/uypu/7grGv+4KwD/uCsA/7grAAAAAAAAAAAAgln/AIJZ/wCDW/8Agln/aYJZ//WCWf//gln//4JZ//+CWf//glr//4NY+/+EVvP/hVbw/4VW8P+FVvH/hVbx/4VW8f+FVvH/hVbx/4VW8f+FVvH/hVbx/4VW8PyHVeiGxoR8CuukQgD/uCsA/7grAP+4KwAAAAAAAAAAAAAAAAAAAAAAgln/AIJZ/wCCWf8Egln/cYJZ//GCWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf/5gln/in5c/wuZY8oAAAD/AP+4KwD+uCsAAAAAAAAAAAAAAAAAAAAAAAAAAACCWf8Agln/AIJZ/wCCWf4Cgln/U4JZ/9OCWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf//gln/4IJZ/2mCWf8Hgln/AIJZ/wCDWP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCWP8Agln/AIJZ/wCCWf8Agln/IoJZ/4eCWf/cgln//IJZ//+CWf//gln//4JZ//+CWf//gln//4JZ//+CWf/+gln/5IJZ/5iCWf8ugln/AIJZ/wCCWf8AgFj+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCWP4Agln/AIJZ/gCCWf8Ahl//AIJZ/yiCWf9ygln/t4JZ/+OCWf/6gln//4JZ//yCWf/ogln/v4JZ/36CWf8ygln/A4JZ/wCCWf8Agln/AIJZ/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AP//8AAAf8AAAB+AAAAPgAAADwAAAA8AAAAOAAAADAAAAAgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAA8AAAAfAAAAf4AAAP/AAAH8=";
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$b = Object.prototype;
  var hasOwnProperty$a = objectProto$b.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$b.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$a = Object.prototype;
  var nativeObjectToString = objectProto$a.toString;
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag$1 = "[object Symbol]";
  function isSymbol$1(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
  }
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var isArray$1 = Array.isArray;
  const isArray$2 = isArray$1;
  var INFINITY$1 = 1 / 0;
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$2(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol$1(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  function isObject$1(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol$1(value)) {
      return NAN;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$1(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$1(value) {
    if (!isObject$1(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root$1["__core-js_shared__"];
  const coreJsData$1 = coreJsData;
  var maskSrcKey = function() {
    var uid2 = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
    return uid2 ? "Symbol(src)_1." + uid2 : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$1 = Function.prototype;
  var funcToString$1 = funcProto$1.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto$9 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$9 = objectProto$9.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject$1(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var WeakMap$1 = getNative(root$1, "WeakMap");
  const WeakMap$2 = WeakMap$1;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  const defineProperty$1 = defineProperty;
  var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
    return defineProperty$1(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  const baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  const setToString$1 = setToString;
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  function baseIsNaN(value) {
    return value !== value;
  }
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var nativeMax$1 = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + "");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction$1(value);
  }
  function isIterateeCall(value, index, object) {
    if (!isObject$1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  var objectProto$8 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$8 = objectProto$7.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  const isArguments$1 = isArguments;
  function stubFalse() {
    return false;
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  const isBuffer$1 = isBuffer;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal$1.process;
  var nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  const nodeUtil$1 = nodeUtil;
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  const isTypedArray$1 = isTypedArray;
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$7 = objectProto$6.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$2(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  const nativeKeys$1 = nativeKeys;
  var objectProto$5 = Object.prototype;
  var hasOwnProperty$6 = objectProto$5.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  var nativeCreate = getNative(Object, "create");
  const nativeCreate$1 = nativeCreate;
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$5 = objectProto$4.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
  }
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$4 = objectProto$3.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
    return this;
  }
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry2 = entries[index];
      this.set(entry2[0], entry2[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto$1 = Array.prototype;
  var splice$1 = arrayProto$1.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice$1.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry2 = entries[index];
      this.set(entry2[0], entry2[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root$1, "Map");
  const Map$2 = Map$1;
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$2 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map2, key) {
    var data = map2.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size2 = data.size;
    data.set(key, value);
    this.size += data.size == size2 ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry2 = entries[index];
      this.set(entry2[0], entry2[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
  var rsZWJ$2 = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function asciiToArray(string) {
    return string.split("");
  }
  var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
  var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? void 0 : object[key];
    };
  }
  var deburredLetters = {
    // Latin-1 Supplement block.
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "Ç": "C",
    "ç": "c",
    "Ð": "D",
    "ð": "d",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "Ñ": "N",
    "ñ": "n",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "Ý": "Y",
    "ý": "y",
    "ÿ": "y",
    "Æ": "Ae",
    "æ": "ae",
    "Þ": "Th",
    "þ": "th",
    "ß": "ss",
    // Latin Extended-A block.
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "s"
  };
  var deburrLetter = basePropertyOf(deburredLetters);
  const deburrLetter$1 = deburrLetter;
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
  var rsCombo$1 = "[" + rsComboRange$1 + "]";
  var reComboMark = RegExp(rsCombo$1, "g");
  function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
  }
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
  var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
    rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
    rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
    rsUpper + "+" + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join("|"), "g");
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
  }
  var rsApos = "['’]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string) {
      return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray() {
    return [];
  }
  var objectProto$2 = Object.prototype;
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  const getSymbols$1 = getSymbols;
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols$1);
  }
  var DataView = getNative(root$1, "DataView");
  const DataView$1 = DataView;
  var Promise$1 = getNative(root$1, "Promise");
  const Promise$2 = Promise$1;
  var Set$1 = getNative(root$1, "Set");
  const Set$2 = Set$1;
  var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag$1 = "[object DataView]";
  var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$2);
  var getTag = baseGetTag;
  if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map$2 && getTag(new Map$2()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$1 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$1;
          case mapCtorString:
            return mapTag$1;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$1;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  const getTag$1 = getTag;
  var Uint8Array2 = root$1.Uint8Array;
  const Uint8Array$1 = Uint8Array2;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack2.get(array);
    var othStacked = stack2.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
    stack2.set(array, other);
    stack2.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
        result = false;
        break;
      }
    }
    stack2["delete"](array);
    stack2["delete"](other);
    return result;
  }
  function mapToArray(map2) {
    var index = -1, result = Array(map2.size);
    map2.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function setToArray(set2) {
    var index = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag$1 = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag$1:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack2.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack2.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
        stack2["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  var COMPARE_PARTIAL_FLAG$1 = 1;
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$3 = objectProto$1.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack2.get(object);
    var othStacked = stack2.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack2.set(object, other);
    stack2.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack2["delete"](object);
    stack2["delete"](other);
    return result;
  }
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto = Object.prototype;
  var hasOwnProperty$2 = objectProto.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
    var objIsArr = isArray$2(object), othIsArr = isArray$2(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer$1(object)) {
      if (!isBuffer$1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack2 || (stack2 = new Stack());
      return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack2 || (stack2 = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack2 || (stack2 = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
  }
  function baseIsEqual(value, other, bitmask, customizer, stack2) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var baseFor = createBaseFor();
  const baseFor$1 = baseFor;
  function baseForOwn(object, iteratee) {
    return object && baseFor$1(object, iteratee, keys);
  }
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  var baseEach = createBaseEach(baseForOwn);
  const baseEach$1 = baseEach;
  function castFunction(value) {
    return typeof value == "function" ? value : identity;
  }
  function forEach(collection, iteratee) {
    var func = isArray$2(collection) ? arrayEach : baseEach$1;
    return func(collection, castFunction(iteratee));
  }
  var nativeMax = Math.max;
  function indexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
      index = nativeMax(length + index, 0);
    }
    return baseIndexOf(array, value, index);
  }
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }
  var regexpTag = "[object RegExp]";
  function baseIsRegExp(value) {
    return isObjectLike(value) && baseGetTag(value) == regexpTag;
  }
  var nodeIsRegExp = nodeUtil$1 && nodeUtil$1.isRegExp;
  var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
  const isRegExp$1 = isRegExp;
  var kebabCase = createCompounder(function(result, word, index) {
    return result + (index ? "-" : "") + word.toLowerCase();
  });
  const kebabCase$1 = kebabCase;
  function baseIndexOfWith(array, value, fromIndex, comparator2) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (comparator2(array[index], value)) {
        return index;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function basePullAll(array, values, iteratee, comparator2) {
    var indexOf2 = comparator2 ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
    if (array === values) {
      values = copyArray(values);
    }
    if (iteratee) {
      seen = arrayMap(array, baseUnary(iteratee));
    }
    while (++index < length) {
      var fromIndex = 0, value = values[index], computed2 = iteratee ? iteratee(value) : value;
      while ((fromIndex = indexOf2(seen, computed2, fromIndex, comparator2)) > -1) {
        if (seen !== array) {
          splice.call(seen, fromIndex, 1);
        }
        splice.call(array, fromIndex, 1);
      }
    }
    return array;
  }
  function pullAll(array, values) {
    return array && array.length && values && values.length ? basePullAll(array, values) : array;
  }
  var pull = baseRest(pullAll);
  const pull$1 = pull;
  var MAX_ARRAY_LENGTH = 4294967295;
  function split(string, separator, limit) {
    if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
      separator = limit = void 0;
    }
    limit = limit === void 0 ? MAX_ARRAY_LENGTH : limit >>> 0;
    if (!limit) {
      return [];
    }
    string = toString(string);
    if (string && (typeof separator == "string" || separator != null && !isRegExp$1(separator))) {
      separator = baseToString(separator);
      if (!separator && hasUnicode(string)) {
        return castSlice(stringToArray(string), 0, limit);
      }
    }
    return string.split(separator, limit);
  }
  const defaultStyle = document.createElement("style");
  const fadeInElems = [];
  const fadeInClass = "fade-in-elem";
  defaultStyle.id = "default-stylesheet";
  afterHead(() => {
    document.head.appendChild(defaultStyle);
  });
  function DOMS(selector, _type) {
    return document.querySelectorAll(selector);
  }
  function afterHead(callbackfn) {
    new Promise((_resolve, reject) => {
      try {
        const head = document.getElementsByTagName("head");
        if (head && head.length) {
          callbackfn();
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  function mergeNodeAttrs(node, attrs) {
    for (const key in attrs) {
      const value = attrs[key];
      if (value !== node.getAttribute(key)) {
        if ({}.toString.call(value) === "[object Object]") {
          node.setAttribute(key, JSON.stringify(attrs[key]));
        } else {
          node.setAttribute(key, attrs[key]);
        }
      }
    }
  }
  function createNewElement(tag, attrs, children, doc2) {
    const DOC = doc2 ? doc2 : document;
    const elem = DOC.createElement(tag);
    if (attrs) {
      mergeNodeAttrs(elem, attrs);
    }
    if (children) {
      for (const child of children) {
        elem.appendChild(child);
      }
    }
    return elem;
  }
  function injectCSSList(css) {
    const cssElem = document.createElement("style");
    cssElem.textContent = css;
    afterHead(() => {
      document.head.appendChild(cssElem);
    });
    return cssElem;
  }
  function injectCSSRule(selector, cssObject) {
    if (selector === "")
      return;
    if (cssObject.length === 0)
      return;
    if (!defaultStyle.sheet)
      return;
    let css = selector + "{";
    for (const key in cssObject) {
      const value = cssObject[key];
      css += kebabCase$1(key) + ":" + value + ";";
    }
    css += "}";
    return defaultStyle.sheet.insertRule(css);
  }
  function findParentByClass(elem, parentClassName) {
    var _a;
    while (((_a = elem.parentElement) == null ? void 0 : _a.className.indexOf(parentClassName)) === -1) {
      elem = elem.parentElement;
    }
    return elem.parentElement;
  }
  function fadeInLoad(selector) {
    DOMS(selector).forEach((elem) => {
      elem.classList.add(fadeInClass);
      elem.addEventListener("animationend", () => {
        elem.style.opacity = "1";
        elem.classList.remove(fadeInClass);
      });
    });
  }
  class ObsType {
    constructor(selector, options, initEvent) {
      __publicField(this, "selector");
      __publicField(this, "options");
      __publicField(this, "initEvent");
      __publicField(this, "events", []);
      __publicField(this, "_observe", () => {
        const eventFuncs = () => {
          this.events.forEach((func) => {
            func();
          });
        };
        if (typeof this.initEvent === "undefined") {
          eventFuncs();
        } else {
          window.addEventListener(this.initEvent, eventFuncs);
        }
        const observer = new MutationObserver(eventFuncs);
        const obsElem = DOMS(this.selector)[0];
        if (obsElem !== void 0)
          observer.observe(obsElem, this.options);
      });
      __publicField(this, "addEvent", (event) => {
        if (this.events.includes(event))
          return;
        if (typeof this.initEvent === "undefined") {
          event();
        } else {
          unsafeWindow.addEventListener(this.initEvent, event);
        }
        this.events.push(event);
      });
      this.selector = selector;
      this.options = options;
      this.initEvent = initEvent;
    }
  }
  const remixedObservers = {
    /** 楼层监控 */
    postsObserver: new ObsType("#j_p_postlist", { childList: true }),
    /** 楼中楼监控 */
    commentsObserver: new ObsType("#j_p_postlist", { childList: true, subtree: true }),
    /** 首页动态监控 */
    newListObserver: new ObsType("#new_list", { childList: true }),
    /** 进吧页面贴子监控 */
    threadListObserver: new ObsType("#pagelet_frs-list\\/pagelet\\/thread", { attributes: true }, "load")
  };
  Object.freeze(remixedObservers);
  try {
    GM_deleteValue("ENABLE_BOLD_FONT");
    GM_deleteValue("EXTREME_PURIF");
    GM_deleteValue("DEFAULT_FONT_TYPE");
    GM_deleteValue("userSwitches");
  } catch (error) {
    console.warn(error);
  }
  const greasyMenu = [
    {
      id: "checkUpdate",
      title: "获取更新...",
      type: "button",
      event: () => {
        GM_openInTab("https://github.com/WiresawBlade/Tieba-Remix/releases/", {
          active: true
        });
      }
    },
    {
      id: "setShieldList",
      title: "设置屏蔽列表",
      type: "button",
      event: () => {
        const shieldList2 = GM_getValue("shieldList", []);
        const listStr = (() => {
          let str = "";
          if (shieldList2.length > 0) {
            for (const sh of shieldList2) {
              str += sh.rule + "\n";
            }
            return str;
          } else {
            return "\n";
          }
        })();
        const userInput = prompt(`
            设置屏蔽列表（临时方案）
            当前共有 ${shieldList2.length} 条屏蔽规则被装载
            ${listStr}
            输入需要匹配的屏蔽词，它们目前会在首页动态和贴子楼层生效
            输入“REMOVE_ALL”清除当前所有屏蔽词
            `.split("    ").join(""));
        if (userInput !== null && userInput !== "") {
          if (userInput === "REMOVE_ALL") {
            GM_deleteValue("shieldList");
            location.reload();
            return;
          }
          for (const sh of shieldList2) {
            if (sh.rule === userInput) {
              location.reload();
              return;
            }
          }
          shieldList2.push({
            rule: userInput,
            type: "string",
            scope: "posts",
            switch: true
          });
          GM_setValue("shieldList", shieldList2);
          location.reload();
        }
      }
    }
  ];
  function registerMenu() {
    greasyMenu.forEach((menu) => {
      const menuState = menu.state;
      const menuEvent = menu.event;
      switch (menu.type) {
        case "button":
          if (menuEvent === void 0)
            break;
          GM_registerMenuCommand(
            menu.title,
            (event) => {
              event = event;
              if (event.button === 0) {
                menuEvent();
              }
            }
          );
          break;
        case "switch":
          if (menuState === void 0)
            break;
          GM_registerMenuCommand(
            menu.title + "：" + switchModeString(menuState),
            (event) => {
              event = event;
              if (event.button === 0) {
                if (menuEvent !== void 0) {
                  menuEvent();
                }
              }
            }
          );
          break;
      }
    });
    function switchModeString(flag) {
      return flag ? "开" : "关";
    }
  }
  function greasyInit() {
    registerMenu();
  }
  const disabledModules = GM_getValue("disabledModules", []);
  function emptyUserModule() {
    return {
      id: "",
      name: "",
      author: "",
      version: "",
      brief: "",
      description: "",
      scope: "",
      runAt: "immediately",
      entry: function() {
        throw new Error("Function not implemented.");
      }
    };
  }
  function isModuleDisabled(module2) {
    return indexOf(disabledModules, module2.id) !== -1 ? true : false;
  }
  function parseUserModules(glob, callbackfn) {
    const modules = [];
    const moduleList = glob;
    const info = {
      length: Object.keys(moduleList).length,
      current: {
        runnable: false,
        url: ""
      }
    };
    for (const key in moduleList) {
      moduleList[key]().then(
        (value) => {
          const m = value.Main;
          info.current.url = key;
          const runnable = (() => {
            if (m.switch === true || m.switch === void 0) {
              if (indexOf(disabledModules, m.id) !== -1) {
                return false;
              }
              if (m.scope === true) {
                return true;
              }
              if (typeof m.scope === "string") {
                if (location.href.indexOf(m.scope) !== -1) {
                  return true;
                }
              }
              if (Array.isArray(m.scope)) {
                for (const i in m.scope) {
                  const str = m.scope[i];
                  if (location.href.indexOf(str) !== -1) {
                    return true;
                  }
                }
              }
            }
            return false;
          })();
          info.current.runnable = runnable;
          const runModule = {
            "immediately": () => {
              m.entry();
            },
            "afterHead": () => {
              afterHead(() => {
                m.entry();
              });
            },
            "DOMLoaded": () => {
              document.addEventListener("DOMContentLoaded", () => {
                m.entry();
              });
            },
            "loaded": () => {
              unsafeWindow.addEventListener("load", () => {
                m.entry();
              });
            }
          };
          m.runnable = runnable;
          if (runnable) {
            runModule[m.runAt]();
          }
          modules.push(m);
          if (callbackfn)
            callbackfn(info, m);
        }
      );
    }
    return modules;
  }
  function makeMap(str, expectsLowerCase) {
    const map2 = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map2[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
  }
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value)) {
      return value;
    } else if (isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*.*?\*\//gs;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (val && val.__v_isRef) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
          entries[`${key} =>`] = val2;
          return entries;
        }, {})
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()]
      };
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const EMPTY_OBJ = {}.NODE_ENV !== "production" ? Object.freeze({}) : {};
  const EMPTY_ARR = {}.NODE_ENV !== "production" ? Object.freeze([]) : [];
  const NOOP = () => {
  };
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function warn$1(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    get active() {
      return this._active;
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if ({}.NODE_ENV !== "production") {
        warn$1(`cannot run an inactive effect scope.`);
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      activeEffectScope = this.parent;
    }
    stop(fromParent) {
      if (this._active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this._active = false;
      }
    }
  }
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  const targetMap = /* @__PURE__ */ new WeakMap();
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  const ITERATE_KEY = Symbol({}.NODE_ENV !== "production" ? "iterate" : "");
  const MAP_KEY_ITERATE_KEY = Symbol({}.NODE_ENV !== "production" ? "Map key iterate" : "");
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep());
      }
      const eventInfo = {}.NODE_ENV !== "production" ? { effect: activeEffect, target, type, key } : void 0;
      trackEffects(dep, eventInfo);
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if ({}.NODE_ENV !== "production" && activeEffect.onTrack) {
        activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let deps = [];
    if (type === "clear") {
      deps = [...depsMap.values()];
    } else if (key === "length" && isArray(target)) {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            deps.push(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const eventInfo = {}.NODE_ENV !== "production" ? { target, type, key, newValue, oldValue, oldTarget } : void 0;
    if (deps.length === 1) {
      if (deps[0]) {
        if ({}.NODE_ENV !== "production") {
          triggerEffects(deps[0], eventInfo);
        } else {
          triggerEffects(deps[0]);
        }
      }
    } else {
      const effects = [];
      for (const dep of deps) {
        if (dep) {
          effects.push(...dep);
        }
      }
      if ({}.NODE_ENV !== "production") {
        triggerEffects(createDep(effects), eventInfo);
      } else {
        triggerEffects(createDep(effects));
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo);
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if ({}.NODE_ENV !== "production" && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  const get$1 = /* @__PURE__ */ createGetter();
  const shallowGet = /* @__PURE__ */ createGetter(false, true);
  const readonlyGet = /* @__PURE__ */ createGetter(true);
  const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
  const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
  function createArrayInstrumentations() {
    const instrumentations = {};
    ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
      instrumentations[key] = function(...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
          track(arr, "get", i + "");
        }
        const res = arr[key](...args);
        if (res === -1 || res === false) {
          return arr[key](...args.map(toRaw));
        } else {
          return res;
        }
      };
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
      instrumentations[key] = function(...args) {
        pauseTracking();
        const res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key) {
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  function createGetter(isReadonly2 = false, shallow = false) {
    return function get2(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return shallow;
      } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  const set$1 = /* @__PURE__ */ createSetter();
  const shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set2(target, key, value, receiver) {
      let oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow) {
        if (!isShallow$1(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has$1(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  const mutableHandlers = {
    get: get$1,
    set: set$1,
    deleteProperty,
    has: has$1,
    ownKeys
  };
  const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if ({}.NODE_ENV !== "production") {
        warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if ({}.NODE_ENV !== "production") {
        warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function get(target, key, isReadonly2 = false, isShallow2 = false) {
    target = target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track(rawTarget, "get", key);
      }
      track(rawTarget, "get", rawKey);
    }
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has(key, isReadonly2 = false) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (!isReadonly2) {
      if (key !== rawKey) {
        track(rawTarget, "has", key);
      }
      track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly2 = false) {
    target = target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if ({}.NODE_ENV !== "production") {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get2 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if ({}.NODE_ENV !== "production") {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get2 ? get2.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = {}.NODE_ENV !== "production" ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly2, isShallow2) {
    return function forEach2(callback, thisArg) {
      const observed = this;
      const target = observed[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if ({}.NODE_ENV !== "production") {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  function createInstrumentations() {
    const mutableInstrumentations2 = {
      get(key) {
        return get(this, key);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, false)
    };
    const shallowInstrumentations2 = {
      get(key) {
        return get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(false, true)
    };
    const readonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* TriggerOpTypes.ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* TriggerOpTypes.SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* TriggerOpTypes.DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* TriggerOpTypes.CLEAR */
      ),
      forEach: createForEach(true, false)
    };
    const shallowReadonlyInstrumentations2 = {
      get(key) {
        return get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has(key) {
        return has.call(this, key, true);
      },
      add: createReadonlyMethod(
        "add"
        /* TriggerOpTypes.ADD */
      ),
      set: createReadonlyMethod(
        "set"
        /* TriggerOpTypes.SET */
      ),
      delete: createReadonlyMethod(
        "delete"
        /* TriggerOpTypes.DELETE */
      ),
      clear: createReadonlyMethod(
        "clear"
        /* TriggerOpTypes.CLEAR */
      ),
      forEach: createForEach(true, true)
    };
    const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
    iteratorMethods.forEach((method) => {
      mutableInstrumentations2[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
      shallowInstrumentations2[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [
      mutableInstrumentations2,
      readonlyInstrumentations2,
      shallowInstrumentations2,
      shallowReadonlyInstrumentations2
    ];
  }
  const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value[
      "__v_skip"
      /* ReactiveFlags.SKIP */
    ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if ({}.NODE_ENV !== "production") {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ] && !(isReadonly2 && target[
      "__v_isReactive"
      /* ReactiveFlags.IS_REACTIVE */
    ])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ]);
    }
    return !!(value && value[
      "__v_isReactive"
      /* ReactiveFlags.IS_REACTIVE */
    ]);
  }
  function isReadonly(value) {
    return !!(value && value[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ]);
  }
  function isShallow$1(value) {
    return !!(value && value[
      "__v_isShallow"
      /* ReactiveFlags.IS_SHALLOW */
    ]);
  }
  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    const raw = observed && observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }
  const toReactive = (value) => isObject(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? readonly(value) : value;
  function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
      ref2 = toRaw(ref2);
      if ({}.NODE_ENV !== "production") {
        trackEffects(ref2.dep || (ref2.dep = createDep()), {
          target: ref2,
          type: "get",
          key: "value"
        });
      } else {
        trackEffects(ref2.dep || (ref2.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      if ({}.NODE_ENV !== "production") {
        triggerEffects(dep, {
          target: ref2,
          type: "set",
          key: "value",
          newValue: newVal
        });
      } else {
        triggerEffects(dep);
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, __v_isShallow) {
      this.__v_isShallow = __v_isShallow;
      this.dep = void 0;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    get value() {
      trackRefValue(this);
      return this._value;
    }
    set value(newVal) {
      const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
      newVal = useDirectValue ? newVal : toRaw(newVal);
      if (hasChanged(newVal, this._rawValue)) {
        this._rawValue = newVal;
        this._value = useDirectValue ? newVal : toReactive(newVal);
        triggerRefValue(this, newVal);
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  var _a$1;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly2, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this[_a$1] = false;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this[
        "__v_isReadonly"
        /* ReactiveFlags.IS_READONLY */
      ] = isReadonly2;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  _a$1 = "__v_isReadonly";
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = {}.NODE_ENV !== "production" ? () => {
        console.warn("Write operation failed: computed value is readonly");
      } : NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if ({}.NODE_ENV !== "production" && debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }
  const stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  function warn(msg, ...args) {
    if (!({}.NODE_ENV !== "production"))
      return;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
        trace
      ]);
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry2, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry2));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys2 = Object.keys(props);
    keys2.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys2.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  const ErrorTypeStrings = {
    [
      "sp"
      /* LifecycleHooks.SERVER_PREFETCH */
    ]: "serverPrefetch hook",
    [
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    ]: "beforeCreate hook",
    [
      "c"
      /* LifecycleHooks.CREATED */
    ]: "created hook",
    [
      "bm"
      /* LifecycleHooks.BEFORE_MOUNT */
    ]: "beforeMount hook",
    [
      "m"
      /* LifecycleHooks.MOUNTED */
    ]: "mounted hook",
    [
      "bu"
      /* LifecycleHooks.BEFORE_UPDATE */
    ]: "beforeUpdate hook",
    [
      "u"
      /* LifecycleHooks.UPDATED */
    ]: "updated",
    [
      "bum"
      /* LifecycleHooks.BEFORE_UNMOUNT */
    ]: "beforeUnmount hook",
    [
      "um"
      /* LifecycleHooks.UNMOUNTED */
    ]: "unmounted hook",
    [
      "a"
      /* LifecycleHooks.ACTIVATED */
    ]: "activated hook",
    [
      "da"
      /* LifecycleHooks.DEACTIVATED */
    ]: "deactivated hook",
    [
      "ec"
      /* LifecycleHooks.ERROR_CAPTURED */
    ]: "errorCaptured hook",
    [
      "rtc"
      /* LifecycleHooks.RENDER_TRACKED */
    ]: "renderTracked hook",
    [
      "rtg"
      /* LifecycleHooks.RENDER_TRIGGERED */
    ]: "renderTriggered hook",
    [
      0
      /* ErrorCodes.SETUP_FUNCTION */
    ]: "setup function",
    [
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ]: "render function",
    [
      2
      /* ErrorCodes.WATCH_GETTER */
    ]: "watcher getter",
    [
      3
      /* ErrorCodes.WATCH_CALLBACK */
    ]: "watcher callback",
    [
      4
      /* ErrorCodes.WATCH_CLEANUP */
    ]: "watcher cleanup function",
    [
      5
      /* ErrorCodes.NATIVE_EVENT_HANDLER */
    ]: "native event handler",
    [
      6
      /* ErrorCodes.COMPONENT_EVENT_HANDLER */
    ]: "component event handler",
    [
      7
      /* ErrorCodes.VNODE_HOOK */
    ]: "vnode hook",
    [
      8
      /* ErrorCodes.DIRECTIVE_HOOK */
    ]: "directive hook",
    [
      9
      /* ErrorCodes.TRANSITION_HOOK */
    ]: "transition hook",
    [
      10
      /* ErrorCodes.APP_ERROR_HANDLER */
    ]: "app errorHandler",
    [
      11
      /* ErrorCodes.APP_WARN_HANDLER */
    ]: "app warnHandler",
    [
      12
      /* ErrorCodes.FUNCTION_REF */
    ]: "ref function",
    [
      13
      /* ErrorCodes.ASYNC_COMPONENT_LOADER */
    ]: "async component loader",
    [
      14
      /* ErrorCodes.SCHEDULER */
    ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
      res = args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = {}.NODE_ENV !== "production" ? ErrorTypeStrings[type] : type;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      const appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode, throwInDev = true) {
    if ({}.NODE_ENV !== "production") {
      const info = ErrorTypeStrings[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    } else {
      console.error(err);
    }
  }
  let isFlushing = false;
  let isFlushPending = false;
  const queue = [];
  let flushIndex = 0;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  const RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
    if ({}.NODE_ENV !== "production") {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.pre) {
        if ({}.NODE_ENV !== "production" && checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)];
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      if ({}.NODE_ENV !== "production") {
        seen = seen || /* @__PURE__ */ new Map();
      }
      activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        if ({}.NODE_ENV !== "production" && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
          continue;
        }
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? Infinity : job.id;
  const comparator = (a, b) => {
    const diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre)
        return -1;
      if (b.pre && !a.pre)
        return 1;
    }
    return diff;
  };
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    if ({}.NODE_ENV !== "production") {
      seen = seen || /* @__PURE__ */ new Map();
    }
    queue.sort(comparator);
    const check = {}.NODE_ENV !== "production" ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && job.active !== false) {
          if ({}.NODE_ENV !== "production" && check(job)) {
            continue;
          }
          callWithErrorHandling(
            job,
            null,
            14
            /* ErrorCodes.SCHEDULER */
          );
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs(seen);
      isFlushing = false;
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      const count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        const instance = fn.ownerInstance;
        const componentName = instance && getComponentName(instance.type);
        warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }
  let isHmrUpdating = false;
  const hmrDirtyComponents = /* @__PURE__ */ new Set();
  if ({}.NODE_ENV !== "production") {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  const map = /* @__PURE__ */ new Map();
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set()
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      instance.update();
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
      return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (const instance of instances) {
      const oldComp = normalizeClassComponent(instance.type);
      if (!hmrDirtyComponents.has(oldComp)) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.add(oldComp);
      }
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        hmrDirtyComponents.add(oldComp);
        instance.ceReload(newComp.styles);
        hmrDirtyComponents.delete(oldComp);
      } else if (instance.parent) {
        queueJob(instance.parent.update);
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
      }
    }
    queuePostFlushCb(() => {
      for (const instance of instances) {
        hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
      }
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
      if (key !== "__file" && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
      }
    };
  }
  let devtools;
  let buffer = [];
  let devtoolsNotInstalled = false;
  function emit$1(event, ...args) {
    if (devtools) {
      devtools.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  function setDevtoolsHook(hook, target) {
    var _a, _b;
    devtools = hook;
    if (devtools) {
      devtools.enabled = true;
      buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
      buffer = [];
    } else if (
      // handle late devtools injection - only do this if we are in an actual
      // browser environment to avoid the timer handle stalling test runner exit
      // (#4815)
      typeof window !== "undefined" && // some envs mock window but not fully
      window.HTMLElement && // also exclude jsdom
      !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
    ) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook(newHook, target);
      });
      setTimeout(() => {
        if (!devtools) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3e3);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app, version2) {
    emit$1("app:init", app, version2, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  function devtoolsUnmountApp(app) {
    emit$1("app:unmount", app);
  }
  const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:added"
    /* DevtoolsHooks.COMPONENT_ADDED */
  );
  const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:updated"
    /* DevtoolsHooks.COMPONENT_UPDATED */
  );
  const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
    "component:removed"
    /* DevtoolsHooks.COMPONENT_REMOVED */
  );
  const devtoolsComponentRemoved = (component) => {
    if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
    !devtools.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  };
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
    };
  }
  const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:start"
    /* DevtoolsHooks.PERFORMANCE_START */
  );
  const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
    "perf:end"
    /* DevtoolsHooks.PERFORMANCE_END */
  );
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit$1("component:emit", component.appContext.app, component, event, params);
  }
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted)
      return;
    const props = instance.vnode.props || EMPTY_OBJ;
    if ({}.NODE_ENV !== "production") {
      const { emitsOptions, propsOptions: [propsOptions] } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
            warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
          }
        } else {
          const validator = emitsOptions[event];
          if (isFunction(validator)) {
            const isValid = validator(...rawArgs);
            if (!isValid) {
              warn(`Invalid event arguments: event validation failed for event "${event}".`);
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
      const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
      const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
      if (trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    if ({}.NODE_ENV !== "production" || false) {
      devtoolsComponentEmit(instance, event, args);
    }
    if ({}.NODE_ENV !== "production") {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function pushScopeId(id) {
    currentScopeId = id;
  }
  function popScopeId() {
    currentScopeId = null;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      if ({}.NODE_ENV !== "production" || false) {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  let accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
    let result;
    let fallthroughAttrs;
    const prev = setCurrentRenderingInstance(instance);
    if ({}.NODE_ENV !== "production") {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if ({}.NODE_ENV !== "production" && attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(render2.length > 1 ? render2(props, {}.NODE_ENV !== "production" ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots,
          emit: emit2
        } : { attrs, slots, emit: emit2 }) : render2(
          props,
          null
          /* we know it doesn't need it */
        ));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(
        err,
        instance,
        1
        /* ErrorCodes.RENDER_FUNCTION */
      );
      result = createVNode(Comment);
    }
    let root2 = result;
    let setRoot = void 0;
    if ({}.NODE_ENV !== "production" && result.patchFlag > 0 && result.patchFlag & 2048) {
      [root2, setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys2 = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root2;
      if (keys2.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys2.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root2 = cloneVNode(root2, fallthroughAttrs);
        } else if ({}.NODE_ENV !== "production" && !accessedAttrs && root2.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i = 0, l = allAttrs.length; i < l; i++) {
            const key = allAttrs[i];
            if (isOn(key)) {
              if (!isModelListener(key)) {
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
          }
          if (eventAttrs.length) {
            warn(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
          }
        }
      }
    }
    if (vnode.dirs) {
      if ({}.NODE_ENV !== "production" && !isElementRoot(root2)) {
        warn(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
      }
      root2 = cloneVNode(root2);
      root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if ({}.NODE_ENV !== "production" && !isElementRoot(root2)) {
        warn(`Component inside <Transition> renders non-element root node that cannot be animated.`);
      }
      root2.transition = vnode.transition;
    }
    if ({}.NODE_ENV !== "production" && setRoot) {
      setRoot(root2);
    } else {
      result = root2;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
      return [vnode, void 0];
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  const isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if ({}.NODE_ENV !== "production" && (prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance) {
      if ({}.NODE_ENV !== "production") {
        warn(`provide() can only be used inside setup().`);
      }
    } else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
      const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else if ({}.NODE_ENV !== "production") {
        warn(`injection "${String(key)}" not found.`);
      }
    } else if ({}.NODE_ENV !== "production") {
      warn(`inject() can only be used inside setup() or functional components.`);
    }
  }
  const INITIAL_WATCHER_VALUE = {};
  function watch(source, cb, options) {
    if ({}.NODE_ENV !== "production" && !isFunction(cb)) {
      warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    if ({}.NODE_ENV !== "production" && !cb) {
      if (immediate !== void 0) {
        warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
      }
      if (deep !== void 0) {
        warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
      }
    }
    const warnInvalidSource = (s) => {
      warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
    };
    const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow$1(source);
    } else if (isReactive(source)) {
      getter = () => source;
      deep = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow$1(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(
            s,
            instance,
            2
            /* ErrorCodes.WATCH_GETTER */
          );
        } else {
          ({}).NODE_ENV !== "production" && warnInvalidSource(s);
        }
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = () => callWithErrorHandling(
          source,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        getter = () => {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
      ({}).NODE_ENV !== "production" && warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
      cleanup = effect.onStop = () => {
        callWithErrorHandling(
          fn,
          instance,
          4
          /* ErrorCodes.WATCH_CLEANUP */
        );
      };
    };
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3, [
          getter(),
          isMultiSource ? [] : void 0,
          onCleanup
        ]);
      }
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = () => {
      if (!effect.active) {
        return;
      }
      if (cb) {
        const newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3, [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            onCleanup
          ]);
          oldValue = newValue;
        }
      } else {
        effect.run();
      }
    };
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === "sync") {
      scheduler = job;
    } else if (flush === "post") {
      scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    } else {
      job.pre = true;
      if (instance)
        job.id = instance.uid;
      scheduler = () => queueJob(job);
    }
    const effect = new ReactiveEffect(getter, scheduler);
    if ({}.NODE_ENV !== "production") {
      effect.onTrack = onTrack;
      effect.onTrigger = onTrigger;
    }
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect.run();
      }
    } else if (flush === "post") {
      queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    } else {
      effect.run();
    }
    const unwatch = () => {
      effect.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect);
      }
    };
    if (ssrCleanup)
      ssrCleanup.push(unwatch);
    return unwatch;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject(value) || value[
      "__v_skip"
      /* ReactiveFlags.SKIP */
    ]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }
  function defineComponent(options) {
    return isFunction(options) ? { setup: options, name: options.name } : options;
  }
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return;
        }
        pauseTracking();
        setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else if ({}.NODE_ENV !== "production") {
      const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
      warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => (
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
  );
  const onBeforeMount = createHook(
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  );
  const onMounted = createHook(
    "m"
    /* LifecycleHooks.MOUNTED */
  );
  const onBeforeUpdate = createHook(
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  );
  const onUpdated = createHook(
    "u"
    /* LifecycleHooks.UPDATED */
  );
  const onBeforeUnmount = createHook(
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  );
  const onUnmounted = createHook(
    "um"
    /* LifecycleHooks.UNMOUNTED */
  );
  const onServerPrefetch = createHook(
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  );
  const onRenderTriggered = createHook(
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  );
  const onRenderTracked = createHook(
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  );
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
      ({}).NODE_ENV !== "production" && warn(`withDirectives can only be used inside render functions.`);
      return vnode;
    }
    const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  const NULL_DYNAMIC_COMPONENT = Symbol();
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    if (isArray(source) || isString(source)) {
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
      }
    } else if (typeof source === "number") {
      if ({}.NODE_ENV !== "production" && !Number.isInteger(source)) {
        warn(`The v-for range expect an integer value but got ${source}.`);
      }
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
      } else {
        const keys2 = Object.keys(source);
        ret = new Array(keys2.length);
        for (let i = 0, l = keys2.length; i < l; i++) {
          const key = keys2[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else {
      ret = [];
    }
    if (cache) {
      cache[index] = ret;
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
      if (name !== "default")
        props.name = name;
      return createVNode("slot", props, fallback && fallback());
    }
    let slot = slots[name];
    if ({}.NODE_ENV !== "production" && slot && slot.length > 1) {
      warn(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
      slot = () => [];
    }
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(
      Fragment,
      {
        key: props.key || // slot content array of a dynamic conditional slot may have a branch
        // key attached in the `createSlots` helper, respect that
        validSlotContent && validSlotContent.key || `_${name}`
      },
      validSlotContent || (fallback ? fallback() : []),
      validSlotContent && slots._ === 1 ? 64 : -2
      /* PatchFlags.BAIL */
    );
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode(child))
        return true;
      if (child.type === Comment)
        return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  const getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => ({}).NODE_ENV !== "production" ? shallowReadonly(i.props) : i.props,
      $attrs: (i) => ({}).NODE_ENV !== "production" ? shallowReadonly(i.attrs) : i.attrs,
      $slots: (i) => ({}).NODE_ENV !== "production" ? shallowReadonly(i.slots) : i.slots,
      $refs: (i) => ({}).NODE_ENV !== "production" ? shallowReadonly(i.refs) : i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const isReservedPrefix = (key) => key === "_" || key === "$";
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if ({}.NODE_ENV !== "production" && key === "__isVue") {
        return true;
      }
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
        ) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance, "get", key);
          ({}).NODE_ENV !== "production" && markAttrsAccessed();
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else if ({}.NODE_ENV !== "production" && currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      key.indexOf("__v") !== 0)) {
        if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
          warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
        } else if (instance === currentRenderingInstance) {
          warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
        }
      }
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if ({}.NODE_ENV !== "production" && setupState.__isScriptSetup && hasOwn(setupState, key)) {
        warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
        return false;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        ({}).NODE_ENV !== "production" && warn(`Attempting to mutate prop "${key}". Props are readonly.`);
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        ({}).NODE_ENV !== "production" && warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
        return false;
      } else {
        if ({}.NODE_ENV !== "production" && key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
      let normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  if ({}.NODE_ENV !== "production" && true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach((key) => {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: () => publicPropertiesMap[key](instance),
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: NOOP
      });
    });
    return target;
  }
  function exposePropsOnRenderContext(instance) {
    const { ctx, propsOptions: [propsOptions] } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key) => {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => instance.props[key],
          set: NOOP
        });
      });
    }
  }
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(toRaw(setupState)).forEach((key) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => setupState[key],
          set: NOOP
        });
      }
    });
  }
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key) => {
      if (cache[key]) {
        warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
      } else {
        cache[key] = type;
      }
    };
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(
        options.beforeCreate,
        instance,
        "bc"
        /* LifecycleHooks.BEFORE_CREATE */
      );
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = {}.NODE_ENV !== "production" ? createDuplicateChecker() : null;
    if ({}.NODE_ENV !== "production") {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key in propsOptions) {
          checkDuplicateProperties("Props", key);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          if ({}.NODE_ENV !== "production") {
            Object.defineProperty(ctx, key, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            ctx[key] = methodHandler.bind(publicThis);
          }
          if ({}.NODE_ENV !== "production") {
            checkDuplicateProperties("Methods", key);
          }
        } else if ({}.NODE_ENV !== "production") {
          warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
        }
      }
    }
    if (dataOptions) {
      if ({}.NODE_ENV !== "production" && !isFunction(dataOptions)) {
        warn(`The data option must be a function. Plain object usage is no longer supported.`);
      }
      const data = dataOptions.call(publicThis, publicThis);
      if ({}.NODE_ENV !== "production" && isPromise(data)) {
        warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
      }
      if (!isObject(data)) {
        ({}).NODE_ENV !== "production" && warn(`data() should return an object.`);
      } else {
        instance.data = reactive(data);
        if ({}.NODE_ENV !== "production") {
          for (const key in data) {
            checkDuplicateProperties("Data", key);
            if (!isReservedPrefix(key[0])) {
              Object.defineProperty(ctx, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if ({}.NODE_ENV !== "production" && get2 === NOOP) {
          warn(`Computed property "${key}" has no getter.`);
        }
        const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : {}.NODE_ENV !== "production" ? () => {
          warn(`Write operation failed: computed property "${key}" is readonly.`);
        } : NOOP;
        const c = computed({
          get: get2,
          set: set2
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
        if ({}.NODE_ENV !== "production") {
          checkDuplicateProperties("Computed", key);
        }
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
            /* treat default function as factory */
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        if (unwrapRef) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => injected.value,
            set: (v) => injected.value = v
          });
        } else {
          if ({}.NODE_ENV !== "production") {
            warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
          }
          ctx[key] = injected;
        }
      } else {
        ctx[key] = injected;
      }
      if ({}.NODE_ENV !== "production") {
        checkDuplicateProperties("Inject", key);
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      } else if ({}.NODE_ENV !== "production") {
        warn(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        } else if ({}.NODE_ENV !== "production") {
          warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else if ({}.NODE_ENV !== "production") {
      warn(`Invalid watch option: "${key}"`, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose") {
        ({}).NODE_ENV !== "production" && warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
      } else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if ({}.NODE_ENV !== "production") {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId)
        return true;
      instance = instance.parent;
    }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !({}.NODE_ENV !== "production" && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
                /* isAbsent */
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
                /* isAbsent */
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance, "set", "$attrs");
    }
    if ({}.NODE_ENV !== "production") {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      if (opt[
        0
        /* BooleanFlags.shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* BooleanFlags.shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys2)
          needCastKeys.push(...keys2);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        if ({}.NODE_ENV !== "production" && !isString(raw[i])) {
          warn(`props must be strings when using array syntax.`, raw[i]);
        }
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if ({}.NODE_ENV !== "production" && !isObject(raw)) {
        warn(`invalid props options`, raw);
      }
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
          if (prop) {
            const booleanIndex = getTypeIndex(Boolean, prop.type);
            const stringIndex = getTypeIndex(String, prop.type);
            prop[
              0
              /* BooleanFlags.shouldCast */
            ] = booleanIndex > -1;
            prop[
              1
              /* BooleanFlags.shouldCastTrue */
            ] = stringIndex < 0 || booleanIndex < stringIndex;
            if (booleanIndex > -1 || hasOwn(prop, "default")) {
              needCastKeys.push(normalizedKey);
            }
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    } else if ({}.NODE_ENV !== "production") {
      warn(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }
  function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
    return match ? match[2] : ctor === null ? "null" : "";
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray(expectedTypes)) {
      return expectedTypes.findIndex((t) => isSameType(t, type));
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  function validateProps(rawProps, props, instance) {
    const resolvedValues = toRaw(props);
    const options = instance.propsOptions[0];
    for (const key in options) {
      let opt = options[key];
      if (opt == null)
        continue;
      validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
    }
  }
  function validateProp(name, value, prop, isAbsent) {
    const { type, required, validator } = prop;
    if (required && isAbsent) {
      warn('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !prop.required) {
      return;
    }
    if (type != null && type !== true) {
      let isValid = false;
      const types = isArray(type) ? type : [type];
      const expectedTypes = [];
      for (let i = 0; i < types.length && !isValid; i++) {
        const { valid, expectedType } = assertType(value, types[i]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        warn(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator && !validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else if (expectedType === "null") {
      valid = value === null;
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if ({}.NODE_ENV !== "production" && currentInstance) {
        warn(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        if ({}.NODE_ENV !== "production" && true) {
          warn(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
        }
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    if ({}.NODE_ENV !== "production" && !isKeepAlive(instance.vnode) && true) {
      warn(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        instance.slots = toRaw(children);
        def(children, "_", type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if ({}.NODE_ENV !== "production" && isHmrUpdating) {
          extend(slots, children);
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          extend(slots, children);
          if (!optimized && type === 1) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = Object.assign({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        ({}).NODE_ENV !== "production" && warn(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new Set();
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          if ({}.NODE_ENV !== "production") {
            warn(`app.config cannot be replaced. Modify individual options instead.`);
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            ({}).NODE_ENV !== "production" && warn(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else if ({}.NODE_ENV !== "production") {
            warn(`A plugin must either be a function or an object with an "install" function.`);
          }
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else if ({}.NODE_ENV !== "production") {
              warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
            }
          }
          return app;
        },
        component(name, component) {
          if ({}.NODE_ENV !== "production") {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if ({}.NODE_ENV !== "production" && context.components[name]) {
            warn(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if ({}.NODE_ENV !== "production") {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if ({}.NODE_ENV !== "production" && context.directives[name]) {
            warn(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            if ({}.NODE_ENV !== "production" && rootContainer.__vue_app__) {
              warn(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
            }
            const vnode = createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if ({}.NODE_ENV !== "production") {
              context.reload = () => {
                render(cloneVNode(vnode), rootContainer, isSVG);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            if ({}.NODE_ENV !== "production" || false) {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
            }
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          } else if ({}.NODE_ENV !== "production") {
            warn(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
          }
        },
        unmount() {
          if (isMounted) {
            render(null, app._container);
            if ({}.NODE_ENV !== "production" || false) {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else if ({}.NODE_ENV !== "production") {
            warn(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if ({}.NODE_ENV !== "production" && key in context.provides) {
            warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
          }
          context.provides[key] = value;
          return app;
        }
      };
      return app;
    };
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    if ({}.NODE_ENV !== "production" && !owner) {
      warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    if (oldRef != null && oldRef !== ref2) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref2);
      const _isRef = isRef(ref2);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                  if (hasOwn(setupState, ref2)) {
                    setupState[ref2] = refs[ref2];
                  }
                } else {
                  ref2.value = [refValue];
                  if (rawRef.k)
                    refs[rawRef.k] = ref2.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (hasOwn(setupState, ref2)) {
              setupState[ref2] = value;
            }
          } else if (_isRef) {
            ref2.value = value;
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else if ({}.NODE_ENV !== "production") {
            warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
          }
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      } else if ({}.NODE_ENV !== "production") {
        warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
      }
    }
  }
  let supported;
  let perf;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    if ({}.NODE_ENV !== "production" || false) {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      perf.mark(endTag);
      perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    }
    if ({}.NODE_ENV !== "production" || false) {
      devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function initFeatureFlags() {
    const needWarn = [];
    if ({}.NODE_ENV !== "production" && needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
    }
  }
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if ({}.NODE_ENV !== "production" || false) {
      setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = {}.NODE_ENV !== "production" && isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          } else if ({}.NODE_ENV !== "production") {
            patchStaticNode(n1, n2, container, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if ({}.NODE_ENV !== "production") {
            warn("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
    };
    const patchStaticNode = (n1, n2, container, isSVG) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      isSVG = isSVG || n2.type === "svg";
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { type, props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if ({}.NODE_ENV !== "production" || false) {
        Object.defineProperty(el, "__vnode", {
          value: vnode,
          enumerable: false
        });
        Object.defineProperty(el, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if ({}.NODE_ENV !== "production" && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if ({}.NODE_ENV !== "production" && isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      const areChildrenSVG = isSVG && n2.type !== "foreignObject";
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        if ({}.NODE_ENV !== "production" && parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, isSVG);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if ({}.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
      (isHmrUpdating || patchFlag & 2048)) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if ({}.NODE_ENV !== "production" && parentComponent && parentComponent.type.__hmrId) {
            traverseStaticChildren(n1, n2);
          } else if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if ({}.NODE_ENV !== "production" && instance.type.__hmrId) {
        registerHMR(instance);
      }
      if ({}.NODE_ENV !== "production") {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        if ({}.NODE_ENV !== "production") {
          startMeasure(instance, `init`);
        }
        setupComponent(instance);
        if ({}.NODE_ENV !== "production") {
          endMeasure(instance, `init`);
        }
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      if ({}.NODE_ENV !== "production") {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          if ({}.NODE_ENV !== "production") {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          if ({}.NODE_ENV !== "production") {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          invalidateJob(instance.update);
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              if ({}.NODE_ENV !== "production") {
                startMeasure(instance, `render`);
              }
              instance.subTree = renderComponentRoot(instance);
              if ({}.NODE_ENV !== "production") {
                endMeasure(instance, `render`);
              }
              if ({}.NODE_ENV !== "production") {
                startMeasure(instance, `hydrate`);
              }
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              if ({}.NODE_ENV !== "production") {
                endMeasure(instance, `hydrate`);
              }
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
                // note: we are moving the render call into an async callback,
                // which means it won't track dependencies - but it's ok because
                // a server-rendered async wrapper is already in resolved state
                // and it will never need to change.
                () => !instance.isUnmounted && hydrateSubTree()
              );
            } else {
              hydrateSubTree();
            }
          } else {
            if ({}.NODE_ENV !== "production") {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            if ({}.NODE_ENV !== "production") {
              endMeasure(instance, `render`);
            }
            if ({}.NODE_ENV !== "production") {
              startMeasure(instance, `patch`);
            }
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            if ({}.NODE_ENV !== "production") {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          if ({}.NODE_ENV !== "production" || false) {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          let originNext = next;
          let vnodeHook;
          if ({}.NODE_ENV !== "production") {
            pushWarningContext(next || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          if ({}.NODE_ENV !== "production") {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          if ({}.NODE_ENV !== "production") {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          if ({}.NODE_ENV !== "production") {
            startMeasure(instance, `patch`);
          }
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            isSVG
          );
          if ({}.NODE_ENV !== "production") {
            endMeasure(instance, `patch`);
          }
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
          if ({}.NODE_ENV !== "production" || false) {
            devtoolsComponentUpdated(instance);
          }
          if ({}.NODE_ENV !== "production") {
            popWarningContext();
          }
        }
      };
      const effect = instance.effect = new ReactiveEffect(
        componentUpdateFn,
        () => queueJob(update),
        instance.scope
        // track it in component's effect scope
      );
      const update = instance.update = () => effect.run();
      update.id = instance.uid;
      toggleRecurse(instance, true);
      if ({}.NODE_ENV !== "production") {
        effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
        effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
        update.ownerInstance = instance;
      }
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs();
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if ({}.NODE_ENV !== "production" && keyToNewIndexMap.has(nextChild.key)) {
              warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(
                nextChild,
                container,
                anchor,
                2
                /* MoveType.REORDER */
              );
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove3 = () => hostInsert(el, container, anchor);
          const performLeave = () => {
            leave(el, () => {
              remove3();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove3, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
      if (ref2 != null) {
        setRef(ref2, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if ({}.NODE_ENV !== "production" && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      if ({}.NODE_ENV !== "production" && instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, update, subTree, um } = instance;
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (update) {
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
      if ({}.NODE_ENV !== "production" || false) {
        devtoolsComponentRemoved(instance);
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    const render = (vnode, container, isSVG) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPreFlushCbs();
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function toggleRecurse({ effect, update }, allowed) {
    effect.allowRecurse = update.allowRecurse = allowed;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          c2.el = c1.el;
        }
        if ({}.NODE_ENV !== "production" && c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  const isTeleport = (type) => type.__isTeleport;
  const Fragment = Symbol({}.NODE_ENV !== "production" ? "Fragment" : void 0);
  const Text = Symbol({}.NODE_ENV !== "production" ? "Text" : void 0);
  const Comment = Symbol({}.NODE_ENV !== "production" ? "Comment" : void 0);
  const Static = Symbol({}.NODE_ENV !== "production" ? "Static" : void 0);
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    ));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    ));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if ({}.NODE_ENV !== "production" && n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
      n1.shapeFlag &= ~256;
      n2.shapeFlag &= ~512;
      return false;
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  const createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...args);
  };
  const InternalObjectKey = `__vInternal`;
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
    return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if ({}.NODE_ENV !== "production" && vnode.key !== vnode.key) {
      warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = {}.NODE_ENV !== "production" ? createVNodeWithArgsTransform : _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if ({}.NODE_ENV !== "production" && !type) {
        warn(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    if ({}.NODE_ENV !== "production" && shapeFlag & 4 && isProxy(type)) {
      type = toRaw(type);
      warn(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false) {
    const { props, ref: ref2, patchFlag, children } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: {}.NODE_ENV !== "production" && patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    return cloned;
  }
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (typeof child === "object") {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    if ({}.NODE_ENV !== "production") {
      instance.ctx = createDevRenderContext(instance);
    } else {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, config) {
    const appIsNativeTag = config.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
      warn("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var _a;
    const Component = instance.type;
    if ({}.NODE_ENV !== "production") {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names = Object.keys(Component.components);
        for (let i = 0; i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names = Object.keys(Component.directives);
        for (let i = 0; i < names.length; i++) {
          validateDirectiveName(names[i]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    if ({}.NODE_ENV !== "production") {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      const setupResult = callWithErrorHandling(setup, instance, 0, [{}.NODE_ENV !== "production" ? shallowReadonly(instance.props) : instance.props, setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(
              e,
              instance,
              0
              /* ErrorCodes.SETUP_FUNCTION */
            );
          });
        } else {
          instance.asyncDep = setupResult;
          if ({}.NODE_ENV !== "production" && !instance.suspense) {
            const name = (_a = Component.name) !== null && _a !== void 0 ? _a : "Anonymous";
            warn(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if ({}.NODE_ENV !== "production" && isVNode(setupResult)) {
        warn(`setup() should not return VNodes directly - return a render function instead.`);
      }
      if ({}.NODE_ENV !== "production" || false) {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      if ({}.NODE_ENV !== "production") {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if ({}.NODE_ENV !== "production" && setupResult !== void 0) {
      warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
    }
    finishComponentSetup(instance, isSSR);
  }
  let compile;
  const isRuntimeOnly = () => !compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          if ({}.NODE_ENV !== "production") {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(extend({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
          if ({}.NODE_ENV !== "production") {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
    }
    {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
    if ({}.NODE_ENV !== "production" && !Component.render && instance.render === NOOP && !isSSR) {
      if (Component.template) {
        warn(
          `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
          /* should not happen */
        );
      } else {
        warn(`Component is missing template or render function.`);
      }
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, {}.NODE_ENV !== "production" ? {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    } : {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      if ({}.NODE_ENV !== "production") {
        if (instance.exposed) {
          warn(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray(exposed)) {
              exposedType = "array";
            } else if (isRef(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn(`expose() should be passed a plain object, received ${exposedType}.`);
          }
        }
      }
      instance.exposed = exposed || {};
    };
    let attrs;
    if ({}.NODE_ENV !== "production") {
      return Object.freeze({
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        get slots() {
          return shallowReadonly(instance.slots);
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    } else {
      return {
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };
  const ssrContextKey = Symbol({}.NODE_ENV !== "production" ? `ssrContext` : ``);
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      if (!ctx) {
        ({}).NODE_ENV !== "production" && warn(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
      }
      return ctx;
    }
  };
  function isShallow(value) {
    return !!(value && value[
      "__v_isShallow"
      /* ReactiveFlags.IS_SHALLOW */
    ]);
  }
  function initCustomFormatter() {
    if (!({}.NODE_ENV !== "production") || typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#0b1bc9" };
    const stringStyle = { style: "color:#b62e24" };
    const keywordStyle = { style: "color:#9d288c" };
    const formatter = {
      header(obj) {
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (isRef(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(obj.value),
            `>`
          ];
        } else if (isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", toRaw(instance.data)));
      }
      const computed2 = extractKeys(instance, "computed");
      if (computed2) {
        blocks.push(createInstanceBlock("computed", computed2));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key + ": "],
              formatValue(target[key], false)
            ];
          })
        ]
      ];
    }
    function formatValue(v, asRaw = true) {
      if (typeof v === "number") {
        return ["span", numberStyle, v];
      } else if (typeof v === "string") {
        return ["span", stringStyle, JSON.stringify(v)];
      } else if (typeof v === "boolean") {
        return ["span", keywordStyle, v];
      } else if (isObject(v)) {
        return ["object", { object: asRaw ? toRaw(v) : v }];
      } else {
        return ["span", stringStyle, String(v)];
      }
    }
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      const extracted = {};
      for (const key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key, type) {
      const opts = Comp[type];
      if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
        return true;
      }
    }
    function genRefFlag(v) {
      if (isShallow(v)) {
        return `ShallowRef`;
      }
      if (v.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  const version = "3.2.47";
  const svgNS = "http://www.w3.org/2000/svg";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, isSVG, is, props) => {
      const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, isSVG, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
        const template = templateContainer.content;
        if (isSVG) {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  function patchClass(el, value, isSVG) {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    if (next && !isCssString) {
      if (prev && !isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
      for (const key in next) {
        setStyle(style, key, next[key]);
      }
    } else {
      const currentDisplay = style.display;
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
      if ("_vod" in el) {
        style.display = currentDisplay;
      }
    }
  }
  const semicolonRE = /[^\\];\s*$/;
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null)
        val = "";
      if ({}.NODE_ENV !== "production") {
        if (semicolonRE.test(val)) {
          warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
        }
      }
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      const isBoolean2 = isSpecialBooleanAttr(key);
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean2 ? "" : value);
      }
    }
  }
  function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === "innerHTML" || key === "textContent") {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? "" : value;
      return;
    }
    if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
    !el.tagName.includes("-")) {
      el._value = value;
      const newValue = value == null ? "" : value;
      if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
      // textContent if no value attribute is present. And setting .value for
      // OPTION has no side effect
      el.tagName === "OPTION") {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
      if ({}.NODE_ENV !== "production" && !needRemove) {
        warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e);
      }
    }
    needRemove && el.removeAttribute(key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  const nativeOnRE = /^on[a-z]/;
  const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && nativeOnRE.test(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (nativeOnRE.test(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  const vShow = {
    beforeMount(el, { value }, { transition }) {
      el._vod = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue)
        return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el._vod : "none";
  }
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    if ({}.NODE_ENV !== "production") {
      injectNativeTagCheck(app);
      injectCompilerOptionsCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      container.innerHTML = "";
      const proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function injectNativeTagCheck(app) {
    Object.defineProperty(app.config, "isNativeTag", {
      value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
      writable: false
    });
  }
  function injectCompilerOptionsCheck(app) {
    {
      const isCustomElement = app.config.isCustomElement;
      Object.defineProperty(app.config, "isCustomElement", {
        get() {
          return isCustomElement;
        },
        set() {
          warn(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
        }
      });
      const compilerOptions = app.config.compilerOptions;
      const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
      Object.defineProperty(app.config, "compilerOptions", {
        get() {
          warn(msg);
          return compilerOptions;
        },
        set() {
          warn(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      if ({}.NODE_ENV !== "production" && !res) {
        warn(`Failed to mount app: mount target selector "${container}" returned null.`);
      }
      return res;
    }
    if ({}.NODE_ENV !== "production" && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
  }
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  if ({}.NODE_ENV !== "production") {
    initDev();
  }
  const _hoisted_1$3 = { class: "dialog-shadow" };
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    __name: "dialog-shadow",
    props: {
      visible: { type: Boolean, default: true }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$3, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)), [
          [vShow, props.visible]
        ]);
      };
    }
  });
  const dialogShadow_vue_vue_type_style_index_0_scoped_1fb4b209_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const DialogShadow = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1fb4b209"]]);
  const _hoisted_1$2 = { class: "user-button" };
  const _sfc_main$2 = /* @__PURE__ */ defineComponent({
    __name: "user-button",
    props: {
      title: { default: "" }
    },
    setup(__props) {
      const props = __props;
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("button", _hoisted_1$2, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          createTextVNode(" " + toDisplayString(props.title), 1)
        ]);
      };
    }
  });
  const userButton_vue_vue_type_style_index_0_scoped_0f7e47fd_lang = "";
  const UserButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0f7e47fd"]]);
  const _hoisted_1$1 = ["value"];
  const _sfc_main$1 = /* @__PURE__ */ defineComponent({
    __name: "user-textbox",
    props: {
      modelValue: { default: "" }
    },
    emits: ["update:modelValue"],
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("input", {
          class: "user-textbox",
          type: "text",
          value: __props.modelValue,
          onInput: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.value)),
          autocomplete: "off"
        }, null, 40, _hoisted_1$1);
      };
    }
  });
  const userTextbox_vue_vue_type_style_index_0_scoped_16956fda_lang = "";
  const UserTextbox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-16956fda"]]);
  const _withScopeId = (n) => (pushScopeId("data-v-2250b574"), n = n(), popScopeId(), n);
  const _hoisted_1 = { class: "dialog-warp" };
  const _hoisted_2 = { class: "left-container" };
  const _hoisted_3 = { class: "module-list-container" };
  const _hoisted_4 = { class: "title" };
  const _hoisted_5 = { class: "brief" };
  const _hoisted_6 = { class: "head-controls" };
  const _hoisted_7 = { class: "title" };
  const _hoisted_8 = { class: "right-container" };
  const _hoisted_9 = { class: "module-container" };
  const _hoisted_10 = { class: "module-info" };
  const _hoisted_11 = { class: "title" };
  const _hoisted_12 = { class: "brief" };
  const _hoisted_13 = { class: "desc" };
  const _hoisted_14 = {
    key: 0,
    class: "module-tags"
  };
  const _hoisted_15 = { class: "bottom-controls" };
  const _hoisted_16 = { class: "empty-container" };
  const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", { class: "empty-icon" }, null, -1));
  const _hoisted_18 = [
    _hoisted_17
  ];
  const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: "module-control",
    props: {
      modules: null
    },
    setup(__props) {
      const props = __props;
      const filteredModules = ref(props.modules);
      const selectedModule = ref(emptyUserModule());
      const headTitle = ref("搜索 用户模块");
      const searchPH = ref("搜索模块关键字");
      const searchText = ref("");
      const bottomToggle = ref(true);
      function moduleItemClick(module2) {
        selectedModule.value = module2;
        bottomToggle.value = !isModuleDisabled(module2);
      }
      function toggleClick(module2) {
        if (bottomToggle.value) {
          disabledModules.push(module2.id);
          GM_setValue("disabledModules", [...new Set(disabledModules)]);
        } else {
          pull$1(disabledModules, module2.id);
          GM_setValue("disabledModules", [...new Set(disabledModules)]);
        }
        bottomToggle.value = !bottomToggle.value;
      }
      watch(searchText, () => {
        if (searchText.value === "") {
          filteredModules.value = props.modules;
        } else {
          const searchRegex = RegExp(searchText.value, "i");
          filteredModules.value = props.modules.filter((module2) => {
            const indexes = [
              module2.id.match(searchRegex),
              module2.name.match(searchRegex),
              module2.brief.match(searchRegex)
            ];
            if (isEqual(
              indexes,
              Array.from({ length: indexes.length }, () => null)
            )) {
              return false;
            } else {
              return true;
            }
          });
        }
      });
      return (_ctx, _cache) => {
        return openBlock(), createBlock(DialogShadow, null, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredModules.value, (module2) => {
                    return openBlock(), createBlock(UserButton, {
                      key: module2.id,
                      class: normalizeClass(["module-item", selectedModule.value.id === module2.id ? "selected" : false]),
                      onClick: ($event) => moduleItemClick(module2)
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("p", _hoisted_4, toDisplayString(module2.name), 1),
                        createBaseVNode("p", _hoisted_5, toDisplayString(module2.brief), 1)
                      ]),
                      _: 2
                    }, 1032, ["class", "onClick"]);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("p", _hoisted_7, toDisplayString(headTitle.value), 1),
                  createVNode(UserTextbox, {
                    modelValue: searchText.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchText.value = $event),
                    class: "search-box",
                    placeholder: searchPH.value,
                    autocomplete: "none"
                  }, null, 8, ["modelValue", "placeholder"])
                ])
              ]),
              createBaseVNode("div", _hoisted_8, [
                withDirectives(createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("p", _hoisted_11, [
                      createTextVNode(toDisplayString(selectedModule.value.name) + " ", 1),
                      createBaseVNode("span", null, toDisplayString(selectedModule.value.id) + " " + toDisplayString(selectedModule.value.version), 1)
                    ]),
                    createBaseVNode("p", _hoisted_12, toDisplayString(selectedModule.value.brief), 1),
                    createBaseVNode("p", _hoisted_13, toDisplayString(selectedModule.value.description), 1)
                  ]),
                  false ? (openBlock(), createElementBlock("div", _hoisted_14)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(UserButton, {
                      class: normalizeClass(["toggle", bottomToggle.value ? "on" : "off"]),
                      onClick: _cache[1] || (_cache[1] = ($event) => toggleClick(selectedModule.value))
                    }, null, 8, ["class"]),
                    createVNode(UserButton, { class: "settings" })
                  ])
                ], 512), [
                  [vShow, selectedModule.value.id === "" ? false : true]
                ]),
                withDirectives(createBaseVNode("div", _hoisted_16, _hoisted_18, 512), [
                  [vShow, selectedModule.value.id === "" ? true : false]
                ])
              ])
            ])
          ]),
          _: 1
        });
      };
    }
  });
  const moduleControl_vue_vue_type_style_index_0_scoped_2250b574_lang = "";
  const moduleControlVue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2250b574"]]);
  const palette = ":root{--default-background: rgb(255, 255, 255);--trans-default-background: rgba(255, 255, 255, .6);--deep-background: rgb(200, 200, 200);--trans-deep-background: rgba(200, 200, 200, .6);--light-background: rgb(230, 230, 230);--trans-light-background: rgba(230, 230, 230, .6);--very-light-background: rgb(245, 245, 245);--elem-color: rgb(240, 240, 240);--default-fore: rgb(10, 10, 10);--light-fore: rgb(20, 20, 20);--minimal-fore: rgb(60, 60, 60);--highlight-fore: rgb(0, 0, 0);--border-color: rgba(210, 210, 210, .6);--tieba-theme-color: rgb(97, 78, 194);--trans-tieba-theme-color: rgba(97, 78, 194, .6);--tieba-theme-background: rgba(97, 78, 194, .2);--tieba-theme-fore: rgb(58, 46, 116);--level-green-background: rgba(84, 130, 53, .3);--level-green-fore: rgb(51, 78, 32);--level-blue-background: rgba(0, 153, 213, .3);--level-blue-fore: rgb(0, 81, 111);--level-yellow-background: rgba(164, 139, 63, .3);--level-yellow-fore: rgb(124, 105, 46);--level-orange-background: rgba(255, 153, 0, .3);--level-orange-fore: rgb(178, 104, 0);--img-tieba-icon: url(https://gitee.com/WiresawBlade/Tieba-Remix/raw/main/images/main/icon.png);color-scheme:light dark}@media (prefers-color-scheme: dark){:root{--default-background: rgb(32, 32, 32);--trans-default-background: rgba(32, 32, 32, .6);--deep-background: rgb(26, 26, 26);--trans-deep-background: rgba(20, 20, 20, .6);--light-background: rgb(60, 60, 60);--trans-light-background: rgba(60, 60, 60, .6);--very-light-background: rgb(60, 60, 60);--elem-color: rgb(26, 26, 26);--default-fore: rgb(230, 230, 230);--light-fore: rgb(200, 200, 200);--minimal-fore: rgb(144, 144, 144);--highlight-fore: rgb(255, 255, 255);--border-color: rgba(96, 96, 96, .6);--tieba-theme-color: rgb(113, 97, 193);--trans-tieba-theme-color: rgba(113, 97, 193, .6);--tieba-theme-background: rgba(113, 97, 193, .2);--tieba-theme-fore: rgb(150, 128, 255);--level-green-background: rgba(96, 153, 59, .3);--level-green-fore: rgb(133, 206, 84);--level-blue-background: rgba(0, 165, 227, .3);--level-blue-fore: rgb(0, 169, 255);--level-yellow-background: rgba(229, 193, 90, .3);--level-yellow-fore: rgb(242, 205, 96);--level-orange-background: rgba(204, 122, 0, .3);--level-orange-fore: rgb(255, 170, 0)}}\n";
  const materialIcons = '@font-face{font-family:Material Icons;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/materialicons/v118/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format("woff2")}.material-icons{display:inline-block;direction:ltr;font-family:Material Icons;font-size:24px;-webkit-font-smoothing:antialiased;font-style:normal;font-weight:400;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap;word-wrap:normal}\n';
  const REMIXED = "\n██████╗ ███████╗███╗   ███╗██╗██╗  ██╗███████╗██████╗ \n██╔══██╗██╔════╝████╗ ████║██║╚██╗██╔╝██╔════╝██╔══██╗\n██████╔╝█████╗  ██╔████╔██║██║ ╚███╔╝ █████╗  ██║  ██║\n██╔══██╗██╔══╝  ██║╚██╔╝██║██║ ██╔██╗ ██╔══╝  ██║  ██║\n██║  ██║███████╗██║ ╚═╝ ██║██║██╔╝ ██╗███████╗██████╔╝\n╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ \n";
  const MainModules = [];
  let moduleLoadedFlag = false;
  const beforeModulesLoadedFns = [];
  try {
    afterHead(() => {
      injectCSSList(palette);
      injectCSSList(materialIcons);
    });
    (() => {
      let i = 0;
      parseUserModules(
        /* @__PURE__ */ Object.assign({ "./modules/bili-bridge/entry.ts": () => Promise.resolve().then(() => entry$6), "./modules/easy-jump/entry.ts": () => Promise.resolve().then(() => entry$5), "./modules/no-login/entry.ts": () => Promise.resolve().then(() => entry$4), "./modules/notrans-emojis/entry.ts": () => Promise.resolve().then(() => entry$3), "./modules/remixed-theme/entry.ts": () => Promise.resolve().then(() => entry$2), "./modules/shield/entry.ts": () => Promise.resolve().then(() => entry$1), "./modules/tieba-tags/entry.ts": () => Promise.resolve().then(() => entry) }),
        (info, module2) => {
          MainModules.push(module2);
          i++;
          if (i === info.length) {
            moduleLoadedFlag = true;
            for (const fn of beforeModulesLoadedFns) {
              fn();
            }
          }
        }
      );
    })();
    greasyInit();
    const favElem = document.createElement("link");
    favElem.type = "image/icon";
    favElem.rel = "shortcut icon";
    favElem.href = favicon;
    const secElem = document.createElement("meta");
    secElem.httpEquiv = "Content-Security-Policy";
    secElem.content = "upgrade-insecure-requests";
    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(favElem);
      document.head.appendChild(secElem);
      if (location.href.indexOf("/p/") !== -1) {
        remixedObservers.postsObserver._observe();
        remixedObservers.commentsObserver._observe();
      }
      if (location.href === "https://tieba.baidu.com/") {
        remixedObservers.newListObserver._observe();
      }
      if (location.href.indexOf("/f?kw=") !== -1) {
        remixedObservers.threadListObserver._observe();
      }
      const floatBar = DOMS(".tbui_aside_float_bar")[0];
      floatBar.insertBefore(createNewElement("li", {
        class: "tbui_aside_fbar_button module-settings"
      }, [createNewElement("a", {
        href: "javascript:void"
      })]), floatBar.firstChild);
      injectCSSRule(".tbui_aside_float_bar .module-settings", {
        backgroundColor: "rgb(53, 73, 94)"
      });
      injectCSSRule(".module-settings .svg-container::after", {
        content: `"settings"`,
        color: "rgb(240, 240, 240)"
      });
      document.body.insertBefore(createNewElement("div", {
        class: "vue-module-control",
        style: "display: none;"
      }), document.body.firstChild);
      const ModuleControl = createApp(moduleControlVue, {
        modules: MainModules
      });
      ModuleControl.mount(".vue-module-control");
      DOMS(".tbui_aside_float_bar .module-settings")[0].addEventListener("click", () => {
        DOMS(".vue-module-control")[0].style.display = "block";
      });
      const moduleControlShadow = DOMS(".vue-module-control .dialog-shadow")[0];
      moduleControlShadow.addEventListener("click", (event) => {
        if (event.target !== moduleControlShadow)
          return;
        DOMS(".vue-module-control")[0].style.display = "none";
      });
    });
    console.info(REMIXED);
  } catch (error) {
    console.error(error);
  }
  function afterModulesLoaded(callbackfn) {
    if (moduleLoadedFlag) {
      callbackfn();
    } else {
      beforeModulesLoadedFns.push(callbackfn);
    }
  }
  const Main$6 = {
    id: "bili-bridge",
    name: "Bili 番号跳转",
    author: "锯刃Blade",
    version: "1.1",
    brief: "为贴子中的b站番号添加跳转链接",
    description: `该模块可以识别贴子中的 av/BV 号并将其转换为超链接`,
    scope: "tieba.baidu.com/p/",
    runAt: "immediately",
    entry: main$6
  };
  function main$6() {
    const LINKED_CLASS = "linked";
    const avRegExp = new RegExp("(?<!:\\/\\/www.bilibili.com\\/video\\/)av[1-9]\\d*", "gi");
    const BVRegExp = new RegExp("(?<!:\\/\\/www.bilibili.com\\/video\\/)BV[A-Za-z0-9]{10}", "g");
    document.addEventListener("DOMContentLoaded", () => {
      remixedObservers.commentsObserver.addEvent(biliEnhanced);
    });
    function biliEnhanced() {
      addBiliLinks(".d_post_content");
      addBiliLinks(".lzl_cnt .lzl_content_main");
      function addBiliLinks(selector) {
        DOMS(selector).forEach((elem) => {
          var _a, _b, _c, _d;
          if (elem.classList.contains(LINKED_CLASS))
            return;
          elem.classList.add(LINKED_CLASS);
          if (((_a = elem.textContent) == null ? void 0 : _a.toLowerCase().indexOf("av")) !== -1) {
            const avs = (_b = elem.textContent) == null ? void 0 : _b.match(avRegExp);
            bindingLinks(avs, true);
          }
          if (((_c = elem.textContent) == null ? void 0 : _c.indexOf("BV")) !== -1) {
            const BVs = (_d = elem.textContent) == null ? void 0 : _d.match(BVRegExp);
            bindingLinks(BVs);
          }
          function bindingLinks(array, lowerCase = false) {
            if (array === null || array === void 0)
              return;
            const hadHyperLink = [];
            array == null ? void 0 : array.forEach((videoID) => {
              if (hadHyperLink.indexOf(videoID) === -1) {
                hadHyperLink.push(videoID);
                const htmlArray = elem.innerHTML.split(RegExp(
                  "(?<!://www.bilibili.com/video/)" + videoID,
                  "g"
                ));
                if (lowerCase)
                  videoID = videoID.toLowerCase();
                const linkedID = "<a href='https://www.bilibili.com/video/" + videoID + "/'>" + videoID + "</a>";
                elem.innerHTML = htmlArray.join(linkedID);
              }
            });
          }
        });
      }
    }
  }
  const entry$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$6
  }, Symbol.toStringTag, { value: "Module" }));
  const Main$5 = {
    id: "easy-jump",
    name: "直链跳转",
    author: "锯刃Blade",
    version: "1.0",
    brief: "链接跳转避免二次确认",
    description: `自动跳转至分享链接的原始地址，不再进行中转（不处理被严重警告的链接）`,
    scope: ["jump.bdimg.com/safecheck/", "jump2.bdimg.com/safecheck/"],
    runAt: "immediately",
    entry: main$5
  };
  function main$5() {
    injectCSSRule(".warning_wrap", {
      display: "none"
    });
    document.addEventListener("DOMContentLoaded", () => {
      const realUrl = DOMS(".btn-next")[0].href;
      if (realUrl)
        location.href = realUrl;
    });
  }
  const entry$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$5
  }, Symbol.toStringTag, { value: "Module" }));
  const Main$4 = {
    id: "nologin-tieba",
    name: "免登录浏览",
    author: "锯刃Blade",
    version: "1.0",
    brief: "免登录浏览贴吧",
    description: `始终伪装为已登录状态，让免登录浏览和已登录基本一致`,
    scope: "/p/",
    runAt: "DOMLoaded",
    entry: main$4
  };
  function main$4() {
    if (PageData.user.is_login)
      return;
    PageData.user.is_login = 1;
  }
  const entry$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$4
  }, Symbol.toStringTag, { value: "Module" }));
  const Main$3 = {
    id: "notrans-emojis",
    name: "别动我的 emoji😠",
    author: "锯刃Blade",
    version: "1.0",
    brief: "拒绝替换我的 emoji",
    description: "原版贴吧会将部分emoji表情替换为旧版，该模块会让这些emoji重新跟随系统样式",
    scope: true,
    runAt: "afterHead",
    entry: main$3
  };
  function main$3() {
    const indexRegExp = new RegExp("(?<=nickemoji\\/).*?(?=.png)", "gi");
    const emojis = [
      "º",
      "◎",
      "▫",
      "◆",
      "♤",
      "♀",
      "♂",
      "ლ",
      "♬",
      "☞",
      "☜",
      "✆",
      "☎",
      "♋",
      "Ω",
      "℃",
      "℉",
      "😄",
      "😍",
      "😘",
      "😚",
      "😜",
      "😳",
      "😁",
      "😞",
      "😢",
      "😂",
      "😫",
      "😨",
      "😱",
      "😡",
      "😷",
      "😲",
      "😈",
      "🐷",
      "🐶",
      "🐑",
      "🐵",
      "🐨",
      "🐴",
      "🐼",
      "🐯",
      "🍪",
      "🍺",
      "🍦",
      "🍭",
      "🍗",
      "🍼",
      "🔯",
      "🍒",
      "👀",
      "🐭",
      "😇",
      "😺",
      "😻",
      "🙀",
      "😿",
      "😹",
      "😾",
      "👹",
      "👺",
      "🌞",
      "🌝",
      "🌚",
      "🌜",
      "🌛",
      "👦",
      "👧",
      "🎎",
      "🌸",
      "🍀",
      "🌹",
      "🌻",
      "🌺",
      "🍁",
      "🌿",
      "🍄",
      "🌵",
      "🌴",
      "🌳",
      "🌰",
      "🌱",
      "🌼",
      "🌐",
      "🌙",
      "🌋",
      "🌌",
      "⛅",
      "⚡",
      "☔",
      "⛄",
      "🌀",
      "🌈",
      "🌊",
      "🔥",
      "✨",
      "🌟",
      "💥",
      "💫",
      "💢",
      "💦",
      "💧",
      "💤",
      "💨",
      "🎀",
      "🌂",
      "💄",
      "💕",
      "💖",
      "💞",
      "💘",
      "💌",
      "💋",
      "💝",
      "🎒",
      "🎓",
      "🎏",
      "🎃",
      "👻",
      "🎅",
      "🎄",
      "🎁",
      "🙈",
      "🐒",
      "💯",
      "👯",
      "💍"
    ];
    const transformed = [
      "1-1.png",
      "1-2.png",
      "1-4.png",
      "1-5.png",
      "1-6.png",
      "1-7.png",
      "1-8.png",
      "1-9.png",
      "1-10.png",
      "1-11.png",
      "1-12.png",
      "1-13.png",
      "1-14.png",
      "1-15.png",
      "1-16.png",
      "1-17.png",
      "1-18.png",
      "1-19.png",
      "1-20.png",
      "1-21.png",
      "1-22.png",
      "1-23.png",
      "1-24.png",
      "1-25.png",
      "1-26.png",
      "1-27.png",
      "1-28.png",
      "1-29.png",
      "1-30.png",
      "1-31.png",
      "1-32.png",
      "1-33.png",
      "1-34.png",
      "1-35.png",
      "2-1.png",
      "2-2.png",
      "2-3.png",
      "2-4.png",
      "2-5.png",
      "2-6.png",
      "2-7.png",
      "2-8.png",
      "2-9.png",
      "2-10.png",
      "2-11.png",
      "2-12.png",
      "2-13.png",
      "2-14.png",
      "2-15.png",
      "2-16.png",
      "2-17.png",
      "2-18.png",
      "2-19.png",
      "2-20.png",
      "2-21.png",
      "2-22.png",
      "2-23.png",
      "2-24.png",
      "2-25.png",
      "2-26.png",
      "2-27.png",
      "2-28.png",
      "2-29.png",
      "2-30.png",
      "2-31.png",
      "2-32.png",
      "2-33.png",
      "2-34.png",
      "2-35.png",
      "3-1.png",
      "3-2.png",
      "3-3.png",
      "3-4.png",
      "3-5.png",
      "3-6.png",
      "3-7.png",
      "3-8.png",
      "3-9.png",
      "3-10.png",
      "3-11.png",
      "3-12.png",
      "3-13.png",
      "3-14.png",
      "3-15.png",
      "3-16.png",
      "3-17.png",
      "3-18.png",
      "3-19.png",
      "3-20.png",
      "3-21.png",
      "3-22.png",
      "3-23.png",
      "3-24.png",
      "3-25.png",
      "3-26.png",
      "3-27.png",
      "3-28.png",
      "3-29.png",
      "3-30.png",
      "3-31.png",
      "3-32.png",
      "3-33.png",
      "3-34.png",
      "3-35.png",
      "4-1.png",
      "4-2.png",
      "4-3.png",
      "4-4.png",
      "4-5.png",
      "4-6.png",
      "4-7.png",
      "4-8.png",
      "4-9.png",
      "4-10.png",
      "4-11.png",
      "4-12.png",
      "4-13.png",
      "4-14.png",
      "4-15.png",
      "4-16.png",
      "4-17.png",
      "4-18.png",
      "4-19.png",
      "4-20.png",
      "4-21.png",
      "4-22.png",
      "4-23.png"
    ];
    remixedObservers.commentsObserver.addEvent(() => {
      DOMS(`
            .p_author_name:has(.nicknameEmoji),
            .at:has(.nicknameEmoji),
            .lzl_content_main:has(.nicknameEmoji)
        `).forEach((elem) => {
        updateEmojis(elem);
      });
    });
    remixedObservers.newListObserver.addEvent(() => {
      DOMS(`
            .new_list .post_author:has(.nicknameEmoji),
            .userinfo_username:has(.nicknameEmoji)
        `).forEach((elem) => {
        updateEmojis(elem);
      });
    });
    remixedObservers.threadListObserver.addEvent(() => {
      DOMS(".threadlist_author a:has(.nicknameEmoji)").forEach((elem) => {
        updateEmojis(elem);
      });
    });
    function updateEmojis(elem) {
      const arrIndex = elem.innerHTML.match(indexRegExp);
      arrIndex == null ? void 0 : arrIndex.forEach((index) => {
        const emoji = emojis[transformed.indexOf(index + ".png")];
        const arrInner = elem.innerHTML.split(RegExp(
          "<img[^>]*?" + index + ".png(?:[^>]*?)*>",
          "g"
        ));
        elem.innerHTML = arrInner.join(decodeURIComponent(emoji));
      });
    }
  }
  const entry$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$3
  }, Symbol.toStringTag, { value: "Module" }));
  const mainCSS = '@keyframes animation-fade-in{0%{opacity:0}to{opacity:1}}.fade-in-elem{animation:animation-fade-in ease .3s forwards}.tbui_aside_float_bar{border:none!important;background:none!important}.tbui_aside_float_bar li{width:40px;height:40px;border-radius:24px;margin:8px 0;background-color:var(--light-background)}.tbui_aside_float_bar li:hover{background-color:var(--tieba-theme-color);box-shadow:0 0 10px var(--tieba-theme-color)}.tbui_aside_float_bar li a{width:40px!important;height:40px!important;background:none!important}.tbui_aside_float_bar li a{border-radius:24px}.tbui_aside_float_bar .svg-container{width:40px!important;height:40px!important}.tbui_aside_float_bar .svg-container{color:var(--minimal-fore);font-size:24px;line-height:40px;text-align:center}.tbui_aside_float_bar .svg-container:hover{color:var(--default-background)}.tbui_aside_float_bar .tbui_fbar_auxiliaryCare a{height:40px!important;background:none!important}.tbui_fbar_auxiliaryCare .svg-container:after{content:"accessibility_new"}.tbui_fbar_top .svg-container:after{color:var(--tieba-theme-fore);content:"arrow_upward"}.tbui_aside_float_bar .tbui_fbar_top a{background-color:var(--tieba-theme-background)!important}.tbui_fbar_top .svg-container:hover:after{color:var(--default-background)}.tbui_fbar_post .svg-container:after{color:var(--default-background);content:"chat";font-size:22px;vertical-align:bottom}.tbui_aside_float_bar .tbui_fbar_post a,.tbui_aside_float_bar .tbui_fbar_post a:hover{background-color:var(--tieba-theme-color)!important}.tbui_fbar_feedback .svg-container:after{content:"report";font-size:26px}.tbui_aside_float_bar li.tbui_fbar_feedback a,.tbui_aside_float_bar .tbui_fbar_feedback a,.tbui_aside_float_bar .tbui_fbar_feedback a:hover{background:none!important}.tbui_aside_float_bar .tbui_fbar_down,.tbui_aside_float_bar .tbui_fbar_props,.tbui_aside_float_bar .tbui_fbar_tsukkomi,.tbui_aside_float_bar .tbui_fbar_share,.tbui_aside_float_bar .tbui_fbar_favor,.tbui_aside_float_bar .tbui_fbar_refresh{display:none}.p_tools a{padding:0 10px;background:none;vertical-align:bottom}.p_tools span{display:none}.p_tools .p_putup:before,.p_tools .tb_icon_ypic:before,.p_tools .tb_icon_turnleft:before,.p_tools .tb_icon_turnright:before{margin-right:4px;font-family:Material Icons,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;font-size:14px;vertical-align:bottom}.p_tools .p_putup:before{content:"zoom_out"}.p_tools .tb_icon_ypic:before{content:"zoom_out_map"}.p_tools .tb_icon_turnleft:before{content:"turn_left"}.p_tools .tb_icon_turnright:before{content:"turn_right"}\n';
  const homeCSS = 'body{background-color:var(--default-background);color:var(--default-fore)}.head_inner{background-color:var(--default-background)}.u_menu_item a{color:var(--default-fore)}.head_inner .search_logo{left:72px;width:60px;height:60px;background-image:var(--img-tieba-icon)}.search_top{border:none}.search_nav a:link,.search_nav a:hover,.search_nav a:visited,.u_menu_item a:hover,.u_menu_item a:visited{color:var(--default-fore)}.search_main{padding-bottom:96px}.search_bright .search_inp_border{border-color:var(--border-color);border-bottom-left-radius:8px;border-top-left-radius:8px;color:var(--default-fore)}.search_bright .search_inp_border:focus{border-color:var(--tieba-theme-color)}.search_bright .search_btn{border-color:var(--trans-tieba-theme-color);border-radius:8px;background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore)}.search_bright .search_btn_enter_ba{background-color:var(--tieba-theme-color);border-bottom-left-radius:0;border-top-left-radius:0;color:var(--default-background)}.search_bright .search_btn:visited{color:var(--tieba-theme-fore)}.search_bright .search_btn_enter_ba:visited{background-color:var(--tieba-theme-color);color:var(--default-background)}.search_bright .search_btn:hover{border-color:var(--trans-tieba-theme-color);background-color:var(--tieba-theme-background);box-shadow:0 0 0 2px var(--trans-tieba-theme-color)}.search_bright .search_btn_enter_ba:hover{background-color:var(--tieba-theme-color);color:var(--default-background)}.suggestion{border-color:var(--border-color);border-radius:0 0 16px 16px;background-color:var(--elem-color);box-shadow:0 10px 20px #0000004d;color:var(--default-fore)}.suggestion .break_tip{background-color:var(--default-background)}.suggestion .highlight{color:var(--tieba-theme-color)}.suggestion .operation_title{color:var(--default-fore)}.suggestion .forum_image{border-radius:8px}.suggestion .forum_name{color:var(--highlight-fore)}.suggestion .on{background-color:var(--light-background)}.page-container .top-sec{display:none}.page-container .content-sec{background:none}.page-container .left-sec{border-radius:24px;border-top:none;background:none;background-color:var(--elem-color)}.f-d-w{border-radius:24px;background-color:var(--elem-color)}.f-d-w .f-d-item{background:none}.aggregate_entrance_wrap{display:none}.u-f-t .gap{border:none;background:none}.f-d-w .all{background:none}.forum_rcmd{border:0;border-radius:24px;background-color:var(--elem-color)}.region_bright .region_header{color:var(--default-fore)}.page-container .left-sec .region_bright{border-radius:24px}.my_tieba_mod .media_left,.my_tieba_mod .media-left{border:none}.media_left img,.media-left img{border-radius:16px}#nameValue,#j_tcharge_dialog{color:var(--default-fore)}#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn{border-radius:8px;margin-right:-5px;background:none;background-color:var(--tieba-theme-color);color:var(--elem-color);text-align:center}#onekey_sign .onekey_btn:after{content:"\\4e00\\952e\\7b7e\\5230"}#onekey_sign a.signed_btn .icon_signed{margin-top:2px;background:var(--svg-checkmark);background-repeat:no-repeat;background-size:20px;filter:drop-shadow(var(--elem-color) 0 9999px);transform:translateY(-9999px)}#onekey_sign .onekey_btn:hover{box-shadow:0 0 10px var(--tieba-theme-color)}.u-f-w{padding-bottom:20px}.left-cont-fixed{position:relative;bottom:0}.u-f-w .sign,.u-f-w .unsign,.always-forum-item .sign,.always-forum-item .unsign{border-radius:8px;background:none;background-color:var(--light-background);color:var(--default-fore)}.u-f-w .sign,.always-forum-item .sign{background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore)}.u-f-w .sign,.u-f-w .unsign{margin-bottom:8px}.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover{background:none;background-color:var(--tieba-theme-color);box-shadow:0 0 10px var(--tieba-theme-color);color:var(--elem-color);-webkit-text-decoration:none;text-decoration:none}.u-f-w .more{border:none;border-radius:8px;background:none;background-color:var(--elem-color);box-shadow:none;color:var(--default-fore)}.more-txt{color:var(--default-fore)}.u-f-w .more-hover{width:188px;margin:auto;background-color:var(--tieba-theme-color);box-shadow:0 0 10px var(--tieba-theme-color);color:var(--elem-color)}.u-f-w .more-hover .more-txt,.u-f-w .more:hover .more-txt{margin-left:60px;color:var(--elem-color)}.always-forum-title{border:none;margin-top:10px}#alwayforum-wraper{background-color:var(--elem-color)}.pop-up-frame{border:none;background-color:var(--elem-color);border-radius:24px 24px 24px 0;box-shadow:none}.always-forum-close{display:none}.always-forum-item .addnewforumbtn{width:110px;padding-left:0;border-radius:8px;background:none;background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore);font-size:20px;text-align:center}.always-forum-item .addnewforumbtn:after{content:"+"}.always-forum-item .addnewforumbtn:hover{background-color:var(--tieba-theme-color);box-shadow:0 0 10px var(--tieba-theme-color);color:var(--elem-color)}.tbui_scroll_panel .tbui_scroll_button{width:6px;border:none;border-radius:24px;background-color:var(--very-light-background)}.tbui_scroll_panel .tbui_scroll_bar{width:6px;background:none}.forum_rcmd .class_title>div{color:var(--default-fore)}.rcmd_forum_item .forum_name{color:var(--default-fore)}.rcmd_forum_item .rcmd_forum_logo{border:none;border-radius:16px;background:none}.page-container .r-left-sec,.sub_nav_wrap,.title-tag-wraper,.thread-name-wraper,.n_reply{width:780px}.n_txt{width:720px;color:var(--light-fore)}.sub_nav_wrap{background:none;background-color:var(--default-background);box-shadow:none}.sub_nav_list a.cur{border:none;color:var(--tieba-theme-color)}.sub_nav_list .nav_hover{width:56px!important}.sub_nav_list .nav_hover{border-bottom:3px solid var(--tieba-theme-color)}.sub_nav_list li.sub_nav_line{background:none}.page-container .r-right-sec{display:none}.item_hd{border:none;border-radius:24px;background-color:var(--default-background);color:var(--default-fore)}.item_hd .title{color:var(--default-fore)}.topic_list .topic_item .topic_flag_hot{border-radius:4px}.item .item_hd{border:none;background-color:var(--default-background);color:var(--default-fore)}.item .item_hd .title{color:var(--default-fore)}.notice-wrap-fixed{background-color:var(--default-color);border-bottom-left-radius:24px;border-bottom-right-radius:24px}.notice,.notice img{border-radius:24px}.new_list .title{color:var(--tieba-theme-color)}.new_list .title:hover{color:var(--tieba-theme-color);-webkit-text-decoration:underline;text-decoration:underline}.title-tag-wraper a{padding:4px 10px;border-radius:24px;background-color:var(--light-background);color:var(--light-fore);font-size:12px}.title-tag-wraper a:hover{color:var(--light-fore);-webkit-text-decoration:none;text-decoration:none}.list-post-num{top:0;padding:4px 10px;border:none;border-radius:16px;background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore)}.list-triangle-border,.list-triangle-body{display:none}.new_list .post_author{padding:0;margin-bottom:24px;background:none;color:var(--default-fore);-webkit-text-decoration:none;text-decoration:none}.new_list .time{padding:0;background:none}.topic-tag{display:none}.n_img img{border:none;border-radius:16px;cursor:pointer}.n_img li{border-radius:16px}.n_img li .feed_highlight{background:none;cursor:pointer}.media_box{border:none;border-radius:16px;background-color:var(--light-background)}.media_box img{border-radius:16px;cursor:pointer}.ui_btn{border:none;border-radius:24px;background:none;background-color:var(--tieba-theme-color);color:var(--default-background)}.ui_btn:hover{-webkit-text-decoration:none!important;text-decoration:none!important}.ui_btn:hover{background:none;background-color:var(--tieba-theme-color);box-shadow:0 0 10px var(--tieba-theme-color);color:var(--default-background)}.btn_more{width:200px;height:auto;height:initial;border-radius:24px;background:none;background-color:var(--tieba-theme-background)}.btn_more:hover,.data_error_bar a:hover,.btn_more a:hover{background:none!important;background-color:var(--tieba-theme-color)!important;color:var(--default-background)!important}.data_error_bar a,.btn_more a{border:none;color:var(--tieba-theme-fore)}.bottom-bg{background:none}.footer{border-top:1px solid var(--light-background);background-color:var(--light-background)}.f-d-w,.left-cont-wraper .ufw-gap,#data_loading img{display:none}\n';
  const postsCSS = 'a{color:var(--tieba-theme-fore)}.d_name a:hover,.content a.at:hover{-webkit-text-decoration:none;text-decoration:none}.l_reply_num{color:inherit!important}#j_navtab_game,.nav_list .more-config-navtab,#j_navtab_wanle{display:none}.nav_wrap_add_border{border:none}#head{background-color:var(--default-background)}.content{border-radius:24px;background:transparent none repeat 0 0 / auto auto padding-box border-box scroll;background:initial;box-shadow:0 0 80px -32px #0006}.card_top_wrap{background:none!important;background-color:var(--elem-color)!important}.card_top_wrap{border-radius:24px 24px 0 0}.card_top_theme2{border:none;margin-right:0}#novel-ranking .novel-ranking-frs-body,.novel-award-aside{display:none}.card_head,.plat_head_theme2 .plat_picbox{top:-32px!important;width:64px!important;height:64px!important;padding:0!important;padding:initial!important;border:4px solid var(--border-color)!important;border-radius:24px!important;background:none!important}.card_head,.plat_head_theme2 .plat_picbox{overflow:hidden}.card_head_img,.plat_head_theme2 .plat_picbox img{width:64px!important;height:64px!important}.card_title,.plat_title_h3{margin:5px 20px 0}.card_top_theme2 .card_title_fname,.plat_title_h3,.plat_title_h3:hover,.plat_title_h3:visited{color:var(--highlight-fore)}.islike_focus{margin-top:4px!important}.islike_focus{border-radius:24px;background:none;background-color:var(--tieba-theme-color);color:var(--elem-color);font-size:14px;line-height:28px;text-align:center}.islike_focus:after{content:"\\5173\\6ce8"}.cancel_focus{width:72px;border:2px solid var(--trans-tieba-theme-color);border-radius:24px;background:none;background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore);font-size:14px;line-height:28px;text-align:center}.cancel_focus:after{content:"\\5df2\\5173\\6ce8"}.card_top_right{margin-top:20px}.sign_box_bright{width:140px!important;height:40px!important}.sign_box_bright{border:2px solid var(--trans-tieba-theme-color);border-radius:24px;background:none;background-color:var(--tieba-theme-color);color:var(--default-background);font-size:18px;line-height:40px;text-align:center}.sign_btn_bright:before{color:var(--elem-color);content:"\\7b7e\\5230"}.sign_box_bright_signed{background-color:var(--tieba-theme-background)}.sign_today_date,.sign_month_lack_days{display:none}.sign_keep_span{width:140px!important}.sign_keep_span{height:40px}.sign_keep_span,.sign_mod_bright .sign_keep_span{margin:0;margin:initial;color:var(--tieba-theme-fore);font-size:12px;text-align:center}.sign_box_bright_signed:before{content:none!important}.sign_mod_bright .sign_keep_span:before{content:"\\5df2\\7b7e\\5230  | "}.sign_box_bright_signed{text-align:inherit}.jump_input_bright{padding:0 10px;border-color:var(--border-color);border-radius:16px}.left_section{background:none}.core_title_wrap_bright{border-color:var(--border-color);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);background-color:var(--trans-default-background)}.core_title_theme_bright,.core_title_absolute_bright .core_title_theme_bright{border-color:var(--border-color);background:none}.left_section .core_title_absolute_bright{-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);background-color:var(--trans-default-background)}.core_title_txt{margin-left:24px;background:none}.tittle_fill_dom.filled{background-color:var(--default-background)}.core_title h1{margin-left:0;color:var(--highlight-fore)}.nav_wrap{background-image:none!important}.nav_wrap{border-color:var(--border-color);background-color:var(--light-background)}.nav_list a.nav_icon,.nav_list .tbnav_arrow{padding-left:22px;background:transparent none repeat 0 0 / auto auto padding-box border-box scroll;background:initial}.nav_wrap,.nav_list .space,.nav_list .focus,.nav_list li:hover,.nav_list li:hover .tbnav_tab_inner,.nav_list .focus .tbnav_tab_inner{background:transparent none repeat 0 0 / auto auto padding-box border-box scroll;background:initial}.nav_list a{color:var(--default-fore)}span.tP{color:var(--highlight-fore)!important}.thread_theme_5{width:auto;width:initial;border-color:var(--border-color);border-right:none;border-left:none;background-color:var(--light-background)}.btn_sub,.btn-sub,.btn-sub-b,.core_title_btns li a,.p_favthr_main{border:none;border-radius:8px;background:none;background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore)}.btn_sub:hover,.btn-sub:hover,.btn-sub-b:hover,.btn_sub:active,.btn-sub:active,.btn-sub-b:active,.btn_sub:focus,.btn-sub:focus,.btn-sub-b:focus{background-color:var(--tieba-theme-color);color:var(--default-background)}.l_lzonly:hover,.p_favthr_main:hover{background-color:var(--tieba-theme-color)!important;color:var(--default-background)!important}#quick_reply{display:none}.d_lzonly_bdaside,.p_favthr_main p,.j_quick_reply,.j_lzl_p a{color:inherit}.j_quick_reply{padding-left:0;padding-left:initial}.l_post_bright{width:auto;width:initial;border-color:var(--border-color);background:none}.p_author_face{background:none!important}.p_author_face{border:none}.icon_relative img{border-radius:16px}.d_name .p_author_name{color:var(--tieba-theme-fore)}.novel-level-icon{display:none}.d_badge_bright,.user_level .badge{border:1px solid var(--border-color);border-radius:24px;background-color:var(--light-background)}.user_level .badge_name{color:inherit}.d_badge_bright .d_badge_title{padding-left:4px;color:var(--default-fore)}.d_badge_bright .d_badge_lv,.user_level .badge_index{background-image:none!important}.d_badge_bright .d_badge_lv,.user_level .badge_index{background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore)}.d_badge_lv,.user_level .badge_index{top:auto!important;top:initial!important;left:60px!important;width:auto!important;width:initial!important;height:8px!important;padding:0 4px!important;margin:12px 4px!important;font-family:inherit!important;line-height:2px!important}.d_badge_lv,.user_level .badge_index{border-radius:16px;font-size:14px;font-style:italic}.d_badge_icon1 .d_badge_lv,.tieba-lvl-green{background-color:var(--level-green-background)!important;color:var(--level-green-fore)!important}.d_badge_icon2 .d_badge_lv,.d_badge_icon2_1 .d_badge_lv,.d_badge_icon2_2 .d_badge_lv,.tieba-lvl-blue{background-color:var(--level-blue-background)!important;color:var(--level-blue-fore)!important}.d_badge_icon3 .d_badge_lv,.d_badge_icon3_1 .d_badge_lv,.d_badge_icon3_2 .d_badge_lv,.tieba-lvl-yellow{background-color:var(--level-yellow-background)!important;color:var(--level-yellow-fore)!important}.d_badge_icon4 .d_badge_lv,.d_badge_icon4_1 .d_badge_lv,.d_badge_icon4_2 .d_badge_lv,.tieba-lvl-orange{background-color:var(--level-orange-background)!important;color:var(--level-orange-fore)!important}.d_badge_bawu1 .d_badge_lv,.d_badge_bawu2 .d_badge_lv{text-indent:inherit!important}.d_author .d_pb_icons,.icon_book_link_icon{display:none}.region_bright{border:none;margin-top:12px;background:none;background-color:var(--elem-color)}.region_bright .region_title{color:var(--default-fore)!important}.balv_mod .media_left,.balv_mod .media-left{border:none}.right_section .tieba_notice{background:none}.topic_list_box{display:none;background-color:var(--default-background)}.pb_content{border:none;background:none;background-color:var(--elem-color)}.notice-icon,.right_section .tieba_notice{padding-left:0!important;padding-left:initial!important;background:none!important}.tieba_notice li{background:none}.p_content{border:none;background-color:var(--default-background)}.forbid-speech-banner{border-top:none}.BDE_Image{border-radius:24px}.BDE_Image:first-child{margin-top:8px}.share_btn_wrapper,.post-tail-wrap .icon-jubao{display:none}.post-tail-wrap .icon-jubao:after{content:"\\4e3e\\62a5"}.post-tail-wrap .tail-info{color:var(--minimal-fore)}.j_jb_ele .tail-info,.complaint{color:var(--tieba-theme-fore)!important}.complaint{padding-right:4px;background:none}.complaint:after{content:"\\4e3e\\62a5"}.post-tail-wrap .question-image:hover:before{border-color:var(--border-color);border-radius:8px;background-color:var(--light-background);color:var(--default-fore)}.post_bubble_top,.post_bubble_bottom{display:none}.post_bubble_middle{background:none!important}.post_bubble_middle{width:auto;width:initial;padding:0;padding:initial}.save_face_bg_2{display:none}.replace_div .replace_tip{border-color:var(--border-color);background-color:var(--elem-color)}.achievement_medal_section{display:none}.l_post_bright .d_post_content_main .d_sign_split{border-bottom:1px solid var(--border-color)}.d_post_content_main{background-color:var(--default-background)!important}.lzl_p_p{border:none}.lzl_p_p img{border-radius:8px}.lzl_cnt .at{color:var(--tieba-theme-fore)}.core_reply_wrapper{border:1px solid var(--border-color)!important;border-radius:16px!important;margin-bottom:16px!important;background:none!important;background-color:var(--very-light-background)!important;color:var(--default-fore)!important}.core_reply_content li{border-top:0;border-top:initial}.core_reply_content li.first_no_border{margin-top:6px}.lzl_content_main{color:var(--default-fore)}.l_post_bright .core_reply_wrapper .core_reply_border_top,.core_reply_border_bottom,.l_post_bright .core_reply_wrapper .core_reply_content{border:none;background:none}.lzl_link_fold{display:none!important;border:1px solid var(--border-color)!important;border-bottom:none!important;background-color:var(--very-light-background)!important}.lzl_link_fold{border-radius:8px 8px 0 0;color:var(--tieba-theme-fore)}.core_reply div.hideLzl{background:none;background-color:var(--very-light-background)}.core_reply_wrapper .loading_reply{display:none}.lzl_cnt .lzl_s_r{color:var(--tieba-theme-fore)}.lzl_li_pager_s .lzl_more,.lzl_more span{color:var(--light-fore)}.j_lzl_m{color:var(--tieba-theme-fore)}.lzl_cnt .lzl_time{color:var(--minimal-fore)}.lzl_jb_in,.user-jubao-button{background:none;color:var(--tieba-theme-fore)}.lzl_jb_in:after,.user-jubao-button:after{content:"\\4e3e\\62a5"}.lzl_cnt .lzl_content_main{display:block}.d_post_content a,.lzl_cnt .lzl_content_main a:not(.at){padding:1px 6px;border-radius:24px;margin:auto 2px;background-color:var(--tieba-theme-background)}.d_post_content a:hover,.d_post_content a:focus,.lzl_cnt .lzl_content_main a:not(.at):hover,.lzl_cnt .lzl_content_main a:not(.at):focus{background-color:var(--tieba-theme-color);color:var(--default-background);-webkit-text-decoration:none;text-decoration:none}.pager_theme_5 a,.pager_theme_5 span,.jump_btn_bright{border-color:var(--default-background);border-radius:8px;background:none;background-color:var(--default-background);color:var(--minimal-fore)}.pager_theme_5 a:hover,.jump_btn_bright:hover{border-color:var(--tieba-theme-color);background-color:var(--tieba-theme-color);color:var(--default-background)}.thread_theme_7{width:auto;width:initial;border-color:var(--border-color);background-color:var(--light-background)}#pb-footer-header{background-color:var(--default-background)}#tb_rich_poster_container{width:auto;width:initial;border-radius:24px;background-color:var(--default-background)}.poster_head_text a.cur{color:var(--highlight-fore)!important}.edui-editor-body{border-color:var(--border-color)!important}.edui-editor-body{border-radius:16px;background:none}.edui-container .edui-editor-body.body-container-focus,.edui-container .edui-editor-body.body-container-focus .edui-body-container{border-color:var(--tieba-theme-color)!important}.old_style_wrapper{border-color:var(--border-color);border-radius:24px;background-color:var(--elem-color)}.edui-editor-body .edui-body-container{width:auto!important;width:initial!important}.edui-toolbar .edui-btn-toolbar,.edui-container .edui-toolbar{margin-top:4px;background-color:var(--elem-color)}.edui-editor-body .edui-body-container{border-radius:16px;background:var(--default-background)}.pb_footer{width:auto;width:initial;border:none;border-color:var(--border-color);background:none}.save-to-quick-reply-btn{border-color:var(--border-color);background:none;background-color:var(--light-background);color:inherit}.save-to-quick-reply-btn span{color:var(--tieba-theme-fore)}.footer{display:none}.skin_normal .wrap2{background:none;background-color:var(--default-background)}#lcsas-container{display:none}.user-hide-post-down,.user-hide-post-up{background-color:var(--light-fore);background-position:center;background-repeat:no-repeat;background-size:16px;-webkit-mask:var(--svg-arrow-down-circle);mask:var(--svg-arrow-down-circle);opacity:0}#selectsearch-icon{display:none}.ui_card_wrap{background:none}.ui_card_content{border-color:var(--border-color);border-radius:16px;background:none;box-shadow:0 0 20px #0003}.card_userinfo_wrap{background:none;background-color:var(--default-background)}.card_userinfo_left .userinfo_head{background:none}.j_avatar img{width:92px;height:92px;border:4px solid var(--border-color);border-radius:24px;-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}.card_userinfo_middle .userinfo_sex{background:none}.userinfo_sex_male:after{content:"\\2642"}.userinfo_sex_female:after{content:"\\2640"}.ui_card_wrap .ui_white_down,.ui_card_wrap .ui_white_up,.card_userinfo_guide{display:none}.user_card_loading{background-color:var(--default-background)}.user_card_loading img{display:none}.plat_head_theme2,.plat_header{border:none;background-color:transparent;background-color:initial}\n';
  const barCSS = '.threadlist_title a,.threadlist_title a:hover,.threadlist_title a:visited{color:var(--tieba-theme-fore)!important}.u_menu_item a{color:inherit!important}.card_banner,.plat_recom_carousel{display:none!important}.search_main{padding-bottom:0;padding-bottom:initial}.search_bright{margin-bottom:36px}.search_bright .search_logo_fixed{width:36px;height:36px;margin-left:56px;background-color:#0000;background-image:var(--img-tieba-icon);background-repeat:no-repeat}.search_main_fixed{border-color:var(--border-color);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);background-color:var(--trans-default-background);box-shadow:0 0 20px #0000001a}.card_top_theme{border:none!important}.content{width:982px}.card_top_theme .card_top{padding-left:120px!important}.card_title_fname{color:var(--tieba-theme-fore)!important}.card_slogan{color:var(--light-fore)!important}.islike_focus{background-color:var(--tieba-theme-color)!important;background-image:none!important}.cancel_focus{background:none!important;background-color:var(--tieba-theme-background)!important}.sign_box_bright,.sign_box_bright_hover{background:none!important;background-color:var(--tieba-theme-color)!important}.sign_box_bright_signed,.sign_box_bright_noclass_hover{background:none!important;background-color:var(--tieba-theme-background)!important}.sign_mod_bright .sign_keep_span{margin:0!important;margin:initial!important;text-align:center!important}.forum_content{border-color:var(--border-color)!important;border-right:none!important;background:none!important;background-color:var(--elem-color)!important}.nav_wrap{border-color:var(--border-color)!important}.nav_list li.focus{background:none!important}.nav_list a{color:inherit!important}.j_tabnav_tab:hover{background:none}.nav_list a:hover,.nav_list a:focus{background-color:var(--elem-color)!important}.search_internal_input{height:24px!important;border-color:var(--border-color)!important;color:var(--default-fore)!important}.search_internal_input{border-radius:8px 0 0 8px}.search_internal_btn{height:26px!important;background-color:var(--tieba-theme-color)!important;background-image:none!important;vertical-align:middle!important}.search_internal_btn{border-radius:0 8px 8px 0}.search_internal_btn:after{color:var(--default-background);content:"deployed_code";content:"search";font-family:Material Icons;font-size:18px;font-weight:700;line-height:26px;text-align:center}.aside_region{border-bottom:none!important}.aside_region .region_header{color:var(--default-fore)!important}.my_tieba .media_left,.my_tieba .media-left{border:none!important}.my_current_forum .badge{border:1px solid var(--border-color)!important;background-color:var(--light-background)!important;color:var(--default-fore)!important}.my_current_forum .badge_name{color:var(--default-fore)!important}.media_top img,.media-top img{border-radius:16px}.aside_media_horizontal a,.aside-media-horizontal a{color:var(--tieba-theme-fore)!important}.threadlist_bright li.thread_top_list_folder,.threadlist_bright li.thread_top_list_folder:hover{background-color:var(--very-light-background)!important}.threadlist_bright>li{border:none!important;background-color:var(--default-background)!important}.threadlist_bright>li:hover{background-color:var(--trans-light-background)!important}.j_th_tit{color:var(--tieba-theme-fore)}.threadlist_bright .threadlist_abs_onlyline,.threadlist_bright .threadlist_abs{color:var(--default-fore)!important}.vpic_wrap img:not([style]){opacity:0}.threadlist_bright .threadlist_media li{border-radius:8px!important}.threadlist_media li:hover .threadlist_pic_highlight{display:none!important}.threadlist_media li:hover .threadlist_pic_highlight,.vpic_wrap img{border-radius:8px}.threadlist_bright .media_disp{border:none!important;background:none!important}.threadlist_bright .threadlist_video{border-radius:8px}.threadlist_rep_num{height:auto!important;height:initial!important;background:none!important;background-color:var(--tieba-theme-background)!important}.threadlist_rep_num{border-radius:24px;color:var(--tieba-theme-fore)}.pagination-default .pagination-item{border:none!important;background-color:var(--light-background)!important;color:var(--light-fore)!important}.pagination-default .pagination-item{border-radius:8px}.pagination-default .pagination-current{border:none!important;background-color:var(--tieba-theme-color)!important;color:var(--default-background)!important}.pagination-default .pagination-item:not(.pagination-current):hover{border:none!important;background-color:var(--trans-light-background)!important}#tb_rich_poster_container{width:982px!important;background-color:var(--very-light-background)!important}#tb_rich_poster_container{border-radius:0 0 24px 24px;margin-left:-1px}.tb_rich_poster .poster_body .editor_textfield{border-color:var(--border-color)!important;background-color:var(--default-background)!important;color:var(--default-fore)!important}.tb_rich_poster .poster_body .editor_textfield{border-radius:8px}.tb_rich_poster .poster_body .editor_textfield:focus{border-color:var(--tieba-theme-color)!important}.old_style_wrapper{border-color:var(--border-color)!important;background-color:var(--elem-color)!important}.old_style_wrapper .edui-editor-body,.edui-container .edui-toolbar{background:none!important}.edui-editor-body .edui-body-container{border-color:var(--border-color)!important;background-color:var(--default-background)!important}.frs_content_footer_pagelet{background:none!important}.footer{display:none!important}.icon_author{background-image:none!important}.icon_author:after{content:"person";font-family:Material Icons;font-style:normal}.icon_replyer{background-image:none!important}.icon_replyer:after{content:"comment";font-family:Material Icons;font-style:normal}\n';
  const errorCSS = ".search-form{background-color:var(--default-background)}.search-form p{display:none}.page404{background-color:var(--default-background)}.main-title{color:var(--default-fore)}.main-title a{color:var(--tieba-theme-fore)}.app_download_box,#error_404_iframe{display:none}\n";
  const boldFontCSS = ".search_bright .search_btn,#nameValue,#onekey_sign .onekey_btn,#onekey_sign a.onekey_btn,.u-f-w .sign:hover,.u-f-w .unsign:hover,.always-forum-item .sign:hover,.always-forum-item .unsign:hover,.u-f-w .more-hover,.always-forum-title,.always-forum-item .addnewforumbtn:hover,.rcmd_forum_item .forum_name,.sub_nav_list a.cur,.new_list .title,.list-post-num,.new_list .post_author,.d_post_content a,.lzl_cnt .lzl_content_main a,.card_top_theme2 .card_title_fname,.sign_box_bright,.core_title_txt{font-weight:700}.core_title h1{font-weight:700!important}.lzl_cnt .at,.d_name .p_author_name,.islike_focus,.cancel_focus,.card_title_fname,.j_th_tit,.threadlist_rep_num{font-weight:700}\n";
  const extremeCSS = "";
  const unsetFontCSS = ".u_menu_item a,.new_list .title,.n_name,.d_badge_title,.card_userinfo_middle span{font-family:inherit}\n";
  const Main$2 = {
    id: "remixed-theme",
    name: "Tieba Remix 主题",
    author: "锯刃Blade",
    version: "0.1.1",
    brief: "更现代的主题样式",
    description: `包含新的样式、昼夜主题及其自动切换等功能`,
    scope: true,
    runAt: "immediately",
    entry: main$2
  };
  const themeSheets = [];
  function main$2() {
    themeSheets.push(injectCSSList(mainCSS));
    themeSheets.push(injectCSSList(postsCSS));
    themeSheets.push(injectCSSList(homeCSS));
    themeSheets.push(injectCSSList(errorCSS));
    themeSheets.push(injectCSSList(boldFontCSS));
    themeSheets.push(injectCSSList(extremeCSS));
    themeSheets.push(injectCSSList(unsetFontCSS));
    fadeInElems.push(".tbui_aside_float_bar .svg-container");
    fadeInElems.push(".d_badge_bright .d_badge_lv, .user_level .badge_index");
    fadeInElems.forEach((selector) => {
      injectCSSRule(selector, {
        opacity: "0"
      });
    });
    if (location.href.indexOf("kw=") !== -1) {
      themeSheets.push(injectCSSList(barCSS));
    }
    document.addEventListener("DOMContentLoaded", () => {
      DOMS(".post-tail-wrap .icon-jubao").forEach((elem) => {
        elem.removeAttribute("src");
        elem.after("举报");
      });
      remixedObservers.postsObserver.addEvent(() => {
        DOMS(".d_badge_lv").forEach((elem) => {
          if (elem.textContent === "") {
            let parent = elem;
            while (!parent.classList.contains("l_badge")) {
              parent = parent.parentElement;
            }
            parent.style.display = "none";
          }
        });
      });
      remixedObservers.commentsObserver.addEvent(() => {
        forEach(DOMS(".lzl_cnt"), (elem) => {
          if (elem.childNodes.length < 4)
            return;
          const colon = elem.childNodes[1];
          if (colon.nodeName === "#text")
            colon.remove();
        });
      });
    });
    unsafeWindow.addEventListener("load", () => {
      DOMS(".tbui_aside_float_bar li a").forEach((elem) => {
        elem.appendChild(createNewElement("div", {
          class: "material-icons svg-container"
        }));
      });
      fadeInLoad(".tbui_aside_float_bar .svg-container");
      remixedObservers.postsObserver.addEvent(() => {
        const lvlClassHead = "tieba-lvl-";
        const lvlGreen = lvlClassHead + "green";
        const lvlBlue = lvlClassHead + "blue";
        const lvlYellow = lvlClassHead + "yellow";
        const lvlOrange = lvlClassHead + "orange";
        DOMS(
          ".d_badge_bawu1 .d_badge_lv, .d_badge_bawu2 .d_badge_lv, .badge_index"
        ).forEach((elem) => {
          if (elem.className.indexOf(lvlClassHead) !== -1)
            return;
          const lvl = parseInt(elem.textContent);
          if (lvl >= 1 && lvl <= 3) {
            elem.classList.add(lvlGreen);
          } else if (lvl >= 4 && lvl <= 9) {
            elem.classList.add(lvlBlue);
          } else if (lvl >= 10 && lvl <= 15) {
            elem.classList.add(lvlYellow);
          } else if (lvl >= 16) {
            elem.classList.add(lvlOrange);
          }
        });
        fadeInLoad(".d_badge_bright .d_badge_lv, .user_level .badge_index");
      });
      themeSheets.forEach((sheet) => {
        document.head.appendChild(sheet);
      });
    });
  }
  const entry$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$2
  }, Symbol.toStringTag, { value: "Module" }));
  const Main$1 = {
    id: "shield",
    name: "贴吧屏蔽",
    author: "锯刃Blade",
    version: "1.0",
    brief: "眼不见为净",
    description: `用户自定义屏蔽规则，符合规则的贴子和楼层将不会显示在首页、看贴页面和进吧页面。支持正则匹配`,
    scope: true,
    runAt: "immediately",
    entry: main$1
  };
  const shieldList = GM_getValue("shieldList", []);
  function matchShield(obj, str) {
    if (obj.ignoreCase === void 0)
      obj.ignoreCase = true;
    if (obj.type === "string") {
      if (obj.ignoreCase) {
        obj.rule = obj.rule.toLowerCase();
        str = str.toLowerCase();
      }
      if (str.indexOf(obj.rule) !== -1) {
        return true;
      }
    }
    if (obj.type === "RegExp") {
      let regex;
      if (obj.ignoreCase) {
        regex = new RegExp(obj.rule, "i");
      } else {
        regex = new RegExp(obj.rule);
      }
      if (regex.test(str)) {
        return true;
      }
    }
    return false;
  }
  function shieldElementsBySelector(observer, parentSelector, subSelector) {
    observer.addEvent(() => {
      DOMS(parentSelector).forEach((elem) => {
        var _a;
        let isMatch = false;
        const content = (_a = elem.querySelector(subSelector)) == null ? void 0 : _a.textContent;
        if (content === null || content === void 0)
          return;
        for (const sh of shieldList) {
          if (matchShield(sh, content)) {
            isMatch = true;
            break;
          }
        }
        if (isMatch) {
          elem.style.display = "none";
        }
      });
    });
  }
  function main$1() {
    let menuContent;
    if (shieldList.length === 0) {
      menuContent = "当前没有屏蔽规则被装载";
      return;
    } else {
      menuContent = `当前共有 ${shieldList.length} 条屏蔽规则被装载`;
    }
    greasyMenu.push({
      id: "shield",
      title: "贴吧屏蔽: " + menuContent,
      type: "button",
      state: void 0
    });
    shieldElementsBySelector(remixedObservers.postsObserver, ".l_post_bright", ".d_post_content");
    shieldElementsBySelector(remixedObservers.newListObserver, ".new_list li", ".n_txt");
  }
  const entry$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main: Main$1
  }, Symbol.toStringTag, { value: "Module" }));
  const tagCSS = ':root{--myself-theme-background: rgba(25, 110, 153, .2);--myself-theme-fore: rgb(16, 73, 101);--cengzhu-theme-background: rgba(255, 89, 107, .2);--cengzhu-theme-fore: rgb(178, 62, 90)}@media (prefers-color-scheme: dark){:root{--myself-theme-background: rgba(34, 135, 204, .2);--myself-theme-fore: rgb(40, 160, 242);--cengzhu-theme-background: rgba(204, 71, 103, .2);--cengzhu-theme-fore: rgb(255, 89, 118)}}.tag-elem{display:inline-block}.tag-elem:after{padding:2px 6px;border-radius:24px;margin:0 4px;font-size:12px}.tieba-tags-me:after{background-color:#196e9933;background-color:var(--myself-theme-background);color:#104965;color:var(--myself-theme-fore);content:"\\6211"}.tieba-tags-lz:after{background-color:var(--tieba-theme-background);color:var(--tieba-theme-fore);content:"\\697c\\4e3b"}.tieba-tags-cz:after{background-color:#ff596b33;background-color:var(--cengzhu-theme-background);color:#b23e5a;color:var(--cengzhu-theme-fore);content:"\\5c42\\4e3b"}\n';
  const Main = {
    id: "tieba-tags",
    name: "楼中楼标签",
    author: "锯刃Blade",
    version: "2.0",
    brief: "优化楼中楼浏览体验",
    description: `为楼中楼的楼主、层主等用户添加特殊标签`,
    scope: "/p/",
    runAt: "loaded",
    entry: main
  };
  function main() {
    const TAGGED = "is-tagged";
    const TB_TAG = "tag-elem";
    const MY_TAG = "tieba-tags-me";
    const LZ_TAG = "tieba-tags-lz";
    const CZ_TAG = "tieba-tags-cz";
    const louzhu = PageData.thread.author;
    const myPortrait = PageData.user.portrait;
    const myUserName = PageData.user.user_name;
    let louzhuPortrait = getLouzhuPortrait(document);
    injectCSSList(tagCSS);
    (async () => {
      if (!louzhuPortrait) {
        const response = await fetch(location.href.split("?")[0], {
          mode: "cors",
          credentials: "include"
        });
        if (response.ok) {
          await response.text().then((value) => {
            const fpDOC = new DOMParser().parseFromString(value, "text/html");
            louzhuPortrait = getLouzhuPortrait(fpDOC);
          });
        }
      }
    })().then(() => {
      remixedObservers.commentsObserver.addEvent(createTagsAll);
    });
    function getLouzhuPortrait(doc2) {
      const j_tags = doc2.getElementsByClassName("j_louzhubiaoshi");
      if (j_tags.length > 0) {
        const targetFloor = findParentByClass(j_tags[0], "l_post_bright");
        if (targetFloor) {
          const dataAttr = targetFloor.getAttribute("data-field");
          if (dataAttr !== null) {
            const dataField = JSON.parse(dataAttr);
            return split(dataField.author.portrait, "?")[0];
          }
        }
      }
      return void 0;
    }
    function createTagsAll() {
      forEach(DOMS(".lzl_cnt .at"), (elem) => {
        if (elem.classList.contains(TAGGED))
          return;
        elem.classList.add(TAGGED);
        let isLouzhu = false;
        let isMe = false;
        const username = elem.getAttribute("username");
        if (userClassify(myUserName, myPortrait)) {
          isMe = true;
          addTag(elem, MY_TAG);
        }
        if (!isMe) {
          if (userClassify(louzhu, louzhuPortrait)) {
            isLouzhu = true;
            addTag(elem, LZ_TAG);
          }
        }
        if (!isMe && !isLouzhu) {
          const floor = findParentByClass(elem, "l_post_bright");
          if (floor !== null) {
            const cengzhuCard = floor.getElementsByClassName("p_author_name")[0];
            const cengzhu = cengzhuCard.textContent;
            if (cengzhu) {
              if (elem.textContent === cengzhu) {
                addTag(elem, CZ_TAG);
              }
            }
          }
        }
        function userClassify(un, portrait) {
          if (username === un) {
            return true;
          } else if (indexOf(["", " "], username) !== -1) {
            const targetPortrait = elem.getAttribute("portrait");
            if (targetPortrait !== null && portrait) {
              if (targetPortrait === portrait) {
                return true;
              }
            }
          } else if (username === null) {
            const dataAttr = elem.getAttribute("data-field");
            if (dataAttr !== null) {
              const dataField = JSON.parse(dataAttr);
              if (portrait) {
                if (dataField.id === portrait) {
                  return true;
                }
              } else {
                if (dataField.un === un) {
                  return true;
                }
              }
            }
          }
          return false;
        }
      });
      function addTag(elem, className) {
        elem.appendChild(createNewElement("div", {
          class: TB_TAG + " " + className
        }));
      }
    }
  }
  const entry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    Main
  }, Symbol.toStringTag, { value: "Module" }));
  exports.MainModules = MainModules;
  exports.afterModulesLoaded = afterModulesLoaded;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
