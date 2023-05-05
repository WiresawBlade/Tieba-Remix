import { getUserValueTS } from "./userlib";

/** 用户禁用的所有模块的 id */
export const disabledModules: string[] = GM_getValue("disabledModules", []);
/** 性能配置 */
export const perfProfile: "dataSaver" | "performance" = GM_getValue("perfProfile", "performance");
/** 未读推送 */
export const unreadFeeds: TiebaPost[] = getUserValueTS("unreadFeeds", <TiebaPost[]>[]);
