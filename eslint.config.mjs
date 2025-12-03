import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  // Base JS recommended
  js.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // React recommended
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      // alias `@/*` for Vite
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/internal-regex': '^@/',
    },
    rules: {
      // Disallow excessive empty lines
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import ordering (your exact config restored)
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'object', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'react-dom', group: 'external', position: 'before' },
            { pattern: '@mui/**', group: 'external', position: 'after' },

            { pattern: '@/domains/**', group: 'internal', position: 'after' },
            { pattern: '@/components/**', group: 'internal', position: 'after' },
            { pattern: '@/providers/**', group: 'internal', position: 'after' },
            { pattern: '@/services/**', group: 'internal', position: 'after' },
            { pattern: '@/theme/**', group: 'internal', position: 'after' },
            { pattern: '@/registry/**', group: 'internal', position: 'after' },
            { pattern: '@/platform/**', group: 'internal', position: 'after' },
            { pattern: '@/assets/**', group: 'internal', position: 'after' },
            { pattern: '@/hooks/**', group: 'internal', position: 'after' },
            { pattern: '@/contexts/**', group: 'internal', position: 'after' },
            { pattern: '@/router/**', group: 'internal', position: 'after' },
            { pattern: '@/translations/**', group: 'internal', position: 'after' },
            { pattern: '@/constants/**', group: 'internal', position: 'after' },
            { pattern: '@/types/**', group: 'internal', position: 'after' },
            { pattern: '@/utils/**', group: 'internal', position: 'after' },
            { pattern: '@/app/**', group: 'internal', position: 'after' },
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
    ignores: ['dist', 'node_modules'],
  },

  // Relax rules for generated API clients (same as before)
  {
    files: ['src/providers/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
