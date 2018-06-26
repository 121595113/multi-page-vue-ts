import Vue from 'vue'
import 'lib-flexible'
import App from './App'
import router from './router'
import VueCordova from 'oriente-vue-cordova'
import { isAndroid } from '@/utils/ua.js'

Vue.use(VueCordova)

Vue.config.productionTip = false

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '8080') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', `../cordova-${isAndroid ? 'android' : 'ios'}.js`)
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

router.beforeEach((to, from, next) => {
  let toApp = vm.$cordova.router && vm.$cordova.router.isNative(to.fullPath)
  if (toApp) {
    vm.$cordova.router.push(to)
    return next(false)
  }
  return next(true)
})
