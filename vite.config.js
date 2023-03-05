import { resolve } from "path";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";

import meta from "./meta.json";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            name: "userscript",
            formats: ["iife"],
            fileName: () => `tieba-remix.user.js`
        }
    },
    plugins: [
        banner(() => {
            return toMetaString(meta);
        })
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve("./src")
            }
        ]
    },
    server: {
        hmr: {
            protocol: "ws",
            host: "localhost"
        }
    }
});

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

    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
                metaString += "// @" + key + spaces(maxLength - key.length + 2) + obj[key][i] + "\n";
            }
        } else {
            metaString += "// @" + key + spaces(maxLength - key.length + 2) + obj[key] + "\n";
        }
    }
    metaString += "// ==/UserScript==\n" + "// @WiresawBlade\n";
    return metaString;
}
