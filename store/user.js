export const state = {
  loggedIn: false
}

export const mutations = {
  logIn (state, user) {
    state.name = user.name
    state.email = user.email
    state.login = user.login
    state.avatarUrl = user.avatar_url
    state.orgs = user.orgs
    state.loggedIn = true
  },
  logOut (state) {
    state.user = {}
    state.loggedIn = false
  }
}
