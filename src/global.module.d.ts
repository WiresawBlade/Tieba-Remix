import { SettingContent, SubSettingKey } from "./components/settings.vue";

/** 用户模块 */
interface UserModule {
    [prop: string]: any

    id: string
    /** 需要显示给用户的模块名称 */
    name: string
    author: string
    version: string
    brief: string
    description: string

    switch?: boolean
    scope: true | string | string[]
    runAt: "immediately" | "afterHead" | "DOMLoaded" | "loaded"

    settings?: SubSettingKey["content"]
    entry: (() => void)
}
