import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import notfound from '@/components/notfound'
import stulist from '@/components/student/stulist'
import worklist from '@/components/student/worklist'
import echarts from '@/components/echarts'
import map from '@/components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      component: home,
      hidden:true
    },
    {
      path: '/home',
      name: '学生管理',
      component: home,
      icon:'el-icon-user-solid',
      children:[
        {
          path: '/home/stulist',
          name: '学生列表',
          icon:'el-icon-user',
          component:stulist
        },
        {
          path: '/home/worklist',
          name: '作业列表',
          icon:'el-icon-tickets',
          component:worklist
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path: '/total',
      name: '数据统计',
      icon:'el-icon-pie-chart',
      component: home,
      children:[
        {
          path: '/total/pic',
          name: '学生数据',
          icon:'el-icon-s-data',
          component:echarts
        },
        {
          path: '/total/map',
          name: '地图数据',
          icon:'el-icon-location',
          component:map
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: notfound,
      hidden:true
    }
  ]
})
