import eslint from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import regexpPlugin from "eslint-plugin-regexp";
import tseslint from "@typescript-eslint/eslint-plugin";
import astroParser from "astro-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      "pnpm-lock.yaml",
      "**/*.md", // Ignore markdown files for now
    ],
  },

  // Base config for all files
  eslint.configs.recommended,

  // JavaScript and TypeScript files
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      perfectionist,
      regexp: regexpPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true, varsIgnorePattern: "Props" },
      ],
      "@typescript-eslint/no-var-requires": "warn",
      ...perfectionist.configs["recommended-natural"].rules,
      ...regexpPlugin.configs["flat/recommended"].rules,
    },
  },

  // Astro files
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      astro: astroPlugin,
      "jsx-a11y": jsxA11y,
      perfectionist,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      ...astroPlugin.configs["jsx-a11y-recommended"].rules,
      "astro/jsx-a11y/no-redundant-roles": [
        "error",
        {
          ol: ["list"],
          ul: ["list"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true, varsIgnorePattern: "Props" },
      ],
      ...perfectionist.configs["recommended-natural"].rules,
    },
  },
];
