// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    "arrowParens": "avoid",
    "printWidth": 80,
    "useTabs": false,
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "singleAttributePerLine": false,
    "vueIndentScriptAndStyle": false
};

module.exports = config;