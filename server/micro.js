import { sendError } from 'micro'
import dispatch from 'micro-route/dispatch'
import route from 'micro-route'
import api from './routes'
import { auth, authCallback, logout } from './routes/auth'
import hook from './routes/hook'
import setupSession from './services/session'
import nuxt from './nuxt.js'

export default async (req, res) => {
  try {
    await setupSession(req, res)
    const ret = await dispatch()
      .dispatch('/auth', 'GET', auth)
      .dispatch('/auth_callback', 'GET', authCallback)
      .dispatch('/logout', 'GET', logout)
      .dispatch('/hook', 'POST', hook)
      .dispatch('/api/*', '*', api)
      .dispatch('*', 'GET', nuxt.render)(req, res)
    return ret
  } catch (err) {
    throw sendError(req, res, err)
  }
}
