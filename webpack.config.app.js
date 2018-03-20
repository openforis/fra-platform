const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const uuidv4 = require('uuid/v4')

const lastCommit = process.env.SOURCE_VERSION || 'N/A'
const platformVersion = lastCommit + '_' + new Date().toISOString()

const plugins = [
  new ExtractTextPlugin({filename: 'styles-[hash].css'}),
  new HtmlWebpackPlugin({template: './web-resources/index.html'}),
  new webpack.DefinePlugin({
    __PLATFORM_VERSION__: `"${platformVersion}"`,
    __BUST__: `"${uuidv4()}"`,
    __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API),
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]

const config = {
  entry: ['babel-polyfill', './webapp/app/main.js'],
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      /*
        Minifying (production build) of partial lenses breaks without the below rule
        with current webpack version. According to developer of partial.lenses, webpack 3.5.6
        should have fixed this. Quick test with the new webpack version broke the svgo module though,
        so webpack has not yet been upgraded and we need this rule.
       */
      {
        test: /partial\.lenses\.es\.js$/,
        loader: 'babel-loader',
        query: {plugins: ['transform-es2015-modules-commonjs']}
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
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins
}

module.exports = config
