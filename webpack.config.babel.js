import path from 'path'
import webpack from 'webpack'
import uuidv4 from 'uuid/v4'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const lastCommit = process.env.SOURCE_VERSION || 'N/A'
const platformVersion = lastCommit + '_' + new Date().toISOString()

const config = {
  mode: process.env.NODE_ENV || 'development',
  path: path.resolve(__dirname, 'dist')
}

const appConfig = {
  mode: config.mode,
  devtool: 'source-map',
  entry: ['./webapp/main.js'],
  output: {
    filename: 'js/bundle-[hash].js',
    path: config.path,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader',
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style/styles-[hash].css' }),
    new HtmlWebpackPlugin({ template: './web-resources/index.html' }),
    new webpack.DefinePlugin({
      __PLATFORM_VERSION__: `"${platformVersion}"`,
      __BUST__: `"${uuidv4()}"`,
      __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API)
    })
  ]
}

// Refactor this
const loginConfig = {
  mode: config.mode,
  devtool: 'source-map',
  entry: ['./webapp/login/login.js'],
  output: {
    filename: 'js/login-[hash].js',
    path: config.path,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader',
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style/login-[hash].css' }),
    new HtmlWebpackPlugin({ template: './web-resources/login.html', filename: 'login.html' }),
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
