import ReposService from '../services/repos'

export default async (req, res, { query }) => {
  const repo = new ReposService({ req, res, query })
  return repo.perform()
}
