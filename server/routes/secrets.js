import nowClient from 'now-client'
import { json } from 'micro'
import methods from 'micro-method-router'

const now = nowClient(process.env['NOW_TOKEN'])

export default methods({
  async get (req, res) {
    return now.getSecrets()
  },
  async post (req, res, { params }) {
    const { id } = params
    const { name, value } = await json(req)
    if (!id) return now.createSecret(name, value)
    return now.renameSecret(id, name)
  },
  async delete (req, res, { params }) {
    const { id } = params
    if (!id) return
    return now.deleteSecret(id)
  }
})
