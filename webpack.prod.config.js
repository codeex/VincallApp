// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

// @ts-ignore
const config = merge(base, {
  entry: {
    integration: './src/pages/integration/main.tsx'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name]_bundle.js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'integration.html',
      template: './src/pages/integration/index.html',
      chunks: ['integration']
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    open: true,
    host: 'localhost',
    port: 8012,
    hot: false,
    liveReload: false
  },
  optimization: {
    minimize: true
  }
});

module.exports = () => {
  config.plugins.push(new MiniCssExtractPlugin());
  config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  return config;
};
