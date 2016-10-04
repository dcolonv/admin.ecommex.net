var path = require('path')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, '../build')
var APP_DIR = path.resolve(__dirname, '../app')

module.exports = {
  context: APP_DIR,
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.(jpg|png|gif)$/,
        include: APP_DIR,
        loader: 'url-loader?limit=1024'
      },
      {
         test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
         loader : 'url?prefix=font/&limit=10000'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.png', '.jpeg', '.jpg', '.css', '.svg']
  },
  postcss: function() {
    return [precss, autoprefixer]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      inject   : 'body',
      favicon  : path.resolve(__dirname, '../app/favicon.ico'),
      template : path.resolve(__dirname, '../app/index.html'),
    })
  ],
  node: {
    fs: 'empty'
  }
}
