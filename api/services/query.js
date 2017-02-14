const Client = require('../services/github')

module.exports = class Query {
  constructor({ req, query }) {
    this.user = req.session.get('user')
    this.host = req.headers.host
    this.client = Client(this.user.token)
    this.query = query
    this.page = query.page || 1
  }
}
