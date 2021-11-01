const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { title } = require('process');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
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
            }
        ]
    }
};