import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/NotificationList';
import Detail from '../components/NotificationDetail';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: List
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    }
  ]
})
