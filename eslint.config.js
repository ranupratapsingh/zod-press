import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';


export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['public/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {},
    },

    rules: {
      'comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],

      complexity: ['warn'],
      'eol-last': ['error', 'always'],

      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],

      'linebreak-style': ['error', 'unix'],

      'max-len': [
        2,
        {
          code: 120,
          tabWidth: 2,
        },
      ],

      'no-trailing-spaces': 'warn',

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      quotes: ['error', 'single'],

      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['/'],
            exceptions: ['-', '+'],
          },

          block: {
            markers: ['!'],
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],

      semi: ['error', 'always'],

      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
]);
