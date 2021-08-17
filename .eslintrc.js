module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    'prettier/prettier': 'error'
  },
  plugins: ['prettier']
};
