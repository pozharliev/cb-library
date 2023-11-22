module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["standard-with-typescript"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],

            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],

            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    rules: {
        "operator-linebreak": ["error", "after"],
        indent: [
            "error",
            "tab",
            {
                ignoredNodes: [
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
                ],
            },
        ],
        quotes: ["error", "double"],
        "no-tabs": ["error", { allowIndentationTabs: true }],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "no-throw-literal": "off",
        "no-trailing-spaces": ["error", { skipBlankLines: true }],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "only-multiline",
                exports: "never",
                functions: "never",
            },
        ],

        "react/react-in-jsx-scope": "off",

        "@typescript-eslint/indent": [
            "error",
            "tab",
            {
                ignoredNodes: [
                    "FunctionExpression > .params[decorators.length > 0]",
                    "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
                    "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
                ],
            },
        ],
        "@typescript-eslint/restrict-template-expressions": [
            "error",
            { allowAny: true },
        ],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/space-before-function-paren": ["error", "never"],
        "@typescript-eslint/no-extraneous-class": [
            "error",
            { allowStaticOnly: true },
        ],
        "@typescript-eslint/comma-dangle": [
            "error",
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "only-multiline",
                exports: "never",
                functions: "never",
            },
        ],
        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/promise-function-async": [
            "error",
            {
                allowAny: true,
                allowedPromiseNames: [],
                checkArrowFunctions: false,
                checkFunctionDeclarations: false,
                checkFunctionExpressions: false,
                checkMethodDeclarations: false,
            },
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "semi",
                    requireLast: true,
                },
                singleline: {
                    delimiter: "comma",
                    requireLast: false,
                },
            },
        ],
        "@typescript-eslint/no-invalid-void-type": ["off"],
        "@typescript-eslint/no-unsafe-argument": ["warn"],
    },
    ignorePatterns: ["..eslintrc.js", "tsconfig.json"],
};