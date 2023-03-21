module.exports = {
    plugins: ["prettier", "@typescript-eslint"],
    extends: ["react-app", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    rules: {
        "object-curly-spacing": ["warn", "always"],
        "no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "none",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "none",
            },
        ],
        "@typescript-eslint/no-explicit-any": [
            "error",
            {
                ignoreRestArgs: true,
            },
        ],
        "max-len": [
            "warn",
            {
                code: 120,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
            },
        ],
        "no-plusplus": [
            "error",
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        "react/jsx-key": "error",
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx", "src/tests/**/*"],
            },
        ],
        "import/no-anonymous-default-export": [
            "error",
            {
                allowArray: false,
                allowArrowFunction: true,
                allowAnonymousClass: true,
                allowAnonymousFunction: true,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowLiteral: false,
                allowObject: false,
            },
        ],
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/jsx-boolean-value": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/destructuring-assignment": "off",
        "@typescript-eslint/comma-dangle": "off",
    },
};
