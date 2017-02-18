export const state = {}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const { user } = req.session
    if (user) commit('user/logIn', user)
  }
}
