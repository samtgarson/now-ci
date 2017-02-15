const cookieSession = require('cookie-session')

module.exports = async (req, res) => new Promise((resolve, reject) => {
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })(req, res, resolve)
})
