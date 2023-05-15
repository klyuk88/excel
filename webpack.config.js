const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: process.env.NODE_ENV === 'production' ? 'bandle.[hash].js' : 'bandle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js'],
      alias: {
         '@': path.resolve(__dirname, 'src'),
         '@/core': path.resolve(__dirname, 'src/core'),
      }
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      hot: false,
      liveReload: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: 'body',
        minify: {
          removeComments: process.env.NODE_ENV === 'production',
          collapseWhitespace: process.env.NODE_ENV === 'production'
        }
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist/public')},
        ],
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: process.env.NODE_ENV === 'production' ? 'bandle.[hash].css' : 'bandle.css'
      }),
      new ESLintPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ],
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
}