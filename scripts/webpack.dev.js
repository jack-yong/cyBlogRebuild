const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const { ROOT_PATH, SERVER_HOST, SERVER_PORT } = require('./constant/constant');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
    target: 'web', // 解决热更新失效
    mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
    devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
    devServer: {
        host: SERVER_HOST, // 服务器地址
        port: SERVER_PORT, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        historyApiFallback: true, // 解决history路由404问题
        client: {
            logging: 'warn', // warn以上的信息，才会打印
            overlay: true // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
        },
        static: {
            directory: path.join(ROOT_PATH, './public') //托管静态资源public文件夹
        }
    },
    plugins: [
        new ReactRefreshWebpackPlugin() // 添加热更新插件
    ]
});
