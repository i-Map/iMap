import ajax from '../server/ajax'
import url from '../server/url'

// /**
//  * 保存用户信息
//  * @param {Object} data
//  */
// export const setUser = ({ commit }, data) => {
//     commit(types.SET_USER, data)
// }

// /**
//  * 保存语言
//  * @param {Object} data
//  */
// export const setLang = ({ commit }, data) => {
//     commit(types.SET_LANG, data)
// }

export default {
	SWITCH_LANG: ({ commit, dispatch }, { lang }) => {
		commit('SWITCH_LANG', { lang })
	},

	LOGIN: ({ commit, dispatch }, { model }) => {
    return ajax.post({
      url: url.LOGIN,
      data: model
    }).then(data => {
			commit('SET_USER', {
				user: data.data.user,
				accessToken: data.data.accessToken,
				oauth: data.data.oauth
			})
    })
	},

	LOGIN_GITHUB: ({ commit, dispatch }, { code }) => {
    return ajax.get({
      url: url.LOGIN_GITHUB,
      data: {
				code: code
			}
    }).then(data => {
			commit('SET_USER', {
				user: data.data.user,
				accessToken: data.data.accessToken,
				oauth: data.data.oauth
			})
			commit('SET_GITHUB', {
				github: data.data.github,
			})
    })
	},

	RESET: ({ commit, dispatch }, { model }) => {
    return ajax.post({
      url: url.RESET,
      data: model
    })
	},

	REGISTER: ({ commit, dispatch }, { model }) => {
    return ajax.post({
      url: url.REGISTER,
      data: model
    })
	},

	LOGOUT: ({ commit, dispatch }) => {
		commit('REMOVE_USER')
	}
}
