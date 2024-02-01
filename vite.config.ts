import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import deepmerge from "deepmerge";
import { resolve } from "path";
import postcssPresetEnv from "postcss-preset-env";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { UserConfig, defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

const commonConfig = defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            name: "TiebaRemix",
            formats: ["iife"],
            fileName: () => `tieba-remix.user.js`,
        },
        outDir: "build",
        reportCompressedSize: false,
        cssMinify: true,
        cssCodeSplit: true,
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv(),
            ],
        },
    },
    plugins: [
        vue(),
        vueJSX({}),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus({}),
        monkey({
            entry: "src/main.ts",
            userscript: {
                name: "Tieba Remix",
                namespace: "https://github.com/WiresawBlade/Tieba-Remix",
                version: "0.4-beta",
                description: "提升贴吧网页端的体验：新的主题样式及功能增强",
                author: "锯条",
                license: "MIT",
                updateURL: "https://gitee.com/WiresawBlade/Tieba-Remix/raw/beta/build/tieba-remix.user.js",
                downloadURL: "https://gitee.com/WiresawBlade/Tieba-Remix/raw/beta/build/tieba-remix.user.js",
                icon: "https://gitee.com/WiresawBlade/Tieba-Remix/raw/master/assets/images/main/icon16.png",
                icon64: "https://gitee.com/WiresawBlade/Tieba-Remix/raw/master/assets/images/main/icon64.png",
                match: [
                    "*://tieba.baidu.com/*",
                    "*://jump.bdimg.com/*",
                    "*://jump2.bdimg.com/*",
                ],
                grant: [
                    "unsafeWindow",
                    "GM_addElement",
                    "GM_registerMenuCommand",
                    "GM_getValue",
                    "GM_setValue",
                    "GM_deleteValue",
                    "GM_listValues",
                    "GM_openInTab",
                ],
                "run-at": "document-start",
            },
            // build: {
            //     externalGlobals: {
            //         vue: cdn.jsdelivr("Vue", "build/vue.global.prod.js"),
            //     },
            // },
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./src"),
            },
        ],
    },
    server: {
        proxy: {
            "/p": {
                target: "https://tieba.baidu.com",
                changeOrigin: true,
            },
            "/f": {
                target: "https://tieba.baidu.com",
                changeOrigin: true,
            },
            "/suggestion": {
                target: "https://tieba.baidu.com",
                changeOrigin: true,
            },
        },
    },
});

const devConfig = defineConfig({
    build: {
        minify: false,
    },
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
                    "deb",
                ],
            },
        },
    },
});

const viteConfig = {
    build: {
        "development": () => deepmerge<UserConfig>(commonConfig, devConfig),
        "production": () => deepmerge<UserConfig>(commonConfig, prodConfig),
    },
    serve: {
        "development": () => deepmerge<UserConfig>(commonConfig, devConfig),
    },
};

export default defineConfig(({ command, mode }) => {
    console.log(command, mode);
    return viteConfig[command][mode]();
});
