const path = require('path'),
webpack = require('webpack'),
HtmlWebPackPlugin = require('html-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin'),
OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
TerserPlugin = require('terser-webpack-plugin'),
WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/client/index.js', 
  output: {
    libraryTarget: 'var',
    library: 'client'
 },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node-modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html"
    }), 
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new WorkboxPlugin.GenerateSW()
  ]
}
