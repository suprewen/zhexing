import Vue from 'vue'
import Router from 'vue-router'

const zhexing = () => import('./views/zhexing')
const index = () => import('@/components/index/index')
const login = () => import('@/components/index/login')
const home = () => import('./views/home')
const settings = () => import('./views/settings')
const account = () => import('@/components/settings/account')
const password = () => import('@/components/settings/password')
const person = () => import('./views/person')
const search = () => import('./views/search')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: zhexing,
      redirect: { name: 'index' },
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/login',
          name: 'login',
          component: login
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      children: [
        {
          path: 'account',
          name: 'account',
          component: account
        },
        {
          path: 'password',
          name: 'password',
          component: password
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/:uname',
      name: 'person',
      component: person
    }
  ]
})
