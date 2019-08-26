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
      this.keyword_data = ['a', 'b', 'c']
      // 数据
      this.keyword_data_value = [
        ['200', '150', '700'],
        ['400', '190', '100'],
        ['5', '10', '30']
      ]
      // X轴文本
      this.xAxis_data = ['2018-08-06', '2018-08-07', '2018-08-08']

      let max_value_arr = new Array()
      this.keyword_data_value.forEach(element => {
        max_value_arr.push(element.slice(0))
      })
      let max_value = 0
      max_value_arr.forEach(element => {
        element.forEach(element_son => {
          element_son = parseInt(element_son)
          if (max_value <= element_son) {
            max_value = element_son
          }
        })
      })
      this.max = max_value
      this.drawLine()
      // setTimeout(() => {
      //   this.keyword_data = ['a']
      //   // 数据
      //   this.keyword_data_value = [['5', '10', '45']]
      //   // X轴文本
      //   this.xAxis_data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      //   console.log(this.keyword_data)
      //   console.log(this.keyword_data_value)
      //   console.log(this.xAxis_data)
      //   this.drawLine()
      // }, 2000)
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
      let myChart = that.$echarts.init(that.$refs.demo111)
      let option = {
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
          data: that.keyword_data,
          y: 'bottom',
          // 控制显示隐藏哪一个折线
          // selected: {
          //   邮件营销: false
          // }
          selected: that.selected_data
        },
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis',
          backgroundColor: '#fff',
          extraCssText: 'box-shadow: 0px 0px 4px 0px  rgba(0, 0, 0, 0.18);',
          textStyle: {
            color: 'red',
            fontSize: 13
          }
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '13%',
          containLabel: true
          // show: true,
          // borderColor: 'red'
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
            show: false
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
          axisLine: {
            show: false
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
          // splitNumber: 5,
          min: that.min,
          max: that.max
        },
        series: that.series_data()
      }
      myChart.setOption(option, true)

      // myChart.on('click', 'toolbox.feature.saveAsImage', function(params) {
      //   alert(55)
      // })
      // 图例开关的行为只会触发 legendselectchanged 事件
      myChart.on('legendselectchanged', function(params) {
        // console.log(params.selected)
        let selected_key_arr = new Array()
        for (let a in params.selected) {
          selected_key_arr.push(params.selected[a])
        }
        // console.log(selected_key_arr)
        let selected_index_arr = new Array()
        selected_key_arr.forEach((element, index) => {
          if (element == true) {
            selected_index_arr.push(index)
          }
        })
        // console.log(selected_index_arr)
        let max_value_arr = new Array()
        selected_index_arr.forEach(element => {
          max_value_arr.push(that.keyword_data_value[element])
        })
        // console.log(max_value_arr)
        let max_value = 0
        max_value_arr.forEach(element => {
          element.forEach(element_son => {
            element_son = parseInt(element_son)
            if (max_value <= element_son) {
              max_value = element_son
            }
          })
        })
        console.log(max_value)
        that.max = max_value
        // that.selected_data = params.selected
        // console.log(that.selected_data)
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
  line-height: 300px;
  font-size: 50px;
}
</style>
