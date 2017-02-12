export const state = {}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const user = req.session.get('user')
    if (user) commit('user/logIn', user)
  }
}
