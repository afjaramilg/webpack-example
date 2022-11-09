/*
removes repeated styles and applies other css optimizations

makes a small difference in our case but its good to have it
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/index.js',
        learnwithviktor: './src/js/learnwithviktor.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash].bundle.js',
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            })

        ],
        splitChunks: {
            chunks: 'all'
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10 kb
                    },
                },
                generator: {
                    filename: './images/[name].[contenthash][ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            chunks: ['main'],
            template: 'src/template.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'learnwithviktor.html',
            chunks: ['learnwithviktor'],
            template: 'src/template2.html',
        })
    ]
}