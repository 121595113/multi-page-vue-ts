import {
  // DatetimePlugin,
  ConfigPlugin,
  // BusPlugin,
  LocalePlugin,
  // DevicePlugin,
  // ToastPlugin,
  AlertPlugin
  // ConfirmPlugin,
  // LoadingPlugin,
  // WechatPlugin,
  // AjaxPlugin,
  // AppPlugin
} from 'vux'

import vuxLocales from '@/locales/all.yml'
import componentsLocales from '@/locales/components.yml'
import Vue from 'vue'
import vuexI18n from 'vuex-i18n'
import Vuex from 'vuex'
Vue.use(Vuex)

// i18n
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

const finalLocales = {
  'en': Object.assign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': Object.assign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

Vue.use(LocalePlugin)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})
const nowLocale = Vue.locale.get()

if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}
// Vue.use(AppPlugin, store)
// Vue.use(DevicePlugin)
// Vue.use(CloseDialogsPlugin)
// Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
// Vue.use(ConfirmPlugin)
// Vue.use(LoadingPlugin)
// Vue.use(WechatPlugin)
// Vue.use(AjaxPlugin)
// Vue.use(BusPlugin)
// Vue.use(DatetimePlugin)
