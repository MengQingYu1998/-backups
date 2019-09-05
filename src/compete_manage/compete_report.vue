<template>
  <div id="compete_report">
    <div class="left_and_right">
      <div class="left">
        <img src="../assets/compete_manage/img.png" alt />
        <span>竞品管理</span>
      </div>
      <div class="right">
        <div class="nav_tips">
          <div>竞品管理 > 竞对报告</div>
        </div>
        <div class="vs">
          <div class="vs_div">
            <img
              src="https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/59/79/3c/59793c41-3406-4d66-4dc2-085f41fa3de5/AppIcon-0-1x_U007emarketing-0-0-85-220-10.png/100x100bb.png"
              alt
            />
            <span class="app_name">阿斯顿</span>
            <span class="app_description">阿斯顿发送到发送到</span>
            <span class="add_compete">&nbsp;</span>
          </div>
          <img src="../assets/ios/vs.png" alt />
          <div class="vs_div">
            <img
              src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/30/e2/4a/30e24a65-5d23-71b4-ff92-a8eaa1ef4fcc/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-10.png/100x100bb.png"
              alt
            />
            <span class="app_name">阿斯</span>
            <span class="app_description">阿斯顿发送到发送到</span>
            <span class="add_compete">添加竞品</span>
          </div>
        </div>
        <div class="title_tips">
          <div>榜单</div>
        </div>
        <div class="table_first_group">
          <table>
            <thead>
              <tr>
                <th>榜单类型</th>
                <th>走势图</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table_no_data">
                <td colspan="2">暂无数据</td>
              </tr>
              <tr>
                <td>榜单类型</td>
                <td>
                  <div class="mychart" ref="table_first_group_mychart01"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>榜单类型</th>
                <th>走势图</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table_no_data">
                <td colspan="2">暂无数据</td>
              </tr>
              <tr>
                <td>榜单类型</td>
                <td>
                  <div class="mychart" ref="table_first_group_mychart02"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="title_tips">
          <div>关键词</div>
        </div>
        <div class="table_second_group">
          <!-- 第一个table -->
          <table>
            <thead>
              <tr>
                <th>总覆盖数</th>
                <th>
                  有效覆盖数
                  <el-popover placement="bottom" trigger="hover" width="155">
                    <div class="popover_content">指数≥4605的关键词</div>
                    <img
                      slot="reference"
                      class="tan_hao"
                      src="../assets/ams_bidding/tan_hao.png"
                      alt
                    />
                  </el-popover>
                </th>
                <th>Top3且有效覆盖数</th>
                <th>Top10且有效覆盖数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="blue_font">23</td>
                <td class="blue_font">234</td>
                <td class="blue_font">234</td>
                <td class="blue_font">234</td>
              </tr>
            </tbody>
          </table>
          <!-- 第二个table -->
          <table>
            <thead>
              <tr>
                <th>总覆盖数</th>
                <th>
                  有效覆盖数
                  <el-popover placement="bottom" trigger="hover" width="155">
                    <div class="popover_content">指数≥4605的关键词</div>
                    <img
                      slot="reference"
                      class="tan_hao"
                      src="../assets/ams_bidding/tan_hao.png"
                      alt
                    />
                  </el-popover>
                </th>
                <th>Top3且有效覆盖数</th>
                <th>Top10且有效覆盖数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="blue_font">33</td>
                <td class="blue_font">3333</td>
                <td class="blue_font">33</td>
                <td class="blue_font">111</td>
              </tr>
            </tbody>
          </table>
          <!-- 第三个table -->
          <table>
            <thead>
              <tr>
                <th>近期在优化关键词</th>
                <th>搜索指数</th>
                <th>排名</th>
                <th>变动</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="width_180">45</td>
                <td class="blue_font width_100">45</td>
                <td>45</td>
                <td class="td_flex">
                  <div>
                    <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                    <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                    <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                    <div
                      :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                    >{{Math.abs(50)}}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 第四个table -->
          <table>
            <thead>
              <tr>
                <th>近期在优化关键词</th>
                <th>搜索指数</th>
                <th>排名</th>
                <th>变动</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="width_180">45</td>
                <td class="blue_font width_100">45</td>
                <td>45</td>
                <td class="td_flex">
                  <div>
                    <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                    <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                    <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                    <div
                      :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                    >{{Math.abs(50)}}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 第五个table -->
          <table>
            <thead>
              <tr>
                <th>近期在维护关键词</th>
                <th>搜索指数</th>
                <th>排名</th>
                <th>变动</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="width_180">45</td>
                <td class="blue_font width_100">45</td>
                <td>45</td>
                <td class="td_flex">
                  <div>
                    <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                    <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                    <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                    <div
                      :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                    >{{Math.abs(50)}}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 第六个table -->
          <table>
            <thead>
              <tr>
                <th>近期在维护关键词</th>
                <th>搜索指数</th>
                <th>排名</th>
                <th>变动</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="width_180">45</td>
                <td class="blue_font width_100">45</td>
                <td>45</td>
                <td class="td_flex">
                  <div>
                    <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                    <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                    <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                    <div
                      :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                    >{{Math.abs(50)}}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="title_tips mt_15">
          <div>版本更新频率</div>
        </div>
        <div class="div_group">
          <div>
            版本更新频率为：
            <span>5天/次</span>
          </div>
          <div>
            版本更新频率为：
            <span>5天/次</span>
          </div>
        </div>
        <div class="title_tips">
          <div>评分评论</div>
        </div>
        <div class="table_third_group">
          <table>
            <thead>
              <tr>
                <th>当前版本评分</th>
                <th>所有版本评分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="blob_font">{{start_left01}}</div>
                  <el-rate v-model="start_left01" disabled></el-rate>
                </td>
                <td>
                  <div class="blob_font">{{start_left02}}</div>
                  <el-rate v-model="start_left02" disabled></el-rate>
                </td>
              </tr>
              <tr>
                <td colspan="2">当前应用评分评论较好</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>当前版本评分</th>
                <th>所有版本评分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="blob_font">{{start_left01}}</div>
                  <el-rate v-model="start_left01" disabled></el-rate>
                </td>
                <td>
                  <div class="blob_font">{{start_left02}}</div>
                  <el-rate v-model="start_left02" disabled></el-rate>
                </td>
              </tr>
              <tr>
                <td colspan="2">当前应用评分评论较好</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="title_tips">
          <div>多包矩阵策略</div>
        </div>
        <div class="div_group">
          <div>有多包矩阵策略</div>
          <div>无多包矩阵策略</div>
        </div>
        <div class="title_tips">
          <div>专题</div>
        </div>
        <div class="div_group">
          <div>专题数量：10</div>
          <div>专题数量：10</div>
        </div>
        <div class="title_tips">
          <div>开发者流量入口优化</div>
        </div>
        <div class="div_group">
          <div>在做优化</div>
          <div>未做优化</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'hot_search',
  data() {
    return {
      response_data: null,
      start_left01: 5,
      start_left02: 3.6
    }
  },
  mounted() {
    this.drawLine01()
    this.drawLine02()
  },
  methods: {
    drawLine01() {
      let myChart = this.$echarts.init(this.$refs.table_first_group_mychart01)
      let option = {
        xAxis: {
          type: 'category',

          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            symbol: 'none',

            lineStyle: {
              normal: {
                color: '#009bef',
                width: 2
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    },
    drawLine02() {
      let myChart = this.$echarts.init(this.$refs.table_first_group_mychart02)
      let option = {
        xAxis: {
          type: 'category',

          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            symbol: 'none',

            lineStyle: {
              normal: {
                color: '#009bef',
                width: 2
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>
<style lang="less" scoped>
.table_third_group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  table {
    table-layout: fixed;
    width: 493px;
    border: solid 1px #f2f2f2;
    text-align: center;
    tbody {
      tr {
        font-family: SourceHanSansCN-Bold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        border-bottom: 1px solid #f2f2f2;
      }
      tr:nth-child(1) {
        height: 150px;
      }
      tr:nth-child(2) {
        height: 50px;
        font-family: SourceHanSansCN-Normal;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #009bef;
        text-align: left;
        td {
          padding-left: 60px;
        }
      }
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

      tr {
        height: 40px;
      }
    }
  }
}
.div_group {
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    margin-left: 23px;
  }
  > div {
    width: 100%;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 58px;
    border: solid 1px #f7f7f7;
    letter-spacing: 0px;
    color: #222222;
    padding-left: 30px;
    span {
      font-family: SourceHanSansCN-Normal;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #009bef;
    }
  }
}
.table_second_group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .tan_hao {
    margin-left: 5px;
    vertical-align: -2px;
  }
  .td_flex {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      margin: 0 auto;
    }
    img {
      margin-right: 7px;
    }
  }
  .blue_font {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #009bef;
  }

  table {
    width: 493px;
    border: solid 1px #f2f2f2;
    text-align: center;
    margin-bottom: 40px;
    .width_180 {
      width: 180px;
    }
    .width_100 {
      width: 100px;
    }
    tr {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222;
      border-bottom: 1px solid #f2f2f2;
      td {
        height: 60px;
      }
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

      tr {
        height: 40px;
      }
    }
  }
}
.table_first_group {
  display: flex;
  align-items: center;
  .mychart {
    height: 90px;
  }
  table:nth-child(2) {
    margin-left: 23px;
  }
  table {
    width: 100%;
    border: solid 1px #f2f2f2;
    text-align: center;

    tr {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222;
      border-bottom: 1px solid #f2f2f2;
      td {
        height: 100px;
      }
      td:nth-child(1) {
        width: 140px;
      }
      td:nth-child(2) {
      }
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

      tr {
        height: 40px;
      }
    }
  }
}
.mt_15 {
  margin-top: -15px !important;
}
.vs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 202px;
  margin-top: 80px;

  .vs_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    height: 172px;
    img {
      width: 94px;
      height: 94px;
      border-radius: 8px;
    }
    .app_name {
      text-align: center;
      width: 116px;
      font-family: SourceHanSansCN-Medium;
      line-height: 13px;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0px;
      color: #444444;
    }
    .app_description {
      width: 116px;
      text-align: center;
      font-family: SourceHanSansCN-Normal;
      font-size: 13px;
      line-height: 13px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #888888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .add_compete {
      font-family: SourceHanSansCN-Medium;
      text-align: center;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 13px;
      letter-spacing: 0px;
      color: #009bef;
    }
  }
}
.nav_tips {
  div {
    width: 128px;
    font-family: SourceHanSansCN-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: 0px;
    padding: 0 24px;
    color: #222222;
    border-bottom: 1px solid #009bef;
  }
  border-bottom: 1px solid #f2f2f2;
  margin-top: -7px;
  margin-bottom: 21px;
}
.title_tips {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #222222;
  margin: 55px 0 22px 0;
  padding-left: 10px;
  border-left: 2px solid #429ae8;
}
.left_and_right {
  display: flex;
  .right {
    width: 100%;
  }
  .left {
    width: 158px;
    border-right: 1px solid #efefef;
    margin-right: 56px;
    height: 700px;
    span {
      font-family: SourceHanSansCN-Bold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 14px;
      letter-spacing: 0px;
      color: #222222;
      margin-left: 12px;
    }
  }
}

.gray {
  color: #888888;
}
.red {
  color: #f50202;
}
.blue {
  color: #009bef;
}
#compete_report {
  width: 1200px;
  margin: 0 auto;
  padding-top: 31px;
  padding-bottom: 50px;
}
</style>