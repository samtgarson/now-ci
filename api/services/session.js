const NodeSession = require('node-session')
const session = new NodeSession({ 
  secret: process.env.SECRET_KEY,
  lifetime: 1800000,
  cookie: 'now_ci_session'
})

module.exports = (req, res) => new Promise((resolve, reject) => {
  return session.startSession(req, res, err => {
    if (err) return reject(err)
    resolve()
  })
})
