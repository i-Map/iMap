<template lang="html">
  <div class="auth">
    <div class="auth-item">
      <img class="auth-item__logo" :src="logo">
    </div>
    <span class="bootstrap-switch-square mrl">
      <div :class="[
        'bootstrap-switch',
        'bootstrap-switch-wrapper',
        'bootstrap-switch-animate',
        'bootstrap-switch-id-custom-swaitch-lang',
        localLang === 'zh-CN'
          ? 'bootstrap-switch-on'
          : 'bootstrap-switch-off' ]"
        @click="switchLang">
        <div class="bootstrap-switch-container"><span class="bootstrap-switch-handle-on bootstrap-switch-primary">EN</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">中文</span><input type="checkbox" data-toggle="switch" data-on-label="<i class='fui-check'></i>" data-off-label="<i class='fui-cross'></i>" name="swaitch-lang">
        </div>
      </div>
    </span>
    <router-view class="auth-item__view"></router-view>
  </div>
</template>


<script>
import logo from '@/assets/logo.png'

export default {
  name: "Auth",

  data() {
    return {
      logo,
      localLang: 'zh-CN'
    }
  },

  methods: {
    switchLang() {
      if (this.localLang === 'zh-CN') {
        this.localLang = 'en-US'
      } else {
        this.localLang = 'zh-CN'
      }
      this.$i18n.locale = this.localLang
    },
  }
}
</script>


<style lang="less">
  // // @import '../../assets/my-theme/custom.less';
  .auth {
    width: 100%;
    height: 100vh;
    background-color: #59BBA5;
    &-item {
      padding: 10px 0 20px 0;
      text-align: center;
      &__logo {
        margin: 40px 10px 0 0;
        width: 80px;
        height: 80px;
      }
      &__view {
        position: fixed;
        top: 58%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 18px 18px;
        width: 400px;
        border-radius: 8px;
        background-color: #EDEEF1;
      }
    }
    .bootstrap-switch-square {
      position: fixed;
      top: 10px;
      left: 10px;
    }
  }

  // 覆盖 Flat UI 默认样式
  .form-control, .select2-search input[type=text] {
    border: 2px solid #EDEEF1;
  }

  .bootstrap-switch-primary~.bootstrap-switch-handle-off:before {
    background-color: #16A085;
  }
</style>
