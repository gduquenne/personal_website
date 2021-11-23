const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack'
      }
    ]
  },
  entry: `${__dirname}/src/app/index.js`,
  output: {
    filename: 'transformed.js',
    path: `${__dirname}/build`
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `${__dirname}/src/app/index.html`,
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
