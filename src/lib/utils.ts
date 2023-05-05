import { forOwn, includes } from "lodash-es";

export const MainTitle = "Tieba Remix";
export const GithubRepo = "https://github.com/WiresawBlade/Tieba-Remix";
export const GiteeRepo = "https://gitee.com/WiresawBlade/Tieba-Remix/";
export const BaiduPassport = "https://passport.baidu.com/";

/**
 * 让 GET 请求可以像 POST 请求一样通过对象传递参数
 * @param input 请求输入
 * @param body 请求体
 * @returns 对应的 `fetch`
 */
export function fetchWithBody(input: string, body?: LiteralObject) {
    let reqUrl = input;
    if (body) {
        reqUrl += "?";
        forOwn(body, (value, key) => {
            if (!value) value = "";
            reqUrl += `${key}=${value}&`;
        });
    }
    return fetch(reqUrl.slice(0, -1));
}

export function carryDefault<T>(val: any, def: T): T {
    if (val) {
        return val;
    } else {
        return def;
    }
}

export function checkDuplicate(arr1: Array<any>, arr2: []) {
    return arr1.some(item => includes(arr2, item));
}

export function spawnOffsetTS(
    year = 0, month = 0, day = 0,
    hours = 0, minutes = 0, seconds = 0) {
    const now = new Date();
    const offset = new Date(now.getFullYear() + year, now.getMonth() + month, now.getDate() + day,
        now.getHours() + hours, now.getMinutes() + minutes, now.getSeconds() + seconds, 0);
    return offset.getTime();
}
