import Vue from 'vue';
import '../scss/base.scss';
import 'normalize.css';

import { NavBar, Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Vue.use(NavBar);

const message = {
  'en-US': {
    vanDialog: {
      confirm: 'OK',
    },
  },
};

Locale.add(message);
Locale.use('en-US', enUS);
