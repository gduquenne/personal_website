const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jss|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(gif|jpe?g|png|svg|woff(2)?)$/i,
        loader: 'file-loader',
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
