import { resolve } from "path";
import { defineConfig } from "vite";
import deepmerge from "deepmerge";
import postcssPresetEnv from "postcss-preset-env";

import vue from "@vitejs/plugin-vue";
import banner from "vite-plugin-banner";

import meta from "./meta.json";

/**
 * 通过 meta对象生成 meta字符串
 * @param { { [prop: string]: any; } } obj meta 对象
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

const commonConfig = defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            name: "TiebaRemix",
            formats: ["iife"],
            fileName: () => `tieba-remix.user.js`
        },
        outDir: "build",
        reportCompressedSize: false,
        cssMinify: true,
        cssCodeSplit: true
    },
    plugins: [
        vue(),
        banner({
            outDir: "build",
            content: () => toMetaString(meta)
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
            }
        ]
    },
    define: {
        "process.env": {}
    },
    server: {
        proxy: {
            "/p": {
                target: "https://tieba.baidu.com",
                changeOrigin: true
            },
            "/f": {
                target: "https://tieba.baidu.com",
                changeOrigin: true
            },
            "/suggestion": {
                target: "https://tieba.baidu.com",
                changeOrigin: true
            }
        }
    }
});

const devConfig = defineConfig({
    build: {
        minify: false
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
                    "console.log",
                    "deb"
                ]
            }
        }
    }
});

// 适用于 greasy fork 的发布版本
const gfConfig = defineConfig({
    build: {
        terserOptions: {}
    }
});

const viteConfig = {
    build: {
        "dev": () => { return deepmerge(commonConfig, devConfig); },
        "prod": () => { return deepmerge(commonConfig, prodConfig); },
        "gf": () => { return deepmerge(commonConfig, deepmerge(prodConfig, gfConfig)); }
    },
    serve: {
        "dev": () => { return deepmerge(commonConfig, devConfig); }
    }
};

export default defineConfig(({ command, mode }) => {
    console.log(command, mode);
    return viteConfig[command][mode]();
});
