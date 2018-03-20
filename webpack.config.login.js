const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const uuidv4 = require('uuid/v4')

const plugins = [
  new ExtractTextPlugin({filename: 'login-[hash].css'}),
  new HtmlWebpackPlugin({template: './web-resources/login.html', filename: 'login.html'}),
  new webpack.DefinePlugin({
    __BUST__: `"${uuidv4()}"`,
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]

const config = {
  entry: ['babel-polyfill', './webapp/login/login.js'],
  output: {
    filename: 'login-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
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
      }
    ]
  },
  plugins
}

module.exports = config
