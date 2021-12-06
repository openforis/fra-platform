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
      '@core': path.resolve(__dirname, 'core/'),
      '@client': path.resolve(__dirname, 'client/'),
      '@common': path.resolve(__dirname, 'common/'),
      '@server': path.resolve(__dirname, 'server/'),
      '@webapp': path.resolve(__dirname, 'webapp/'),
      '@test': path.resolve(__dirname, 'test/'),
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
