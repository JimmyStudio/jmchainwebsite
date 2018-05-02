import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Management from '@/pages/Management'
import Account from '@/components/Account'
import MyWorks from '@/components/MyWorks'
import Upload from '@/components/Upload'
import SoundMart from '@/pages/SoundMart'

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
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'works',
          name: 'MyWorks',
          component: MyWorks
        },
        {
          path: 'upload',
          name: 'Upload',
          component: Upload
        }
      ]
    },
    {
      path: '/sounds',
      name: 'SoundMart',
      component: SoundMart
    }
  ]
})
