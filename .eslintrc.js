module.exports = {
  parser: '@typescript-eslint/parser',
  // Note, each plugin overrides the plugins before it, as needed.
  extends: [
    'plugin:react/recommended', // Enforces good practices for React.
    'prettier/@typescript-eslint', // Turns off eslint rules which conflict with Prettier.
    'plugin:@typescript-eslint/recommended', // Enforces good practices for TypeScript, as recommended by the eslint people.
    // Remove this if you don't want your formatting to show as an eslint error.
    // I don't like that but you might.
    'plugin:prettier/recommended', // Turns your formatting rules into actual eslint errors.
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 0,
    'react/prop-types': 0,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none', // 'none' or 'semi' or 'comma'
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi', // 'semi' or 'comma'
          requireLast: false,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
