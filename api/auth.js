const { send } = require('micro')
const pify = require('pify')
const githubOAuth = require('github-oauth')({
  githubClient: process.env['GITHUB_CLIENT'],
  githubSecret: process.env['GITHUB_SECRET'],
  baseURL: 'http://localhost:3000',
  loginURI: '/auth',
  callbackURI: '/auth_callback',
  scope: 'user,repo'
})
const Client = require('./services/github')
const auth = githubOAuth.login

const createUser = async (token) => {
  const client = Client(token)
  return client.users.get({})
}

const redirect = (res, path) => {
  res.setHeader('location', path)
  send(res, 302)
}
const authCallback = async (req, res) => {
  const response = await pify(githubOAuth.callback)(req, res)
  if (response.error) return redirect(res, '/?auth_error')

  const user = await createUser(response.access_token)
  user.token = response.access_token
  req.session.put('user', user)
  redirect(res, '/')
}

const logout = async (req, res) => {
  req.session.flush()
  redirect(res, '/')
}

module.exports = { auth, authCallback, logout }
