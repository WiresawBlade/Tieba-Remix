import { forOwn, includes } from "lodash-es";
import { toast } from "./render";

/**
 * 接口调用实现的共公有模板
 * @param api 需要调用的接口，理论上所有的 `Promise<Response>` 都是被接受的
 * @returns 该请求返回的 json
 */
export async function requestInstance(api: Promise<Response>): Promise<any> {
    try {
        const response = await api;
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        toast({
            message: errorMessage(error as Error),
            type: "error",
            duration: 6000
        });
    }
}

export function errorMessage(error: Error) {
    const errBody = error.stack ? error.stack : error.message;
    return `${GM_info.script.name} ${GM_info.script.version}\n${errBody}`;
}

/**
 * 让 GET 请求可以像 POST 请求一样通过对象传递参数
 * @param input 请求输入
 * @param body 请求体
 * @returns 对应的 `fetch`
 */
export function fetchWithBody(input: string, body?: LiteralObject) {
    const reqBody = body ? requestBody(body) : undefined;

    if (reqBody) {
        return fetch(`${input}?${reqBody}`);
    } else {
        return fetch(input);
    }
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

export function requestBody(body: LiteralObject) {
    let reqBody = "";
    forOwn(body, (value, key) => {
        if (!value) value = "";
        reqBody += `${key}=${value}&`;
    });
    return reqBody.slice(0, -1);
}
