import * as types from './mutations_types'

/**
 * 保存用户信息
 * @param {Object} data
 */
export const setUserInfo = ({ commit }, data) => {
    commit(types.SET_USER_INFO, data)
}

/**
 * 保存Excel数据
 * @param {Object} data
 */
export const setExcelData = ({ commit }, data) => {
    commit(types.SET_EXCEL_DATA, data)
}

/**
 * 添加Excel数据
 * @param {Array} data
 */
export const addExcelData = ({ commit }, data) => {
    commit(types.ADD_EXCEL_DATA, data)
}

/**
 * 修改Excel数据
 * @param {Array} data
 */
export const editExcelData = ({ commit }, data) => {
    commit(types.EDIT_EXCEL_DATA, data)
}

/**
 * 删除Excel数据
 * @param {Array} data
 */
export const delExcelData = ({ commit }, data) => {
    commit(types.DEL_EXCEL_DATA, data)
}
