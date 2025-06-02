import js from '@eslint/js';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      semi: ['error', 'always'],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }]
    }
  },
  prettier
];
