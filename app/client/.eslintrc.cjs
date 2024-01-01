/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      parserOptions: {
        project: ["./tsconfig.json"]
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },

    // Node
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "operator-linebreak": ["error", "after"],
    "indent": ["error", "tab"],
    "quotes": ["error", "double"],
    "no-tabs": ["error", { "allowIndentationTabs": true }],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "no-throw-literal": "off",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "only-multiline",
      "exports": "never",
      "functions": "never"
    }],

    "react/react-in-jsx-scope": "off",

    "@typescript-eslint/indent": ["error", "tab"],
    "@typescript-eslint/restrict-template-expressions": ["error", { "allowAny": true }],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "@typescript-eslint/no-extraneous-class": ["error", {"allowStaticOnly": true }],
    "@typescript-eslint/comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "only-multiline",
      "exports": "never",
      "functions": "never"
    }],
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/promise-function-async": [
      "error",
      {
        "allowAny": true,
        "allowedPromiseNames": [],
        "checkArrowFunctions": false,
        "checkFunctionDeclarations": false,
        "checkFunctionExpressions": false,
        "checkMethodDeclarations": false
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "comma",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/no-confusing-void-expression": ["error", {
      "ignoreArrowShorthand": true
    }
    ]
  },
};
