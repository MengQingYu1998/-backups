<template>
  <div id="now_ranking" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
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
          <div class="section_title">实施排名</div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>应用总榜（免费）</th>
                <th>摄影与录像（免费）</th>
                <th>总榜（免费）</th>
              </tr>
            </thead>
            <tbody>
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
                  <el-radio-button label="380天" v-show="middle_top_radio1=='按天'"></el-radio-button>
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
          <div class="table_title">【抖音】搜索指数走势</div>
          <div ref="EChart_now_ranking" class="myChart"></div>
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
            <world_map
              :country_temp01="country_temp01"
              :country_temp02="country_temp02"
              :country_temp03="country_temp03"
              :country_temp04="country_temp04"
            />
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
                <td>
                  <div class="rankingChangeFontColor">{{item.RankingInterval}}</div>
                </td>
                <td>
                  <div
                    v-for="(item_td, index_td) in item.GenreCountryList"
                    :key="'table01_td'+index_td"
                  >
                    <div v-if="item_td.genreName==radio3">
                      <div>{{item_td.Num}}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    v-for="(item_td, index_td) in item.GenreCountryList"
                    :key="'table01_td'+index_td"
                  >
                    <div v-if="item_td.genreName==radio3">
                      <div
                        class="rankingChangeFontColor"
                        v-for="(item_div, index_div) in item_td.data"
                        :key="'table01_div'+index_div"
                      >
                        <div>{{item_div.CountryName}}</div>
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
                <td>
                  <div class="rankingChangeFontColor">{{item.CountryName}}</div>
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
      now_country: '中国',
      response_data_first: null,
      // 第二部分折线图数据
      // 第二部分折线图数据
      // 第二部分折线图数据
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
      keyword_data: ['直接访问', '搜索引擎'],
      // 数据
      keyword_data_value: [],
      // X轴文本
      xAxis_data: ['周3', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 控制折线显隐
      selected_data: {},
      // =============================请求第三部分数据=============================
      // =============================请求第三部分数据=============================
      // =============================请求第三部分数据=============================
      response_data_third: null,
      // 世界地图数据
      country_temp01: ['中国'], //第一
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
      this.get_data_second()
    })
    this.$watch('middle_top_radio2', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('middle_top_radio3', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('equipmentValue01', function(newValue, oldValue) {
      this.get_data_third()
    })
    this.$watch('radio3', function(newValue, oldValue) {
      this.send_data_to_world_map()
    })
  },
  methods: {
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    // =============================请求第一部分数据=============================
    get_data_first() {
      this.$axios
        .get('http://39.97.234.11:8080/GetCountry')
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

          let url = 'http://39.97.234.11:8080/PostRealTimeRank'
          // console.log(url)
          let data = { appId: 472208016, countryId: country_id }
          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              this.response_data_first = response.data.Data
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
        .get('http://39.97.234.11:8080/GetCountry')
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
          } else if (this.middle_top_radio3 == '380天') {
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
          let url = 'http://39.97.234.11:8080/PostRandTrend'
          let data = {
            appId: 600273928,
            countryId: country_id,
            startDate: startDate,
            endDate: endDate,
            brand: brand,
            timeType: timeType
          }

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              // console.log(response.data.Data)
              if (response.data.Data != null) {
                this.response_data_second = response.data.Data
                // console.log(this.response_data_second)
                // 都谁？ 抖音 快手 内涵
                if (this.response_data_second.RankList != null) {
                  this.keyword_data = this.response_data_second.RankList
                }
                // 折线数据
                if (this.response_data_second.r1 == null) {
                  // console.log('无数据')
                  this.keyword_data_value = []
                  this.xAxis_data = []
                } else if (this.response_data_second.r1 != null) {
                  // console.log('有数据')
                  this.keyword_data_value = []

                  let temp01 = this.response_data_second.r1
                  temp01.forEach(element => {
                    this.keyword_data_value.push(element.data)
                  })

                  let temp02 = this.response_data_second.r2.data
                  this.xAxis_data = temp02.map(element => {
                    return timestamp(element, 'Y/M/D h:m:s')
                  })
                  // console.log(this.xAxis_data)
                }
                this.drawLine()
              } else if (response.data.Data == null) {
                this.keyword_data_value = []
                this.xAxis_data = []
                this.drawLine()
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
      let obj = {}
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      this.drawLine()
      this.canvas_is_show_all = !this.canvas_is_show_all
      // console.log(this.selected_data)
    },
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = []
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
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
        grid: {
          left: '0%',
          right: '1%',
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
          type: 'category',
          boundaryGap: false,
          data: that.xAxis_data
        },
        yAxis: {
          type: 'value'
        },
        series: that.series_data()
      })
    },
    // =============================请求第三部分数据=============================
    // =============================请求第三部分数据=============================
    // =============================请求第三部分数据=============================
    get_data_third() {
      this.$axios
        .get('http://39.97.234.11:8080/GetCountry')
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

          let url =
            'http://39.97.234.11:8080/GetGlobalRank?appid=1410120498&device=' +
            deviceType

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data_third = response.data.Data
              // console.log(this.response_data_third)
              this.radio3 = this.response_data_third.data_1.genreList[0].genreName
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

      // console.log('=================================')
      // console.log(this.country_temp01)
      // console.log(this.country_temp02)
      // console.log(this.country_temp03)
      // console.log(this.country_temp04)
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
.world_map {
  position: relative;
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
  width: 100%;
  height: 300px;
  z-index: 1;
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
