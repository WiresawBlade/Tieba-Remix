export const Main: ModuleType = {
    id: "nologin-tieba",
    name: "免登录浏览",
    author: "锯刃Blade",
    version: "1.0",
    description: `始终伪装为已登录状态，让免登录浏览和已登录基本一致`,
    scope: "/p/",
    runAt: "DOMLoaded",
    entry: main
};

function main() {
    PageData.user.is_login = 1;
}
