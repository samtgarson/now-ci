const Query = require('./query')
module.exports = class Hooks extends Query {
  async create () {
    return this.client.repos.createHook({
      owner: this.params.owner,
      repo: this.params.name,
      name: 'web',
      config: { url: `http://${this.host}/hook`, content_type: 'json', insecure_ssl: true, secret: process.env.SECRET_KEY },
      active: true
    })
  }
  delete () {

  }
}
