const webpack = require("webpack");
const meta = require("./meta.json");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "tieba-remix.user.js"
    },
    resolve: {
        extensions: [".ts"]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: toMetaString(meta),
            raw: true,
            entryOnly: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: ["ts-loader"]
            },
            {
                test: /\.css$/i,
                use: [
                    "to-string-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "postcss-preset-env",
                                    "autoprefixer",
                                    "cssnano"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico)$/i,
                type: "asset/inline"
            }
        ]
    }
};

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