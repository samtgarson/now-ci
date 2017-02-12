export const state = {}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.token) commit('user/logIn', req.token)
  }
}
