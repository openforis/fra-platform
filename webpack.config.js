var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const prodBuild = process.env.NODE_ENV === 'production'

const jsBundleName = prodBuild ? 'bundle-[hash].js' : 'bundle.js';
const cssBundleName = prodBuild ? 'styles-[hash].css' : 'styles.css';

const alwaysInUseplugins = [
    new ExtractTextPlugin({filename: cssBundleName}),
    new HtmlWebpackPlugin({template: './web-resources/index.html'})
];

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    output: {comments: false},
    sourceMap: true
});

const plugins = prodBuild ? [...alwaysInUseplugins, uglifyPlugin] : alwaysInUseplugins;

const webPackConfig = {
    entry: './webapp/main.js',
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
    plugins: plugins
};

webPackConfig.devtool = 'source-map';

module.exports = webPackConfig;
