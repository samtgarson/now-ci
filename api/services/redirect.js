const { send } = require('micro')

module.exports = (res, path) => {
  res.setHeader('location', path)
  send(res, 302)
}
