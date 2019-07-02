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

// 引入国家选择插件
// import $ from 'jquery'
// import './common/country_select/select_gj.css'
// import './common/country_select/select_gj.min.js'
// import './common/country_select/select2_1.js'

// 按需引入element-ui
import {
  Input,
  Select,
  Option,
  DatePicker,
  TabPane,
  Tabs,
  Button,
  Breadcrumb,
  Radio,
  RadioGroup,
  RadioButton,
  BreadcrumbItem,
  Pagination,
  Timeline,
  TimelineItem,
  Rate,
  Progress
} from 'element-ui'
Vue.use(Progress)
Vue.use(Rate)
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Button)

// echarts 图表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
