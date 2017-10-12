import * as types from '../mutations_types'
import _ from 'lodash'

// state
const state = {
  excelData: {}
}

// mutations
const mutations = {
  // 设置excelData
  [types.SET_EXCEL_DATA] (state, data) {
    if(data.data)
      state.excelData = data
    else {
      state.excelData.data.length = 0
      state.excelData.data.push(data)
    }
  },
  // 添加excelData
  [types.ADD_EXCEL_DATA] (state, data) {
    state.excelData.data.push(data)
  },
  // 修改excelData
  [types.EDIT_EXCEL_DATA] (state, data) {
    let newArr = state.excelData.data.map((item, idx) => {
      if(item[0] === data[0]) {
          item[1] = data[1]
          item[2] = data[2]
          item[3] = data[3]  
      } 
      if(item[1] === data[1] && item[2] === data[2]) {
        item[0] = data[0]
      }
      return item
    })
    state.excelData.data = newArr
  },
  // 删除excelData
  [types.DEL_EXCEL_DATA] (state, data) {
    let newArr = _.remove(state.excelData.data, n => {
      return n[0] !== data[0]
    })
    state.excelData.data = newArr
  },
}

// 导出state, mutations
export default {
  state,
  mutations
}
