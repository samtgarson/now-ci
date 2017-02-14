const Client = require('../services/github')

class Repo {
  constructor ({ user, query, host }) {
    this.host = host
    this.user = user
    this.client = Client(user.token)
    this.query = query
    this.page = this.query.page || 1
  }
  async perform () {
    this.res = this.query.query ? await this.search() : await this.get()
    return Promise.all(this.getHooks())
  }
  setPages(link) {
    this.nextPage = client.hasNextPage(link)
    this.previousPage = client.hasPreviousPage(link)
  }
  async get () {
    const cmd = this.client.repos[this.query.org ? 'getForOrg' : 'getForUser']
    const res = await cmd({ per_page: 20, page: this.page, org: this.query.org, username: this.user.login })
    this.setPages(res)
    return res
  }
  async search () {
    let search = [this.query.query]
    search.push('in:name')
    search.push(`user:${this.query.org ? this.query.org : this.user.login}`)
    const res = await this.client.search.repos({ q: search.join(' '), page: this.page, per_page: 20} )
    this.setPages(res)
    return res.items
  }
  getHooks () {
    return this.res.map(async repo => new Promise((resolve) => {
      this.client.repos.getHooks({
        owner: repo.owner.login,
        repo: repo.name
      }).then(hooks => {
        repo.hooked = hooks
          .filter(hook => hook.active)
          .some(hook => hook.config && hook.config.url && hook.config.url.includes(this.host))
        resolve(repo)
      })
    }))
  }
}

async (req, res, { query }) => {
  return Promise.all(getHooks({ repos, client, req }))
}

module.exports = async (req, res, { query }) => {
  const repo = new Repo({ user: req.session.get('user'), query })
  const array = await repo.perform()
  repo.nextPage && res.setHeader('X-NEXT-PAGE', true)
  repo.previousPage && res.setHeader('X-PREV-PAGE', true)
  return array
}
