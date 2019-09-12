import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // 初始化状态
    now_app_id: null,
    now_app_id02: null,
    now_app_name: null,
    now_country_name: null,
    HistoryList: []
  },
  mutations: {
    // 处理状态
  },
  actions: {
    // 提交改变后的状态
  },
  getters: {
    //处理列表项
  }
})
