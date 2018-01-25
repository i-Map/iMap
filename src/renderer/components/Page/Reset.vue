<template lang="html">
  <div class="reset-container" @keydown.enter="reset">
    <div class="form-group has-feedback animated fadeInDown">
      <input class="form-control" type="text" v-model="model.email" :placeholder="$t('m.reset.input_email')">
      <span class="form-control-feedback fui-mail"></span>
    </div>

    <button class="form-group btn btn-info animated fadeInDown" @click="reset">
      {{ $t("m.reset.submit") }}
    </button>

    <a class="link animated fadeInDown" @click="goLogin">
      {{ $t("m.reset.login") }}
    </a>
  </div>
</template>


<script>
import tool from '@/tool/index.js'

export default {
  name: "Reset",

  data() {
    return {
      model: {
        email: ''
      }
    }
  },

  methods: {
    reset() {
      if (!tool.judgeEmail(this.model.email)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.reset_email)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.loading)
          }
        }, this)

        this.$store.dispatch('RESET', {
          model: this.model
        }).then(() => this.$router.push({ path: '/auth/login' }))
      }
    },
    goLogin() {
      this.$router.push({ path: '/auth/login' })
    }
  }
}
</script>


<style lang="less" scoped>
@import './Reset.less';
</style>