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
      // 控制折线显隐
      selected_data: new Object()
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {
      this.keyword_data = ['a', 'b', 'c']
      // 数据
      this.keyword_data_value = [
        ['200', '150', '700'],
        ['400', '190', '100'],
        ['500', '150', '500']
      ]
      // X轴文本
      this.xAxis_data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      console.log(this.keyword_data)
      console.log(this.keyword_data_value)
      console.log(this.xAxis_data)
      this.drawLine()

      setTimeout(() => {
        this.selected_data_function(false)
        this.keyword_data = ['a']
        // 数据
        this.keyword_data_value = [['200', '150', '700']]
        // X轴文本
        this.xAxis_data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(this.keyword_data)
        console.log(this.keyword_data_value)
        console.log(this.xAxis_data)
        this.selected_data_function(true)
        this.drawLine()
      }, 2000)
    },
    // 控制全部数据隐藏
    selected_data_function: function(bol) {
      let obj = new Object()
      this.keyword_data.forEach(element => {
        obj[element] = bol
      })
      this.selected_data = obj
      // this.can_inverse = bol

      this.drawLine()
      this.canvas_is_show_all = !this.canvas_is_show_all
      // this.can_inverse = true
    },
    series_data: function() {
      let series_data_arr = new Array()
      //声明对象
      function Obj(name, data) {
        this.name = name
        this.type = 'line'
        // this.stack = '总量'
        this.data = data
      }
      //通过便利关键词数组从而创建canvas的series数据
      this.keyword_data.forEach((element, index) => {
        series_data_arr.push(new Obj(element, this.keyword_data_value[index]))
      })
      // console.log('66666666666666666666666')
      console.log(series_data_arr)
      return series_data_arr
    },

    drawLine: function() {
      let that = this

      // 基于准备好的dom，初始化echarts实例
      let myChart = that.$echarts.init(that.$refs.demo111)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          textStyle: {
            align: 'left'
          },
          trigger: 'axis'
        },

        color: [
          '#009bef',
          '#ff6969',
          '#6277ff',
          '#ff5c7c',
          '#7546fd',
          '#ff6946',
          '#0ec597',
          '#e8ed55',
          '#a6ff70',
          '#e13eff'
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
          trigger: 'axis'
        },
        grid: {
          left: '4%',
          right: '4%',
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
          position: 'bottom',
          type: 'category',
          data: that.xAxis_data,
          boundaryGap: false
        },
        yAxis: {
          minInterval: 1,
          type: 'value',
          inverse: true,
          min: 1,
          max: 1000,
          interval: 200
        },
        series: that.series_data()
      })
    }
  },
  components: {}
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
