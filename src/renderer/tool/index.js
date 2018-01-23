const REGEX_EMAIL    = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
      REGEX_PASSWORD = /^(\w){4,25}$/,
      REGEX_PHONE    = /^1[34578]\d{9}$/,
      REGEX_NUM      = /[\d.]/

export default {
  judgeEmail(value) {
    return REGEX_EMAIL.test(value)
  },
  judgePassword(value) {
    return REGEX_PASSWORD.exec(value)
  },
  judgePhone(value) {
    return REGEX_PHONE.test(value)
  },
  judgeNum(value) {
    if(!/[\d.]/.test(value))
      return false
    else if(isNaN(value))
      return false
    else
      return true
  }
}
