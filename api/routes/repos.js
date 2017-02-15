const ReposService = require('../services/repos')

module.exports = async (req, res, { query }) => {
  const repo = new ReposService({ req, res, query })
  return repo.perform()
}
