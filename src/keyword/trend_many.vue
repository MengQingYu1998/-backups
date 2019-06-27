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
          <select name="country" class="fastbannerform__country">
            <option value="ASA" title="AA">美国</option>
            <option value="AND" title="AD">安道尔</option>
            <option value="ARE" title="AE">阿拉伯联合酋长国</option>
            <option value="AFG" title="AF">阿富汗</option>
            <option value="ATG" title="AG">安提瓜和巴布达</option>
            <option value="ALB" title="AL">阿尔巴尼亚</option>
            <option value="ARM" title="AM">亚美</option>
            <option value="AGO" title="AO">安哥拉</option>
            <option value="ARG" title="AR">阿根廷</option>
            <option value="AUT" title="AT">奥地利</option>
            <option value="AUS" title="AU">澳大利亚</option>
            <option value="ABW" title="AW">阿鲁巴</option>
            <option value="AZE" title="AZ">阿塞拜疆</option>
            <option value="BIH" title="BA">波斯尼亚和黑塞哥维那</option>
            <option value="BRB" title="BB">巴巴多斯</option>
            <option value="BGD" title="BD">孟加拉</option>
            <option value="BEL" title="BE">比利时</option>
            <option value="BFA" title="BF">布基纳法索</option>
            <option value="BGR" title="BG">保加利亚</option>
            <option value="BHR" title="BH">巴林</option>
            <option value="BDI" title="BI">布隆迪</option>
            <option value="BEN" title="BJ">贝宁</option>
            <option value="BMU" title="BM">百慕大</option>
            <option value="BRN" title="BN">文莱</option>
            <option value="BOL" title="BO">玻利维亚</option>
            <option value="BRA" title="BR">巴西</option>
            <option value="BHS" title="BS">巴哈马</option>
            <option value="BTN" title="BT">不丹</option>
            <option value="BWA" title="BW">博茨瓦纳</option>
            <option value="BLR" title="BY">白俄罗斯</option>
            <option value="BLZ" title="BZ">伯利兹</option>
            <option value="CAN" title="CA">加拿大</option>
            <option value="COD" title="CD">刚果共和国</option>
            <option value="CAF" title="CF">中非</option>
            <option value="COG" title="CG">刚果共和国</option>
            <option value="CHE" title="CH">瑞士</option>
            <option value="CHL" title="CL">智利</option>
            <option value="CMR" title="CM">喀麦隆</option>
            <option value="CHN" title="CN" selected="selected">中国</option>
            <option value="COL" title="CO">哥伦比亚</option>
            <option value="CRI" title="CR">哥斯达黎加</option>
            <option value="CUB" title="CU">古巴</option>
            <option value="CPV" title="CV">佛得角</option>
            <option value="CYP" title="CY">塞浦路斯</option>
            <option value="CZE" title="CZ">捷克共和国</option>
            <option value="DEU" title="DE">德国</option>
            <option value="DJI" title="DJ">吉布提</option>
            <option value="DNK" title="DK">丹麦</option>
            <option value="DMA" title="DM">多米尼加</option>
            <option value="DOM" title="DO">多米尼加共和国</option>
            <option value="DZA" title="DZ">阿尔及利亚</option>
            <option value="ECU" title="EC">厄瓜多尔</option>
            <option value="EST" title="EE">爱沙尼亚</option>
            <option value="EGY" title="EG">埃及</option>
            <option value="ERI" title="ER">厄立特里亚</option>
            <option value="ESP" title="ES">西班牙</option>
            <option value="ETH" title="ET">埃塞俄比亚</option>
            <option value="FIN" title="FI">芬兰</option>
            <option value="FJI" title="FJ">斐济</option>
            <option value="FLK" title="FK">法罗群岛</option>
            <option value="FSM" title="FM">马来西亚</option>
            <option value="FRO" title="FO">法罗群岛</option>
            <option value="FRA" title="FR">法国</option>
            <option value="GAB" title="GA">加蓬</option>
            <option value="GBR" title="GB">英国</option>
            <option value="GRD" title="GD">格林纳达</option>
            <option value="GEO" title="GE">格鲁吉亚</option>
            <option value="GHA" title="GH">加纳</option>
            <option value="GIB" title="GI">直布罗陀</option>
            <option value="GMB" title="GM">冈比亚</option>
            <option value="GIN" title="GN">几内亚</option>
            <option value="GNQ" title="GQ">赤道几内亚</option>
            <option value="GRC" title="GR">希腊</option>
            <option value="GTM" title="GT">危地马拉</option>
            <option value="GNB" title="GW">几内亚比绍</option>
            <option value="GUY" title="GY">圭亚那</option>
            <option value="HKG" title="HK">香港</option>
            <option value="HND" title="HN">洪都拉斯</option>
            <option value="HRV" title="HR">克罗地亚</option>
            <option value="HTI" title="HT">海地</option>
            <option value="HUN" title="HU">匈牙利</option>
            <option value="IDN" title="ID">印度尼西亚</option>
            <option value="IRL" title="IE">爱尔兰</option>
            <option value="ISR" title="IL">以色列</option>
            <option value="IND" title="IN">印度</option>
            <option value="IRQ" title="IQ">伊拉克</option>
            <option value="IRN" title="IR">伊朗</option>
            <option value="ISL" title="IS">冰岛</option>
            <option value="ITA" title="IT">意大利</option>
            <option value="JAM" title="JM">牙买加</option>
            <option value="JOR" title="JO">约旦</option>
            <option value="JPN" title="JP">日本</option>
            <option value="KEN" title="KE">肯尼亚</option>
            <option value="KGZ" title="KG">吉尔吉斯斯坦</option>
            <option value="KHM" title="KH">柬埔寨</option>
            <option value="KIR" title="KI">基里巴斯</option>
            <option value="COM" title="KM">科摩罗</option>
            <option value="KNA" title="KN">圣基茨和尼维斯</option>
            <option value="PRK" title="KP">朝鲜</option>
            <option value="KOR" title="KR">韩国</option>
            <option value="KWT" title="KW">科威特</option>
            <option value="CYM" title="KY">开曼群岛</option>
            <option value="KAZ" title="KZ">哈萨克斯坦</option>
            <option value="LAO" title="LA">老挝</option>
            <option value="LBN" title="LB">黎巴嫩</option>
            <option value="LCA" title="LC">圣卢西亚</option>
            <option value="LIE" title="LI">列支敦士登</option>
            <option value="LKA" title="LK">斯里兰卡</option>
            <option value="LBR" title="LR">利比里亚</option>
            <option value="LSO" title="LS">莱索托</option>
            <option value="LTU" title="LT">立陶宛</option>
            <option value="LUX" title="LU">卢森堡</option>
            <option value="LVA" title="LV">拉脱维亚</option>
            <option value="LBY" title="LY">利比亚</option>
            <option value="MAR" title="MA">摩洛哥</option>
            <option value="MCO" title="MC">摩纳哥</option>
            <option value="MDA" title="MD">摩尔多瓦</option>
            <option value="MNE" title="ME">黑山</option>
            <option value="MDG" title="MG">马达加斯加</option>
            <option value="MKD" title="MK">马其顿</option>
            <option value="MLI" title="ML">马里</option>
            <option value="MMR" title="MM">缅甸</option>
            <option value="MNG" title="MN">蒙古</option>
            <option value="MAC" title="MO">澳门</option>
            <option value="MRT" title="MR">毛里塔尼亚</option>
            <option value="MLT" title="MT">马耳他</option>
            <option value="MUS" title="MU">毛里求斯</option>
            <option value="MDV" title="MV">马尔代夫</option>
            <option value="MWI" title="MW">马拉维</option>
            <option value="MEX" title="MX">墨西哥</option>
            <option value="MYS" title="MY">马来西亚</option>
            <option value="MOZ" title="MZ">莫桑比克</option>
            <option value="NAM" title="NA">纳米比亚</option>
            <option value="NER" title="NE">尼日尔</option>
            <option value="NGA" title="NG">尼日利亚</option>
            <option value="NIC" title="NI">尼加拉瓜</option>
            <option value="NLD" title="NL">荷兰</option>
            <option value="NOR" title="NO">挪威</option>
            <option value="NPL" title="NP">尼泊尔</option>
            <option value="NRU" title="NR">瑙鲁</option>
            <option value="NZL" title="NZ">新西兰</option>
            <option value="OMN" title="OM">阿曼</option>
            <option value="PAN" title="PA">巴拿马</option>
            <option value="PER" title="PE">秘鲁</option>
            <option value="PNG" title="PG">巴布亚新几内亚</option>
            <option value="PHL" title="PH">菲律宾</option>
            <option value="PAK" title="PK">巴基斯坦</option>
            <option value="POL" title="PL">波兰</option>
            <option value="PRI" title="PR">波多黎各</option>
            <option value="PSE" title="PS">巴勒斯坦</option>
            <option value="PRT" title="PT">葡萄牙</option>
            <option value="PLW" title="PW">帕劳</option>
            <option value="PRY" title="PY">巴拉圭</option>
            <option value="QAT" title="QA">卡塔尔</option>
            <option value="ROU" title="RO">罗马尼亚</option>
            <option value="SRB" title="RS">塞尔维亚</option>
            <option value="RUS" title="RU">俄罗斯</option>
            <option value="RWA" title="RW">卢旺达</option>
            <option value="SAU" title="SA">沙特阿拉伯</option>
            <option value="SLB" title="SB">所罗门群岛</option>
            <option value="SYC" title="SC">塞舌尔</option>
            <option value="SDN" title="SD">苏丹</option>
            <option value="SWE" title="SE">瑞典</option>
            <option value="SGP" title="SG">新加坡</option>
            <option value="SVN" title="SI">斯洛文尼亚</option>
            <option value="SVK" title="SK">斯洛伐克共和国</option>
            <option value="SLE" title="SL">塞拉利昂</option>
            <option value="SMR" title="SM">圣马力诺</option>
            <option value="SEN" title="SN">塞内加尔</option>
            <option value="SOM" title="SO">索马里</option>
            <option value="SUR" title="SR">苏里南</option>
            <option value="STP" title="ST">圣多美和普林西比</option>
            <option value="SLV" title="SV">萨尔瓦多</option>
            <option value="SYR" title="SY">叙利亚</option>
            <option value="SWZ" title="SZ">斯威士兰</option>
            <option value="TCD" title="TD">乍得</option>
            <option value="TGO" title="TG">多哥</option>
            <option value="THA" title="TH">泰国</option>
            <option value="TJK" title="TJ">塔吉克斯坦</option>
            <option value="TKM" title="TM">土库曼斯坦</option>
            <option value="TUN" title="TN">突尼斯</option>
            <option value="TON" title="TO">汤加</option>
            <option value="TUR" title="TR">土耳其</option>
            <option value="TTO" title="TT">特立尼达和多巴哥</option>
            <option value="TUV" title="TV">图瓦卢</option>
            <option value="TWN" title="TW">台湾</option>
            <option value="TZA" title="TZ">坦桑尼亚</option>
            <option value="UKR" title="UA">乌克兰</option>
            <option value="UGA" title="UG">乌干达</option>
            <option value="URY" title="UY">乌拉圭</option>
            <option value="UZB" title="UZ">乌兹别克斯坦</option>
            <option value="VCT" title="VC">圣文森特和格林纳丁</option>
            <option value="VEN" title="VE">委内瑞拉</option>
            <option value="VGB" title="VG">英属维尔京群岛</option>
            <option value="VNM" title="VN">越南</option>
            <option value="VUT" title="VU">瓦努阿图</option>
            <option value="WLF" title="WF">瓦利斯和富图纳</option>
            <option value="WSM" title="WS">西萨摩亚</option>
            <option value="YEM" title="YE">也门</option>
            <option value="ZAF" title="ZA">南非</option>
            <option value="ZMB" title="ZM">赞比亚</option>
            <option value="ZWE" title="ZW">津巴布韦</option>
          </select>
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

      <div class="can_del_div" v-for="(item, index) in keywords" :key="index">
        {{item}}
        <img src="../assets/keyword/del.png" alt>
      </div>
      <div>
        <el-input v-model="input" placeholder="请输入关键词查询联想词"></el-input>
      </div>
      <div>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <div class="table_title">【抖音】搜索指数走势</div>
    <div ref="myChart" class="myChart" v-show="is_show_myChart"></div>
    <!-- <div class="myChart_tips">
      <div>
        <img src="../assets/keyword/blue-line.png" alt>
        <div class="bottom_image_font">抖音</div>
      </div>
      <div>
        <img src="../assets/keyword/red-line.png" alt>
        <div class="bottom_image_font">快手</div>
      </div>
    </div>-->
    <div class="bottom_image" v-show="is_show_myChart">
      <img class="float_right" src="../assets/keyword/down.png" alt>
      <img
        v-on:click="is_show_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      >
      <img
        v-on:click="is_show_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      >
    </div>
    <table v-show="is_show_table">
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
    <div class="bottom_image bottom_image_for_table" v-show="is_show_table">
      <img class="float_right" src="../assets/keyword/down.png" alt>
      <img
        v-on:click="is_show_myChart_function"
        class="float_right"
        src="../assets/keyword/three.png"
        alt
      >
      <img
        v-on:click="is_show_table_function"
        class="float_right"
        src="../assets/keyword/calculator.png"
        alt
      >
    </div>
  </div>
</template>

<script>
// 引入国家选择插件
import $ from 'jquery'
import '../common/country_select/select_gj.css'
import '../common/country_select/select_gj.min.js'
import '../common/country_select/select2_1.js'
export default {
  name: 'trend_many',
  data() {
    return {
      // 是否显示myChart
      is_show_myChart: true,
      // 是否显示table表格
      is_show_table: false,
      // 请输入关键词查询联想词
      input: '',
      // 可以删除的div关键字
      keywords: ['抖音', '快手'],
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
      dateValue: '2019-6-27'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    is_show_table_function: function() {
      this.is_show_myChart = false
      this.is_show_table = true
    },
    is_show_myChart_function: function() {
      // console.log(5345345646)
      this.is_show_myChart = true
      this.is_show_table = false
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
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
                opacity: 0
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
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
.can_del_div {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #444444;
  width: 63px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  text-align: center;
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
