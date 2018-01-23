import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import userInfo from './modules/user_info'
import excel from './modules/excel'
import lang from './modules/lang'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    userInfo,
    excel,
    lang
  },
  strict: debug
})
