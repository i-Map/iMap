const REGEX_EMAIL    = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
      REGEX_PASSWORD = /^(\w){6,20}$/,
      REGEX_PHONE    = /^1[34578]\d{9}$/

export default {
  judgeEmail(value) {
    return REGEX_EMAIL.test(value)
  },
  judgePassword(value) {
    return REGEX_PASSWORD.exec(value)
  },
  judgePhone(value) {
    return REGEX_PHONE.test(value)
  }
}
