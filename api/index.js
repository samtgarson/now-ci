const { send, createError } = require('micro')
const dispatch = require('micro-route/dispatch')
const repos = require('./routes/repos')

module.exports = async (req, res) => {
  if (!req.session.get('user')) throw createError(401, 'Unauthorized')
  return await dispatch()
    .dispatch('/api/repos', 'GET', repos)(req, res)
}
