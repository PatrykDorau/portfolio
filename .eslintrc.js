module.exports = {
  root: true,
  env: {
    browser: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "eslint-config-prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: { parser: "@typescript-eslint/parser" },
  settings: {
    vue: {
      // Tells eslint-plugin-react to automatically detect the version of vue to use.
      version: "detect",
    },
    // Tells eslint how to resolve imports
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
    "vue/no-setup-props-destructure": "off",
    "import/named": 0,
  },
};