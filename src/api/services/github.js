import Github from 'github'

export default token => {
  const client = new Github({ promise: Promise })
  client.authenticate({ type: 'token', token })
  return client
}
