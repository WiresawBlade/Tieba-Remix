import { greasyMenu } from "@/greasy-init";
import { ObsType, remixedObservers } from "@/lib/observers";

export const Main: ModuleType = {
    id: "shield",
    name: "贴吧屏蔽",
    author: "锯刃Blade",
    version: "1.0",
    description: `用户自定义屏蔽规则，符合规则的贴子和楼层将不会显示在首页、看贴页面和进吧页面。支持正则匹配`,
    scope: true,
    runAt: "immediately",
    entry: main
};

const shieldList = GM_getValue("shieldList", <ShieldObject[]>[]);

/**
 * 匹配字符串是否和屏蔽对象规则符合
 * @param obj 屏蔽对象
 * @param str 需要匹配的字符串
 * @returns 是否匹配成功
 */
function matchShield(obj: ShieldObject, str: string): boolean {
    // 可选参数
    if (obj.ignoreCase === undefined) obj.ignoreCase = true;

    // 字符串
    if (obj.type === "string") {
        // 忽略大小写，先转为小写
        if (obj.ignoreCase) {
            obj.rule = obj.rule.toLowerCase();
            str = str.toLowerCase();
        }

        if (str.indexOf(obj.rule) !== -1) {
            return true;
        }
    }

    // 正则
    if (obj.type === "RegExp") {
        let regex: RegExp;

        // 忽略大小写
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

/**
 * 通过选择器屏蔽元素
 * @param observer 监控
 * @param parentSelector 父元素选择器
 * @param subSelector 子元素选择器
 */
function shieldElementsBySelector(observer: ObsType, parentSelector: string, subSelector: string) {
    observer.addEvent(() => {
        $(parentSelector).toArray().forEach(elem => {
            let isMatch = false;
            const content = elem.querySelector(subSelector)?.textContent;
            if (content === null || content === undefined) return;

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

function main() {
    let menuContent: string;

    // 菜单文本
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
        state: undefined
    });

    // 看贴楼层
    shieldElementsBySelector(remixedObservers.postsObserver, ".l_post_bright", ".d_post_content");
    // 首页动态
    shieldElementsBySelector(remixedObservers.newListObserver, ".new_list li", ".n_txt");
}
