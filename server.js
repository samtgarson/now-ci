const micro = require('micro')
const visualize = require('micro-visualize')
const serviceConfig = require('./micro.config.js')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

// setup the microservice includinng intercepted routing
const server = micro(visualize(serviceConfig))

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
