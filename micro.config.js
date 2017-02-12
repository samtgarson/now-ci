const route = require('micro-route')
const dispatch = require('micro-route/dispatch')
const { send } = require('micro')
const { auth, authCallback } = require('./api/auth')
const nuxt = require('./nuxt.index.js')

const authCallbackRoute = route('/auth_callback', 'GET')

module.exports = dispatch()
    .dispatch('/auth', 'GET', auth)
    .dispatch('/auth_callback', 'GET', authCallback)
    .dispatch('*', 'GET', nuxt.render)
