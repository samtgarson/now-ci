const Nuxt = require('nuxt')
let config = require('../nuxt.config.js')

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch(err => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1) // eslint-disable-line unicorn/no-process-exit
  })
}

module.exports = nuxt
