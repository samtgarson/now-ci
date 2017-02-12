export const state = {}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.user) commit('user/logIn', req.user)
  }
}
