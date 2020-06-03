const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: './source/index.js',
        about: './source/about.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.?css$/,
                use: [
                    `style-loader`,
                    `css-loader`,
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'indexResult.html',
            chunks:['index'],
        }),
        new HtmlWebpackPlugin({
            template: './about.html',
            filename: 'aboutResult.html',
            chunks:['about'],
        }),
    ]
};