// 一些公共常量
const path = require('path');
const dotenv = require('dotenv');

const ROOT_PATH = path.resolve(__dirname, '../../');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 4000;

const MAIN_FILE = 'index.tsx';
const chalk = require('chalk');

const { config: loadConfig } = dotenv;

const NODE_ENV = process.env.NODE_ENV || 'development';
const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, 'env', `.${NODE_ENV}.env`);

// 打印时颜色
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const success = chalk.green;

const maps = {
    success,
    warning,
    error
};

// 因为环境变量的注入是通过字符串方式进行注入的
// 所以当 打包多个文件时 我们通过*进行连接 比如 home和editor 注入的环境变量为home*editor
// 注入多个包环境变量时的分隔符
const separator = '*';

const log = (message, types) => {
    console.log(maps[types](message));
};

//webpack 读取env 配置
const envConfig = loadConfig({
    path: ENV_CONFIG_PATH
}).parsed;

if (!envConfig) {
    console.log('配置文件不存在');
    // 退出程序
    process.exit(1);
}

module.exports = {
    MAIN_FILE,
    log,
    separator,
    SERVER_HOST,
    SERVER_PORT,
    ROOT_PATH,
    ENV_CONFIG_PATH
};
