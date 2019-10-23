import Vue from 'vue'
import Router from 'vue-router'
// import { store } from '../store/store'
// console.log(store.state.now_app_name)
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../NumTwo/recommend')
    },
    // 二期以上
    {
      meta: {
        title: '首页'
      },
      path: '/',
      name: 'index',
      component: () => import('../NumVue/index')
    },
    {
      meta: {
        title: '首页'
      },
      path: '/index',
      name: 'index2',
      component: () => import('../NumVue/index')
    },
    {
      meta: {
        title: '榜单实时排名'
      },
      path: '/bangdan',
      name: 'bangdan',
      component: () => import('../NumVue/bangdan')
    },
    {
      meta: {
        title: 'App Store上下架监控'
      },
      path: '/application',
      name: 'application',
      component: () => import('../NumVue/application')
    },
    {
      meta: {
        title: '榜单更新监控'
      },
      path: '/monitor',
      name: 'monitor',
      component: () => import('../NumVue/monitor')
    },
    {
      meta: {
        title: '排名上升下降监控'
      },
      path: '/rank',
      name: 'rank',
      component: () => import('../NumVue/rank')
    },
    {
      meta: {
        title: '消息中心'
      },
      path: '/message',
      name: 'message',
      component: () => import('../NumVue/message')
    },
    {
      meta: {
        title: '登录'
      },
      path: '/login',
      name: 'login',
      component: () => import('../NumVue/login')
    },
    {
      meta: {
        title: '注册'
      },
      path: '/register',
      name: 'register',
      component: () => import('../NumVue/register')
    },
    {
      meta: {
        title: '密码找回'
      },
      path: '/code',
      name: 'code',
      component: () => import('../NumVue/code')
    },
    {
      meta: {
        title: '设置新密码'
      },
      path: '/setEcode',
      name: 'setEcode',
      component: () => import('../NumVue/setEcode')
    },
    {
      meta: {
        title: '设置新密码'
      },
      path: '/setTcode',
      name: 'setTcode',
      component: () => import('../NumVue/setTcode')
    },

    // =============================上面是芦的=============================
    // =============================下面是孟的=============================
    {
      path: '/the_world_map',
      name: 'the_world_map',
      component: () => import('../common/world_map/the_world_map')
    },

    {
      meta: {
        title: '榜单实时排名'
      },
      path: '/now_ranking',
      name: 'now_ranking',
      component: () => import('../ios/now_ranking')
    },
    {
      meta: {
        title: '同开发者应用'
      },
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
      meta: {
        title: '竞品对比'
      },
      path: '/goods_show',
      name: 'goods_show',
      component: () => import('../ios/goods_show')
    },
    {
      meta: {
        title: '关键词覆盖对比'
      },
      path: '/cover_compare',
      name: 'cover_compare',
      component: () => import('../ios/cover_compare')
    },
    {
      meta: {
        title: '应用信息'
      },
      path: '/app_message',
      name: 'app_message',
      component: () => import('../ios/app_message')
    },
    {
      meta: {
        title: '评分评论'
      },
      path: '/grade_start',
      name: 'grade_start',
      component: () => import('../ios/grade_start')
    },
    {
      meta: {
        title: '版本记录'
      },
      path: '/version_message',
      name: 'version_message',
      component: () => import('../ios/version_message')
    },
    {
      meta: {
        title: '榜单排名对比'
      },
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
      meta: {
        title: 'ASO关键词'
      },
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
      component: () => import('../keyword/result'),
      meta: {
        title: '关键词搜索结果',
        isBack: false, //true表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
        keepAlive: true //true此组件需要被缓存
      }
    },

    {
      meta: {
        title: '关键词搜索联想词'
      },
      path: '/think_word',
      name: 'think_word',
      component: () => import('../keyword/think_word')
    },
    {
      meta: {
        title: '搜索指数排名走势'
      },
      path: '/trend_many',
      name: 'trend_many',
      component: () => import('../keyword/trend_many')
    },
    {
      meta: {
        title: '搜索指数排名'
      },
      path: '/ranking',
      name: 'ranking',
      component: () => import('../keyword/ranking')
    },
    {
      meta: {
        title: '搜索结果数排名走势'
      },
      path: '/trend_one',
      name: 'trend_one',
      component: () => import('../keyword/trend_one')
    },
    {
      meta: {
        title: '热搜词'
      },
      path: '/hot_history',
      name: 'hot_history',
      component: () => import('../keyword/hot_history')
    },
    {
      meta: {
        title: '实时热搜'
      },
      path: '/hot_search',
      name: 'hot_search',
      component: () => import('../keyword/hot_search')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../common/test')
    },
    {
      path: '/country_select',
      name: 'country_select',
      component: () => import('../common/country_select/country')
    },
    // ================以下是孟的二期页面===============
    {
      path: '/bidding_word',
      name: 'bidding_word',
      component: () => import('../ams_bidding/bidding_word')
    },
    {
      path: '/app_monitoring',
      name: 'app_monitoring',
      component: () => import('../ams_bidding/app_monitoring')
    },
    {
      path: '/bidding_app',
      name: 'bidding_app',
      component: () => import('../ams_bidding/bidding_app')
    },
    {
      path: '/compete_manage',
      name: 'compete_manage',
      component: () => import('../compete_manage/compete_manage')
    },
    {
      path: '/compete_report',
      name: 'compete_report',
      component: () => import('../compete_manage/compete_report')
    },
    {
      path: '/compete_optimize',
      name: 'compete_optimize',
      component: () => import('../compete_manage/compete_optimize')
    },
    {
      path: '/ams_compete_word',
      name: 'ams_compete_word',
      component: () => import('../ios/ams_compete_word')
    },
    {
      path: '/apple_history',
      name: 'apple_history',
      component: () => import('../ios/apple_history')
    },
    {
      path: '/asm',
      name: 'asm',
      component: () => import('../hand_school/asm')
    },
    {
      path: '/ams_artical_details',
      name: 'ams_artical_details',
      component: () => import('../hand_school/ams_artical_details')
    },
    {
      path: '/activity_club',
      name: 'activity_club',
      component: () => import('../hand_school/activity_club')
    },
    {
      path: '/classes_details',
      name: 'classes_details',
      component: () => import('../hand_school/classes_details')
    },
    {
      path: '/activity_club_details',
      name: 'activity_club_details',
      component: () => import('../hand_school/activity_club_details')
    },
    {
      path: '/all',
      name: 'all',
      component: () => import('../hand_school/all')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  mode: 'history'
})
