import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  { path: '*', redirect: '/404', hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/error-page/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/statisticsManage/dailyStatistics',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      name: 'index',
      meta: { title: 'index', icon: 'exit' }
    }]
  },
  {
    path: '/statisticsManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'statisticsManage',
    meta: {
      title: '统计分析',
      icon: 'statistics'
    },
    children: [
      { path: 'dailyStatistics', component: () => import('@/views/statistics-manage/dailyStatistics'), name: 'dailyStatistics', meta: { title: '每日统计', noCache: true }}
    ]
  },
  {
    path: '/updateInfo',
    component: Layout,
    redirect: 'userinfo',
    hidden: true,
    children: [{
      path: 'userinfo',
      component: () => import('@/views/user-info/updateInfo'),
      name: 'userinfo',
      hidden: true,
      meta: { title: '修改用户信息' }
    }]
  },
  {
    path: '/repayManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'repayManage',
    meta: {
      title: '还款管理',
      icon: 'merchant'
    },
    children: [
      { path: 'repayDetails', component: () => import('@/views/repay-manage/repayDetails'), name: 'repayDetails', meta: { title: '还款明细', noCache: true }}
    ]
  },
  {
    path: '/loanManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'loanManage',
    meta: {
      title: '借款管理',
      icon: 'channel'
    },
    children: [
      { path: 'loanDetails', component: () => import('@/views/loan-manage/loanDetails'), name: 'loanDetails', meta: { title: '放款明细', noCache: true }}
    ]
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [

]
