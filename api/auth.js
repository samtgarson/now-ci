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

const auth = githubOAuth.login
const authCallback = async (req, res) => {
  const token = await pify(githubOAuth.callback)(req, res)
  req.token = token
}

module.exports = { auth, authCallback }
