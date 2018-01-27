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
@import './assets/theme.less';

#app {
  width: 100%;
  min-height: 100vh;
  background-color: @imap-bg;
  overflow-x: hidden;
  cursor: default;
}

::-webkit-scrollbar {
  display:none;
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

ol {
  list-style-type: decimal;
}

ul > li {
  list-style: disc;
}

.html-pre {
  &__content {
    img {
      max-width: 560px;
    }
  }
}

.sweet-title {
  & > h2 {
    line-height: 64px
  }
}
</style>
