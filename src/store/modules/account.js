/**
 * Created by Jimmy on 2018/5/9.
 */

const state = {
  user: {}
}
const getters = {
  user: (state, getter) => {
    let userinfo = localStorage.getItem('user_info')
    if (userinfo) {
      return JSON.parse(userinfo)
    } else {
      return {token: ''}
    }
  }
}
const mutations = {
  changeUser (state, user) {
    state.user = user
  }
}

const actions = {
  changeUser: ({ commit }, user) => commit('changeUser', user)
}

export default {
  state,
  getters,
  mutations,
  actions
}
