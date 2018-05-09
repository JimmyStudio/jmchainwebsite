/**
 * Created by Jimmy on 2018/5/9.
 */

const getters = {
  user: (state, getter) => {
    let userinfo = localStorage.getItem('user_info')
    if (userinfo) {
      return JSON.parse(userinfo)
    } else {
      return ''
    }
  }
}
export default {
  getters
}
