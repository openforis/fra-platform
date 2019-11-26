import path from 'path'
import webpack from 'webpack'
import uuidv4 from 'uuid/v4'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const lastCommit = process.env.SOURCE_VERSION || 'N/A'
const platformVersion = lastCommit + '_' + new Date().toISOString()

const config = {
  mode: process.env.NODE_ENV || 'development',
  path: path.resolve(__dirname, 'dist')
}

const appConfig = {
  mode: config.mode,
  entry: ['babel-polyfill', './webapp/app/main.js'],
  output: {
    filename: 'bundle-[hash].js',
    path: config.path,
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
  plugins: [
    new ExtractTextPlugin({filename: 'styles-[hash].css'}),
    new HtmlWebpackPlugin({template: './web-resources/index.html'}),
    new webpack.DefinePlugin({
      __PLATFORM_VERSION__: `"${platformVersion}"`,
      __BUST__: `"${uuidv4()}"`,
      __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API)
    })
  ]
}

// Refactor this
const loginConfig = {
  devtool: 'source-map',
  mode: config.mode,
  entry: ['babel-polyfill', './webapp/login/login.js'],
  output: {
    filename: 'login-[hash].js',
    path: config.path
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
  plugins:[
    new ExtractTextPlugin({filename: 'login-[hash].css'}),
    new HtmlWebpackPlugin({template: './web-resources/login.html', filename: 'login.html'}),
    new webpack.DefinePlugin({
      __BUST__: `"${uuidv4()}"`,
    })
  ]
}

webpack.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: true,
        output: { comments: false },
      },
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

const webPackConfig = [
  appConfig,
  loginConfig
]

export default webPackConfig
