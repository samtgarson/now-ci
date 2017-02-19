import { createError } from 'micro'
import repos from './repos'
import hooks from './hooks'
import secrets from './secrets'
import dispatch from 'micro-route/dispatch'

export default async (req, res) => {
  if (!req.session.user) throw createError(401, 'Unauthorized')
  return dispatch()
    .dispatch('/api/repos/:owner/:name/build', ['POST', 'DELETE'], hooks)
    .dispatch('/api/repos', 'GET', repos)
    .dispatch('/api/secrets(/:id)', '*', secrets)(req, res)
}
