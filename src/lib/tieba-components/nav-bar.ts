import { TiebaComponent } from "../api/abstract";
import { DOMS } from "../elemental";

export class NavBar extends TiebaComponent<"div"> {
    public leftContainer() {
        return DOMS(".left-container", "div", this.get())[0];
    }

    public middleContainer() {
        return DOMS(".middle-container", "div", this.get())[0];
    }

    public rightContainer() {
        return DOMS(".right-container", "div", this.get())[0];
    }
}

export const navBar = new NavBar("#nav-bar", "div");
