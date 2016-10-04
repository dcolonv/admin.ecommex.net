const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./config/webpack-dev.config')
const path = require('path')

const server = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
})
// Important part. Send down index.html for all requests
server.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

server.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err) // eslint-disable-line no-console
  }
  console.log('Listening at localhost:3000') // eslint-disable-line no-console
})
