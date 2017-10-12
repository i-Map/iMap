import * as types from '../mutations_types'

// state
const state = {
  excelData: {}
}

// mutations
const mutations = {
  // 设置excelData
  [types.SET_EXCEL_DATA] (state, data) {
    state.excelData = data
  },
  // 更新excelData
  [types.UPDATE_EXCEL_DATA] (state, data) {
    state.excelData.data.push(data)
  }
}

// 导出state, mutations
export default {
  state,
  mutations
}
