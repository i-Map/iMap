import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    USER: storage.get('USER') || {},
    LANG: storage.get('LANG') || 'zh-CN',
    GITHUB: storage.get('GITHUB') || {}
  },
  actions,
  mutations,
  strict: debug
})
