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
    HistoryList: [],
    nav_input_value: '',
    hot_search_to_hot_history_equipmentValue: ''
    // ranking_to_result_equipmentValue: ''
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
