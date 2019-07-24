import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const manage = () => import('./views/manage')
const index = () => import('@/components/manage/index/index')
const login = () => import('@/components/manage/index/login')
const home = () => import('./views/home')
const zxmage = () => import('@/components/manage/home/zxmage/zxmage')
import usermage from '@/components/manage/home/zxmage/user-manage'
const postmage = () => import('@/components/manage/home/zxmage/post-manage')
const tagmage = () => import('@/components/manage/home/zxmage/tag-manage')
const setmager = () => import('@/components/manage/home/zxmage/setmager')
const server = () => import('@/components/manage/home/mserver/server')
const mframe = () => import('@/components/manage/home/mserver/mframe')
const sourceProperty = () =>
  import('@/components/manage/home/mserver/source-property')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/manage',
      name: 'manage',
      component: manage,
      redirect: { name: 'index' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: index
        },
        {
          path: 'login',
          name: 'login',
          component: login
        }
      ]
    },
    {
      path: '/manage/home',
      name: 'magehome',
      component: home,
      redirect: { name: 'zxmage' },
      children: [
        {
          path: 'zxmage',
          name: 'zxmage',
          component: zxmage,
          redirect: { name: 'usermage' },
          children: [
            {
              path: 'usermage',
              name: 'usermage',
              component: usermage
            },
            {
              path: 'postmage',
              name: 'postmage',
              component: postmage
            },
            {
              path: 'tagmage',
              name: 'tagmage',
              component: tagmage
            },
            {
              path: 'setmager',
              name: 'setmager',
              component: setmager
            }
          ]
        },
        {
          path: 'server',
          name: 'server',
          component: server,
          redirect: { name: 'frame' },
          children: [
            {
              path: 'frame',
              name: 'frame',
              component: mframe
            },
            {
              path: 'sourceProperty',
              name: 'sourceProperty',
              component: sourceProperty
            }
          ]
        }
      ]
    }
  ]
})
