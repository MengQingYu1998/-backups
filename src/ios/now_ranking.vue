<template>
  <div id="now_ranking" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="top">
          <div class="section_title">实时排名</div>
          <table>
            <thead v-if="response_data_first_title">
              <tr>
                <th>{{response_data_first_title[0]}}</th>
                <th>{{response_data_first_title[1]}}</th>
                <th>{{response_data_first_title[2]}}</th>
                <th>{{response_data_first_title[3]}}</th>
              </tr>
            </thead>
            <tbody v-if="response_data_first">
              <tr v-for="(item ,index) in response_data_first" :key="'first'+index">
                <td>
                  <div class="rankingChangeFontColor">{{item[0]}}</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">{{item[1]}}</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">{{item[2]}}</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">{{item[3]}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <!-- 第二部分 -->
        <section class="middle_top">
          <div class="section_title">排名走势</div>
          <div class="btn_group">
            <div class="classify">
              <div>类型</div>
              <div>
                <el-radio-group v-model="middle_top_radio1" size="mini">
                  <el-radio-button label="按分钟"></el-radio-button>
                  <el-radio-button label="按小时"></el-radio-button>
                  <el-radio-button label="按天"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="classify middle_top_time">
              <div>时间</div>
              <div @click="click_second_el_radio">
                <el-radio-group v-model="middle_top_radio3" size="mini">
                  <el-radio-button
                    label="今日"
                    v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'"
                  ></el-radio-button>
                  <el-radio-button
                    label="昨日"
                    v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'"
                  ></el-radio-button>
                  <el-radio-button
                    label="7天"
                    v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按分钟'||middle_top_radio1=='按天'"
                  ></el-radio-button>
                  <el-radio-button
                    label="30天"
                    v-show="middle_top_radio1=='按小时'||middle_top_radio1=='按天'"
                  ></el-radio-button>
                  <el-radio-button
                    label="180天"
                    v-show="middle_top_radio1=='按天'||middle_top_radio1=='按天'"
                  ></el-radio-button>
                  <el-radio-button label="360天" v-show="middle_top_radio1=='按天'"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_01">
              <!-- <div>时间</div> -->
              <div @click="click_second_el_date_picker">
                <el-date-picker
                  v-model="middle_top_time01"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="middle_top_pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="classify">
              <div>榜单分类</div>
              <div>
                <el-radio-group v-model="middle_top_radio2" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="免费"></el-radio-button>
                  <el-radio-button label="付费"></el-radio-button>
                  <el-radio-button label="畅销"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div
            class="table_title"
            v-if="response_data_second"
          >【{{response_data_second.appName}}】排名走势</div>

          <div ref="EChart_now_ranking" class="myChart" v-show="is_show_mychart"></div>

          <div class="myChart" v-show="!is_show_mychart">暂无数据</div>

          <div>
            <div
              class="show_all"
              v-show="!canvas_is_show_all"
              @click="selected_data_function(true)"
            >显示所有</div>
            <div
              class="show_all"
              v-show="canvas_is_show_all"
              @click="selected_data_function(false)"
            >隐藏所有</div>
          </div>
        </section>

        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <!-- 第三部分 -->
        <section class="middle_bottom">
          <div class="section_title">全球排名</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue01">
                  <el-option
                    v-for="item in equipment01 "
                    :key="'equipment01'+item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="classify">
              <div>分类</div>
              <div v-if="response_data_third">
                <el-radio-group v-model="radio3" size="mini">
                  <el-radio-button
                    v-for="(item, index) in response_data_third.data_1.genreList"
                    :key="'button'+index"
                    :label="item.genreName"
                  ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="world_map">
            <div>
              <world_map
                v-if="is_show_map"
                :country_temp01="country_temp01"
                :country_temp02="country_temp02"
                :country_temp03="country_temp03"
                :country_temp04="country_temp04"
              />
            </div>
            <div class="level">
              <div class="one_level">
                <div></div>
                <div>1</div>
              </div>
              <div class="four_level">
                <div></div>
                <div>2-500</div>
              </div>
              <div class="two_level">
                <div></div>
                <div>501-1000</div>
              </div>
              <div class="three_level">
                <div></div>
                <div>1001-5000</div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>数量</th>
                <th>地区</th>
              </tr>
            </thead>
            <tbody v-if="response_data_third">
              <tr v-for="(item, index) in response_data_third.data_0" :key="'table01'+index">
                <td class="td_width01">
                  <div class="rankingChangeFontColor">{{item.RankingInterval}}</div>
                </td>

                <td class="td_width02">
                  <div
                    v-for="(item_td, index_td) in item.GenreCountryList"
                    :key="'table01_td'+index_td"
                  >
                    <div v-if="item_td.genreName==radio3">
                      <div>{{item_td.Num}}</div>
                    </div>
                  </div>
                </td>
                <td class="td_width03">
                  <div
                    v-for="(item_td, index_td) in item.GenreCountryList"
                    :key="'table01_td'+index_td"
                  >
                    <div v-if="item_td.genreName==radio3" class="flex_div">
                      <div
                        class="rankingChangeFontColor"
                        v-for="(item_div, index_div) in item_td.data"
                        :key="'table01_div'+index_div"
                      >
                        <div class="font_img">
                          <img :src="'../../static/flag/'+item_div.CountryCode+'.svg'" />
                          <!-- <img src="../../static/flag/HK.svg" /> -->
                          {{item_div.CountryName}}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <!-- 第四部分 -->
        <section class="bottom">
          <div class="section_title">全球排名明细表</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue01">
                  <el-option v-for="item in equipment01 " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr v-if="response_data_third">
                <th>国家/地区</th>
                <th
                  v-for="(item, index) in response_data_third.data_1.genreList"
                  :key="'table555'+index"
                >{{item.genreName}}</th>
              </tr>
            </thead>
            <tbody v-if="response_data_third">
              <tr
                v-for="(item, index) in response_data_third.data_1.list"
                :key="'table06785'+index"
              >
                <td class="table_width01">
                  <!-- <img src="../assets/flag/HK.svg" /> -->
                  <!-- {{'../assets/flag/'+item.CountryCode+'.svg'}} -->

                  <div class="rankingChangeFontColor font_and_img">
                    <img :src="'../../static/flag/'+item.CountryCode+'.svg'" />
                    {{item.CountryName}}
                  </div>
                </td>
                <td v-for="(item_son, index) in item.list" :key="'table06sss785'+index">
                  <div class="rankingChangeFontColor">{{item_son.rankID}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
import world_map from '../common/world_map/the_world_map'
// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'now_ranking',
  components: { ios_header, left_nav, world_map },
  data() {
    return {
      // 第一部分图表的数据
      // 第一部分图表的数据
      // 第一部分图表的数据
      now_country: sessionStorage.getItem('now_country_name'),
      response_data_first: null,
      response_data_first_title: null,
      // 第二部分折线图数据
      // 第二部分折线图数据
      // 第二部分折线图数据
      is_show_mychart: false,

      response_data_second: null,
      middle_top_radio1: '按天',
      middle_top_radio2: '全部',
      middle_top_radio3: '7天',
      middle_top_time01: '',
      middle_top_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      // 控制折线图显示所有
      canvas_is_show_all: true,
      //canvas 关键词data数组
      keyword_data: [],
      // 数据
      keyword_data_value: null,
      // X轴文本
      xAxis_data: [],
      // 控制折线显隐
      selected_data: {},
      // can_inverse: true, //X轴位置问题
      yAxis_max: 5, //Y轴值的问题

      // =============================请求第三部分数据=============================
      // =============================请求第三部分数据=============================
      // =============================请求第三部分数据=============================
      response_data_third: null,
      // 世界地图数据
      is_show_map: true,
      country_temp01: [], //第一
      country_temp02: [], //第2-500
      country_temp03: [], //第501-1000
      country_temp04: [], //第1001-5000
      // 单选按钮组
      radio3: '',
      // 设备选择
      equipment01: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue01: 'iPhone'
    }
  },

  created: function() {
    // console.log(this.$route.query.now_app_id)
    // console.log(this.$route.query.now_app_name)
    if (this.$route.query.now_app_id && this.$route.query.now_app_name) {
      this.$store.state.now_app_id = this.$route.query.now_app_id
      this.$store.state.now_app_name = this.$route.query.now_app_name
    }

    this.get_data_first()
    this.get_data_second()
    this.get_data_third()
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_first()
      this.get_data_second()
    })
    this.$watch('middle_top_time01', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('middle_top_radio1', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)

      // 2.解决切换之后380天消失了的bug
      if (this.middle_top_radio1 == '按分钟') {
        this.middle_top_radio3 = '今日'
      } else if (this.middle_top_radio1 == '按小时') {
        this.middle_top_radio3 = '今日'
      } else if (this.middle_top_radio1 == '按天') {
        this.middle_top_radio3 = '7天'
      }
      this.get_data_second()
    })
    this.$watch('middle_top_radio2', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
    this.$watch('middle_top_radio3', function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
    this.$watch('equipmentValue01', function(newValue, oldValue) {
      this.get_data_third()
    })
    this.$watch('radio3', function(newValue, oldValue) {
      this.send_data_to_world_map()
      this.draw_world_map()
    })
  },
  methods: {
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    get_data_first() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          // 1:iPhone 2:ipad
          // console.log(country_id)

          let url = '/PostRealTimeRank'
          // console.log(url)
          // let appId = 472208016
          let appId = this.$store.state.now_app_id
          let data = { appId: appId, countryId: country_id }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              if (
                response.data.Data.rank_0 != null &&
                response.data.Data.rank_1 != null &&
                response.data.Data.rank_2 != null
              ) {
                // console.log(response.data.Data)
                this.response_data_first = response.data.Data
                this.response_data_first_title = response.data.Data.rank_0
                // this.response_data_first.splice(0, 1)
                delete this.response_data_first.rank_0
              }
              // console.log('==================第一部分====================')
              // console.log(this.response_data_first)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // =============================请求第二部分数据=============================
    // =============================请求第二部分数据=============================
    // =============================请求第二部分数据=============================
    get_data_second() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          // console.log('获取国家ID')

          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据
          //      middle_top_radio1: '按分钟',
          // middle_top_radio2: '全部',
          // middle_top_radio3: '30天',
          let endDate, startDate
          if (this.middle_top_radio3 == '今日') {
            startDate = formatDate(new Date(), 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '昨日') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '7天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 7)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '30天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 30)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '180天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 180)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '360天') {
            let yesterday = new Date()
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 380)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '') {
            let middle_top_time01 = this.middle_top_time01
            startDate = formatDate(middle_top_time01[0], 'yyyy-MM-dd')
            endDate = formatDate(middle_top_time01[1], 'yyyy-MM-dd')
          }
          // console.log(endDate)
          // console.log('=================')
          // console.log(startDate)
          let brand
          if (this.middle_top_radio2 == '全部') {
            brand = 0
          } else if (this.middle_top_radio2 == '免费') {
            brand = 1
          } else if (this.middle_top_radio2 == '付费') {
            brand = 2
          } else if (this.middle_top_radio2 == '畅销') {
            brand = 3
          }
          let timeType
          if (this.middle_top_radio1 == '按分钟') {
            timeType = 1
          } else if (this.middle_top_radio1 == '按小时') {
            timeType = 2
          } else if (this.middle_top_radio1 == '按天') {
            timeType = 3
          }
          // let appId = 472208016
          let appId = this.$store.state.now_app_id
          // console.log('999999999999999999999')
          // console.log('endDate=' + endDate)
          // console.log('startDate=' + startDate)
          // console.log('country_id=' + country_id)
          // console.log('brand=' + brand)
          // console.log('timeType=' + timeType)
          // console.log('appId=' + appId)
          // console.log('device=' + 1)
          let url = '/PostRandTrend'
          let data = {
            appids: appId,
            countryId: country_id,
            startDate: startDate,
            endDate: endDate,
            brand: brand,
            timeType: timeType,
            device: 1
          }

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log(response.data)
              if (response.data.Data.length > 0) {
                this.selected_data_function(false)
                console.log('有数据')
                this.is_show_mychart = true
                this.response_data_second = response.data.Data[0]
                this.xAxis_data.length = 0

                let temp02 = this.response_data_second.rankTrendInfo.r2.data
                this.xAxis_data = temp02.map(element => {
                  // return timestamp(element, 'Y/M/D')
                  if (this.middle_top_radio1 == '按天') {
                    return timestamp(element, 'Y/M/D')
                  } else if (this.middle_top_radio1 == '按小时') {
                    return timestamp(element, 'Y/M/D h')
                  } else if (this.middle_top_radio1 == '按分钟') {
                    return timestamp(element, 'Y/M/D h:s')
                  }
                })

                // 都谁？ 抖音 快手 内涵
                this.keyword_data = this.response_data_second.rankTrendInfo.RankList

                this.keyword_data_value = response.data.Data[0].rankTrendInfo.r3

                // console.log(this.keyword_data_value)
                // ==================找数组最大值====================
                let max_value_arr = []
                this.keyword_data_value.forEach(element => {
                  max_value_arr.push(element.slice(0))
                })
                let max_value = 0
                max_value_arr.forEach(element => {
                  element.forEach(element_son => {
                    // console.log(element_son)
                    element_son = parseInt(element_son)
                    if (max_value <= element_son) {
                      max_value = element_son
                    }
                  })
                })
                // console.log(max_value)
                // this.yAxis_max = max_value + 5
                if (max_value <= 5) {
                  this.yAxis_max = 5
                } else if (max_value <= 20) {
                  this.yAxis_max = 20
                } else if (max_value <= 50) {
                  this.yAxis_max = 50
                } else if (max_value <= 100) {
                  this.yAxis_max = 100
                } else if (max_value <= 500) {
                  this.yAxis_max = 500
                } else if (max_value <= 1000) {
                  this.yAxis_max = 1000
                } else if (max_value <= 1500) {
                  this.yAxis_max = 1500
                } else {
                  this.yAxis_max = max_value + 100
                }
                // ==================找数组最大值====================
                this.selected_data_function(true)
                this.drawLine()
              } else {
                console.log('无数据')
                this.is_show_mychart = false
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击日历组件
    click_second_el_date_picker: function() {
      this.middle_top_radio3 = ''
    },
    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.middle_top_time01 = ''
    },
    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = new Object()
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      // this.can_inverse = bol

      this.drawLine()
      this.canvas_is_show_all = bol
      // this.can_inverse = true
    },
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        // this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      // console.log('66666666666666666666666')
      // console.log(series_data_arr)
      return series_data_arr
    },

    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.EChart_now_ranking)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },

        color: [
          '#009bef',
          '#ff6969',
          '#6277ff',
          '#ff5c7c',
          '#7546fd',
          '#ff6946',
          '#0ec597',
          '#e8ed55',
          '#a6ff70',
          '#e13eff'
        ],
        legend: {
          data: that.keyword_data,
          y: 'bottom',
          // 控制显示隐藏哪一个折线
          // selected: {
          //   邮件营销: false
          // }
          selected: that.selected_data
        },
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {
              title: '保存',
              iconStyle: {
                opacity: 1,
                borderWidth: 2,
                borderColor: '#555'
              }
            }
          }
        },
        xAxis: {
          position: 'bottom',
          type: 'category',
          data: that.xAxis_data,
          // alignWithLabel: false
          boundaryGap: false
          // show: this.xAxis_is_show
          // gridIndex: 0
          // axisLine: { show: false }
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          inverse: true,
          min: 1,
          max: that.yAxis_max,
          interval: that.yAxis_max / 5
        },
        series: that.series_data()
      })
    },

    // =============================请求第三部分数据=============================
    // =============================请求第三部分数据=============================
    // =============================请求第三部分数据=============================
    get_data_third() {
      this.$axios
        .get('/GetCountry')
        .then(response => {
          // 获取国家ID
          // console.log('获取国家ID')

          let country_id
          let arr_country = response.data.Data
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id
              return false
            }
          })
          // 请求数据

          // 设备选择
          let deviceType = this.equipmentValue01 == 'iPhone' ? 1 : 2
          // let appId = 472208016
          let appId = this.$store.state.now_app_id
          let url = '/GetGlobalRank?appid=' + appId + '&device=' + deviceType

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data_third = response.data.Data
              console.log('8888888888888888888888888')
              console.log(this.response_data_third)
              if (this.response_data_third.data_1.genreList.length > 0) {
                this.radio3 = this.response_data_third.data_1.genreList[0].genreName
              }

              // 向世界地图传递数据

              this.send_data_to_world_map()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 向世界地图传递数据
    send_data_to_world_map() {
      this.country_temp01 = []
      this.country_temp02 = []
      this.country_temp03 = []
      this.country_temp04 = []
      // 世界地图数据
      // country_temp01: ['中国', '美国'], //第一
      // country_temp02: ['澳大利亚'], //第2-500
      // country_temp03: ['俄罗斯'], //第501-1000
      // country_temp04: ['印度尼西亚'], //第1001-5000
      let temp01 = this.response_data_third.data_0

      temp01.forEach((element01, index) => {
        element01.GenreCountryList.forEach((element02, index02) => {
          // console.log(index)

          if (element02.genreName == this.radio3) {
            if (index == 0) {
              // console.log('index == 0')
              this.country_temp01 = this.country_temp01.concat(element02.data)
              // console.log(this.country_temp01)
            } else if (
              index == 1 ||
              index == 2 ||
              index == 3 ||
              index == 4 ||
              index == 5 ||
              index == 6
            ) {
              // console.log('index == 123456')
              this.country_temp02 = this.country_temp02.concat(element02.data)
            } else if (index == 7) {
              // console.log('index == 7')
              this.country_temp03 = this.country_temp03.concat(element02.data)
            } else if (index == 8) {
              // console.log('index == 8')
              this.country_temp04 = this.country_temp04.concat(element02.data)
            }
          }
        })
      })
      this.country_temp01 = this.country_temp01.map(item => {
        return item.CountryName
      })
      this.country_temp02 = this.country_temp02.map(item => {
        return item.CountryName
      })
      this.country_temp03 = this.country_temp03.map(item => {
        return item.CountryName
      })
      this.country_temp04 = this.country_temp04.map(item => {
        return item.CountryName
      })
      // this.country_temp01 = ['中国']
      // console.log('=================================')
      // console.log(this.country_temp01)
      // console.log(this.country_temp02)
      // console.log(this.country_temp03)
      // console.log(this.country_temp04)
    },
    // 绘制世界地图
    draw_world_map() {
      // console.log('999999999999999999')
      this.is_show_map = false
      setTimeout(() => {
        this.is_show_map = true
      })
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style scoped>
.flex_div > div {
  margin-left: 41px;
}
.flex_div {
  display: flex;
}
.font_img img {
  margin-right: 11px;
  vertical-align: -2px;
}
.table_width01 {
  width: 259px;
}
.font_and_img img {
  margin-right: 11px;
  vertical-align: -2px;
}
.td_width01 {
  width: 144px;
}
.td_width02 {
  width: 124px;
}
.middle_top_time {
  margin-left: 20px !important;
}
.btn_item_01 {
  display: flex;
  align-items: center;
}
.btn_item_01 > div {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}

.world_map:hover {
  z-index: 999 !important;
}
.world_map {
  position: relative;
  margin: 0 auto;
  padding-top: 50px;
  height: 500px;
}

.one_level {
  width: 18px;
  height: 18px;
  background-color: #91d8ff;
}
.two_level {
  width: 18px;
  height: 18px;
  background-color: #0191df;
}
.four_level {
  width: 18px;
  height: 18px;
  background-color: #31b6fe;
}
.three_level {
  width: 18px;
  height: 18px;
  background-color: #027fc3;
}
.four_level {
  width: 18px;
  height: 18px;
  background-color: #027fc3;
}
.level > div {
  margin-top: 27px;
}
.level > div > div:last-child {
  margin-left: 27px;
  width: 100px;
}
.level {
  height: 176px;
  width: 100px;
  position: absolute;
  bottom: 86px;
  left: 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}

.middle_bottom table,
.bottom table {
  margin-top: 18px;
  margin-bottom: 50px;
}
.option div:first-child {
  margin-left: 10px;
}
.option div:last-child {
  width: 86px;
}
.option {
  font-family: SourceHanSansCN-Medium;
  display: inline-block;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.myChart {
  width: 965px;
  height: 300px;
  z-index: 1;
  text-align: center;
  color: #666;
  line-height: 300px;
  font-size: 50px;
}
.table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 60px;
}
.show_all {
  width: 65px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #009bef;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
  margin: 32px auto;
}
.classify > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
}
.classify {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.middle_top > .btn_group {
  margin-top: 16px !important;
}
/* .middle_bottom .btn_group {
  z-index: 9999 !important;
} */
.btn_group {
  display: flex;
  align-items: center;
}
section:first-child {
  margin-top: 0;
}
section {
  margin-top: 50px;
}
.section_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #009bef;
  padding-left: 8px;
  margin-bottom: 20px;
}
.rankingChangeFontColor {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  padding: 30px 0;
}

thead tr {
  height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
tbody tr td:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
}
.right {
  padding-left: 57px;
  position: relative;
  width: 82%;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 1px solid #009bef;
  width: 100px;
  text-align: center;
}
.left_and_right {
  display: flex;
  margin-top: 27px;
}
.breadcrumb span:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.breadcrumb {
  margin: 20px 0;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
</style>
