import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'store'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    USER: storage.get('USER') || {},
    LANG: storage.get('LANG') || 'zh-CN',
    GITHUB: storage.get('GITHUB') || {},
    OAUTH: storage.get('OAUTH') || false
  },
  actions,
  mutations,
  getters,
  strict: debug
})
