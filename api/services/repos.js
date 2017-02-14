const Query = require('../services/query')

module.exports = class Repos extends Query {
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
