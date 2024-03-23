import { customRef } from "vue";

/**
 * 创建延迟更新（防抖）的 `ref`
 * @param value 初始化数据
 * @param delay 延迟时间
 * @returns 具有防抖效果的 `ref`
 */
export function delayedRef<T>(value: T, delay = 500) {
    let timeout: number | undefined;
    return customRef((track, trigger) => ({
        get() {
            track();
            return value;
        },
        set(newValue) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                trigger();
                value = newValue;
            }, delay);
        },
    }));
}
