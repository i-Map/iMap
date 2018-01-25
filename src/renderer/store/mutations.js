import * as Cookies from 'js-cookie'
import storage from 'store'

export default {
  SWITCH_LANG: (state, { lang }) => {
    state.LANG = lang

    storage.set('LANG', lang)
  },

  SET_USER: (state, { user, accessToken, oauth }) => {
    state.USER = user

    Cookies.set('ACCESSTOKEN', accessToken, {
      expires: 1,
      secure: false
    }),
    storage.set('USER', user)
    storage.set('OAUTH', oauth)
  },

  SET_GITHUB: (state, { github }) => {
    state.GITHUB = github

    storage.set('GITHUB', github)
    storage.set('GITHUB_LOGIN', false)
  }
}
