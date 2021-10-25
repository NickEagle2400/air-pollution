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
            title: 'Pollution App',
            inject: 'body',
            template: 'index.html',
            meta:{
                viewport: 'width=device-width, initial-scale=1',
                title: 'pollution app',
                description: 'description pollution app',
                keywords: 'Pollution, Air Quality App',
                robots: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
                'twitter:card': 'summary',
                'twitter:title': 'summary',
                'twitter:description': 'summary',
                'twitter:site': 'summary',
                'twitter:creator': 'summary',
                'twitter:image': 'summary',
                'og:title': 'summary',
                'og:description': 'summary',
                'og:author': 'Nicolas Ricardi',
                'og:site_name': 'summary',
                'og:locale': 'en_US',
                'og:type': 'website',
                'og:url': 'summary',
                'og:image': 'summary'
            },
            favicon: '',
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