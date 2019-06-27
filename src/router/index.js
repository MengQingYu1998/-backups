import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/result',
      name: 'result',
      component: () => import('../keyword/result')
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('../common/country')
    },
    {
      path: '/think_word',
      name: 'think_word',
      component: () => import('../keyword/think_word')
    },
    {
      path: '/trend_many',
      name: 'trend_many',
      component: () => import('../keyword/trend_many')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../keyword/ranking')
    },
    {
      path: '/trend_one',
      name: 'trend_ones',
      component: () => import('../keyword/trend_one')
    },
    {
      path: '/hot_history',
      name: 'hot_history',
      component: () => import('../keyword/hot_history')
    },
    {
      path: '/hot_search',
      name: 'hot_search',
      component: () => import('../keyword/hot_search')
    }
  ],
  mode: 'history'
})
