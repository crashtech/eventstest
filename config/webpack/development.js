const environment = require('./environment')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

environment.config.merge({
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  }
})

module.exports = environment.toWebpackConfig()
