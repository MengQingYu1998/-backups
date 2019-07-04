<template>
  <div id="same_dev_app" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header/>
    <div class="left_and_right">
      <div class="left">
        <left_nav/>
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
              <tr>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
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
                <el-radio-group v-model="radio1" size="mini">
                  <el-radio-button label="按分钟"></el-radio-button>
                  <el-radio-button label="按小时"></el-radio-button>
                  <el-radio-button label="按天"></el-radio-button>
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="7天"></el-radio-button>
                  <el-radio-button label="30天"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="classify">
              <div>类型</div>
              <div>
                <el-radio-group v-model="radio2" size="mini">
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
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
            <div class="classify">
              <div>分类</div>
              <div>
                <el-radio-group v-model="radio3" size="mini">
                  <el-radio-button label="总榜"></el-radio-button>
                  <el-radio-button label="应用"></el-radio-button>
                  <el-radio-button label="工具"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="world_map">
            <world_map :country_temp="country_temp"/>
            <div class="level">
              <div class="one_level">
                <div></div>
                <div>1</div>
              </div>
              <div class="two_level">
                <div></div>
                <div>500</div>
              </div>
              <div class="three_level">
                <div></div>
                <div>1000</div>
              </div>
              <div class="four_level">
                <div></div>
                <div>5000</div>
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
            <tbody>
              <tr>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>

                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
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
                <el-select v-model="equipmentValue">
                  <el-option v-for="item in equipment " :key="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>应用总榜（免费）</th>
                <th>摄影与录像（免费）</th>
                <th>摄影与录像（免费）</th>
                <th>总榜（免费）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
                </td>
                <td>
                  <div class="rankingChangeFontColor">（总榜）</div>
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
export default {
  name: 'same_dev_app',
  components: { ios_header, left_nav, world_map },
  data() {
    return {
      // 世界地图测试数据
      country_temp: ['中国', '美国', '俄罗斯', '泰国', '新加坡'],
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
      // 单选按钮组
      radio1: '今日',
      radio2: '全部',
      radio3: '总榜',
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
    }
  }
}
</script>
<style scoped>
.one_level {
  width: 18px;
  height: 18px;
  background-color: #91d8ff;
}
.two_level {
  width: 18px;
  height: 18px;
  background-color: #31b6fe;
}
.three_level {
  width: 18px;
  height: 18px;
  background-color: #0191df;
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
.world_map {
  position: relative;
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
  width: 72px;
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
}

thead tr {
  height: 40px;
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
