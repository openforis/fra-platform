var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const prodBuild = process.env.NODE_ENV === 'production'

const jsBundleName = 'bundle-[hash].js'
const cssBundleName = 'styles-[hash].css'

const childProcess = require('child_process')
const platformVersion = childProcess.execSync('git log -1 --date=short --pretty=format:"%h/%cd"')

const alwaysInUseplugins = [
  new ExtractTextPlugin({filename: cssBundleName}),
  new HtmlWebpackPlugin({template: './web-resources/index.html'}),
  new webpack.DefinePlugin({__PLATFORM_VERSION__: `"${platformVersion}"`})
]

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {warnings: false},
  output: {comments: false},
  sourceMap: true
})

const plugins = prodBuild ? [...alwaysInUseplugins, uglifyPlugin] : alwaysInUseplugins

const webPackConfig = {
  entry: './webapp/main.js',
  output: {
    filename: jsBundleName,
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
      }
    ]
  },
  plugins: plugins
}

webPackConfig.devtool = 'source-map'

module.exports = webPackConfig
