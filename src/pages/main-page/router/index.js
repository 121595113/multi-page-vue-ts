import Vue from 'vue'
import Router from 'vue-router'
const LandingPage = () => import('@/components/LandingPage')
const RobinsonsStores = () => import('@/components/RobinsonsStores')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/robinsonsstores',
      name: 'RobinsonsStores',
      component: RobinsonsStores
    }
  ]
})
