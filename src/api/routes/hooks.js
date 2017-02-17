import methods from 'micro-method-router'
import HooksService from '../services/hooks'

export default methods({
  async post (req, res, { query, params }) {
    const svc = new HooksService({ req, res, query, params })
    return svc.create()
  },
  async delete (req, res, { query, params }) {
    const svc = new HooksService({ req, res, query, params })
    return svc.delete()
  }
})
