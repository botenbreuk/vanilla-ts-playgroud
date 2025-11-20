import pluginPrettier from 'eslint-config-prettier';
import pluginCheckFile from 'eslint-plugin-check-file';
import pluginImport from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  tseslint.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginPrettier,
  {
    plugins: {
      'check-file': pluginCheckFile
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      'import/no-unresolved': ['off'],
      '@typescript-eslint/no-explicit-any': 'off', // Allows any typing, mostly used for Record<string, any>
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true // Allow destructuring while not consuming all variables
        }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false }
      ],
      '@typescript-eslint/naming-convention': namingConventions(),
      'check-file/folder-naming-convention': [
        'warn',
        { 'src/app/**/*.tsx': 'PASCAL_CASE' }
      ]
    }
  }
);

function namingConventions() {
  return [
    'error',
    {
      selector: 'import',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      modifiers: ['destructured'],
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'typeProperty',
      modifiers: ['readonly'],
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: 'parameter',
      modifiers: ['unused'],
      format: null
    },
    {
      selector: ['classProperty'],
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    },
    {
      selector: ['property', 'method'],
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      filter: {
        regex: '[-\\.]',
        match: false
      }
    },
    {
      selector: 'objectLiteralProperty',
      format: null
    },
    {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid'
    }
  ];
}
