<template>
  <div id="trend_many" class="content">
    <div class="title">「网易云音乐」搜索结果数排名走势</div>
    <div class="line"></div>
    <div class="options">
      <div class="options_01 option">
        <div>设备</div>
        <div>
          <!-- 饿了么的select组件 -->
          <el-select v-model="equipmentValue">
            <el-option v-for="item in  equipment " :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options_02 option">
        <div>地区</div>
        <div>
          <!-- 选择国家 -->
          <country></country>
        </div>
      </div>
      <div class="options_03 option">
        <div>日期</div>
        <div>
          <!-- 饿了么的日期选择组件 -->
          <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" clear-icon></el-date-picker>
        </div>
      </div>
    </div>
    <div class="keywords">
      <div>关键词</div>

      <div class="can_del_div" v-for="(item, index) in keyword_data" :key="index">
        <div>{{item}}</div>
        <img @click="remove_keyword_data(index)" src="../assets/keyword/del.png" alt>
      </div>
      <div>
        <el-input v-model="input" placeholder="请输入关键词查询联想词"></el-input>
      </div>
      <div @click="add_can_del_div">
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <div class="table_title">【抖音】搜索指数走势</div>
    <div ref="myChart_trend_many" class="myChart" v-show="is_show_myChart_and_table"></div>

    <div class="bottom_image" v-show="is_show_myChart_and_table">
      <img
        v-on:click="is_show_myChart_and_table_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      >
      <img
        v-on:click="is_show_myChart_and_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      >
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
            <div class="table_font">2019-02-20 12:56</div>
          </td>
          <td>
            <div class="table_font">1</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom_image bottom_image_for_table" v-show="!is_show_myChart_and_table">
      <img class="float_right" src="../assets/keyword/down.png" alt v-show="false">
      <img
        v-on:click="is_show_myChart_and_table_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      >
      <img
        v-on:click="is_show_myChart_and_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      >
    </div>
    <div class="show_all" v-show="!canvas_is_show_all" @click="selected_data_function(true)">显示所有</div>
    <div class="show_all" v-show="canvas_is_show_all" @click="selected_data_function(false)">隐藏所有</div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'

export default {
  name: 'trend_many',
  components: {
    country
  },
  data() {
    return {
      // true显示myChart  false显示table表格
      is_show_myChart_and_table: true,
      // 请输入关键词查询联想词
      input: '',
      // 设备选择
      equipment: [
        {
          value: '安卓'
        },
        {
          value: 'iOS'
        }
      ],
      equipmentValue: '安卓',
      // 国家选择
      country: [
        {
          value: '中国'
        },
        {
          value: '美国'
        }
      ],
      countryValue: '中国',
      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      dateValue: '2019-6-27',
      // 控制折线图显示所有
      canvas_is_show_all: true,
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
      // X轴文本
      xAxis_data: ['周3', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 控制折线显隐
      selected_data: {}
    }
  },

  mounted() {
    this.drawLine()
  },
  methods: {
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
    // 控制显示echarts还是table
    is_show_myChart_and_table_function: function() {
      this.is_show_myChart_and_table = !this.is_show_myChart_and_table
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
    // 删除keyword_data数组里面数据，从而删除can_del_div，canvas随之改变
    remove_keyword_data: function(index) {
      this.selected_data[this.keyword_data[index]] = false
      this.keyword_data.splice(index, 1)
      this.drawLine()
    },
    // 向keyword_data数组里面添加数据，从而can_del_div和canvas随之改变
    add_can_del_div: function() {
      if (this.input == '') {
        this.$alert('不允许添加空的内容', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (!(this.keyword_data.indexOf(this.input) == -1)) {
        this.$alert('不允许添加重复内容', {
          confirmButtonText: '确定'
        })
        return false
      }
      this.keyword_data.push(this.input)
      this.input = ''
      this.drawLine()
    },

    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart_trend_many)
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
    }
  }
}
</script>
<style scoped>
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
  top: 225px;
  right: -41px;
  /* margin-top: -293px;
  margin-right: -41px; */
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
  width: 1200px;
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
.keywords > div {
  margin-right: 10px;
}
.keywords > div:first-child {
  margin-right: 15px;
}
.keywords {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.can_del_div div {
  display: inline-block;
}
.can_del_div {
  padding: 0 6px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  text-align: center;
  /* display: flex; */
}
.options_03 div:last-child {
  width: 114px !important;
}
.option div:first-child {
  margin-right: 15px;
}
.option div:last-child {
  width: 72px;
  height: 24px;
}
.option {
  display: flex;
  margin-left: 29px;
}
option:first-child {
  margin: 0;
}
.options .option:first-child {
  margin-left: 0 !important;
}
.options {
  height: 24px;
  margin: 22px 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #efefef;
}
.title {
  font-family: SourceHanSansCN-Medium;
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #429ae8;
  margin: 20px 0;
}
.content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
</style>
