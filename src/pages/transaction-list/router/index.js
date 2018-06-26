import Vue from 'vue';
import Router from 'vue-router';
import TransactionList from '../components/TransactionList';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: TransactionList
    }
  ]
})
