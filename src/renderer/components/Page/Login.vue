<template lang="html">
  <div class="login-conatiner">
    <h1 class="login-logo"><Icon type="android-map"></Icon></Icon>iMap</h1>
    <Input icon="ios-email-outline" v-model="emailLoginModel.email" placeholder="请输入邮箱" style="width: 300px"></Input>
    <Input type="password" icon="ios-locked-outline" v-model="emailLoginModel.password" placeholder="请输入密码" style="width: 300px"></Input> 
    <Button v-if="!loginLoading" class="login-btn" type="primary" style="width: 300px" @click="login">登录</Button>
    <Button v-else class="login-btn" type="primary" style="width: 300px" loading>登录中...</Button>
    <div class="login-text">
      <a @click="goForgetPassword">忘记密码？</a>
    </div>
    <div class="login-text">    
      <a @click="goRegister">注册</a>
    </div>    
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import tool from '@/tool/index.js'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
import storage from 'store'
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
</style>
