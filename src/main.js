// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.prototype.$axios = axios
//全局配置
axios.defaults.baseURL = 'http://39.97.234.11:8080'
// axios.defaults.baseURL = 'www.zshddata.com'
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

// 引入播放m3u8格式的视频插件
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

import 'videojs-contrib-hls'

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
