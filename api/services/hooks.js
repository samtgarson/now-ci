const Query = require('./query')
const { findHook } = require('./utils')

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
  async delete () {
    const { owner, name } = this.params
    const hook = await findHook({
      owner,
      name,
      client: this.client,
      host: this.host
    })
    return this.client.repos.deleteHook({
      owner,
      repo: name,
      id: hook.id
    }) 
  }
}
