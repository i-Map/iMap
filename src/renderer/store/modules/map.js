import * as types from '../mutations_types'

// state
const state = {
  mapType: ''
}

// mutations
const mutations = {
  // 设置mapType
  [types.SET_MAP_TYPE] (state, data) {
    state.mapType = data
  }
}

// 导出state, mutations
export default {
  state,
  mutations
}
