import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Management from '@/pages/Management'
import test1 from '@/components/Test1'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
      children: [
        {
          path: 'test',
          name: 'test1',
          component: test1
        }
      ]
    }
  ]
})
