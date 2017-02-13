const Client = require('../services/github')

module.exports = async (req, res, { query }) => {
  const user = req.session.get('user')
  const client = Client(user.token)
  const page = query.page || 1
  const cmd = client.repos[query.org ? 'getForOrg' : 'getForUser']
  return cmd({ per_page: 20, page, org: query.org, username: user.login })
}
