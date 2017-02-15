const { send, createError } = require('micro')
const dispatch = require('micro-route/dispatch')
const repos = require('./routes/repos')
const hooks = require('./routes/hooks')

module.exports = async (req, res) => {
  if (!req.session.get('user')) throw createError(401, 'Unauthorized')
  return dispatch()
    .dispatch('/api/repos/:owner/:name/build', ['POST', 'DELETE'], hooks)
    .dispatch('/api/repos', 'GET', repos)(req, res)
}
