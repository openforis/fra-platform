const path = require('path')

module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  //   api.cache(true);

  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for
  // any possible NODE_ENV value that might come up during plugin execution.
  // global._isProd = api.cache(() => process.env.NODE_ENV === 'production')

  return {
    presets: ['@babel/preset-env', '@babel/react'],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import'],
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      alias: {
        '@common': path.resolve(__dirname, 'common/'),
        '@server': path.resolve(__dirname, 'server/'),
        '@webapp': path.resolve(__dirname, 'webapp/'),
        '@test': path.resolve(__dirname, 'test/'),
      },
    }
  }
}
