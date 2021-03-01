module.exports = {
  env: {
    jest: true,
  },
  // Standard JavaScript Style Guide
  // extends: ["standard", "plugin:prettier/recommended"],
  // Airbnb JavaScript Style Guide
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  // Google JavaScript Style Guide
  // extends: ["google", "plugin:prettier/recommended"],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        arrowParens: 'always',
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        tabWidth: 4,
        printWidth: 150,
      },
    ],
    'no-console': 'off',
    // properties: 'always',
  },
};
