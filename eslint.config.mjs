import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import sortReactDependencyArraysPlugin from 'eslint-plugin-sort-react-dependency-arrays'
import globals from 'globals'

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'src/tools/migrations/steps/steps/template.ts',
      'src/tools/stressTestK6/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(reactPlugin.configs.flat.recommended),
  ...fixupConfigRules(jsxA11yPlugin.flatConfigs.recommended),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.jest,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: fixupPluginRules(reactPlugin),
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      import: fixupPluginRules(importPlugin),
      'simple-import-sort': fixupPluginRules(simpleImportSortPlugin),
      'sort-destructure-keys': fixupPluginRules(sortDestructureKeysPlugin),
      'sort-react-dependency-arrays': fixupPluginRules(sortReactDependencyArraysPlugin),
      'unused-imports': fixupPluginRules(unusedImportsPlugin),
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {},
      },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-require-imports': 'error',
      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      'class-methods-use-this': 'off',
      'func-names': 'warn',
      'global-require': 'error',
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
      'import/no-dynamic-require': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['src/test/**/*.ts', 'vite.config.ts', 'vitest.*.config.ts', '**/?(*.)+(test).ts'] },
      ],
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'max-classes-per-file': ['error', 1],
      'no-alert': 'warn',
      'no-await-in-loop': 'error',
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc'] }],
      'no-promise-executor-return': 'error',
      'no-restricted-exports': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'for..in loops iterate over the entire prototype chain; use Object.{keys,values,entries} instead.',
        },
        {
          selector: 'ForOfStatement',
          message:
            'for..of loops are not allowed by this project style; consider Array.forEach or a classic for loop instead.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of goto; they make code harder to read and maintain.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode and makes code hard to reason about.',
        },
      ],
      'no-shadow': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'object-shorthand': ['warn', 'always', { avoidQuotes: true }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react/display-name': 'off',
      'react/forbid-prop-types': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          ignoreCase: true,
          callbacksLast: false,
          shorthandFirst: false,
          shorthandLast: false,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/no-danger': 'warn',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      // simple-import-sort
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'], // Side effect imports.
            // Node builtins + packages.
            [
              '^.+\\.s?css$',
              '^react',
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
              '^@?\\w',
            ],
            ['^meta(\\/\\w)*', '^utils(\\/\\w)*', '^tools(\\/\\w)*'],
            [
              '^client\\/store(\\/\\w)*',
              '^client\\/hooks(\\/\\w)*',
              '^client\\components(\\/\\w)*',
              '^client(\\/\\w)*',
            ],
            ['^lib(\\/\\w)*'],
            ['^docs(\\/\\w)*'],
            ['^server(\\/\\w)*'],
            ['^test(\\/\\w)*'],
            // Relative imports.
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$', // Parent imports. Put `..` last.
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$', // Same-folder and `.` last.
            ],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
      'sort-react-dependency-arrays/sort': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Per-folder override (selectors: allow implicit return type)
  {
    files: ['src/client/store/**/selectors/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  {
    files: ['src/client/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // Prettier integration
  ...fixupConfigRules(eslintPluginPrettierRecommended),
  {
    rules: {
      'prettier/prettier': 'warn',
    },
  },
])
