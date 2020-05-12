import 'dotenv/config'
import path from 'path'
import webpack from 'webpack'
import { v4 as uuidv4 } from 'uuid'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import GitRevisionPlugin from 'git-revision-webpack-plugin'

const buildReport = process.env.BUILD_REPORT === 'true'

const config = {
  mode: process.env.NODE_ENV || 'development',
  path: path.resolve(__dirname, 'dist'),
}

const gitRevisionPlugin = config.mode === 'production' ? new GitRevisionPlugin() : null

const plugins = [
  ...(gitRevisionPlugin ? [gitRevisionPlugin] : []),
  new MiniCssExtractPlugin({ filename: 'style/styles-[hash].css' }),
  new HtmlWebpackPlugin({ template: './web-resources/index.html' }),
  new webpack.DefinePlugin({
    __BUST__: `"${uuidv4()}"`,
    __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API),
    __APPLICATION_VERSION__: JSON.stringify(gitRevisionPlugin ? gitRevisionPlugin.version() : process.env.APP_VERSION),
    __URL_STATISTICAL_FACTSHEETS__: JSON.stringify(process.env.URL_STATISTICAL_FACTSHEETS),
  }),
]

if (buildReport) {
  plugins.push(new BundleAnalyzerPlugin())
}

const appConfig = {
  mode: config.mode,
  devtool: 'source-map',
  entry: ['regenerator-runtime/runtime', './webapp/main.js'],
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    alias: {
      '@common': path.resolve(__dirname, 'common/'),
      '@server': path.resolve(__dirname, 'server/'),
      '@webapp': path.resolve(__dirname, 'webapp/'),
      '@test': path.resolve(__dirname, 'test/'),
    },
  },
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
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins,
  stats: { children: false },
}

webpack.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: true,
        output: { comments: false },
      },
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
}

export default appConfig
