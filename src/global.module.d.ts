import { SettingContent, SubSettingKey } from "./components/settings.vue";
import { PageType } from "./lib/api.remixed";

/** 用户模块 */
interface UserModuleExtended extends UserModule {
    settings?: SubSettingKey["content"]
}
