const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectBodyPlugin = require('inject-body-webpack-plugin').default;
const path = require('path');
const { title } = require('process');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    devtool: 'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'index.html',
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.(gif|png|jpg|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    }
};