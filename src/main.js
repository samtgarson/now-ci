require('now-logs')(process.env.SECRET_KEY)
import micro from 'micro'
import visualize from 'micro-visualize'
import serviceConfig from './micro.config.js'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '3000'

// setup the microservice includinng intercepted routing
const server = micro(visualize(serviceConfig))

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
