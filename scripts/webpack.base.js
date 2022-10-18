const path = require('path');
const WebpackBar = require('webpackbar');
const { ROOT_PATH } = require('./constant/constant');
const { isDevelopment, isProduction } = require('./constant/env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { separator } = require('./constant/constant');
const { getEntryTemplate } = require('./utils/helper');
const { myAntd } = require('./constant/antd-theme');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// 将packages拆分成为数组 ['admin','home']
const packages = process.env.packages.split(separator);

// 调用getEntryTemplate 获得对应的entry和htmlPlugins
const { entry, htmlPlugins } = getEntryTemplate(packages);

module.exports = {
    // 动态替换entry
    entry,
    module: {
        rules: [
            {
                test: /\.css$/, //匹配所有的 css文件
                enforce: 'pre', // 优先执行
                include: [path.resolve(ROOT_PATH, './src')],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/, //匹配所有的 less 文件
                enforce: 'pre',
                include: [path.resolve(ROOT_PATH, './src')],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                // 模块化类名，防止重复
                                localIdentName: 'cblog-[local]--[hash:base64:10]'
                            },
                            sourceMap: isDevelopment
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.less$/, //匹配antd中的less文件
                exclude: [path.resolve(ROOT_PATH, './src')],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                // antd 自定义主题
                                modifyVars: myAntd,
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /\.mod.scss$/],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.mod.scss$/,
                include: [path.resolve(ROOT_PATH, './src')],
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                // 模块化类名，防止重复
                                localIdentName: 'cblog-[local]--[hash:base64:10]'
                            },
                            sourceMap: isDevelopment
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                include: [path.resolve(ROOT_PATH, './src')],
                enforce: 'pre',
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp)$/,
                type: 'asset',
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:6][ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:6][ext]' // 文件输出目录和命名
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: 'asset', // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:6][ext]' // 文件输出目录和命名
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        alias: {
            '@': path.resolve(ROOT_PATH, './src')
        },
        modules: [path.resolve(ROOT_PATH, './node_modules')] // 查找第三方模块只在本项目的node_modules中查找
    },
    plugins: [
        // 打包显示进度条
        new WebpackBar(),
        new AntdDayjsWebpackPlugin(),
        // webpack打包不会有类型检查，强制ts类型检查
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(ROOT_PATH, './tsconfig.json')
            }
        }),
        // 同时动态生成对应的htmlPlugins
        ...htmlPlugins
    ],

    // 开启webpack持久化存储缓存
    cache: {
        type: 'filesystem', // 使用文件缓存
        buildDependencies: {
            // 当配置文件发生变化时，缓存失效
            config: [__filename]
        }
    }
};
