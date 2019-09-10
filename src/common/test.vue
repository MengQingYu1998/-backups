<template>
  <div id="test">
    <div ref="demo111" class="myChart"></div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      keyword_data: null,
      // 数据
      keyword_data_value: null,
      // X轴文本
      xAxis_data: null,
      max: 5,
      min: 0,
      // 控制折线显隐
      selected_data: new Object()
    }
  },
  mounted() {
    this.get_data()
    // this.$watch('max', function(newValue, oldValue) {
    // console.log('maxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmax')
    // this.drawLine()
    // })
  },
  methods: {
    get_data() {
      this.myChart = this.$echarts.init(this.$refs.demo111)
      this.myChart.showLoading()
      setTimeout(() => {
        this.keyword_data = ['a发送到发斯蒂芬是', 'b是是', 'c']
        // 数据
        this.keyword_data_value = [
          ['215', '150', '736', '300'],
          ['403', '', '108', 200, '300'],
          ['5', '-', '6', '10']
        ]
        // X轴文本
        this.xAxis_data = [
          '2018-08-06',
          '2018-08-07',
          '2018-08-08',
          '2018-08-09',
          '2018-08-10'
        ]
        this.drawLine()
        this.myChart.hideLoading()
      }, 500)
    },
    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = new Object()
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      this.drawLine()
      this.canvas_is_show_all = bol
    },
    series_data: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        // this.stack = '总量'
        this.data = data
        this.symbol = 'circle'
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      console.log(series_data_arr)
      return series_data_arr
    },

    drawLine: function() {
      let that = this
      // 基于准备好的dom，初始化echarts实例

      // this.myChart.showLoading()
      // setTimeout(() => {
      //
      // }, 3000)
      let option = {
        animation: false,
        color: [
          '#62c8ff',
          '#216aff',
          '#4209a2',
          '#a000d2',
          '#ec066d',
          '#f24d3e',
          '#ff9731',
          '#ffd800',
          '#c3df00',
          '#529323'
        ],
        legend: {
          // data: that.keyword_data,
          y: 'bottom',
          selected: that.selected_data
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          extraCssText:
            'box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);line-height:25px;padding:10px 15px',
          textStyle: {
            align: 'left',
            color: '#666',
            fontSize: 13
          },
          formatter: function(data) {
            let tr = ''
            data.forEach(element => {
              tr += `<tr>
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
          }
        },
        grid: {
          left: '20%',
          right: '20%',
          // bottom: '13%',
          // width: 500,
          show: true,
          backgroundColor: 'yellow',
          // show: true,
          borderColor: 'red'
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
          axisLabel: {
            color: '#222'
          },
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              return '{value|' + value + '}'
            },
            rich: {
              value: {
                width: 100,
                backgroundColor: 'red'
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
          boundaryGap: true
        },
        yAxis: {
          axisLabel: {
            color: '#222',

            formatter: function(value, index) {
              return '{value|' + value + '}'
            },
            rich: {
              value: {
                width: 100,
                align: 'right',
                backgroundColor: 'red'
              }
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999'
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
          min: null,
          max: null
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [4, 5, 7, 10, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [800, 1000, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
      this.myChart.setOption(option, true)
      this.myChart.hideLoading()
      this.myChart.on('click', function(params) {
        console.log(params)
      })
    }
  }
}
</script>

<style  scoped>
.myChart {
  width: 965px;
  height: 300px;
  z-index: 1;
  text-align: center;
  color: #666;
  height: 300px;
  font-size: 50px;
}
</style>
