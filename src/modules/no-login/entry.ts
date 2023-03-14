export const Main: UserModule = {
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
    if (PageData.user.is_login) return;

    PageData.user.is_login = 1;
    const nameValue = document.createElement("div");
    nameValue.id = "nameValue";
    
    $.ready.then(() => {
        document.body.appendChild(nameValue);
    });
}
