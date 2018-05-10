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
export default {
  state,
  getters
}
