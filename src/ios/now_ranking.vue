<template>
  <div id="now_ranking">
    <div class="content">
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
              <tbody>
                <tr class="disable_hover" v-if="nothing_data_can_show">
                  <td colspan="4">暂无相关数据</td>
                </tr>
                <tr v-for="(item ,index) in response_data_first" :key="'first'+index">
                  <td>
                    <div class="rankingChangeFontColor">{{item[0]==''?'--':item[0]}}</div>
                  </td>
                  <td>
                    <div class="rankingChangeFontColor">{{item[1]==''?'--':item[1]}}</div>
                  </td>
                  <td>
                    <div class="rankingChangeFontColor">{{item[2]==''?'--':item[2]}}</div>
                  </td>
                  <td>
                    <div class="rankingChangeFontColor">{{item[3]==''?'--':item[3]}}</div>
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
              <div class="classify" @click="clear_time">
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
                <div>
                  <el-date-picker
                    v-model="now_ranking_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="middle_top_pickerOptions"
                    clear-icon
                    prefix-icon="fasle"
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
            <!-- <div
            class="table_title"
            v-if="response_data_second"
            >【{{replace_some_chart_wrap(response_data_second.appName)}}】排名走势</div>-->

            <div ref="EChart_now_ranking" class="myChart" v-show="is_show_mychart"></div>

            <div class="myChart" v-show="!is_show_mychart">暂无数据</div>

            <div>
              <div
                class="show_all pointer"
                v-show="is_show_mychart&&!canvas_is_show_all"
                @click="selected_data_function(true)"
              >显示所有</div>
              <div
                class="show_all pointer"
                v-show="is_show_mychart&&canvas_is_show_all"
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
                  <el-radio-group v-model="equipmentValue01" size="mini">
                    <el-radio-button
                      v-for="item in  equipment01 "
                      :key="item.value"
                      :label="item.value"
                    ></el-radio-button>
                  </el-radio-group>
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
              <tbody v-if="response_data_third" class="tr_height">
                <tr v-for="(item, index) in response_data_third.data_0" :key="'table01'+index">
                  <td class="td_width01">
                    <div class="third_table_td">{{item.RankingInterval}}</div>
                  </td>

                  <td class="td_width02 third_table_td">
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
                            <span class="country_name_width">{{item_div.CountryName}}</span>
                            <span class="country_rank_width">({{item_div.Ranking}})</span>
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
                  <el-radio-group v-model="equipmentValue01" size="mini">
                    <el-radio-button
                      v-for="item in  equipment01 "
                      :key="item.value"
                      :label="item.value"
                    ></el-radio-button>
                  </el-radio-group>
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
                  <th v-show="response_data_third.data_1.genreList.length==0"></th>
                  <th v-show="response_data_third.data_1.genreList.length==0"></th>
                  <th v-show="response_data_third.data_1.genreList.length==0"></th>
                </tr>
              </thead>
              <tbody v-if="response_data_third">
                <tr v-if="response_data_third.data_1.list.length==0">
                  <td colspan="4" class="disable_hover">暂无相关数据</td>
                </tr>
                <tr
                  v-for="(item, index) in response_data_third.data_1.list"
                  :key="'table06785'+index"
                >
                  <td class="table_width01">
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
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
import world_map from '../common/world_map/the_world_map'
// 引入工具类
import { formatDate, timestamp, replace_some_chart } from '../common/util.js'
export default {
  name: 'now_ranking',
  components: { ios_header, left_nav, world_map },
  data() {
    let that = this
    return {
      nothing_data_can_show: false,
      // 第一部分图表的数据
      // 第一部分图表的数据
      // 第一部分图表的数据
      now_country: '中国',
      response_data_first: new Array(),
      response_data_first_title: new Array(),
      // 第二部分折线图数据
      // 第二部分折线图数据
      // 第二部分折线图数据
      db_number_is_same: 0, //修复用户输入过快的bug
      is_show_mychart: true,
      response_data_second: null,
      middle_top_radio1: '按小时',
      middle_top_radio2: '免费',
      middle_top_radio3: '今日',
      now_ranking_time: '',
      middle_top_pickerOptions: {
        disabledDate(time) {
          if (that.middle_top_radio1 == '按分钟') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 7
            )
          } else if (that.middle_top_radio1 == '按小时') {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
            )
          } else if (that.middle_top_radio1 == '按天') {
            return time.getTime() > Date.now()
          }
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
      myChart: null,
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
    // alert('created')
    this.get_data_first()
    this.get_data_third()
    this.$watch('now_country', function(newValue, oldValue) {
      // alert('now_country')
      this.$store.state.now_country_name = this.now_country
      this.get_data_first()
      this.get_data_second()
      this.get_data_third()
    })
    this.$watch('now_ranking_time', function(newValue, oldValue) {
      // alert('now_ranking_time')
      this.middle_top_radio3 = ''

      this.get_data_second()
    })
    this.$watch('middle_top_radio1', function(newValue, oldValue) {
      // alert('middle_top_radio1')
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)

      // 2.解决切换之后380天消失了的bug
      this.now_ranking_time = ''
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
      // alert('middle_top_radio2')
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
    this.$watch('middle_top_radio3', function(newValue, oldValue) {
      // alert('middle_top_radio3')
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all)
      this.get_data_second()
    })
    this.$watch('equipmentValue01', function(newValue, oldValue) {
      // alert('equipmentValue01')
      this.get_data_third()
    })
    this.$watch('radio3', function(newValue, oldValue) {
      this.send_data_to_world_map()
      this.draw_world_map()
    })
  },
  mounted: function() {
    this.get_data_second()
  },
  methods: {
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    get_data_first() {
      // alert('first')
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
          let appId = this.$route.query.now_app_id
          let data = { appId: appId, countryId: country_id }
          console.log(data)

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log(response)
              if (
                response.data.Data.rank_0 != null &&
                response.data.Data.rank_1 != null &&
                response.data.Data.rank_2 != null
              ) {
                this.nothing_data_can_show = false
                this.response_data_first = response.data.Data
                this.response_data_first_title = response.data.Data.rank_0
                delete this.response_data_first.rank_0
              } else {
                // console.log('第一部分没数据')
                this.nothing_data_can_show = true
                this.response_data_first = new Array()
                this.response_data_first_title = new Array()
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
      // console.log(66666666666666666)
      this.db_number_is_same++
      let is_excute_function = this.db_number_is_same
      this.myChart = this.$echarts.init(this.$refs.EChart_now_ranking)
      this.myChart.showLoading({
        text: '',
        color: '#D3D3D3'
      })
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
            endDate = startDate
            console.log(startDate)
            console.log(endDate)
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
            yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000 * 360)
            startDate = formatDate(yesterday, 'yyyy-MM-dd')
            endDate = formatDate(new Date(), 'yyyy-MM-dd')
          } else if (this.middle_top_radio3 == '') {
            let now_ranking_time = this.now_ranking_time
            startDate = formatDate(now_ranking_time[0], 'yyyy-MM-dd')
            endDate = formatDate(now_ranking_time[1], 'yyyy-MM-dd')
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
          let appId = this.$route.query.now_app_id

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
          // console.log(data)

          // 请求数据
          this.$axios
            .post(url, this.$qs.stringify(data), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            // .post(url, data)
            .then(response => {
              // console.log(66666666666666666)
              // console.log(response.data)
              // console.log(66666666666666666)
              if (is_excute_function == this.db_number_is_same) {
                if (response.data.Code == 0 && response.data.Data.length > 0) {
                  // console.log('有数据')
                  this.is_show_mychart = true
                  this.response_data_second = response.data.Data[0]
                  this.xAxis_data.length = 0

                  let temp02 = this.response_data_second.rankTrendInfo.r2.data
                  this.xAxis_data = temp02.map(element => {
                    if (this.middle_top_radio1 == '按天') {
                      return timestamp(element, 'Y年M月D日')
                    } else if (this.middle_top_radio1 == '按小时') {
                      return timestamp(element, 'Y年M月D日 h点m分')
                    } else if (this.middle_top_radio1 == '按分钟') {
                      return timestamp(element, 'M月D日 h点m分')
                    }
                  })

                  // 都谁？ 抖音 快手 内涵
                  this.keyword_data = this.response_data_second.rankTrendInfo.RankList

                  this.keyword_data_value =
                    response.data.Data[0].rankTrendInfo.r3

                  // console.log(this.keyword_data_value)

                  this.selected_data_function(true)
                  this.drawLine()
                  this.myChart.hideLoading()
                } else {
                  // console.log('无数据s')

                  this.is_show_mychart = false
                }
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

    // 点击单选按钮组件组件
    click_second_el_radio: function() {
      this.now_ranking_time = ''
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
        this.symbol = 'circle'
        this.data = data
        this.symbol = 'circle'
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
      if (that.response_data_second == null) {
        return false
      }
      // 绘制图表
      this.myChart.setOption(
        {
          // {{replace_some_chart_wrap(response_data_second.appName)}}】排名走势
          title: {
            text:
              that.replace_some_chart_wrap(that.response_data_second.appName) +
              '排名走势',
            left: 'center',
            textStyle: {
              color: '#222222',
              fontSize: 16,
              fontFamily: 'SourceHanSansCN-Medium',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            formatter: function(data) {
              let tr = ''
              data.forEach(element => {
                tr += `<tr  style="border:none !important">
                  <td>${element.marker.replace(
                    'width:10px;height:10px;',
                    'width:6px;height:6px;vertical-align:2px;'
                  )}</td>
                  <td style="padding-right:10px">${element.seriesName}</td>
                  <td>${element.value}</td>
                  </tr>`
              })
              let str = `<p>${data[0].axisValue}</p><table><tbody>${tr}</tbody></table>`
              return str
            },

            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: '#fff',
            extraCssText:
              'box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);line-height:25px;padding:10px 15px',
            textStyle: {
              color: '#222222',
              fontSize: 13,
              align: 'left'
            },

            trigger: 'axis'
          },

          legend: {
            data: that.keyword_data,
            y: 'bottom',
            // 控制显示隐藏哪一个折线
            // selected: {
            //   邮件营销: false
            // }
            selected: that.selected_data
          },
          color: [
            '#009bef',
            '#e75b48',
            '#05c898',
            '#f8c848',
            '#d55282',
            '#f49c47',
            '#39c3da',
            '#7b4dee',
            '#a4d53b',
            '#b2b2b2'
          ],
          grid: {
            left: '5%',
            right: '5%',
            bottom: '20%'
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
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: '#DCDFE6'
              }
            },

            axisLabel: {
              color: '#222',
              formatter: function(value, index) {
                if (
                  that.middle_top_radio1 == '按分钟' &&
                  that.middle_top_radio3 != '7天'
                ) {
                  return '　　' + value.slice(3, 6) + '　　'
                } else if (
                  that.middle_top_radio1 == '按分钟' &&
                  that.middle_top_radio3 == '7天'
                ) {
                  return '　　' + value.slice(0, 6) + '　　'
                } else if (
                  that.middle_top_radio1 == '按小时' &&
                  that.middle_top_radio3 == '今日'
                ) {
                  return '　　' + value.slice(-6, -3) + '　　'
                } else if (
                  that.middle_top_radio1 == '按小时' &&
                  that.middle_top_radio3 == '昨日'
                ) {
                  return value.slice(8, -3)
                } else if (
                  that.middle_top_radio1 == '按小时' &&
                  that.middle_top_radio3 == '7天'
                ) {
                  return '　　' + value.slice(5, 12) + '　　'
                } else if (
                  that.middle_top_radio1 == '按小时' &&
                  that.middle_top_radio3 == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按小时' &&
                  that.middle_top_radio3 == ''
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按天' &&
                  that.middle_top_radio3 == '7天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按天' &&
                  that.middle_top_radio3 == '30天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按天' &&
                  that.middle_top_radio3 == '180天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按天' &&
                  that.middle_top_radio3 == '360天'
                ) {
                  return value.slice(5, 12)
                } else if (
                  that.middle_top_radio1 == '按天' &&
                  that.middle_top_radio3 == ''
                ) {
                  return value.slice(5, 12)
                }
              }
            },

            axisTick: {
              show: false
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#f2f2f2']
              }
            },
            position: 'bottom',
            type: 'category',
            data: that.xAxis_data,
            boundaryGap: false
          },
          yAxis: {
            axisLabel: {
              color: '#222'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCDFE6'
              }
            },
            axisTick: {
              show: false
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#f2f2f2']
              }
            },
            minInterval: 1,
            type: 'value',
            inverse: true,
            min: 1,
            max: function(value) {
              let max_value = value.max
              if (max_value < 5) {
                that.yAxis_max = 5
              } else if (max_value < 20) {
                that.yAxis_max = 20
              } else if (max_value < 50) {
                that.yAxis_max = 50
              } else if (max_value < 100) {
                that.yAxis_max = 100
              } else if (max_value < 500) {
                that.yAxis_max = 500
              } else if (max_value < 1000) {
                that.yAxis_max = 1000
              } else if (max_value < 1500) {
                that.yAxis_max = 1500
              } else {
                that.yAxis_max = max_value + 100
              }
              return that.yAxis_max
            }
          },
          series: that.series_data()
        },
        true
      )
    },
    clear_time() {
      // console.log('清空时间')
      this.now_ranking_time = ''
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
          let appId = this.$route.query.now_app_id
          let url = '/GetGlobalRank?appid=' + appId + '&device=' + deviceType
          console.log(url)
          // 请求数据

          this.$axios
            .get(url)
            .then(response => {
              // console.log('8888888888888888888888888')
              // console.log(this.response_data_third)
              this.response_data_third = response.data.Data

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
        return item.CountryName + ' ' + this.radio3 + '-' + item.Ranking
      })
      this.country_temp02 = this.country_temp02.map(item => {
        // console.log(item) //item.Ranking
        return item.CountryName + ' ' + this.radio3 + '-' + item.Ranking
      })
      this.country_temp03 = this.country_temp03.map(item => {
        return item.CountryName + ' ' + this.radio3 + '-' + item.Ranking
      })
      this.country_temp04 = this.country_temp04.map(item => {
        return item.CountryName + ' ' + this.radio3 + '-' + item.Ranking
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
    replace_some_chart_wrap(parm) {
      return replace_some_chart(parm)
    },
    // 获取当前选中的国家
    parentFn(payload) {
      // alert(this.now_country)

      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style scoped>
.country_rank_width {
  width: 50px;
  text-align: left;
  display: inline-block;
}
.country_name_width {
  text-align: left;
  display: inline-block;
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.third_table_td {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  padding: 19px 0;
}
.flex_div > div {
  margin-left: 41px;
}
.flex_div {
  display: flex;
  flex-wrap: wrap;
}

.font_img {
  font-size: 14px !important;
  color: #222222 !important;
  display: flex;
  align-items: center;
}
.font_img img {
  margin-right: 11px;
  vertical-align: -2px;
}
.table_width01 {
  width: 259px;
}
.font_and_img {
  text-align: left;
  padding-left: 96px !important;
  width: 250px;
  text-overflow: ellipsis;
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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}

.world_map {
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
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
  font-weight: 600 !important;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
}
.bottom table {
  table-layout: fixed;
}
.middle_bottom table,
.bottom table {
  margin-top: 18px;
}
.option div:first-child {
  margin-left: 10px;
}

.option {
  font-weight: 600 !important;
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
  width: 950px;
  height: 360px;
  z-index: 1;
  text-align: center;
  color: #bfbfbf;
  line-height: 300px;
  font-size: 25px;
  margin-top: 40px;
}
.table_title {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 40px;
}
.show_all {
  width: 65px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  border: solid 1px #009bef;

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
  font-weight: 600 !important;
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
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #009bef;
  padding-left: 8px;
  margin-bottom: 20px;
}
.rankingChangeFontColor {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444;
  padding: 16px 0;
}

thead tr {
  height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
/* tbody tr td:last-child {
  
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
} */
tbody {
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
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #eaeaea;
  text-align: center;
}
.right {
  padding: 25px 20px;
  background-color: #fff;
  margin-left: 14px;
  width: 100%;
  box-sizing: border-box;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-weight: 600 !important;
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
  margin-top: 14px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}

.disable_hover td {
  color: #bfbfbf !important;
}
.disable_hover {
  border-bottom: solid 1px #f2f2f2;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #bfbfbf !important;
}
.disable_hover:hover {
  background-color: #fff !important;
}
#now_ranking {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
</style>
