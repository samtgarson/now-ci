const ReposService = require('../services/repos')

module.exports = async (req, res, { query }) => {
  const repo = new ReposService({ req, query })
  const array = await repo.perform()
  repo.nextPage && res.setHeader('X-NEXT-PAGE', true)
  repo.previousPage && res.setHeader('X-PREV-PAGE', true)
  return array
}
