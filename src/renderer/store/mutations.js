import * as Cookies from 'js-cookie'
import storage from 'store'

export default {
  SWITCH_LANG: (state, { lang }) => {
    state.LANG = lang

    storage.set('LANG', lang)
  },

  SET_USER: (state, { user, accessToken, oauth }) => {
    if (accessToken) {
      state.OAUTH = oauth

      Cookies.set('ACCESSTOKEN', accessToken, {
        expires: 1,
        secure: false
      }),
      storage.set('OAUTH', oauth)
    }
    state.USER = user
    storage.set('USER', user)
  },

  REMOVE_USER: (state) => {
    state.USER = {}
    state.GITHUB = {}

    Cookies.remove('ACCESSTOKEN'),
    storage.remove('USER')
    storage.remove('OAUTH')
    storage.remove('GITHUB')
  },

  SET_GITHUB: (state, { github }) => {
    state.GITHUB = github

    storage.set('GITHUB', github)
    storage.set('GITHUB_LOGIN', false)
  }
}
