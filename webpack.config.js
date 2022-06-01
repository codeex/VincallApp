// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const proxyRules = require('./proxyRules');

// @ts-ignore
const config = merge(base, {
  entry: {
    integration: './src/pages/integration/main.tsx'
  },
  mode: 'development',
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
    proxy: proxyRules,
    liveReload: false
  }
});

module.exports = () => {
  return config;
};
