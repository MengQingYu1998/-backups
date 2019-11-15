<template>
  <div id="ranking_compare">
    <div class="content">
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
                <el-radio-group v-model="equipmentValue" size="mini">
                  <el-radio-button
                    v-for="item in equipment"
                    :key="item.value"
                    :label="item.value"
                  ></el-radio-button>
                </el-radio-group>
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
          </div>
          <div class="btn_group">
            <div class="middle_top_time">
              <div class="time_width">时间</div>
              <div>
                <el-radio-group v-model="middle_top_radio3" size="mini">
                  <el-radio-button label="今日"></el-radio-button>
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="7天"></el-radio-button>
                  <el-radio-button label="30天"></el-radio-button>
                  <el-radio-button label="180天"></el-radio-button>
                  <el-radio-button label="360天"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="btn_item_01">
              <!-- <div>时间</div> -->
              <div id="dateValue01" @click="dateValue01_click">
                <el-date-picker
                  v-model="middle_top_time01"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="middle_top_pickerOptions"
                  :clearable="false"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  prefix-icon="el-icon-caret-bottom"
                  @blur="dateValue_blur01"
                  @focus="dateValue_focus01"
                ></el-date-picker>
              </div>
            </div>
          </div>

          <div class="position_relative">
            <div
              ref="ranking_compare"
              class="myChart"
              style="height: 473px;"
              v-show="is_show_myChart_and_table && !no_data"
            ></div>
            <div class="bottom_image pointer">
              <img
                v-if="!is_show_myChart_and_table"
                v-on:click="is_show_myChart_function"
                class="float_right"
                src="../assets/keyword/three.png"
                alt
              />
              <img
                v-else
                v-on:click="is_show_myChart_function"
                class="float_right"
                src="../assets/keyword/three_active.png"
                alt
              />
              <img
                v-if="is_show_myChart_and_table"
                v-on:click="is_show_table_function"
                class="float_right"
                src="../assets/keyword/calculator.png"
                alt
              />
              <img
                v-else
                v-on:click="is_show_table_function"
                class="float_right"
                src="../assets/keyword/calculator_active.png"
                alt
              />
            </div>
          </div>
          <div
            class="table_wraper"
            v-show="!no_data && !is_show_myChart_and_table"
          >
            <table>
              <thead v-if="response_data_second">
                <tr>
                  <th>
                    <span>时间</span>
                  </th>
                  <th
                    v-for="(item, index) in keyword_data"
                    :key="'tableasdfwe' + index"
                  >
                    <span>{{ item }}</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="response_data_second">
                <tr
                  v-for="(item, index) in xAxis_data.length"
                  :key="'table03wergfsdarw' + index"
                >
                  <td>
                    <div>{{ xAxis_data[index] }}</div>
                  </td>
                  <td
                    v-for="(item_son, index_son) in keyword_data"
                    :key="'table03wergf' + index_son"
                  >
                    <div>{{ keyword_data_value[index_son][index] }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="myChart" v-show="no_data">暂无数据</div>
          <div v-show="is_show_myChart_and_table">
            <div
              class="show_all pointer"
              v-show="!canvas_is_show_all"
              @click="selected_data_function(true)"
            >
              显示所有
            </div>
            <div
              class="show_all pointer"
              v-show="canvas_is_show_all"
              @click="selected_data_function(false)"
            >
              隐藏所有
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from "./ios_header";
import left_nav from "./left_nav";
// 引入工具类
import {
  formatDate,
  timestamp,
  replace_some_chart,
  time_reset,
  time_rotate,
  time_inactive,
  time_active
} from "../common/util.js";
export default {
  name: "ranking_compare",
  components: { ios_header, left_nav },
  data() {
    let that = this;
    return {
      timeType: "", //给后台传递的类型，是按分钟 按小时 按天
      now_app_id: null,
      now_app_id02: null,
      db_number_is_same: 0, //修复用户输入过快的bug
      no_data: false,
      is_show_myChart_and_table: false,
      now_country: "中国",
      response_data_second: null,

      middle_top_radio2: "全部",
      middle_top_radio3: "今日",
      middle_top_time01: "",
      middle_top_pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
          // 这里就是设置当天后的日期不能被点击
        }
      },
      // 控制折线图显示所有
      canvas_is_show_all: true,
      //canvas 关键词data数组
      keyword_data: [],
      // 图例数组。为了四个就换行，拼接''
      legend_array: [],
      // 数据
      keyword_data_value: [],
      // X轴文本
      xAxis_data: [],
      // 控制折线显隐
      selected_data: {},
      yAxis_max: 5, //Y轴值的问题
      // grid_bottom: '13%',

      // 设备选择
      equipment: [
        {
          value: "iPhone"
        },
        {
          value: "iPad"
        }
      ],
      equipmentValue: "iPhone",
      is_show_table_myChart: true
    };
  },
  watch: {
    $route(to, from) {
      this.$route.query.now_country
        ? (this.now_country = this.$route.query.now_country)
        : (this.now_country = "中国");
      this.$route.query.now_app_id
        ? (this.now_app_id = this.$route.query.now_app_id)
        : (this.now_app_id = null);
      this.$route.query.now_app_id02
        ? (this.now_app_id02 = this.$route.query.now_app_id02)
        : (this.now_app_id02 = null);
      this.get_data_second();
    }
  },
  created: function() {
    this.$route.query.now_country
      ? (this.now_country = this.$route.query.now_country)
      : (this.now_country = "中国");
    this.$route.query.now_app_id
      ? (this.now_app_id = this.$route.query.now_app_id)
      : (this.now_app_id = null);
    this.$route.query.now_app_id02
      ? (this.now_app_id02 = this.$route.query.now_app_id02)
      : (this.now_app_id02 = null);
    this.$watch("now_country", function(newValue, oldValue) {
      let that = this;
      this.$router.push({
        path: "/ranking_compare",
        query: {
          now_country: that.now_country,
          now_app_id: that.now_app_id,
          now_app_id02: that.now_app_id02
        }
      });
    });
    this.$watch("equipmentValue", function(newValue, oldValue) {
      this.get_data_second();
    });
    this.$watch("middle_top_time01", function(newValue, oldValue) {
      if (newValue != "") {
        this.middle_top_radio3 = "";
        time_active("#dateValue01");
      }
      this.get_data_second();
    });

    this.$watch("middle_top_radio2", function(newValue, oldValue) {
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all);
      this.get_data_second();
    });
    this.$watch("middle_top_radio3", function(newValue, oldValue) {
      if (newValue != "") {
        time_inactive("#dateValue01");
      }
      // 1.解决切换隐藏所有的bug
      this.selected_data_function(this.canvas_is_show_all);
      this.get_data_second();
    });
  },
  mounted() {
    this.get_data_second();
  },
  methods: {
    dateValue01_click() {
      if (this.middle_top_time01) {
        time_active("#dateValue01");
        this.middle_top_radio3 = "";
        this.get_data_second();
      }
    },
    // 控制时间组件旋转
    // 1.给日期组件的父类添加一个新的id,然后调用方法

    dateValue_blur01() {
      time_reset("#dateValue01");
    },
    dateValue_focus01() {
      time_rotate("#dateValue01");
    },
    get_data_second() {
      this.db_number_is_same++;
      let is_excute_function = this.db_number_is_same;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.ranking_compare);

      this.myChart.showLoading({
        text: "",
        color: "#D3D3D3"
      });
      this.$axios
        .get("/GetCountry")
        .then(response => {
          // 获取国家ID
          // console.log('获取国家ID')

          let country_id;
          let arr_country = response.data.Data;
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id;
              return false;
            }
          });

          let endDate, startDate;
          switch (this.middle_top_radio3) {
            case "":
              startDate = this.middle_top_time01[0];
              endDate = this.middle_top_time01[1];
              // 判断时间相差多少天，大于七天类型timeType传递 按天    小于timeType传递按小时
              let nTime =
                new Date(endDate).getTime() - new Date(startDate).getTime();
              let day = Math.floor(nTime / 86400000);
              // console.log(day);
              if (day > 6) {
                this.timeType = 3;
              } else {
                this.timeType = 2;
              }
              break;
            case "今日":
              this.timeType = 2;
              startDate = formatDate(new Date(), "yyyy-MM-dd");
              endDate = formatDate(new Date(), "yyyy-MM-dd");
              break;
            case "昨日":
              this.timeType = 2;
              let yesterday = new Date();
              yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
              startDate = formatDate(yesterday, "yyyy-MM-dd");
              endDate = startDate;
              break;
            case "7天":
              this.timeType = 2;
              let yesterday01 = new Date();
              yesterday01.setTime(
                yesterday01.getTime() - 24 * 60 * 60 * 1000 * 7
              );
              startDate = formatDate(yesterday01, "yyyy-MM-dd");
              endDate = formatDate(new Date(), "yyyy-MM-dd");
              break;
            case "30天":
              this.timeType = 3;
              let yesterday02 = new Date();
              yesterday02.setTime(
                yesterday02.getTime() - 24 * 60 * 60 * 1000 * 30
              );
              startDate = formatDate(yesterday02, "yyyy-MM-dd");
              endDate = formatDate(new Date(), "yyyy-MM-dd");
              break;
            case "180天":
              this.timeType = 3;
              let yesterday03 = new Date();
              yesterday03.setTime(
                yesterday03.getTime() - 24 * 60 * 60 * 1000 * 180
              );
              startDate = formatDate(yesterday03, "yyyy-MM-dd");
              endDate = formatDate(new Date(), "yyyy-MM-dd");
              break;
            case "360天":
              this.timeType = 3;
              let yesterday04 = new Date();
              yesterday04.setTime(
                yesterday04.getTime() - 24 * 60 * 60 * 1000 * 360
              );
              startDate = formatDate(yesterday04, "yyyy-MM-dd");
              endDate = formatDate(new Date(), "yyyy-MM-dd");
              break;
            default:
              break;
          }

          let brand;
          if (this.middle_top_radio2 == "全部") {
            brand = 0;
          } else if (this.middle_top_radio2 == "免费") {
            brand = 1;
          } else if (this.middle_top_radio2 == "付费") {
            brand = 2;
          } else if (this.middle_top_radio2 == "畅销") {
            brand = 3;
          }

          // 设备选择
          let deviceType = this.equipmentValue == "iPhone" ? 1 : 2;
          let url = "/PostRandTrend";

          let appid = this.now_app_id + "," + this.now_app_id02;
          let that = this;
          let data = {
            appids: appid,
            countryId: country_id,
            startDate: startDate,
            endDate: endDate,
            brand: brand,
            timeType: that.timeType,
            device: deviceType
          };
          // console.log(data);
          // 请求数据
          this.$axios
            .post(url, this.$qs.stringify(data), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(response => {
              if (is_excute_function == this.db_number_is_same) {
                // console.log(response.data)
                // console.log(response.data.Data.length)
                this.is_show_myChart_and_table = false;
                if (
                  response.data.Data != null &&
                  response.data.Data.length > 0
                ) {
                  this.no_data = false;
                  // this.selected_data_function(false)
                  this.is_show_myChart_and_table = true;
                  // console.log('有数据')
                  this.keyword_data_value = new Array();
                  this.xAxis_data.length = new Array();
                  this.keyword_data.length = new Array();

                  this.response_data_second = response.data.Data;

                  let temp = response.data.Data[1];
                  // 都谁？ 抖音 快手 内涵
                  let name_group01 = this.response_data_second[0].rankTrendInfo
                    .RankList;
                  let name_group02 = temp.rankTrendInfo.RankList;

                  this.response_data_second[1].appName = replace_some_chart(
                    this.response_data_second[1].appName
                  );
                  this.response_data_second[0].appName = replace_some_chart(
                    this.response_data_second[0].appName
                  );

                  name_group01.forEach(element => {
                    this.keyword_data.push(
                      this.response_data_second[0].appName + "-" + element
                    );
                  });
                  name_group02.forEach(element => {
                    this.keyword_data.push(temp.appName + "-" + element);
                  });
                  // this.keyword_data = this.keyword_data.concat(
                  //   temp.rankTrendInfo.RankList
                  // )
                  //y轴数值
                  let temp01 = this.response_data_second[0].rankTrendInfo.r1;
                  temp01.forEach(element => {
                    this.keyword_data_value.push(element.data);
                  });
                  let temp03 = temp.rankTrendInfo.r1;
                  temp03.forEach(element => {
                    this.keyword_data_value.push(element.data);
                  });
                  // x轴数据
                  let temp02 = this.response_data_second[0].rankTrendInfo.r2
                    .data;

                  this.xAxis_data = temp02.map(element => {
                    // 判断时间相差多少天
                    // console.log(day02);
                    if (this.timeType == 2) {
                      //按小时
                      return timestamp(element, "Y年M月D日 h点m分");
                    } else if (this.timeType == 3) {
                      //按天
                      return timestamp(element, "Y年M月D日");
                    }
                  });
                  // 重新定义legend的图例数组，为了换行
                  let times = 0;
                  this.legend_array = this.keyword_data.slice(0);
                  this.legend_array.forEach((element, index) => {
                    times += 1;
                    if ((index + 1) % 4 == 0) {
                      this.legend_array.splice(times, 0, "");
                      times += 1;
                    }
                  });
                  // let legend_height =
                  //   Math.ceil(this.keyword_data.length / 4) * 30 + 330 + "px";
                  // document.getElementsByClassName(
                  //   "myChart"
                  // )[0].style.height
                  // console.log(legend_height)

                  this.drawLine();

                  this.myChart.hideLoading();
                } else {
                  // console.log('无数据')
                  this.no_data = true;
                  this.is_show_myChart_and_table = false;
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 控制显示echarts还是table
    is_show_myChart_function() {
      this.is_show_myChart_and_table = true;
    },
    is_show_table_function() {
      this.is_show_myChart_and_table = false;
    },

    // 点击日历组件

    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = new Object();
      this.keyword_data.forEach(element => {
        obj[element] = bol;
      });
      this.selected_data = obj;
      this.drawLine();
      this.canvas_is_show_all = bol;
      this.canvas_is_show_all = bol;
      // console.log(this.selected_data)
    },
    // 便利keyword_data生成canvas的series数据
    series_data: function() {
      let series_data_arr = new Array();
      //声明对象
      function Obj(name, data) {
        this.name = name;
        this.type = "line";
        this.symbol = "circle";
        this.data = data;
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]));
      });
      // console.log(series_data_arr)
      return series_data_arr;
    },
    drawLine: function() {
      let that = this;
      if (that.response_data_second == null) {
        return false;
      }
      // 绘制图表
      this.myChart.setOption(
        {
          title: {
            text:
              that.response_data_second[0].appName +
              " 与 " +
              that.response_data_second[1].appName +
              "排名对比",
            subtext: "【" + that.middle_top_radio3 + "】榜单排名走势",
            left: "center",
            itemGap: 20,
            textStyle: {
              color: "#222222",
              fontSize: 16,
              // fontFamily: "SourceHanSansCN-Medium",
              fontWeight: "normal"
            },
            subtextStyle: {
              color: "#222222",
              fontSize: 14,
              // fontFamily: "SourceHanSansCN-Medium",
              fontWeight: "normal"
            }
          },
          color: [
            "#009bef",
            "#e75b48",
            "#05c898",
            "#f8c848",
            "#d55282",
            "#f49c47",
            "#39c3da",
            "#7b4dee",
            "#a4d53b",
            "#b2b2b2",
            "#009bef",
            "#e75b48",
            "#05c898",
            "#f8c848",
            "#d55282",
            "#f49c47",
            "#39c3da",
            "#7b4dee",
            "#a4d53b",
            "#b2b2b2",
            "#009bef",
            "#e75b48",
            "#05c898",
            "#f8c848",
            "#d55282",
            "#f49c47",
            "#39c3da",
            "#7b4dee",
            "#a4d53b",
            "#b2b2b2",
            "#009bef",
            "#e75b48",
            "#05c898",
            "#f8c848",
            "#d55282",
            "#f49c47",
            "#39c3da",
            "#7b4dee",
            "#a4d53b",
            "#b2b2b2",
            "#009bef",
            "#e75b48",
            "#05c898",
            "#f8c848",
            "#d55282",
            "#f49c47",
            "#39c3da",
            "#7b4dee",
            "#a4d53b",
            "#b2b2b2"
          ],
          tooltip: {
            formatter: function(data) {
              let tr = "";
              data.forEach(element => {
                tr += `<tr  style="border:none !important">
                  <td>${element.marker.replace(
                    "width:10px;height:10px;",
                    "width:6px;height:6px;vertical-align:2px;"
                  )}</td>
                  <td style="padding-right:10px">${element.seriesName}</td>
                  <td>${element.value}</td>
                  </tr>`;
              });
              let str = `<p>${data[0].axisValue}</p><table><tbody>${tr}</tbody></table>`;
              return str;
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line" // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: "#fff",
            extraCssText:
              "box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);line-height:25px;padding:10px 15px",
            textStyle: {
              color: "#222222;",
              fontSize: 13,
              align: "left"
            },

            trigger: "axis"
          },
          legend: {
            data: that.legend_array,
            top: "365px",
            orient: "horizontal",
            selected: that.selected_data
          },
          grid: {
            height: "250px",
            top: "85px",
            left: "3%",
            right: "4%",
            bottom: "35%"
          },
          toolbox: {
            feature: {
              saveAsImage: {
                title: "保存",
                iconStyle: {
                  opacity: 1,
                  borderWidth: 1.7,
                  borderColor: "#444"
                },
                emphasis: {
                  iconStyle: {
                    opacity: 1,
                    borderWidth: 1.7,
                    borderColor: "#009bef"
                  }
                }
              }
            }
          },
          xAxis: {
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: "#DCDFE6"
              }
            },
            axisLabel: {
              color: "#222",
              formatter: function(value, index) {
                if (that.timeType == 2 && that.middle_top_radio3 == "今日") {
                  return "　　" + value.slice(-6, -3) + "　　";
                } else if (
                  that.timeType == 2 &&
                  that.middle_top_radio3 == "昨日"
                ) {
                  return value.slice(8, -3);
                } else if (
                  that.timeType == 2 &&
                  that.middle_top_radio3 == "7天"
                ) {
                  return "　　" + value.slice(5, 12) + "　　";
                } else if (
                  that.timeType == 2 &&
                  that.middle_top_radio3 == "30天"
                ) {
                  return value.slice(5, 12);
                } else if (that.timeType == 2 && that.middle_top_radio3 == "") {
                  return value.slice(5, 12);
                } else if (
                  that.timeType == 3 &&
                  that.middle_top_radio3 == "7天"
                ) {
                  return value.slice(5, 12);
                } else if (
                  that.timeType == 3 &&
                  that.middle_top_radio3 == "30天"
                ) {
                  return value.slice(5, 12);
                } else if (
                  that.timeType == 3 &&
                  that.middle_top_radio3 == "180天"
                ) {
                  return value.slice(5, 12);
                } else if (
                  that.timeType == 3 &&
                  that.middle_top_radio3 == "360天"
                ) {
                  return value.slice(5, 12);
                } else if (that.timeType == 3 && that.middle_top_radio3 == "") {
                  return value.slice(5, 12);
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
                color: ["#f2f2f2"]
              }
            },
            position: "bottom",
            type: "category",
            data: that.xAxis_data,
            // alignWithLabel: false
            boundaryGap: false
            // show: this.xAxis_is_show
            // gridIndex: 0
            // axisLine: { show: false }
          },
          yAxis: {
            axisLabel: {
              color: "#222"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCDFE6"
              }
            },
            axisTick: {
              show: false
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#f2f2f2"]
              }
            },
            minInterval: 1,
            type: "value",
            inverse: true,
            min: 1,
            max: function(value) {
              let max_value = value.max;
              if (max_value < 5) {
                that.yAxis_max = 5;
              } else if (max_value < 20) {
                that.yAxis_max = 20;
              } else if (max_value < 50) {
                that.yAxis_max = 50;
              } else if (max_value < 100) {
                that.yAxis_max = 100;
              } else if (max_value < 500) {
                that.yAxis_max = 500;
              } else if (max_value < 1000) {
                that.yAxis_max = 1000;
              } else if (max_value < 1500) {
                that.yAxis_max = 1500;
              } else {
                that.yAxis_max = max_value + 100;
              }
              return that.yAxis_max;
            }
          },
          series: that.series_data()
        },
        true
      );
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload;
      // console.log(this.now_country)
    }
  }
};
</script>

<style scoped>
.position_relative {
  position: relative;
}

.type {
  z-index: 100;
}
.right_title {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-top: 49px;
  text-align: center;
}
.show_all {
  position: relative;
  width: 65px;
  height: 24px;
  line-height: 24px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #009bef;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
  margin: 32px auto;
  margin-top: 40px;
}
thead tr {
  height: 40px;
}
th {
  width: 200px;
}
td {
  height: 60px;
  width: 200px;
}
tbody {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: block;
  max-height: 609px;
  overflow-y: scroll;
}
thead tr span {
  margin-left: -26px;
}
thead {
  width: 100%;
  background-color: #f7f7f7;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: table;
  width: 100%;
  table-layout: fixed;
}
table {
  border: solid 1px #eaeaea;
  text-align: center;
  width: 100%;
}
.table_wraper {
  width: 950px;
  overflow-x: scroll;
  border-right: solid 1px #f2f2f2;
  margin-top: 50px;
  margin-bottom: 50px;
}
.bottom_image img {
  margin-left: 10px;
  width: 17px;
  height: 16px;
}
.bottom_image {
  position: absolute;
  top: 7px;
  right: 43px;
}
.myChart_tips .float_right {
  float: right;
  margin-left: 20px;
}
.bottom_image_font {
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
  width: 950px;

  text-align: center;
  color: #bfbfbf;
  line-height: 300px;
  font-size: 25px;
  margin-top: 50px;
}
.table_sub_title {
  font-weight: 600 !important;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
  margin-top: 20px;
}
.table_title {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  text-align: center;
  margin-top: 50px;
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
.middle_top_time > div:nth-child(2) {
  margin: 0 12px;
}
.middle_top_time {
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
.classify > div:nth-child(2) {
  margin-left: 12px;
}
.classify {
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.option > div:first-child {
  margin-left: 10px;
  margin-right: 12px;
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
}
.right {
  width: 100%;
  background-color: #fff;
  margin-left: 14px;
  padding: 25px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 22px;
  margin-top: -1px;
}
.right_nav {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 2px solid #009bef;
  width: 100px;
  text-align: center;
  position: relative;
}
.left_and_right {
  display: flex;
  margin-top: 14px;
}
.content {
  width: 1200px;
  margin: 0 auto;
}
#ranking_compare {
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.left {
  width: 231px;
  position: relative;
  min-height: 621px;
}
</style>
