module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [2, 4, { "SwitchCase": 1 }],
        "linebreak-style": [2, "windows"],
        "semi": [2, "always"],
        "@typescript-eslint/triple-slash-reference": 0,               /* ref */
        "no-var": 1,
        "strict": 2,
        "spaced-comment": 0,
        "no-undef": 0,
        "radix": 0,                                                   /* praseInt radix */
        "@typescript-eslint/no-unused-expressions": 0,                /* 禁止无效表达式 */
        "no-param-reassign": 0,
        "@typescript-eslint/no-non-null-asserted-optional-chain": 0,  /* 变量不能为 null */
        "@typescript-eslint/ban-ts-comment": 0,                       /* ts ignore 等 */
        "comma-dangle": [2, "never"],                                 /* 最后一个逗号 */
        "@typescript-eslint/no-unused-vars": 0,                       /* 从未使用过的变量，不交给 ESLint 处理 */
        "eqeqeq": 2,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0
    }
};
