export interface ForumInfo {
    name: string;
    // followersDisplay: string;
    // postsDisplay: string;
}

export interface ForumComponents {
    nameAnchor: HTMLAnchorElement;
    iconContainer: HTMLAnchorElement;
    followButton: HTMLAnchorElement;
    signButton: HTMLAnchorElement;
}

export interface TiebaForum {
    info: ForumInfo;
    components: ForumComponents;
}
