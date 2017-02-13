const dispatch = require('micro-route/dispatch')
const { send } = require('micro')
const { auth, authCallback, logout } = require('./api/auth')
const api = require('./api')
const setupSession = require('./api/services/session')
const nuxt = require('./nuxt.index.js')

module.exports = async (req, res) => {
  await setupSession(req, res)
  return await dispatch()
    .dispatch('/auth', 'GET', auth)
    .dispatch('/auth_callback', 'GET', authCallback)
    .dispatch('/logout', 'GET', logout)
    .dispatch('/api/*', ['GET', 'POST', 'DELETE', 'PUT'], api)
    .dispatch('*', 'GET', nuxt.render)(req, res)
}
