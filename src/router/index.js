import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ios_header',
      name: 'ios_header',
      component: () => import('../ios/ios_header')
    },
    {
      path: '/the_world_map',
      name: 'the_world_map',
      component: () => import('../common/world_map/the_world_map')
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('../common/country_select/country')
    },
    {
      path: '/now_ranking',
      name: 'now_ranking',
      component: () => import('../ios/now_ranking')
    },
    {
      path: '/same_dev_app',
      name: 'same_dev_app',
      component: () => import('../ios/same_dev_app')
    },
    {
      path: '/goods_optimize',
      name: 'goods_optimize',
      component: () => import('../ios/goods_optimize')
    },
    {
      path: '/goods_show',
      name: 'goods_show',
      component: () => import('../ios/goods_show')
    },
    {
      path: '/cover_compare',
      name: 'cover_compare',
      component: () => import('../ios/cover_compare')
    },
    {
      path: '/app_message',
      name: 'app_message',
      component: () => import('../ios/app_message')
    },
    {
      path: '/grade_start',
      name: 'grade_start',
      component: () => import('../ios/grade_start')
    },
    {
      path: '/version_message',
      name: 'version_message',
      component: () => import('../ios/version_message')
    },
    {
      path: '/ranking_compare',
      name: 'ranking_compare',
      component: () => import('../ios/ranking_compare')
    },
    {
      path: '/ios_header',
      name: 'ios_header',
      component: () => import('../ios/ios_header')
    },
    {
      path: '/data_table',
      name: 'data_table',
      component: () => import('../ios/data_table')
    },
    {
      path: '/left_nav',
      name: 'left_nav',
      component: () => import('../ios/left_nav')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../keyword/result')
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
