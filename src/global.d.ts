declare module "*.css";
declare module "*.css?inline";
declare module "*.svg";
declare module "*.ico";

const unsafeWindow: Window;

interface ModuleType {
    [prop: string]: unknown;

    id: string;
    /** 需要显示给用户的模块名称 */
    name: string;
    author: string;
    version: string;
    description: string;

    switch?: boolean;
    scope: true | string | string[];
    runAt: "immediately" | "afterHead" | "DOMLoaded" | "loaded";
    entry: () => void;
}
