module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        'no-plusplus': 'off',
        'linebreak-style': ['error', 'windows'],
    },
};
