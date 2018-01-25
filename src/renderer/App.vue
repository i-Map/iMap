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
  #app {
    width: 100%;
    min-height: 100vh;
    background-color: #FFFEFF;
  }

  .fadeInDown {
    animation-name: fadeInDown;
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  @keyframes fadeInDown {
    0% {
      opacity: .4;
      transform: translate3d(0,-20%,0);
    }

    100% {
      opacity: 1;
      transform: none;
    }
  }
</style>
