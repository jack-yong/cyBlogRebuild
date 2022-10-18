module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    /* 
        root:true 表示声明这份文件是根配置文件 没有继承任何(规范)文件
        可以理解为 root和extends不可共存
        extends 关键字表示继承下列规范 而非根文件(因为还继承了别的文件规则)
    */
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        // 添加`prettier`拓展 用于和`prettier`冲突时覆盖`eslint`规则
        'prettier'
    ],
    overrides: [],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        },
        ecmaVersion: 8,
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
    settings: {
        react: {
            version: 'detect'
        }
    }
};
