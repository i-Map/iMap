import * as types from './mutations_types'

/**
 * 保存用户信息
 * @param {Object} data 
 */
export const setUserInfo = ({ commit }, data) => {
    commit(types.SET_USER_INFO, data)
}

/**
 * 保存map类型
 * @param {String} data 
 */
export const setMapType = ({ commit }, data) => {
    commit(types.SET_MAP_TYPE, data)
}

/**
 * 保存Excel数据
 * @param {Object} data 
 */
export const setExcelData = ({ commit }, data) => {
    commit(types.SET_EXCEL_DATA, data)
}

/**
 * 更新Excel数据
 * @param {Array} data 
 */
export const updateExcelData = ({ commit }, data) => {
    commit(types.UPDATE_EXCEL_DATA, data)
}
