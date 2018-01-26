import randomNickname from '@/common/nickname'
import avatar_default from '@/assets/img/avatar-defalut.png'

export default {
  getNickname (state) {
    if (!state.USER.nickname) {
      const length = randomNickname.length
      const idx = ~~(0 + Math.random() * length)
      return randomNickname[idx]
    } else {
      return state.USER.nickname
    }
  },

  getAvatar (state) {
    if (!state.USER.avatar_url) {
      return avatar_default
    } else {
      return state.USER.avatar_url
    }
  },

  getEmail (state) {
    if (!state.USER.email) {
      return ''
    } else {
      return state.USER.email
    }
  }
}
