const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        filename: 'js/[name].[contenthash:12].js',
        publicPath: '/static/'
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxSize: Infinity,
            minSize: 2000,
            cacheGroups: {
                lodash: {
                    test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
                    name: 'lodash-es',
                },
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'node_modules',
                    chunks: 'initial',
                },
                async: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    name(module, chunks) {
                        return chunks.map(chunk => chunk.name).join('-');
                    },
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64]'
                            }
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css',
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }),
        })
    ]
}
