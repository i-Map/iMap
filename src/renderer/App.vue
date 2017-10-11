<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'imap'
  }
</script>

<style lang="less">
  @import './assets/my-theme/custom.less';
  .ivu-message-custom-content {
    span {
      color: @primary-color
    }
  }
</style>
