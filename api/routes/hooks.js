const methods = require('micro-method-router')
const HooksService = require('../services/hooks')

module.exports = methods({
  async post (req, res, { query, params }) {
    const svc = new HooksService({ req, res, query, params })
    return svc.create()
  },
  async delete (req, res, { query, params }) {
    const svc = new HooksService({ req, res, query, params })
    return svc.delete()
  }
})
