import { resolve } from "path";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
import postcssPresetEnv from "postcss-preset-env";
import deepmerge from "deepmerge";

import meta from "./meta.json";

/**
 * 通过 meta对象生成 meta字符串
 * @param { {} } obj meta 对象
 * @returns { string }
 */
function toMetaString(obj) {
    let metaString = "// ==UserScript==\n";
    const maxLength = Object.keys(obj).reduce((prev, curr) => Math.max(prev, curr.length), 0);

    function spaces(length) {
        let str = "";
        for (let j = 0; j < length; j++) {
            str += " ";
        }
        return str;
    }

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
                metaString += "// @" + key + spaces(maxLength - key.length + 2) + obj[key][i] + "\n";
            }
        } else {
            metaString += "// @" + key + spaces(maxLength - key.length + 2) + obj[key] + "\n";
        }
    }
    metaString += "// ==/UserScript==\n" + `// @WiresawBlade\n`;
    return metaString;
}

const commonConfig =  defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            name: "TiebaRemix",
            formats: ["iife"],
            fileName: () => `tieba-remix.user.js`
        },
        reportCompressedSize: false
    },
    plugins: [
        banner(() => {
            return toMetaString(meta);
        })
    ],
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv()
            ]
        }
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./src")
            },
            {
                find: "@lib",
                replacement: resolve(__dirname, "./src/lib")
            },
            {
                find: "@modules",
                replacement: resolve(__dirname, "./src/modules")
            }
        ]
    },
    server: {
        hmr: {
            protocol: "ws",
            host: "localhost"
        },
        host: "0.0.0.0"
    }
});

const devConfig = defineConfig({
    build: {
        minify: "terser",
        terserOptions: {
            sourceMap: true
        }
    }
});

const prodConfig = defineConfig({
    build: {
        minify: "terser",
        terserOptions: {
            sourceMap: false,
            toplevel: true,
            compress: {
                pure_funcs: [
                    "console.log"
                ]
            }
        }
    }
});

const viteConfig = {
    "serve": () => { return deepmerge(commonConfig, devConfig); },
    "build": () => { return deepmerge(commonConfig, prodConfig); }
};

export default defineConfig(({ command }) => {
    return viteConfig[command]();
});
