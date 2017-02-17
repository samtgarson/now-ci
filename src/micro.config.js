import { sendError } from 'micro'
import { auth, authCallback, logout } from './api/auth'
import api from './api'
import hook from './api/routes/hook'
import setupSession from './api/services/session'
import nuxt from './nuxt.js'
import dispatch from 'micro-route/dispatch'

export default async (req, res) => {
  try {
    await setupSession(req, res)
    const ret = await dispatch()
      .dispatch('/auth', 'GET', auth)
      .dispatch('/auth_callback', 'GET', authCallback)
      .dispatch('/logout', 'GET', logout)
      .dispatch('/hook', 'POST', hook)
      .dispatch('/api/*', ['GET', 'POST', 'DELETE', 'PUT'], api)
      .dispatch('*', 'GET', nuxt.render)(req, res)
    return ret
  } catch (err) {
    throw sendError(req, res, err)
  }
}
