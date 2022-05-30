// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

const isProduction = process.env.NODE_ENV == 'production';

// @ts-ignore
const config = merge(base, {
  entry: {
    integration: './src/pages/integration/App.tsx'
  },
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
  }
});

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
