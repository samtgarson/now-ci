import { send } from 'micro'

export const redirect = (res, path) => {
  res.setHeader('location', path)
  send(res, 302)
}

export const findHook = async ({ client, owner, name, host }) => {
  const hooks = await client.repos.getHooks({ owner, repo: name })
  return hooks
    .filter(hook => hook.active)
    .find(hook => hook.config && hook.config.url && hook.config.url.includes(host))
}

