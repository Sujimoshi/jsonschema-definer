module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    "jest",
    '@typescript-eslint'
  ],
  rules: {
    "no-unused-vars": 'off',
    "@typescript-eslint/no-unused-vars": 'error',
    "no-useless-constructor": "off"
  }
}
