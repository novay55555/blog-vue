module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-default-prop': "never",
    "vue/html-closing-bracket-newline": ["error", { multiline: 'never' }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    hljs: true,
    VUE_RUNTIME: true
  }
}