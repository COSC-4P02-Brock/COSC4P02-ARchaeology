/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "plugin:playwright/playwright-test",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  settings: {
    // Using vitest instead of jest but the API
    // is the same so the jest linting settings
    // will work fine but we need to set the jest
    // version manually since it cannot be derived
    // from the jest package (which is not installed).
    jest: {
      version: 28,
    },
  },
};
