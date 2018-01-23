import * as types from '../mutations_types'

// state
const state = {
  local: 'zh-CN'
}

// mutations
const mutations = {
  // 设置 lang
  [types.SET_LANG] (state, data) {
    state.local = data
    window.$lang = data
  }
}

// 导出 satate, mutations
export default {
  state,
  mutations
}
