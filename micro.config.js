const route = require('micro-route')
const dispatch = require('micro-route/dispatch')
const { send } = require('micro')
const { auth, authCallback, logout } = require('./api/auth')
const setupSession = require('./api/services/session')
const nuxt = require('./nuxt.index.js')

module.exports = async (req, res) => {
  await setupSession(req, res)
  await dispatch()
    .dispatch('/auth', 'GET', auth)
    .dispatch('/auth_callback', 'GET', authCallback)
    .dispatch('/logout', 'GET', logout)
    .dispatch('*', 'GET', nuxt.render)(req, res)
}
