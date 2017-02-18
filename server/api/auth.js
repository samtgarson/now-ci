import pify from 'pify'
import githubOAuth from 'github-oauth'
import createClient from './services/github'
import { redirect } from './services/utils'

const oauth = githubOAuth({
  githubClient: process.env.GITHUB_CLIENT,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: 'http://localhost:3000',
  loginURI: '/auth',
  callbackURI: '/auth_callback',
  scope: 'user,repo,read:org,admin:repo_hook'
})

const auth = oauth.login

const createUser = async token => {
  const client = createClient(token)
  const user = await client.users.get({})
  user.orgs = (await client.users.getOrgs({})).map(o => o.login)
  return user
}

const authCallback = async (req, res) => {
  const response = await pify(oauth.callback)(req, res)
  if (response.error) return redirect(res, '/?auth_error')

  const user = await createUser(response.access_token)
  user.token = response.access_token
  req.session.user = user
  redirect(res, '/')
}

const logout = async (req, res) => {
  req.session = null
  redirect(res, '/')
}

export default { auth, authCallback, logout }
