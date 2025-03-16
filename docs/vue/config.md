## eslint.config.js

```js [eslint.config.js]
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [],
      },
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  skipFormatting,
];
```
