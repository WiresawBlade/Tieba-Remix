const TerserWebpackPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: /^ @|^ ==/
                    },
                    mangle: true
                }
            })
        ]
    }
});