<template lang="html">
  <div class="login-container">
    <div class="form-group has-feedback">
      <input class="form-control" type="text" v-model="model.email" :placeholder="$t('m.login.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <div class="form-group has-feedback">
      <input class="form-control" type="password" v-model="model.password" :placeholder="$t('m.login.input_password')">
      <span class="form-control-feedback fui-lock"></span>
    </div>

    <button class="form-group btn btn-primary" @click="login">
      {{ $t("m.login.submit") }}
    </button>

    <button class="form-group btn btn-inverse" @click="githubLogin">
      {{ $t("m.login.github") }}
      <span class="fui-github"></span>
    </button>

    <a class="link" @click="goForgetPassword">
      {{ $t("m.login.reset") }}
    </a>

    <a class="link" @click="goRegister">
      {{ $t("m.login.register") }}
    </a>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import tool from '@/tool/index.js'
import storage from 'store'
import mapApiKey from '@/key/mapApiKey.js'

export default {
  name: "Login",

  data() {
    return {
      loading: false,
      useGithubLogin: storage.get('useGithubLogin') || false,
      model: {
        email: '',
        password: ''
      },
    }
  },

  methods: {
    ...mapActions({
      setUserInfo: 'setUserInfo'
    }),

    goForgetPassword() {
      this.$router.push({
        name: 'ForgetPassword'
      })
    },

    goRegister() {
      this.$router.push({
        name: 'Register'
      })
    },

    login() {
      if (!tool.judgeEmail(this.model.email)) {
        this.$Message.error(this.$i18n.messages[this.$i18n.locale].m.message.login_email)
      } else if (!tool.judgePassword(this.model.password)) {
        this.$Message.error(this.$i18n.messages[this.$i18n.locale].m.message.login_password)
      } else {
        this.loginLoading = true
        this.$http.post({
          url: this.$url.LOGIN_EMAIL,
          data: this.model
        }).then(data => {
          this.loginLoading = false
          if(data.code === 0) {
            new window.Notification('iMap', {
              body: this.$i18n.messages[this.$i18n.locale].m.message.welcome,
              silent: true
            })
            storage.set('accessToken', data.data.accessToken)
            storage.set('userId', data.data.userId)
            storage.set('userInfo', data.data.userInfo)
            this.setUserInfo(data.data.userInfo)
            this.$router.push({
              name: 'Home'
            })
          }
        })
      }
    },

    getUrlData(name){
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
      const r = window.location.search.substr(1).match(reg)
      if (r != null)
      return unescape(r[2])
      return null;
    },

    githubLogin() {
      storage.set('useGithubLogin', true)
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=aade15b52a338bad73c5&redirect_uri=http://localhost:9080/#/auth/login'
    }
  },

  created() {
    const code = this.getUrlData('code') || ''
    console.log(document.cookie)
    if (this.useGithubLogin && code) {
      this.$Spin.show()
      this.$http.get({
        url: this.$url.LOGIN_GITHUB,
        data: {
          code: code
        }
      }).then(data => {
        this.$Spin.hide()
        storage.set('useGithubLogin', false)
        console.log(data)
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import './Login.less';
</style>
