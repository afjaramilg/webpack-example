/*
add PurgeCSS to get rid of unused css, particularly with frameworks like 
bootstrap.

point out you need to tell purgecss about your own css modules, cuz the

css module config will scramble their names, so itll think they're not
being used

point out it is also possible to customize bootstrap to include what you need.
I havent tested it but maybe a combination of both approaches could yield 
results
https://getbootstrap.com/docs/3.4/customize/
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const glob = require('glob')
const { PurgeCSSPlugin } =  require('purgecss-webpack-plugin')

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
        new HtmlWebpackPlugin({
            filename: 'main.html',
            chunks: ['main'],
            template: 'src/template.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'learnwithviktor.html',
            chunks: ['learnwithviktor'],
            template: 'src/template2.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src')}/**/*`,
                { nodir: true }
            )

        })

    ]
}