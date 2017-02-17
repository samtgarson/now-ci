import { createError } from 'micro'
import repos from './routes/repos'
import hooks from './routes/hooks'
import dispatch from 'micro-route/dispatch'

export default async (req, res) => {
  if (!req.session.user) throw createError(401, 'Unauthorized')
  return dispatch()
    .dispatch('/api/repos/:owner/:name/build', ['POST', 'DELETE'], hooks)
    .dispatch('/api/repos', 'GET', repos)(req, res)
}
