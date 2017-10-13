<template lang="html">
  <div class="auth-container">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: "Auth",
  data() {
    return {
    }
  }
}
</script>


<style lang="less">
  @import '../../assets/my-theme/custom.less';
  .auth-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background-color: @primary-color;
    text-align: center;
    cursor: default;
  }
</style>
