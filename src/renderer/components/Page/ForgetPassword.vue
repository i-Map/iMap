<template lang="html">
  <div class="forgetPassword-conatiner">
    <h1 class="forgetPassword-logo"><Icon type="android-map"></Icon>iMap</h1>
    <Input icon="ios-email-outline" v-model="forgetPasswordModel.email" placeholder="请输入邮箱" style="width: 300px"></Input>
    <Button v-if="!this.forgetPasswordLoading" class="forgetPassword-btn" type="primary" style="width: 300px" @click="forgetPassword">发送邮件</Button>
    <Button v-else class="forgetPassword-btn" type="primary" style="width: 300px" loading>邮件发送中...</Button>
    <div class="forgetPassword-text">
      <a @click="goLogin">登录</a>
    </div>
  </div>
</template>


<script>
import tool from '@/tool/index.js'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
export default {
  name: "ForgetPassword",
  data() {
    return {
      forgetPasswordModel: {
        email: ''
      },
      forgetPasswordLoading: false
    }
  },
  methods: {
    forgetPassword() {
      if(!tool.judgeEmail(this.forgetPasswordModel.email))
        this.$Message.error('请输入正确邮箱')
      else {
        this.forgetPasswordLoading = true
        ajax.post({
          url: url.FORGETPASSWORD,
          data: this.forgetPasswordModel
        }).then(data => {
          this.forgetPasswordLoading = false
          if(data.code === 0) {
            this.$router.push({
              name: 'Login'
            })
          }
        })
      }
    },
    goLogin() {
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>


<style lang="less">
  // @import '../../assets/my-theme/custom.less';
  .forgetPassword-conatiner {
    .forgetPassword-logo {
      margin-top: 20px;
      margin-bottom: 50px;
      color: #D3D3D3;
      cursor: default;
    }
    input {
      margin-bottom: 16px;
    }
    .forgetPassword-btn {
      background-color: #1E1E21;
    }
    p {
      padding: 10px 0;
      font-size: 14px;
    }
    .forgetPassword-text {
      margin: 50px 0;
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

  .ivu-input {
    border: none;
  }

  .ivu-input:hover {
    border: none;
    background-color: #131414;
  }

  .ivu-input:focus {
    background: #131414;
  }

  .ivu-icon.ivu-icon-android-map {
    margin-right: 10px;
  }

  .ivu-input-group {
    margin-bottom: 12px;
    margin-left: auto;
    margin-right: auto;
  }

  .ivu-input-group-append {
    background-color: #1E1E21
  }
</style>