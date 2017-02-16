const Query = require('./query')
const { findHook } = require('./utils')

module.exports = class Repos extends Query {
  async perform () {
    this.res = this.query.query ? await this.search() : await this.getAll()
    return Promise.all(this.getHooks())
  }
  setPages (link) {
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
    let search = [this.query.query, 'in:name', 'fork:true']
    search.push(`user:${this.query.org ? this.query.org : this.user.login}`)
    const res = await this.client.search.repos({ q: search.join(' '), page: this.page, per_page: 20 })
    this.setPages(res)
    return res.items
  }
  getHooks () {
    return this.res.map(repo => new Promise(async resolve => {
      const hook = await findHook({ client: this.client, owner: repo.owner.login, name: repo.name, host: this.host })
      repo.hooked = Boolean(hook)
      return resolve(repo)
    }))
  }
}
