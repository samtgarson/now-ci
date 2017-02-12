const route = require('micro-route')
const dispatch = require('micro-route/dispatch')
const { auth, authCallback } = require('./api/auth')
const nuxt = require('./nuxt.index.js')

const authCallbackRoute = route('/auth_callback', 'GET')

module.exports = dispatch()
    .dispatch('/auth', 'GET', auth)
    .dispatch('*', 'GET', async (req, res) => {
      if (authCallbackRoute(req)) await authCallback(req, res)
      return await nuxt.render(req, res)
    })
