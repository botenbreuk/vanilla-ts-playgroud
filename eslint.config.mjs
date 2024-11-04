import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      indent: 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-unused-expressions': ['error'],
      '@typescript-eslint/indent': ['off'],
      '@typescript-eslint/no-angle-bracket-type-assertion': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-use-before-define': ['off'],
      '@typescript-eslint/explicit-member-accessibility': ['off'],
      '@typescript-eslint/no-empty-interface': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off']
    }
  }
];
