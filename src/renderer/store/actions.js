import ajax from '../server/ajax'
import url from '../server/url'

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

	USER_UPDATE: ({ commit, dispatch }, { model }) => {
		return ajax.patch({
			url: url.USER,
			data: model
		}).then(data => {
			commit('SET_USER', {
				user: data.data
			})
		})
	},

	LOGOUT: ({ commit, dispatch }) => {
		commit('REMOVE_USER')
	}
}
