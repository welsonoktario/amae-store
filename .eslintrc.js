module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
};
