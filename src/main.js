// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.prototype.$axios = axios
import router from './router'
import { store } from './store/store'

// 引入重置样式
import './common/reset.css'

// 引入字体样式
import './common/font/font.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// echarts 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
// 引入世界地图
import world from './common/world_map/config_world'
import './common/world_map/world.css'
Vue.prototype.pin_config = world.pin_config
Vue.prototype.map_config = world.map_config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
