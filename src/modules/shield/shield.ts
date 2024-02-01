import { UserKey } from "@/lib/user-values";

/**
 * 屏蔽规则对象
 */
export interface ShieldObject {
    /** 匹配规则，它可能是直接的屏蔽词，也可能是正则表达式 */
    rule: string
    /** 描述当前规则的类型 */
    type: "string" | "regex"
    /** 作用域，屏蔽规则作用于贴子或用户 */
    scope: "posts" | "users"
    /** 是否启用该规则 */
    switch: boolean
    /** 是否忽略大小写，默认忽略 */
    ignoreCase?: boolean
    /** 是否匹配 innerHTML？默认匹配 textContent */
    matchHTML?: boolean
}

export const shieldList = new UserKey<ShieldObject[]>("shieldList", []);
