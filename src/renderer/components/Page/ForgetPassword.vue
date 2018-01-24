<template lang="html">
  <div class="forgetPassword-container" @keydown.enter="forgetPassword">
    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="text" v-model="model.email" :placeholder="$t('m.forgetPassword.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <button class="form-group btn btn-info animated fadeInDown" @click="forgetPassword">
      {{ $t("m.forgetPassword.submit") }}
    </button>

    <a class="link animated fadeInDown" @click="goLogin">
      {{ $t("m.forgetPassword.login") }}
    </a>
  </div>
</template>


<script>
import tool from '@/tool/index.js'

export default {
  name: "ForgetPassword",

  data() {
    return {
      model: {
        email: ''
      }
    }
  },

  methods: {
    forgetPassword() {
      if (!tool.judgeEmail(this.model.email)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.forgetPassword_email)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.loading)
          }
        }, this)

        this.$http.post({
          url: this.$url.FORGETPASSWORD,
          data: this.model
        }).then(() => {
          this.$router.push({ path: '/auth/login' })
        })
      }
    },
    goLogin() {
      this.$router.push({ path: '/auth/login' })
    }
  }
}
</script>


<style lang="less" scoped>
@import './ForgetPassword.less';
</style>