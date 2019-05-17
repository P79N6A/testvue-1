// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import QU from '@iqiyi-qu/ui'
import '@iqiyi-qu/ui/dist/qu-ui.css'
import tool from './ws/Tools'
// import MemberService from './ws/MemberService'
Vue.use(QU)
Vue.prototype.tool = tool;
Vue.config.productionTip = false
// Vue.prototype.MemberService = MemberService;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
