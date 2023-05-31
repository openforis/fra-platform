const path = require('path')
const nodeExternals = require('webpack-node-externals')

require('regenerator-runtime/runtime')

const webpackTestConfig = {
  mode: 'development',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      i18n: path.resolve(__dirname, 'src/i18n/'),
      client: path.resolve(__dirname, 'src/client/'),
      meta: path.resolve(__dirname, 'src/meta/'),
      server: path.resolve(__dirname, 'src/server/'),
      test: path.resolve(__dirname, 'src/test/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        loader: 'null-loader',
      },
    ],
  },
}

module.exports = webpackTestConfig
