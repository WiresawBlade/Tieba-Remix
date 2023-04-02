import { indexOf } from "lodash-es";

export const disabledModules: string[] = GM_getValue("disabledModules", []);

/**
 * 获取时间敏感的值
 * @param key 需要获取的值对应的键
 * @param def 未获取到值时返回的默认值
 * @returns 获取到的对应值 | 预先设置的默认值 | undefined
 */
export function getUserValueNS<T>(key: string, def: T): T | undefined {
    try {
        const valueNS = GM_getValue<UserValueNS<T>>(key, {
            invalidTime: 0,
            value: def
        });

        const timeStamp = Date.now();
        // 当前时间与失效时间匹配
        if (valueNS.invalidTime >= timeStamp) {
            return valueNS.value;
        } else {
            return undefined;
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
export function setUserValueNS<T>(key: string, value: T, invalidTime: number): void;
/**
 * 设置一个时间敏感的值进行存储
 * @param key 该值对应的键
 * @param value 需要设置的值
 */
export function setUserValueNS<T>(key: string, value: UserValueNS<T>): void;

export function setUserValueNS<T>(key: string, value: any, invalidTime?: number): void {
    try {
        if (invalidTime) {
            // 时间戳 + 值
            GM_setValue<UserValueNS<T>>(key, {
                invalidTime: 0,
                value: value
            });
        } else {
            // 直接传入 UserValueNS
            GM_setValue<UserValueNS<T>>(key, value);
        }
    } catch (error) {
        console.warn("setUserValueNS", error);
    }
}

export function emptyUserModule(): UserModule {
    return {
        id: "",
        name: "",
        author: "",
        version: "",
        brief: "",
        description: "",
        scope: "",
        runAt: "immediately",
        entry: function (): void {
            throw new Error("Function not implemented.");
        }
    };
}

export function isModuleDisabled(module: UserModule) {
    return (indexOf(disabledModules, module.id) !== -1)
        ? true
        : false;
}
