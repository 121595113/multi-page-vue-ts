import 'lib-flexible';
import '@/common/globalComponent';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { Cordova } from 'fe-cordova';
import Axios from '@/plugins/axios';
import Device from '@/plugins/device';
import FetchData from '@/plugins/fetchdata';
import Router from '@/plugins/oriente-router';
import StatusBar from '@/plugins/statusbar';
import Track from '@/plugins/track';

let cordova: any;
if (Cordova.usable) {
  Cordova.registerPlugin('axios', Axios);
  Cordova.registerPlugin('device', Device);
  Cordova.registerPlugin('fetchData', FetchData);
  Cordova.registerPlugin('$router', Router);
  Cordova.registerPlugin('statusBar', StatusBar);
  Cordova.registerPlugin('track', Track);

  cordova = (window as any).cordova = new Cordova();
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});

router.beforeEach((to, from, next) => {
  const toApp = cordova && cordova.$router && cordova.$router.isNative(to.fullPath);
  if (toApp) {
    cordova.$router.push(to);
    return next(false);
  }
  return next();
});
