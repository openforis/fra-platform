var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const jsBundleName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';
const cssBundleName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

module.exports = {
    entry: './webapp/index.jsx',
    output: {
        filename: jsBundleName,
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({filename: cssBundleName}),
        new HtmlWebpackPlugin({template: './web-resources/index.html'})
    ]
};
