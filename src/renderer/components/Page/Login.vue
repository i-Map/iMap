<template lang="html">
  <div class="login-conatiner">
    <h1 class="login-logo"><Icon type="android-map"></Icon></Icon>iMap</h1>
    <Input icon="ios-email-outline" v-model="emailLoginModel.email" placeholder="请输入邮箱" style="width: 300px"></Input>
    <Input type="password" icon="ios-locked-outline" v-model="emailLoginModel.password" placeholder="请输入密码" style="width: 300px"></Input>
    <Button v-if="!loginLoading" class="login-btn" type="primary" style="width: 300px" @click="login">登录</Button>
    <Button v-else class="login-btn" type="primary" style="width: 300px" loading>登录中...</Button>
    <Button @click="github">GitHub</Button>
    <div class="login-text">
      <a @click="goForgetPassword">忘记密码？</a>
    </div>
    <div class="login-text">
      <a @click="goRegister">注册</a>
    </div>
  </div>
</template>


<script>
var shell = require('electron').shell;
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
      if (!tool.judgeEmail(this.emailLoginModel.email))
        this.$Message.error('请输入正确邮箱')
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

    github() {
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
  @import '../../assets/my-theme/custom.less';
  .login-conatiner {
    .login-logo {
      margin-top: 20px;
      margin-bottom: 50px;
      color: #D3D3D3;
      cursor: default;
    }
    input {
      margin-bottom: 16px;
    }
    .login-btn {
      background-color: #1E1E21;
    }
    p {
      padding: 10px 0;
      font-size: 14px;
    }
    .login-text {
      margin: 16px 0;
    }
    a {
      font-size: 14px;
      color: #C0C0C0;
      transition: color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: #7193D9;
      }
    }
  }

  webview {
    display:inline-flex;
    width:640px;
    height:480px;
  }
  webview.hide {
    flex: 0 1;
    width: 0px;
    height: 0px;
  }
</style>
