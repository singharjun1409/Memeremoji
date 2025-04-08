import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  {
    rules: {
        'semi': ['error', 'always'],
        'no-var': ['error',],
        'prefer-const': ['error', { 'destructuring': 'any', 'ignoreReadBeforeAssign': false }],
        'curly': ['error'],
        'eqeqeq': ['error'],
        'no-multi-spaces': ['error'],
        'no-lone-blocks': ['error'],
        'no-self-compare': ['error'],
        'no-unused-expressions': ['error'],
        'no-useless-call': ['error'],
        'no-use-before-define': ['error'],
        'camelcase': ['error', { properties: 'never' }],
        'func-call-spacing': ['error'],
        'no-lonely-if': ['error'],
        'array-bracket-spacing': ['error'],
        'no-console': ['off']
    }
},
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  pluginReact.configs.flat.recommended,
]);