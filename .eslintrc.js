module.exports = {
  root: true,
  // extends: '@react-native-community',
  parserOptions: {
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
};