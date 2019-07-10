<template>
  <div id="version_message" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <!-- 第一部分 -->
        <section class="top">
          <div class="section_title">评分统计</div>
          <div class="start">
            <div class="start_left">
              <div class="start_left_title">App Store 当前显示评分</div>
              <div class="start_left_bottom">
                <div class="start_left_bottom_child_left">
                  <div
                    v-if="response_data_first_part"
                  >{{response_data_first_part.current.ratingAverage}}</div>
                  <div>
                    <el-rate v-model="start_left" disabled></el-rate>
                  </div>
                  <div
                    v-if="response_data_first_part"
                  >评分次数：{{response_data_first_part.current.totalCount}}</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[4].percent.slice(0, -1))"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[0].count}}</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[3].percent.slice(0, -1))"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[1].count}}</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[2].percent.slice(0, -1))"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[2].count}}</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[1].percent.slice(0, -1))"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[3].count}}</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.current.gradeList[0].percent.slice(0, -1))"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.current.gradeList[4].count}}</div>
                  </section>
                </div>
              </div>
            </div>
            <div class="start_right">
              <div class="start_right_title">所有版本评分</div>
              <div class="start_left_bottom">
                <div class="start_left_bottom_child_left">
                  <div
                    v-if="response_data_first_part"
                  >{{response_data_first_part.all.ratingAverage}}</div>
                  <div>
                    <el-rate v-model="start_right" disabled></el-rate>
                  </div>
                  <div
                    v-if="response_data_first_part"
                  >评分次数：{{response_data_first_part.all.totalCount}}</div>
                </div>
                <div class="start_left_bottom_child_right">
                  <section>
                    <div>5星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[4].percent.slice(0, -1))"
                        color=" #fad356"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[0].count}}</div>
                  </section>
                  <section>
                    <div>4星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[3].percent.slice(0, -1))"
                        color=" #81ef8e "
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[1].count}}</div>
                  </section>
                  <section>
                    <div>3星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[2].percent.slice(0, -1))"
                        color=" #81e1ef"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[2].count}}</div>
                  </section>
                  <section>
                    <div>2星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[1].percent.slice(0, -1))"
                        color="#ef81d4"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[3].count}}</div>
                  </section>
                  <section>
                    <div>1星</div>
                    <div>
                      <el-progress
                        v-if="response_data_first_part"
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="parseInt(response_data_first_part.all.gradeList[0].percent.slice(0, -1))"
                        color=" #ef8189"
                      ></el-progress>
                    </div>
                    <div
                      v-if="response_data_first_part"
                    >{{response_data_first_part.all.gradeList[4].count}}</div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="middle_top">
          <div class="section_title">评分记录</div>
          <div class="btn_group">
            <div class="btn_item_01">
              <div>时间</div>
              <div>
                <el-date-picker
                  v-model="start_date_for_grade"
                  type="date"
                  placeholder="起始时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="end_date_for_grade"
                  type="date"
                  placeholder="结束时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>近一个月</div>
            </div>
          </div>
          <div ref="grade_start_one" class="myChart"></div>
        </section>
        <section class="middle_bottom">
          <div class="section_title">评论统计</div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="radio01" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="在线评论"></el-radio-button>
                  <el-radio-button label="已删除评论"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_03">
              <div>时间</div>
              <div>
                <el-date-picker
                  v-model="start_date_for_common"
                  type="date"
                  placeholder="起始时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="end_date_for_common"
                  type="date"
                  placeholder="结束时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-radio-group v-model="radio02" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="近一个月"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div ref="common_one" class="myChart"></div>
        </section>
        <section class="bottom">
          <div class="section_title">评论详情</div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="radio01" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="在线评论"></el-radio-button>
                  <el-radio-button label="已删除评论"></el-radio-button>
                  <el-radio-button label="开发者回复"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_02">
              <div>评论</div>
              <div>
                <el-radio-group v-model="radio01" size="mini">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="五星"></el-radio-button>
                  <el-radio-button label="四星"></el-radio-button>
                  <el-radio-button label="三星"></el-radio-button>
                  <el-radio-button label="两星"></el-radio-button>
                  <el-radio-button label="一星"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="btn_group">
            <div class="btn_item_02">
              <div>类型</div>
              <div>
                <el-radio-group v-model="radio01" size="mini">
                  <el-radio-button label="最有帮助"></el-radio-button>
                  <el-radio-button label="最高评价"></el-radio-button>
                  <el-radio-button label="最低评价"></el-radio-button>
                  <el-radio-button label="最新评价"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_03">
              <div>时间</div>
              <div>
                <el-date-picker
                  v-model="start_date_for_common_description"
                  type="date"
                  placeholder="起始时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="end_date_for_common_description"
                  type="date"
                  placeholder="结束时间"
                  :clearable="false"
                ></el-date-picker>
              </div>
              <div>
                <el-radio-group v-model="radio02" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="近一个月"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="table_top_green">
            2019年2月20日，关键词总覆盖数：
            <span>63254</span> 前三关键词：
            <span>1244</span> 前十关键词：
            <span>6546</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>评级</th>
                <th>内容</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bottom_table_td01">
                  <div>
                    <el-rate v-model="table_start" disabled></el-rate>
                  </div>
                </td>
                <td class="bottom_table_td02">
                  <div class="table_title">软件很好用</div>
                  <div
                    class="table_description"
                  >一直都在用的东西，都用了好多年了，不会换别的搜索软件！一直都在用的东西，都用了好多年了，不会换别的搜索软件！</div>
                  <div class="table_author">
                    作者：
                    <span>khgknkgah</span>
                  </div>
                </td>
                <td class="bottom_table_td03">
                  <div>2019-02-20 12:56</div>
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

export default {
  name: 'version_message',
  components: { ios_header, left_nav },
  data() {
    return {
      //评论统计的单选按钮
      radio01: '',
      radio02: '',
      //起始时间，结束时间
      start_date_for_grade: '',
      end_date_for_grade: '',
      start_date_for_common: '',
      end_date_for_common: '',
      start_date_for_common_description: '',
      end_date_for_common_description: '',
      // 顶部搜索框
      input1: '',
      // 评分五角星
      start_left: 0,
      start_right: 0,

      table_start: 4,
      // 请求的数据
      response_data_first_part: null,
      now_country: '中国'
    }
  },
  mounted() {
    this.drawLine()
    this.drawLine01()
  },
  created: function() {
    this.get_data()
    //'当前国家发生变化，重新请求数据...'
    this.$watch('now_country', function(newValue, oldValue) {
      this.get_data()
    })
  },
  methods: {
    // 请求数据
    get_data() {
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
          let url =
            ' http://39.97.234.11:8080/GetRating?countryId=' +
            country_id +
            '&appId=281736535'
          // console.log(url)

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              this.response_data_first_part = response.data.Data
              // 设置左边的五评分五角星
              this.start_left = this.response_data_first_part.current.ratingAverage
              // 设置右边的五评分五角星
              this.start_right = this.response_data_first_part.all.ratingAverage
              // console.log(
              //   this.
              // )
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log('version_message' + this.now_country)
    },
    // 画middle_top的canvas
    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.grade_start_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: ['一星', '二星', '三星', '四星', '五星']
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '12%',
          top: '7%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '一星',
            stack: 'start',
            type: 'bar',
            barWidth: 30, //宽度
            itemStyle: {
              color: '#ef8189'
            },
            data: [-320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '二星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#ef81d4'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '三星',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#81e1ef'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '四星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#81ef8e'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '五星',
            stack: 'start',
            type: 'bar',
            itemStyle: {
              color: '#efd581'
            },
            data: [862, 1018, 964, 1026, 1679, 1600, 1570]
          }
        ]
      })
    }, // 画middle_bottom的canvas
    drawLine01: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.common_one)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          y: 'bottom',
          data: ['在线评论', '以删除评论']
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '12%',
          top: '7%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '在线评论',
            type: 'bar',
            stack: 'start',
            itemStyle: {
              color: '#009bef'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '以删除评论',
            stack: 'start',
            type: 'bar',
            barWidth: 30, //宽度
            itemStyle: {
              color: '#d3f0ff'
            },
            data: [20, 332, 301, 334, 390, 330, 320]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.bottom_table_td01 {
  width: 238px !important;
}
.bottom_table_td02 {
  text-align: left;
  width: 480px !important;
  padding: 30px;
  box-sizing: border-box;
}

table .table_author span {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #009bef;
}
table .table_description,
table .table_author {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
table .table_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
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
  margin-bottom: 50px;
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
.bottom > div:nth-child(3) {
  margin-top: 16px;
}
.btn_item_03 > div:nth-child(2) div {
  width: 119px;
}
.btn_item_03 > div:nth-child(3) div {
  width: 119px;
}
.btn_item_03 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_03 {
  display: flex;
  align-items: center;
}
.btn_item_03 > div {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 10px;
}
.btn_item_02 > div:nth-child(1) {
  margin-right: 16px !important;
}
.btn_item_02 {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-right: 16px;
}
.myChart {
  width: 976px;
  height: 350px;
}
.btn_item_01 > div:nth-child(4),
.btn_item_01 > div:nth-child(5),
.btn_item_01 > div:nth-child(6) {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  width: 70px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
}
.btn_item_01 > div:nth-child(2) div {
  width: 119px;
}
.btn_item_01 > div:nth-child(3) div {
  width: 119px;
}
.btn_item_01 > div:nth-child(1) {
  margin-right: 16px !important;
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
.btn_group {
  display: flex;
  align-items: center;
}
.top {
  margin-bottom: 50px;
}
.start_left_bottom_child_right section > div {
  margin-right: 15px;
}
.start_left_bottom_child_right section > div:nth-child(2) {
  width: 175px;
  height: 22px;
}
.start_left_bottom_child_right > section:first-child {
  margin-top: 34px;
}
.start_left_bottom_child_right > section {
  display: flex;
  align-items: center;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #444444;
  margin-bottom: 13px;
}
.start_left_bottom_child_left {
  width: 155px;
}
.start_left_bottom_child_left > div {
  margin-top: 5px;
}
.start_left_bottom_child_left > div:first-child {
  font-family: SourceHanSansCN-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 78px;
}
.start_left_bottom_child_left div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  text-align: center;
}
.start .start_right_bottom,
.start .start_left_bottom {
  height: 230px;
  border: solid 1px #f7f7f7;
  display: flex;
}
.start .start_right_title,
.start .start_left_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0px;
  color: #222222;
  height: 40px;
  background-color: #f7f7f7;
}
.start > div:first-child {
  margin-right: 22px;
}
.start > div {
  width: 465px !important;
}
.start {
  display: flex;
  align-items: center;
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
.right {
  padding-left: 57px;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
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
