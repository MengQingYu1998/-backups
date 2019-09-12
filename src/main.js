// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 各种css
// 引入重置样式
import './common/reset.css'
// 引入字体样式
import './common/font/font.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/world_map/world.css'
// 引入播放m3u8格式的视频插件
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$axios = axios
//全局配置
axios.defaults.baseURL = 'http://39.97.234.11:8080'
// axios.defaults.headers = {
//   'Access-Control-Allow-Headers': '*'
// }
// axios.defaults.baseURL = 'www.zshddata.com'
// 引入滚动插件
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
// 引入element-ui
import ElementUI from 'element-ui'
Vue.use(ElementUI, { zIndex: 300 })
// echarts 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 引入世界地图
import world from './common/world_map/config_world'

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

import 'videojs-contrib-hls'

Vue.prototype.pin_config = world.pin_config
Vue.prototype.map_config = world.map_config
Vue.prototype.globalClick = function(callback) {
  document.getElementById('body').onclick = function() {
    callback()
  }
}

Vue.prototype.refresh_save_vuex = function(parm) {
  if (sessionStorage.getItem('store')) {
    parm.$store.replaceState(
      Object.assign(
        {},
        parm.$store.state,
        JSON.parse(sessionStorage.getItem('store'))
      )
    )
  }
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(parm.$store.state))
  })
}
Vue.prototype.hand_save_vuex = function(parm) {
  sessionStorage.setItem('store', JSON.stringify(parm.$store.state))
  if (sessionStorage.getItem('store')) {
    parm.$store.replaceState(
      Object.assign(
        {},
        parm.$store.state,
        JSON.parse(sessionStorage.getItem('store'))
      )
    )
  }
}
import { store } from './store/store'
import App from './App'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
