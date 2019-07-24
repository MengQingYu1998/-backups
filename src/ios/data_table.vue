<template>
  <div id="data_table" class="content">
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
        <div class="right_nav">榜单排名对比</div>
        <div class="line"></div>
        <!-- 顶部 关键词概述 -->
        <!-- 顶部 关键词概述 -->
        <!-- 顶部 关键词概述 -->
        <section class="top">
          <div class="section_title">关键词概述</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>系统</div>
              <div>
                <el-select v-model="systemValue">
                  <el-option v-for="item in system " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>当前日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="date_Now_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
            <div class="option option_date">
              <div>对比日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateCompare_for_top"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="table_top_green">
            2019年2月20日，关键词总覆盖数：
            <span v-if="request_data_first">{{request_data_first.totalCount}}</span> 前三关键词：
            <span v-if="request_data_first">{{request_data_first.top3Count}}</span> 前十关键词：
            <span v-if="request_data_first">{{request_data_first.top10Count}}</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>搜索指数</th>
                <th>关键词数量</th>
                <th>Top3关键词</th>
                <th>Top10关键词</th>
              </tr>
            </thead>
            <tbody v-if="request_data_first">
              <tr
                v-for="(item, index) in request_data_first.detailKeyWord"
                :key="'detailKeyWord'+index"
              >
                <td>
                  <div>{{item.hintRange}}</div>
                </td>
                <td>
                  <div>{{item.keyWordCount.num}}</div>
                </td>
                <td>
                  <div>{{item.top3.num}}</div>
                </td>
                <td>
                  <div>{{item.top10.num}}</div>
                </td>
              </tr>
              <tr>
                <td>合计：</td>
                <td>{{request_data_first.totalCount}}</td>
                <td>{{request_data_first.top3Count}}</td>
                <td>{{request_data_first.top10Count}}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 中部 关键词明细 -->
        <!-- 中部 关键词明细 -->
        <!-- 中部 关键词明细 -->
        <section class="middle">
          <div class="section_title">关键词明细</div>
          <div class="btn_group">
            <div class="option">
              <div>设备</div>
              <div>
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>系统</div>
              <div>
                <el-select v-model="systemValue">
                  <el-option v-for="item in system " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="option">
              <div>当前日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateNow_for_middle"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                ></el-date-picker>
              </div>
            </div>
            <div class="option option_date">
              <div>对比日期</div>
              <div class="date">
                <!-- 饿了么的日期选择组件 -->
                <el-date-picker
                  v-model="dateCompare_for_middle"
                  type="date"
                  placeholder="选择日期"
                  clear-icon
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="option_for_min_max">
              <div>搜索结果数</div>
              <div class="all">全部</div>
              <div class="min_max">
                <div>
                  <el-input v-model="result_min_input01" placeholder="最小值"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input01" placeholder="最大值"></el-input>
                </div>
              </div>
            </div>
            <div class="option_for_min_max">
              <div>排名</div>
              <div class="min_max">
                <div>
                  <el-input v-model="result_min_input02" placeholder="最小值"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input02" placeholder="最大值"></el-input>
                </div>
              </div>
            </div>
            <div class="option_for_min_max">
              <div>搜索结果</div>
              <div class="min_max">
                <div>
                  <el-input v-model="result_min_input03" placeholder="最小值"></el-input>
                </div>
                <div>---</div>
                <div>
                  <el-input v-model="result_max_input03" placeholder="最大值"></el-input>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>关键词</th>
                <th>排名</th>
                <th>变动</th>
                <th>搜索指数</th>
                <th>搜索结果数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>学习强国</div>
                </td>
                <td>
                  <div>156</div>
                </td>

                <td>
                  <div>
                    <img src="../assets/keyword/arrows (1).png" alt v-show="false" />
                    <img src="../assets/keyword/arrows (1).png" alt v-show="false" />
                    <img src="../assets/keyword/arrows (1).png" alt v-show="true" />
                    2
                  </div>
                </td>
                <td>
                  <div class="table_font">20112</div>
                </td>
                <td>
                  <div class="table_font">20</div>
                </td>
                <td>
                  <div class="table_font">排名趋势</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!-- 底部 类型模块 -->
        <!-- 底部 类型模块 -->
        <!-- 底部 类型模块 -->
        <section class="bottom">
          <div class="btn_group">
            <div class="classify">
              <div>类型</div>
              <div>
                <el-radio-group v-model="radio2" size="mini">
                  <el-radio-button label="按分钟"></el-radio-button>
                  <el-radio-button label="按小时"></el-radio-button>
                  <el-radio-button label="按天"></el-radio-button>
                  <el-radio-button label="近24小时"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="7天"></el-radio-button>
                  <el-radio-button label="30天"></el-radio-button>
                </el-radio-group>
              </div>
              <div>
                <el-select v-model="customValue">
                  <el-option v-for="item in  custom " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="position_relative">
            <div class="table_title">【今日】榜单排名走势</div>
            <div ref="myChart_data_table" class="myChart" v-show="is_show_myChart_and_table"></div>
            <div class="bottom_image" v-show="is_show_myChart_and_table">
              <!-- <img class="float_right" src="../assets/keyword/down.png" alt> -->
              <img
                v-on:click="is_show_myChart_and_table_function"
                class="float_right"
                src="../assets/keyword/three.png"
                alt
              />
              <img
                v-on:click="is_show_myChart_and_table_function"
                class="float_right"
                src="../assets/keyword/calculator.png"
                alt
              />
            </div>
            <table v-show="!is_show_myChart_and_table">
              <thead>
                <tr>
                  <th>时间</th>
                  <th>排名</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>2019-02-20 12:56</div>
                  </td>
                  <td>
                    <div>1</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="bottom_image_for_table" v-show="!is_show_myChart_and_table">
              <img class="float_right" src="../assets/keyword/down.png" alt v-show="false" />
              <img
                v-on:click="is_show_myChart_and_table_function"
                class="float_right"
                src="../assets/keyword/three.png"
                alt
              />
              <img
                v-on:click="is_show_myChart_and_table_function"
                class="float_right"
                src="../assets/keyword/calculator.png"
                alt
              />
            </div>

            <div class="import_data" v-show="is_show_myChart_and_table">导出数据</div>
            <div class="import_data_for_table" v-show="!is_show_myChart_and_table">导出数据</div>
            <div class="clear_float"></div>
          </div>
        </section>
        <div class="paging">
          <div>显示第 601 至 700 项结果，共 2,059 项</div>
          <div>
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'data_table',
  components: { ios_header, left_nav },
  data() {
    return {
      // 第一部分的参数
      // 第一部分的参数
      // 第一部分的参数
      now_country: '中国',
      request_data_first: null,
      date_Now_for_top: new Date(), //top section的日期选择 当前日期or对比日期
      dateCompare_for_top: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      equipment: [
        // 设备选择
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue: 'iPhone',
      system: [
        // 系统选择
        {
          value: 'ios11'
        },
        {
          value: 'ios12'
        }
      ],
      systemValue: 'ios12',

      // ==========================================================
      // ==========================================================
      // ==========================================================
      //btn-group 下面的最大值最小值
      result_max_input01: '',
      result_min_input01: '',
      //----
      result_max_input02: '',
      result_min_input02: '',
      //----
      result_max_input03: '',
      result_min_input03: '',

      // 单选按钮组
      radio1: '上海',
      radio2: '今天',

      //middle section的日期选择 当前日期or对比日期
      dateNow_for_middle: '',
      dateCompare_for_middle: '',

      //自定义选择
      custom: [
        {
          value: '自定义'
        },
        {
          value: 'iOS'
        }
      ],
      customValue: '自定义',
      // true显示myChart  false显示table表格
      is_show_myChart_and_table: true,

      //canvas 关键词data数组
      keyword_data: [
        '邮件营销',
        '联盟广告',
        '视频广告',
        '直接访问',
        '搜索引擎'
      ],
      // 数据
      keyword_data_value: [
        [820, 932, 901, 934, 11, 1330, 1320],
        [555, 555, 555, 555, 555, 555, 555],
        [820, 932, 901, 934, 1290, 1330, 1320],
        [555, 6, 555, 555, 555, 555, 555],
        [88, 932, 901, 934, 1290, 1330, 75]
      ],
      xAxis_data: ['周3', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },

  created: function() {
    // 请求数据
    this.get_data_for_first_part()
    this.change_time()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_for_first_part()
    })
    // 对日期做限制
    this.$watch('date_Now_for_top', function(newValue, oldValue) {
      this.change_time()
      this.get_data_for_first_part()
    })
    this.$watch('dateCompare_for_top', function(newValue, oldValue) {
      this.change_time()
      this.get_data_for_first_part()
    })
    // 下拉框，系统
    this.$watch('systemValue', function(newValue, oldValue) {
      this.get_data_for_first_part()
    })
    //  下拉框，设备
    this.$watch('equipmentValue', function(newValue, oldValue) {
      this.get_data_for_first_part()
    })
  },
  methods: {
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // ===========================第一部分数据=================================
    // 请求第一部分评分统计的数据
    get_data_for_first_part() {
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
          // console.log(country_id)
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let system = this.systemValue == 'ios11' ? 11 : 12
          // console.log(this.date_Now_for_top)
          // console.log(timestamp(this.dateCompare_for_top / 1000, 'Y-M-D'))
          let nowDate = formatDate(this.date_Now_for_top, 'yyyy-MM-dd')
          let compareDate = timestamp(this.dateCompare_for_top / 1000, 'Y-M-D')
          let url =
            ' http://39.97.234.11:8080/GetKeyWordSynopsis?' +
            'appId=112' +
            '&countryId=' +
            country_id +
            '&device=' +
            deviceType +
            '&system=' +
            system +
            '&nowDate=' +
            nowDate +
            '&compareDate=' +
            compareDate
          console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.request_data_first = response.data.Data
              console.log(response)
              console.log(this.request_data_first)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 设置对比日期永远比当前日期小一天
    change_time() {
      // console.log(this.date_Now_for_top)
      //     console.log(this.dateCompare_for_top)
      if (
        new Date(this.date_Now_for_top).getTime() <=
        new Date(this.dateCompare_for_top).getTime()
      ) {
        this.dateCompare_for_top =
          new Date(this.date_Now_for_top).getTime() - 24 * 60 * 60 * 1000
      }
    },
    // ============================================================
    // ============================================================
    // ============================================================
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

    // 控制显示echarts还是table
    is_show_myChart_and_table_function: function() {
      this.is_show_myChart_and_table = !this.is_show_myChart_and_table
    },

    // canvas画折线图
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_data_table)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: that.keyword_data,
          y: 'bottom'
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
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style scoped>
.paging {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
}
table img {
  vertical-align: 2px;
}
.min_max > div:nth-child(1),
.min_max > div:nth-child(3) div {
  width: 75px;
}
.min_max > div:nth-child(2) {
  color: #dfdfdf;
}
.option_for_min_max > div:first-child {
  margin-right: 10px;
}
.option_for_min_max .all {
  width: 48px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
  margin-right: 10px;
}
.min_max > div {
  display: inline-block;
}
.option_for_min_max {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-left: 30px;
}

.bottom table {
  margin-bottom: 50px;
}
.middle table {
  margin-bottom: 33px;
}
.top table {
  margin-top: 0;
  margin-bottom: 53px;
}
.table_top_green span {
  color: #009bef;
  margin-right: 5px;
}
.table_top_green {
  width: 984px;
  height: 40px;
  background-color: #f5fcff;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #444444;
  padding-left: 16px;
  margin-top: 22px;
}
.option_date {
  margin-left: 78px !important;
}
.date div {
  width: 119px !important;
  z-index: 999 !important;
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
.clear_float {
  clear: both;
}
.import_data_for_table {
  width: 65px;
  height: 24px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  /* position: absolute;
  right: 30px;
  bottom: -64px; */
  float: right;
  margin-right: -112px;
  margin-top: -4px;
}
.import_data {
  width: 65px;
  height: 24px;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  float: right;
  margin-top: -20px;
}
.position_relative {
  position: relative;
}
.right_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-top: 49px;
  text-align: center;
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
thead tr {
  height: 40px;
}
td {
  padding: 36px 0;
}
th {
  border: 1px solid #f2f2f2;
}
tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
tbody tr td:first-child {
  width: 50%;
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
  width: 100%;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.table_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-top: 40px;
}
.bottom_image img:first-child {
  z-index: 9999 !important;
}

.bottom_image_for_table {
  position: static !important;
  margin-right: 107px;
  float: right;
}
.bottom_image {
  float: right;
  position: absolute;
  top: 31px;
  right: -40px;
}
.myChart_tips .float_right {
  float: right;
  margin-left: 20px;
}
.bottom_image_font {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: inline-block;
  vertical-align: top;
}

.myChart_tips div:nth-child(1),
.myChart_tips div:nth-child(2) {
  display: inline-block;
  width: 70px;
}
.myChart_tips {
  margin-top: 30px;
  display: flex;
  justify-content: center;
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
  margin-top: 20px;
}
.custom {
  width: 59px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
}
.middle .btn_group {
  margin-top: 16px;
}
.btn_group {
  display: flex;
  align-items: center;
}
.classify > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
}
.classify > div:nth-child(3) {
  width: 89px;
}
.classify {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.option div:first-child {
  margin-left: 10px;
}
.option div:last-child {
  width: 85px;
}
.btn_group .option:first-child div:first-child {
  margin-left: 0;
  margin-right: 10px;
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
  margin-left: 30px;
}
.right {
  padding-left: 57px;
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
