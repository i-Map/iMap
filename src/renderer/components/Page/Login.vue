<template lang="html">
  <div class="login-container" @keydown.enter="login">
    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="text" v-model="model.email" :placeholder="$t('m.login.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="password" v-model="model.password" :placeholder="$t('m.login.input_password')">
      <span class="form-control-feedback fui-lock"></span>
    </div>

    <button class="form-group btn btn-primary animated fadeInDown" @click="login">
      {{ $t("m.login.submit") }}
    </button>

    <button class="form-group btn btn-inverse animated fadeInDown" @click="githubLogin">
      {{ $t("m.login.github") }}
      <span class="fui-github"></span>
    </button>

    <a class="link animated fadeInDown" @click="goForgetPassword">
      {{ $t("m.login.reset") }}
    </a>

    <a class="link animated fadeInDown" @click="goRegister">
      {{ $t("m.login.register") }}
    </a>
  </div>
</template>


<script>
import tool from '@/tool/index.js'
import storage from 'store'

export default {
  name: "Login",

  data() {
    return {
      loading: false,
      useGithubLogin: storage.get('GITHUB_LOGIN') || false,
      model: {
        email: '',
        password: ''
      },
    }
  },

  methods: {
    goForgetPassword() {
      this.$router.push({ path: '/auth/reset' })
    },

    goRegister() {
      this.$router.push({ path: '/auth/register' })
    },

    login() {
      if (!tool.judgeEmail(this.model.email)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.login_email)
      } else if (!tool.judgePassword(this.model.password)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.login_password)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.loading)
          }
        }, this)

        this.$store.dispatch('LOGIN', {
          model: this.model
        }).then(() => this.$router.push({ path: '/auth/login'} ))
      }
    },

    getUrlData(e){
      const reg = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
      const r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },

    githubLogin() {
      storage.set('GITHUB_LOGIN', true)
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=aade15b52a338bad73c5&redirect_uri=http://localhost:9080/#/auth/login'
    }
  },

  created() {
    const code = this.getUrlData('code') || ''
    if (this.useGithubLogin && code) {
      this.$Spin.show({
        render: (h) => {
          return h('div', this.$i18n.messages[this.$i18n.locale].m.message.loading)
        }
      }, this)

      this.$store.dispatch('LOGIN_GITHUB', {
        code: code
      }).then(() => this.$router.push({ path: '/auth/login'} ))
    }
  }
}
</script>


<style lang="less" scoped>
@import './Login.less';
</style>
