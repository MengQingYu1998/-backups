<template>
  <div id="data_table" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">榜单排名对比</div>
        <div class="line"></div>
        <div class="btn_group">
          <div class="option">
            <div>设备</div>
            <div>
              <el-select v-model="equipmentValue">
                <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
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
          <div class="classify type">
            <div>类型</div>
            <div>
              <el-radio-group v-model="middle_top_radio1" size="mini">
                <el-radio-button label="按分钟"></el-radio-button>
                <el-radio-button label="按小时"></el-radio-button>
                <el-radio-button label="按天"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="btn_group">
          <div class="classify middle_top_time">
            <div>时间</div>
            <div @click="click_second_el_radio" class="time">
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
        <div class="right_title">蘑菇街与趣多多排名对比</div>
        <div class="table_title">【今日】榜单排名走势</div>
        <div ref="myChart_ranking_compare" class="myChart" v-show="is_show_mychart"></div>
        <div class="myChart" v-show="!is_show_mychart">暂无数据</div>

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
      is_show_mychart: false,
      now_country: '中国',
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
      keyword_data_value: [],
      // X轴文本
      xAxis_data: [],
      // 控制折线显隐
      selected_data: {},
      // 设备选择
      equipment: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      equipmentValue: 'iPhone',
      is_show_table_myChart: true
    }
  },

  created: function() {
    this.get_data_second()
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data_second()
    })
    this.$watch('equipmentValue', function(newValue, oldValue) {
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
  },
  methods: {
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
          // console.log(endDate)
          // console.log(startDate)
          // console.log('country_id' + country_id)
          // console.log('brand' + brand)
          // console.log('timeType' + timeType)
          // 设备选择
          let deviceType = this.equipmentValue == 'iPhone' ? 1 : 2
          let url = 'http://39.97.234.11:8080/PostRandTrend'
          let data = {
            appids: '600273928,951391381',
            countryId: country_id,
            startDate: startDate,
            endDate: endDate,
            brand: brand,
            timeType: timeType,
            device: deviceType
          }

          // 请求数据
          this.$axios
            .post(url, data)
            .then(response => {
              console.log(response.data)
              // console.log(response.data.Data.length)
              this.is_show_mychart = false
              if (response.data.Data != null && response.data.Data.length > 0) {
                this.is_show_mychart = true
                console.log('有数据')
                this.keyword_data_value.length = 0
                this.xAxis_data.length = 0
                this.keyword_data.length = 0

                this.response_data_second = response.data.Data[0]
                let temp = response.data.Data[1]
                // 都谁？ 抖音 快手 内涵
                let name_group01 = this.response_data_second.rankTrendInfo
                  .RankList
                let name_group02 = temp.rankTrendInfo.RankList
                name_group01.forEach(element => {
                  this.keyword_data.push(
                    this.response_data_second.appName + '-' + element
                  )
                })
                name_group02.forEach(element => {
                  this.keyword_data.push(temp.appName + '-' + element)
                })
                // this.keyword_data = this.keyword_data.concat(
                //   temp.rankTrendInfo.RankList
                // )
                //y轴数值
                let temp01 = this.response_data_second.rankTrendInfo.r1
                temp01.forEach(element => {
                  this.keyword_data_value.push(element.data)
                })
                let temp03 = temp.rankTrendInfo.r1
                temp03.forEach(element => {
                  this.keyword_data_value.push(element.data)
                })
                // x轴数据
                let temp02 = this.response_data_second.rankTrendInfo.r2.data
                this.xAxis_data = temp02.map(element => {
                  return timestamp(element, 'Y/M/D h:m:s')
                })

                this.drawLine()
              } else {
                console.log('无数据')
                this.is_show_mychart = false
                // this.keyword_data_value.length = 0
                // this.xAxis_data.length = 0
                // this.keyword_data = ['无数据']
                // this.drawLine()
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
      let myChart = this.$echarts.init(this.$refs.myChart_ranking_compare)
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
          bottom: '23%',
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
.middle_top_time {
  margin-left: 10px !important;
}
.time {
  margin-left: 5px !important;
}
.type {
  z-index: 100;
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
td,
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
  margin-top: 40px;
}
.bottom_image {
  float: right;
  position: absolute;
  top: 206px;
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
  /* margin-left: 553px; */
}
.myChart_tips {
  margin-top: 30px;
  display: flex;
  justify-content: center;
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
  margin-top: 20px;
}
.custom {
  width: 59px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
}

.btn_group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.classify > div:nth-child(2) {
  margin-left: 28px;
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
  margin-right: 5px;
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
}
.right {
  padding-left: 57px;
  position: relative;
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
