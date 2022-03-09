import 'dotenv/config'
import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpack from 'webpack'
import { v4 as uuidv4 } from 'uuid'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { GitRevisionPlugin } from 'git-revision-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const buildReport = process.env.BUILD_REPORT === 'true'

const config = {
  mode: process.env.NODE_ENV || 'development',
  path: path.resolve(__dirname, 'dist/client'),
}
const isDevelopment = process.env.NODE_ENV !== 'production'

const gitRevisionPlugin = config.mode === 'production' ? null : new GitRevisionPlugin()

const fontCssFileName = 'woff2.css'

const port = process.env.WEB_APP_PORT ? process.env.WEB_APP_PORT : 9000

const plugins = [
  ...(gitRevisionPlugin ? [gitRevisionPlugin] : []),
  new MiniCssExtractPlugin({ filename: 'style/styles-[fullhash].css' }),
  new HtmlWebpackPlugin({ template: './web-resources/index.html' }),
  new webpack.DefinePlugin({
    __DEV__: isDevelopment,
    __BUST__: `"${uuidv4()}"`,
    __GOOGLE_API__: JSON.stringify(process.env.FRA_GOOGLE_API),
    __APPLICATION_VERSION__: gitRevisionPlugin
      ? JSON.stringify(gitRevisionPlugin.version())
      : JSON.stringify(process.env.APP_VERSION),
    __URL_STATISTICAL_FACTSHEETS__: JSON.stringify(process.env.URL_STATISTICAL_FACTSHEETS),
  }),
  new CleanWebpackPlugin(),
]

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new ReactRefreshWebpackPlugin())
}

if (buildReport) {
  plugins.push(new BundleAnalyzerPlugin())
}

const appConfig = {
  mode: config.mode,
  devtool: 'source-map',
  entry: ['./client/Main.tsx'],
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@client': path.resolve(__dirname, 'client/'),
      '@core': path.resolve(__dirname, 'core/'),
      '@common': path.resolve(__dirname, 'common/'),
      '@i18n': path.resolve(__dirname, 'i18n/'),
      '@meta': path.resolve(__dirname, 'meta/'),
      '@server': path.resolve(__dirname, 'server/'),
      '@webapp': path.resolve(__dirname, 'webapp/'),
      '@test': path.resolve(__dirname, 'test/'),
    },
  },
  output: {
    filename: 'js/bundle-[fullhash].js',
    path: config.path,
    publicPath: '/',
  },
  devServer: {
    hot: true,
    // disableHostCheck: true,
    proxy: [
      {
        // Proxy all server-served routes:
        context: ['/auth', '/img', '/css', '/ckeditor', '/video', '/api', '/definitions'],
        target: process.env.APP_URI,
      },
    ],
    compress: false,
    port,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: isDevelopment ? [require.resolve('react-refresh/babel')] : [],
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              import: {
                filter: (url) => {
                  // Don't handle font css file import
                  if (url.includes(fontCssFileName)) {
                    return false
                  }

                  return true
                },
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
    ],
  },
  plugins,
  stats: { children: false },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
}

export default appConfig
