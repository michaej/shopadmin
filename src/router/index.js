import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'
/* eslint-disable */
Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
      import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard'
      }
    }]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

const asyncRouters = [
  // 商品管理
  {
    path: '/service',
    component: Layout,
    redirect: '/service/goodList',
    name: 'service',
    meta: {
      title: 'goods',
      icon: 'goods-manage'
    },
    children: [{
        path: 'good-list',
        component: () =>
          import('@/views/service/goodList'),
        name: 'goodsList',
        meta: {
          title: 'goodsList'
        },
        children: [{
          path: 'good-list',
          component: () =>
            import('@/views/service/goodList'),
          name: 'goodsList',
          meta: {
            title: 'goodsList'
          }
        }]
      },
      {
        path: 'goods-detail',
        component: () =>
          import('@/views/service/goodsDetail'),
        name: 'goodsDetail',
        hidden: true,
        meta: {
          title: 'goodsDetail'
        }
      }

    ]
  }

]

if (process.env.DISTRIBUTION) {
  // asyncRouters.push(disRouterMap)
}

export const asyncRouterMap = asyncRouters
