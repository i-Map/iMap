import * as types from '../mutations_types'
import storage from 'store'

// state
const state = {
  local: storage.get('lang') || 'zh-CN'
}

// mutations
const mutations = {
  // 设置 lang
  [types.SET_LANG] (state, data) {
    storage.set('lang', data)
    state.local = storage.get('lang')
  }
}

// 导出 satate, mutations
export default {
  state,
  mutations
}
