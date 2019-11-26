const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'test',
  plugins: [new MiniCssExtractPlugin({filename: 'test-style.css'})],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      // {
      //   test: /\.less$/,
      //   use: MiniCssExtractPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'less-loader']
      //   })
      // }
    ]
  }
}
