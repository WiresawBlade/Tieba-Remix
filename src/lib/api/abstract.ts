import { DOMS } from "@/lib/elemental";

export interface TiebaAbstract {
    el: HTMLElement;
}

export class TiebaComponent<T extends keyof HTMLElementTagNameMap> {
    private selector: string;
    private type: T;
    private parent?: Element;

    constructor(selector: string, type: T, parent?: Element) {
        this.selector = selector;
        this.type = type;
        this.parent = parent;
    }

    public get() {
        if (!this.parent)
            return DOMS(this.selector, this.type)[0];
        else
            return DOMS(this.selector, this.type, this.parent)[0];
    }
}
