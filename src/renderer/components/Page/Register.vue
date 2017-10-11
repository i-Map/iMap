<template lang="html">
  <div class="register-conatiner">
    <h1 class="register-logo"><Icon type="android-map"></Icon>iMap</h1>
    <Input icon="ios-email-outline" v-model="registerModel.email" placeholder="请输入邮箱" style="width: 300px"></Input>
    <Input icon="android-call" v-model="registerModel.phone" placeholder="请输入手机号" style="width: 300px"></Input>    
    <Input type="password" icon="ios-locked-outline" v-model="password_1" placeholder="请输入密码" style="width: 300px"></Input> 
    <Input type="password" icon="ios-locked-outline" v-model="registerModel.password" placeholder="请确认密码" style="width: 300px"></Input>     
    <Button v-if="!registerLoading" class="register-btn" type="primary" style="width: 300px" @click="register">注册</Button>
    <Button v-else class="register-btn" type="primary" style="width: 300px" loading>注册中...</Button>
    <div class="register-text">    
      <a @click="goLogin">登录</a>
    </div>    
  </div>
</template>


<script>
import tool from '@/tool/index.js'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
export default {
  name: "Register",
  data() {
    return {
      registerModel: {
        email: '',
        phone: '',
        password: ''
      },
      password_1: '',
      registerLoading: false
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    register() {
      if(!tool.judgeEmail(this.registerModel.email))
        this.$Message.error('请输入正确邮箱')
      else if(!tool.judgePhone(this.registerModel.phone))
        this.$Message.error('请输入正确手机号')
      else if(this.password_1 !== this.registerModel.password)
        this.$Message.error('两次密码不一致')
      else if(!tool.judgePassword(this.registerModel.password))
        this.$Message.error('密码应为6-20位')
      else {
        this.registerLoading = true
        ajax.post({
          url: url.REGISTER,
          data: this.registerModel
        }).then(data => {
          this.registerLoading = false
          if(data.code === 0) this.$router.push({ name: 'Login' })
        })
      } 
    }
  }
}
</script>


<style lang="less" scoped>
  @import '../../assets/my-theme/custom.less';
  .register-conatiner {
    .register-logo {
      margin-top: 20px;
      margin-bottom: 50px;
      color: #D3D3D3;
      cursor: default;
    }
    input {
      margin-bottom: 16px;
    }
    .register-btn {
      background-color: #1E1E21;
    }
    p {
      padding: 10px 0;  
      font-size: 14px; 
    }
    .register-text {
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