import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import { Message, Spin } from 'iview'

import '@/filter/index.js'
import 'iview/dist/styles/iview.css'
import '@/assets/lib/css/vendor/bootstrap/css/bootstrap.min.css'
import '@/assets/lib/css/flat-ui.min.css'
// import '@/assets/my-theme/dist/iview.css'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': require('@/common/lang/zh'),
    'en-US': require('@/common/lang/en')
  }
})

Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
