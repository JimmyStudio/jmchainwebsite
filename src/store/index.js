/**
 * Created by Jimmy on 2018/5/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  }
})
