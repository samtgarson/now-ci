import paginate from 'paginate'
import methods from 'micro-method-router'
import Build from '../models/build'

export default methods({
  async get (req, res, { query }) {
    const { id, page = 1 } = query
    if (id) return Build.find(id)
    return paginate(Build.all, 10).page(page)
  }
})


export default async (req, res) => {

}
