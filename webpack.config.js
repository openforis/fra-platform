const webpack = require('webpack')
const R = require('ramda')

const prodBuild = process.env.NODE_ENV === 'production'

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {warnings: false},
  output: {comments: false},
  sourceMap: true
})

const getConfig = configFileName => R.pipe(
  require,
  // add uglifyPlugin in prod build
  config => prodBuild
    ? R.assoc('plugins', [...config.plugins, uglifyPlugin], config)
    : config,
  // add devtool: 'source-map' in non prod build
  config => prodBuild
    ? config
    : R.assoc('devtool', 'source-map', config)
)(configFileName)

const appConfig = getConfig('./webpack.config.app')
const loginConfig = getConfig('./webpack.config.login')

const webPackConfig = [
  appConfig,
  loginConfig
]

module.exports = webPackConfig
