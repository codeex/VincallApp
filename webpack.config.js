// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const proxyRules = require('./proxyRules');

const getPath = (p) => path.resolve(__dirname, p);

// @ts-ignore
const config = merge(base, {
  entry: {
    integration: './src/pages/integration/main.tsx',
    topBar: './src/pages/topbar/main.tsx'
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
    }),
    new HtmlWebpackPlugin({
      filename: 'topBar.html',
      template: './src/pages/topbar/index.html',
      chunks: ['topBar']
    })
  ],
  resolve: {
    alias: {
      src: getPath('./src')
    }
  },
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
