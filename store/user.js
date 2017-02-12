export const state = {
  loggedIn: false
}

export const mutations = {
  logIn (state, user) {
    state.name = user.name
    state.email = user.email
    state.avatar_url = user.avatar_url
    state.token = user.token
    state.loggedIn = true
  },
  logOut (state) {
    state.user = {}
    state.loggedIn = false
  }
}
