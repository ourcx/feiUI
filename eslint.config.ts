import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 全局忽略文件
  {
    ignores: ["**/dist/", "**/node_modules/", "**/*.min.js", "**/*.config.*"],
  },

  // JavaScript 基础配置
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
  },

  // TypeScript 配置
  ...tseslint.configs.recommended,

  // Vue 配置
  ...pluginVue.configs["flat/essential"],

  // Vue 文件的 TypeScript 解析器
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // 自定义规则 - 针对组件库的宽松配置
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      // TypeScript 规则 - 暂时放宽，后续逐步修复
      "@typescript-eslint/no-explicit-any": "warn", // 从 error 改为 warn
      "@typescript-eslint/no-unused-vars": "warn", // 从 error 改为 warn

      // Vue 规则
      "vue/multi-word-component-names": "warn", // 允许单字组件名
      "vue/no-unused-components": "warn",
      "vue/no-unused-vars": "warn",
      "vue/require-toggle-inside-transition": "warn",

      // 其他规则
      "no-empty": "warn",
    },
  },

  // 针对配置文件的特殊规则
  {
    files: ["**/*.config.*"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // 针对测试文件的特殊规则
  {
    files: ["**/*.test.*", "**/*.spec.*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
