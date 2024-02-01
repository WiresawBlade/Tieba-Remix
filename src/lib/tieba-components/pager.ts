import { TiebaComponent } from "../api/abstract";
import { DOMS } from "../elemental";

export type PagerType = "prev" | "next" | "first" | "last" | "page";

export class Pager extends TiebaComponent<"li"> {
    public allPagerButtons(): Array<HTMLAnchorElement | HTMLSpanElement> {
        return DOMS("a, .tP", this.get());
    }

    public getPagerButton(pagerType: PagerType, index = 0) {
        const allButtons = this.allPagerButtons();

        switch (pagerType) {
            case "prev": {
                return this.findMatchingButton(allButtons, "上一页");
            }

            case "next": {
                return this.findMatchingButton(allButtons, "下一页", true);
            }

            case "first": {
                return this.findMatchingButton(allButtons, "首页");
            }

            case "last": {
                return this.findMatchingButton(allButtons, "尾页", true);
            }

            case "page": {
                let count = 0;
                for (const el of allButtons) {
                    if (/^\d+$/.test(el.innerText)) {
                        if (count === index && el instanceof HTMLAnchorElement) {
                            return el;
                        }
                        count++;
                    }
                }
                return null; // 没有找到对应索引的按钮
            }

            default:
                return null; // 未知的 pagerType
        }
    }

    private findMatchingButton(buttons: HTMLElement[], text: string, reverse = false) {
        const iterator = reverse ? Array.from(buttons).reverse() : buttons;
        for (const el of iterator) {
            if (el.innerText === text) {
                return el as HTMLAnchorElement;
            }
        }
        return null;
    }
}

export const pager = new Pager(".l_pager", "li");
