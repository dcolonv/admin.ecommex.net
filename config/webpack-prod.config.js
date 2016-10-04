var WebpackStripLoader = require('strip-loader')
var devConfig = require('./webpack-dev.config')
var webpack = require('webpack')

var stripLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log')
}

devConfig.module.loaders.push(stripLoader)
devConfig.plugins = devConfig.plugins.concat(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
)

module.exports = devConfig
