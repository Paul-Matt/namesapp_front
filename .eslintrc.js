module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: [
            'error',
            4,
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        'linebreak-style': 0,
        eqeqeq: 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always',
        ],
        'arrow-spacing': [
            'error', { before: true, after: true },
        ],
        'no-console': 0,
        'no-case-declarations': 0,
        'no-else-return': 0,
        'react/prop-types': 0,
        'react/jsx-boolean-value': 0,
    },
}
