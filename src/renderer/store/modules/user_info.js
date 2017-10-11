import * as types from '../mutations_types'

// state
const state = {
  userInfo: {}
}

// mutations
const mutations = {
  // 设置userInfo
  [types.SET_USER_INFO] (state, data) {
    state.userInfo = data
  }
}

// 导出state, mutations
export default {
  state,
  mutations
}