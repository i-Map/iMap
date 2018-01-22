<template lang="html">
  <div class="login-container">
    <div class="form-group has-feedback">
      <input class="form-control" type="text" v-model="emailLoginModel.email" :placeholder="$t('m.login.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <div class="form-group has-feedback">
      <input class="form-control" type="password" v-model="emailLoginModel.password" :placeholder="$t('m.login.input_password')">
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

    <imap-message class="message" :show="message.show" :msg="message.content" :type="message.type"></imap-message>
  </div>
</template>


<script>
var shell = require('electron').shell
import { mapActions } from 'vuex'
import tool from '@/tool/index.js'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
import storage from 'store'
import mapApiKey from '@/key/mapApiKey.js'
export default {
  name: "Login",
  data() {
    return {
      message: {
        type: '',
        show: false,
        content: ''
      },
      emailLoginModel: {
        email: '',
        password: ''
      },
      loginLoading: false
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
      if (!tool.judgeEmail(this.emailLoginModel.email)) {
        const lang = this.$i18n.locale
        if (lang === 'zh-CN') {
          this.$Message.error(this.$i18n.messages['zh-CN'].m.message.login_email)
        } else {
          this.$Message.error(this.$i18n.messages['en-US'].m.message.login_email)
        }
      }
      else if(!tool.judgePassword(this.emailLoginModel.password))
        this.$Message.error('请输入正确密码')
      else {
        this.loginLoading = true
        ajax.post({
          url: url.EMAILLOGIN,
          data: this.emailLoginModel
        }).then(data => {
          this.loginLoading = false
          if(data.code === 0) {
            new window.Notification('iMap', {
              body: '欢迎您使用 iMap , 想进一步了解 iMap 请移步帮助文档',
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
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null)
      return unescape(r[2]);
      return null;
    },

    githubLogin() {
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=aade15b52a338bad73c5&redirect_uri=http://localhost:9080/#/auth/login'
    }
  },

  created() {
    var code = this.getUrlData('code') || '';
    if (code) {
      ajax.get({
        url: 'https://api.imap.trevor.top/v1/oauth/github',
        data: {
          code: code
        }
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>


<style lang="less" scoped>
  // @import '../../assets/my-theme/custom.less';
  .login-container {
    .btn {
      width: 100%;
    }
    .link {
      margin: 0 0 6px 0;
      display: block;
      font-size: 14px;
      color: #AAA;
      transition: .25s;
      cursor: pointer;
      &:hover {
        color: #1abc9c;
      }
    }
    .message {
      position: fixed;
      top: -46%;
      left: -75%;
    }
  }
</style>
