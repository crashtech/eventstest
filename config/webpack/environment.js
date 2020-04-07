const { environment } = require('@rails/webpacker')

const path = require('path')
const baseDir = path.resolve(process.cwd(), '.')

environment.config.merge({
  resolve: {
    alias: {
      '@api':    `${baseDir}/app/javascript/api`,
      '@config': `${baseDir}/app/javascript/config`,
      '@pages':  `${baseDir}/app/javascript/pages`,
      '@shared': `${baseDir}/app/javascript/shared`,
    }
  }
})

module.exports = environment
