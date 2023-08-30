type ScriptGetInfo = {
    downloadMode: string,
    isFirstPartyIsolation?: boolean,
    isIncognito: boolean,
    sandboxMode: SandboxMode,
    scriptHandler: string,
    scriptMetaStr: string | null,
    scriptUpdateURL: string | null,
    scriptWillUpdate: boolean,
    version?: string,
    script: {
        antifeatures: { [antifeature: string]: { [locale: string]: string } },
        author: string | null,
        blockers: string[],
        connects: string[],
        copyright: string | null,
        deleted?: number | undefined,
        description_i18n: { [locale: string]: string } | null,
        description: string,
        downloadURL: string | null,
        excludes: string[],
        fileURL: string | null,
        grant: string[],
        header: string | null,
        homepage: string | null,
        icon: string | null,
        icon64: string | null,
        includes: string[],
        lastModified: number,
        matches: string[],
        name_i18n: { [locale: string]: string } | null,
        name: string,
        namespace: string | null,
        position: number,
        resources: Resource[],
        supportURL: string | null,
        system?: boolean | undefined,
        'run-at': string | null,
        unwrap: boolean | null,
        updateURL: string | null,
        version: string,
        webRequest: WebRequestRule[] | null,
        options: {
            check_for_updates: boolean,
            comment: string | null,
            compatopts_for_requires: boolean,
            compat_wrappedjsobject: boolean,
            compat_metadata: boolean,
            compat_foreach: boolean,
            compat_powerful_this: boolean | null,
            sandbox: string | null,
            noframes: boolean | null,
            unwrap: boolean | null,
            run_at: string | null,
            tab_types: string | null,
            override: {
                use_includes: string[],
                orig_includes: string[],
                merge_includes: boolean,
                use_matches: string[],
                orig_matches: string[],
                merge_matches: boolean,
                use_excludes: string[],
                orig_excludes: string[],
                merge_excludes: boolean,
                use_connects: string[],
                orig_connects: string[],
                merge_connects: boolean,
                use_blockers: string[],
                orig_run_at: string | null,
                orig_noframes: boolean | null
            }
        }
    }
};

type SandboxMode = 'js' | 'raw' | 'dom';

type Resource = {
    name: string,
    url: string,
    error?: string,
    content?: string,
    meta?: string
};

type WebRequestRule = {
    /**  for which URLs the rule should be triggered, string value is shortening for `{ include: [selector] }` */
    selector: {
        /** URLs, patterns, and regexpes for rule triggering */
        include?: string | string[],
        /** URLs and patterns for rule trigering */
        match?: string | string[],
        /** URLs, patterns, and regexpes for not triggering the rule */
        exclude?: string | string[]
    } | string,

    /** what to do with the request, string value `"cancel"` is shortening for `{ cancel: true }` */
    action: string | {
        /** whether to cancel the request */
        cancel?: boolean,
        /** redirect to some URL which must be included in any `@match` or `@include` header. When a string, redirects to the static URL */
        redirect?: {
            url?: string,
            /** a regexp to extract some parts of the URL, e.g. `"([^:]+)://match.me/(.*)"` */
            from?: string,
            /** pattern for substitution, e.g. `"$1://redirected.to/$2"` */
            to?: string
        } | string
    }
};

interface UserScriptResponse<T = any> {
    /** the final URL after all redirects from where the data was loaded */
    finalUrl: string,
    /** the request's `readyState` */
    readyState: number,
    /** the request's status */
    status: number,
    /** the request's status text */
    statusText: string,
    /** the request's response headers */
    responseHeaders: string,
    /** the response data as object if `details.responseType` was set */
    response: T,
    /** the response data as XML document */
    responseXML: Document,
    /** the response data as plain string */
    responseText: string
}

const GM_info: ScriptGetInfo = {};

const unsafeWindow: Window;

function GM_setValue<T>(key: string, value: T): void;
function GM_getValue<T>(key: string): T | undefined;
function GM_getValue<T>(key: string, defaultValue?: T): T;
function GM_listValues(): string[];
function GM_deleteValue(key: string): void;
function GM_addElement(tag_name: string, attributes: object): void;
function GM_addElement(parent_node: Element, tag_name: string, attributes: object): void;
function GM_openInTab(url: string, options: {
    active?: boolean; insert?: boolean; setParent?: boolean;
    incognito?: boolean; loadInBackground?: boolean;
}): { close: () => unknown; onclose: (listener: EventListenerOrEventListenerObject) => unknown; closed: boolean; };
function GM_openInTab(url: string, loadInBackground: boolean): {
    close: () => unknown; onclose: (listener: EventListenerOrEventListenerObject) => unknown; closed: boolean;
};
function GM_registerMenuCommand(
    name: string, callback: (event: MouseEvent | KeyboardEvent) => unknown, accessKey?: string
): number;
/**
 * The GM_xmlhttpRequest allows a userscripts to send an HTTP request and handle the response. The function takes a single parameter.
 * @param details an object containing the details of the request to be sent and the callback functions to be called when the response is received.
 * @returns an object with a function to be called to cancel this request
 */
function GM_xmlhttpRequest<T = any>(details: {
    /** the destination URL */
    url: string,
    /** one of `GET`, `HEAD`, `POST` */
    method?: "GET" | "HEAD" | "POST",
    /** e.g. `user-agent`, `referer`, ... (some special headers are not supported by Safari and Android browsers) */
    headers?: object,
    /** some string to send via a POST request */
    data?: string,
    /** one of `follow`, `error` or `manual`; controls what to happen when a redirect is detected (build 6180+, enforces `fetch` mode) */
    redirect?: "follow" | "error" | "manual",
    /** a cookie to be patched into the sent cookie set */
    cookie?: string,
    /** send the data string in binary mode */
    binary?: boolean,
    /** don't cache the resource */
    nocache?: boolean,
    /** revalidate maybe cached content */
    revalidate?: boolean,
    /** a timeout in ms */
    timeout?: number,
    /** a property which will be added to the response object */
    context?: object,
    /** one of `arraybuffer`, `blob`, `json` or `stream` */
    responseType?: "arraybuffer" | "blob" | "json" | "stream",
    /** a MIME type for the request */
    overrideMimeType?: string,
    /** don't send cookies with the request (enforces `fetch` mode) */
    anonymous?: boolean,
    /** use a `fetch` instead of a `XMLHttpRequest` request (at Chrome this causes `details.timeout` and `xhr.onprogress` to not work and makes `xhr.onreadystatechange` receive only `readyState` `DONE` (==4) events) */
    fetch?: boolean,
    /** a user name for authentication */
    user?: string,
    /** a password */
    password?: string,
    /** callback to be executed if the request was aborted */
    onabort?(): void,
    /** callback to be executed if the request ended up with an error */
    onerror?(): void,
    /** callback to be executed on load start, provides access to the stream object if responseType is set to `stream` */
    onloadstart?(): void,
    /** callback to be executed if the request made some progress */
    onprogress?(): void,
    /** callback to be executed if the request's `readyState` changed */
    onreadystatechange?(): void,
    /** callback to be executed if the request failed due to a timeout */
    ontimeout?(): void,
    /** callback to be executed if the request was loaded */
    onload?(response: UserScriptResponse<T>): void
}): {
    /** function to be called to cancel this request */
    abort(): void
};
/**
 * > Note: this API is experimental and might change at any time. It might also disappear or change during manifest v3 migration.
 * 
 * `GM_webRequest` (re-)registers rules for web request manipulations and the listener of triggered rules. If you need to just register rules it's better to use `@webRequest` header. Note, webRequest proceeds only requests with types `sub_frame`, `script`, `xhr` and `websocket`.
 * @param rules array of rules
 * @param listener is called when the rule is triggered, cannot impact on the rule action
 * @returns an object with a function to be called to cancel this request
 */
function GM_webRequest(
    rules: WebRequestRule[],
    listener?: (info: "cancel" | "redirect", message: string, details: {
        /** the triggered rule */
        rule: WebRequestRule,
        /** URL of the request */
        url: string,
        /** where the request was redirected */
        redirect_url: string,
        /** error description */
        description: string
    }) => void
): {
    /** function to be called to cancel this request */
    abort(): void
};
