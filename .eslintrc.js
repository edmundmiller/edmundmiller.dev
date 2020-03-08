module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:gridsome/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'gridsome'],
  // add your custom rules here
  rules: {}
};
