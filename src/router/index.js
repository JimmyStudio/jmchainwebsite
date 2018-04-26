import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Upload from '@/pages/Upload'

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
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
