module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["404",'Verify',"News","Header","Home"],
      },
    ],
  },
};
