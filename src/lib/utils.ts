import { find, forEach, forOwn, includes } from "lodash-es";
import { toast } from "./render";

export function cookies(): LiteralObject;
export function cookies(key: string): string | undefined;

export function cookies(key?: string) {
    const cookieArray = document.cookie.split(';');

    if (key) {
        return find(cookieArray, (cookie) => cookie.trim().startsWith(key + "="));
    } else {
        const result: LiteralObject = {};

        forEach(cookieArray, (cookie) => {
            const [key, value] = cookie.split('=');
            result[key.trim()] = value.trim();
        });

        return result;
    }
}

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
