module.exports = {
  globals: {
    __DEV__: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'prettier',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['prettier', 'simple-import-sort', 'react-hooks', 'import'],
  rules: {
    'no-underscore-dangle': 0,
    'prettier/prettier': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/forbid-prop-types': 0,
    'react/prop-types': 'off',
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // allow using devDependencies (vs dependencies) in test files
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['src/test/**/*.ts'] }],
    'import/order': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-restricted-exports': 'off',
    'react/function-component-definition': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // simple-import-sort rules

    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          [
            '^\\u0000', // Side effect imports.
          ],
          [
            '^.+\\.s?css$', // Style imports.
            '^react', // `react` related packages come first.
          ],
          [
            // Node.js builtins.
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            '^@?\\w',
          ],
          ['^meta(\\/\\w)*'],
          ['^client\\/store(\\/\\w)*', '^client\\/hooks(\\/\\w)*', '^client\\components(\\/\\w)*', '^client(\\/\\w)*'],
          ['^server(\\/\\w)*'],
          ['^test(\\/\\w)*'],
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$', // Parent imports. Put `..` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$', // Other relative imports. Put same-folder imports and `.` last.
          ],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: 'webpack.config.babel.js',
      },
      // typescript: {},
    },
    // 'import/resolver': {
    //   node: {},
    //   webpack: {
    //     config: 'webpack.config.babel.js',
    //   },
    // },
  },
}
