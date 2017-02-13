const Client = require('../services/github')

const getHooks = ({ repos, client, req }) => {
  return repos.map(async repo => new Promise((resolve) => {
    client.repos.getHooks({
      owner: repo.owner.login,
      repo: repo.name
    }).then(hooks => {
      repo.hooked = hooks
        .filter(hook => hook.active)
        .some(hook => hook.config && hook.config.url && hook.config.url.includes(req.headers.host))
      resolve(repo)
    })
  }))
}

module.exports = async (req, res, { query }) => {
  const user = req.session.get('user')
  const client = Client(user.token)
  const page = query.page || 1
  const cmd = client.repos[query.org ? 'getForOrg' : 'getForUser']
  const repos = await cmd({ per_page: 20, page, org: query.org, username: user.login })

  client.hasNextPage(repos) && res.setHeader('X-NEXT-PAGE', true)
  client.hasPreviousPage(repos) && res.setHeader('X-PREV-PAGE', true)
  return Promise.all(getHooks({ repos, client, req }))
}
