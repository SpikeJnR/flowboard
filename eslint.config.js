import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
      rules: {
          // Форматирование
          'indent': ['error', 2, { SwitchCase: 1 }],
          'linebreak-style': ['error', 'unix'],
          'quotes': ['error', 'single'],
          'semi': ['error', 'always'],
          'space-infix-ops': 'error',
          'space-before-blocks': 'error',
          'keyword-spacing': ['error', { before: true }],
          'object-curly-spacing': ['error', 'always'],
          'array-bracket-spacing': ['error', 'never'],
          'comma-spacing': ['error', { before: false, after: true }],
          'arrow-spacing': 'error',
          'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
          'padded-blocks': ['error', 'never'],
          'lines-between-class-members': ['error', 'always'],
          'padding-line-between-statements': [
              'error',
              { blankLine: 'always', prev: '*', next: 'return' },
              { blankLine: 'always', prev: 'block-like', next: '*' },
          ],

          // React специфика
          'react/jsx-indent': ['error', 2],
          'react/jsx-indent-props': ['error', 2],
      },
  },
)
