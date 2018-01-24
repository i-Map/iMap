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
import { mapActions } from 'vuex'
import storage from 'store'
import logo from '@/assets/logo.png'

export default {
  name: "Auth",

  data() {
    return {
      logo,
      localLang: storage.get('lang') || 'zh-CN'
    }
  },

  methods: {
    ...mapActions({
      setLang: 'setLang'
    }),

    switchLang() {
      if (this.localLang === 'zh-CN') {
        this.localLang = 'en-US'
      } else {
        this.localLang = 'zh-CN'
      }

      this.$i18n.locale = this.localLang
      this.setLang(this.localLang)
    },
  }
}
</script>


<style lang="less">
@import './Auth.less';
</style>
