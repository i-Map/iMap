<template lang="html">
  <div class="register-container" @keydown.enter="register">
    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="text" v-model="model.nickname" :placeholder="$t('m.register.input_username')">
      <span class="form-control-feedback fui-user"></span>
    </div>

    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="text" v-model="model.email" :placeholder="$t('m.register.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="password" v-model="model.password" :placeholder="$t('m.register.input_password')">
      <span class="form-control-feedback fui-lock"></span>
    </div>

    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="password" v-model="model.re_password" :placeholder="$t('m.register.input_repassword')">
      <span class="form-control-feedback fui-lock"></span>
    </div>

    <button class="form-group btn btn-success animated fadeInDown" @click="register">
      {{ $t("m.register.submit") }}
    </button>

    <a class="link animated fadeInDown" @click="goLogin">
      {{ $t("m.register.login") }}
    </a>
  </div>
</template>


<script>
import tool from '@/tool/index.js'

export default {
  name: "Register",

  data() {
    return {
      model: {
        nickname: '',
        email: '',
        re_password: '',
        password: ''
      }
    }
  },

  methods: {
    goLogin() {
      this.$router.push({ path: '/auth/login' })
    },
    register() {
      if (!this.model.nickname) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.register_username)
      } else if (!tool.judgeEmail(this.model.email)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.register_email)
      } else if (this.model.re_password !== this.model.password) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.register_repassword)
      } else if (!tool.judgePassword(this.model.password)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.register_password)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.loading)
          }
        }, this)

        this.$store.dispatch('REGISTER', {
          model: this.model
        }).then(() => this.$router.push({ path: '/auth/login' }))
      }
    }
  }
}
</script>


<style lang="less" scoped>
@import './Register.less';
</style>