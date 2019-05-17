import Vue from 'vue'
import Router from 'vue-router'
import ScenePage from '@/pages/ScenePage'
import Login from '../pages/Login'
import MaterialBank from '../pages/MaterialBank'
import MaterialDetail from '../pages/MaterialDetail'
import DimensionExpansion from '../pages/DimensionExpansion'
import HistoricalTask from '../pages/HistoricalTask'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/scene', name: 'ScenePage', component: ScenePage },
    {
      path:'/',component:ScenePage
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/library',
      component:MaterialBank
    },
    {
      path:'/MaterialDetail',
      component:MaterialDetail
    },
    {
      path:'/DimensionExpansion',
      component:DimensionExpansion
    },
    {
      path:'/HistoricalTask',
      component:HistoricalTask
    }
  ]
})
