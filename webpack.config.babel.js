import 'dotenv/config'

import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { GitRevisionPlugin } from 'git-revision-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import { v4 as uuidv4 } from 'uuid'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

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
    __GOOGLE_MAPS_API_KEY__: JSON.stringify(process.env.FRA_GOOGLE_MAPS_API_KEY),
    __APPLICATION_VERSION__: gitRevisionPlugin
      ? JSON.stringify(gitRevisionPlugin.version())
      : JSON.stringify(process.env.APP_VERSION),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().split('T')[0]),
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
  entry: ['./src/client/Main.tsx'],
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
  output: {
    filename: 'js/bundle-[fullhash].js',
    path: config.path,
    publicPath: '/',
  },
  devServer: {
    hot: true,
    allowedHosts: ['fra-data.local'],
    proxy: [
      {
        // Proxy all server-served routes:
        context: ['/auth', '/img', '/css', '/video', '/api', '/definitions'],
        target: process.env.APP_URI,
      },
      {
        context: ['/socket.io'],
        target: process.env.APP_URI, // .replace('http','ws'),
        ws: true,
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
