module.exports = {
  "root": true,
  env: {
    node: true,
    es2021: true,
    es6: true,
    jest: true,
    browser: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    requireConfigFile: false
  },
  globals: {
        'browser': 'readonly',
        'driver': 'readonly',
        '$': 'readonly',
        '$$': 'readonly',
        'page': 'readonly',
        'reporter': 'readonly'
  },
  rules: {
    // 'no-console': 'warn',
    'no-restricted-syntax': 'warn',
    'guard-for-in': 'warn',
    'semi': [
      'error',
      'always'
    ],
    'max-len': [
      'warn',
      {
        'code': 120,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ],
    'indent': [
      'error',
      4,
      {
        'SwitchCase': 1
      }
    ],
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'prefer-destructuring': 'off',
    'prefer-template': 'error',
    'func-style': [
      'error',
      'declaration',
      {
        'allowArrowFunctions': true
      }
    ],
    'no-loop-func': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-unused-vars': [
      'warn',
      {
        'vars': 'local',
        'argsIgnorePattern': 'page'
      }
    ],
    'no-empty-function': 'error',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'default-param-last': 'warn',
    'no-param-reassign': 'warn',
    'no-use-before-define': [
      'error',
      {
        'functions': true,
        'classes': true,
        'variables': true
      }
    ],
    'no-underscore-dangle': 'off',
    'new-cap': [
      'warn', { 'capIsNew':  false }
    ],
    'camelcase': 'warn',
    'default-case': 'warn',
    'no-case-declarations': 'warn',
    'no-unused-expressions': 'off',
    'no-return-assign': 'warn',
    'no-cond-assign': 'warn',
    'no-fallthrough': 'warn',
    'no-eval': 'warn',
    'global-require': 'warn',
    'no-new': 'warn',
    'import/no-import-module-exports': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unpublished-require': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'consistent-return': 'error',
    'no-multi-spaces': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 0
      }
    ],
    'import': 'off',
    'no-await-in-loop': 'off',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
      'patterns': ['src/*']
      }
    ],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'eol-last': [
      'error', 'always'
    ],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'prefer-const': [
      'error',
      {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
      }
    ]
  },
  ignorePatterns: [
    'dist/*',
    'node_modules/*',
    'tests/helpers/common.helper.ts',
    'allure-report/*',
    'allure-result/*',
    'config/*',
    'test-data/*',
    'tests/helpers/*',
    'tests/infrastructure/mongodb/models'
  ],
};
