/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  'vue/multi-word-component-names': [
    'error',
    {
      /// 忽略单英文单词提示
      ignores: [],
    },
  ],
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
