const Query = require('./query')

module.exports = class Repos extends Query {
  async perform () {
    this.res = this.query.query ? await this.search() : await this.getAll()
    return Promise.all(this.getHooks())
  }
  setPages(link) {
    if (this.client.hasNextPage(link)) this.setHeader('X-NEXT-PAGE', true)
    if (this.client.hasPreviousPage(link)) this.setHeader('X-PREV-PAGE', true)
  }
  async getAll () {
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
