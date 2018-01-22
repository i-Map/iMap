<template lang="html">
  <div class="message animated fadeInDown">
    <p v-if="show && type === 'warning'" class="message-item message-warning">
      <span class="fui-info-circle"></span>
      <span class="message-txt" v-if="keyWord === 'login_email'">{{ $t("m.message.login_email") }}</span>
      <span class="message-txt" v-if="keyWord === 'login_long_password'">{{ $t("m.message.login_long_password") }}</span>
      <span class="message-txt" v-if="keyWord === 'login_less_password'">{{ $t("m.message.login_less_password") }}</span>
    </p>

    <p v-if="show && type === 'question'" class="message-item message-question">
      <span class="fui-question-circle"></span>
      <span>{{ $t(`m.message.${ content }`) }}</span>
    </p>

    <p v-if="show && type === 'success'" class="message-item message-success">
      <span class="fui-check-circle"></span>
      <span>{{ $t("m.message") }}</span>
    </p>

    <p v-if="show && type === 'error'" class="message-item message-error">
      <span class="fui-cross-circle"></span>
      <span>{{ $t("m.message") }}</span>
    </p>
  </div>
</template>


<script>
export default {
  name: "Message",

  props: {
    show: {
      type: Boolean,
      default: false
    },
    useI18n: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    },
    keyWord: {
      type: String
    },
  },

  data() {
    return {
    }
  }
}
</script>


<style lang="less" scoped>
.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 30px;
  p {
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  span {
    line-height: 30px;
    vertical-align: middle;
  }
  &-txt {
    font-size: 14px;
  }
  &-item {
    width: 100vw;
    line-height: 30px;
    color: #FFF;
  }
  &-warning {
    background-color: #F39C12;
  }
  &-question {
    background-color: #E67E22;
  }
  &-success {
    background-color: #2ECC71;
  }
  &-error {
    background-color: #E74C3C;
  }
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
    opacity: 0;
    transform: translate3d(0,-20%,0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}
</style>