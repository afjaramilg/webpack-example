const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                use: [ 'styles-loader', 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'styles-loader',
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
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
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
        })

    ]
}