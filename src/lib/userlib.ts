import { indexOf } from "lodash-es";
import { disabledModules } from "./user-config";

/**
 * 获取时间敏感的值
 * @param key 需要获取的值对应的键
 * @param def 未获取到值时返回的默认值
 * @returns 获取到的对应值 | 预先设置的默认值 | undefined
 */
export function getUserValueTS<T>(key: string, def: T): T {
    try {
        const valueTS = GM_getValue<UserValueTS<T>>(key, {
            value: def,
            invalidTime: 0
        });

        const timeStamp = Date.now();
        // 当前时间与失效时间匹配
        if (valueTS.invalidTime >= timeStamp) {
            return valueTS.value;
        } else {
            return def;
        }
    } catch (error) {
        return def;
    }
}

/**
 * 设置一个时间敏感的值进行存储
 * @param key 该值对应的键
 * @param value 需要设置的值
 * @param invalidTime 该值的失效时间
 */
export function setUserValueTS<T>(key: string, value: T, invalidTime: number): void;
/**
 * 设置一个时间敏感的值进行存储
 * @param key 该值对应的键
 * @param value 需要设置的值
 */
export function setUserValueTS<T>(key: string, value: UserValueTS<T>): void;

export function setUserValueTS<T>(key: string, value: any, invalidTime?: number): void {
    try {
        if (invalidTime) {
            // 时间戳 + 值
            GM_setValue<UserValueTS<T>>(key, {
                value: value,
                invalidTime: invalidTime
            });
        } else {
            // 直接传入 UserValueNS
            GM_setValue<UserValueTS<T>>(key, value);
        }
    } catch (error) {
        console.warn("setUserValueTS", error);
    }
}

export function isModuleDisabled(module: UserModule) {
    return (indexOf(disabledModules, module.id) !== -1)
        ? true
        : false;
}
