import Vue from 'vue';
import Router from 'vue-router';
import Transactions from '../components/Transactions';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: Transactions
    }
  ]
})
