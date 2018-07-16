import Vue from 'vue';
import Router from 'vue-router';
const LandingPage = () => import('@/components/landingpage.vue');
const RobinsonsStores = () => import('@/components/RobinsonsStores.vue');
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/robinsonsstores',
      name: 'RobinsonsStores',
      component: RobinsonsStores,
    },
  ],
});
