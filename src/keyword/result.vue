<template>
  <div id="result" class="content">
    <div class="title">「网易云音乐」搜索结果</div>
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
          <el-select v-model="countryValue">
            <el-option v-for="item in  country " :key="item.value" :value="item.value"></el-option>
          </el-select>
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
    <div class="keywordContentTable">
      <table>
        <thead>
          <tr>
            <th>关键词</th>
            <th>搜索指数</th>
            <th>搜索结果数</th>
            <th>搜索联想词</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>January</td>
            <td>
              $100
              <img src="../assets/keyword/keyword01.png" alt>
            </td>
            <td>
              $100
              <img src="../assets/keyword/keyword01.png" alt>
            </td>
            <td>抖音 火山小视频</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果ios12搜索结果 -->
        <el-tab-pane label="ios12搜索结果" name="first">
          <div class="left_and_right">
            <div class="left tabsContentTable">
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                    <th>top3关键词数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="use">
                        <div>1</div>
                        <div>
                          <img src="../assets/keyword/test.png" alt>
                        </div>
                        <div>
                          <div>好几家军军军...</div>
                          <div class="rankingChangeFontColor">好几家军军军...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img class="arrowsImg" src="../assets/keyword/arrows (1).png" alt>
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        >
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        >
                        <div>0</div>
                        <img src="../assets/keyword/keyword01.png" alt>
                      </div>
                    </td>
                    <td>
                      <div>1</div>
                      <div class="rankingChangeFontColor">（总榜）</div>
                      <div class="rankingChangeFontColor">免费</div>
                    </td>
                    <td>
                      <div>1</div>
                      <div class="rankingChangeFontColor">（总榜）</div>
                      <div class="rankingChangeFontColor">免费</div>
                    </td>
                    <td>8000</td>
                    <td>500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="right">
              <div class="right_title">关键词搜索结果变化率</div>
              <div class="right_btn">
                <div>
                  <el-button>top10</el-button>
                  <el-button type="primary">all</el-button>
                </div>
                <!-- <ve-histogram :data="chartData_IOS12" :settings="chartSettings"></ve-histogram> -->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果ios11搜索结果 -->
        <el-tab-pane label="ios11搜索结果" name="second"></el-tab-pane>
        <!-- 搜索结果对比  搜索结果对比   搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比  搜索结果对比   -->
        <el-tab-pane label="搜索结果对比" name="third">
          <div class="flex-row">
            <div class="compare_iOS tabsContentTable">
              <div>
                <div>ios11</div>
                <div>更新时间 2019-05-07 17:31:22</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="use">
                        <div>1</div>
                        <div>
                          <img src="../assets/keyword/test.png" alt>
                        </div>
                        <div>
                          <div>好几家军军军...</div>
                          <div class="rankingChangeFontColor">好几家军军军...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>1</div>
                      <div class="rankingChangeFontColor">（总榜）</div>
                      <div class="rankingChangeFontColor">免费</div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img class="arrowsImg" src="../assets/keyword/arrows (1).png" alt>
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        >
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        >
                        <div>0</div>
                        <img src="../assets/keyword/keyword01.png" alt>
                      </div>
                    </td>

                    <td>8000</td>
                    <td>500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="compare_iOS tabsContentTable">
              <div>
                <div>ios11</div>
                <div>更新时间 2019-05-07 17:31:22</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>应用</th>
                    <th>搜索排名变动</th>
                    <th>总榜排名</th>
                    <th>分类榜排名</th>
                    <th>关键词覆盖数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="use">
                        <div>1</div>
                        <div>
                          <img src="../assets/keyword/test.png" alt>
                        </div>
                        <div>
                          <div>好几家军军军...</div>
                          <div class="rankingChangeFontColor">好几家军军军...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>1</div>
                      <div class="rankingChangeFontColor">（总榜）</div>
                      <div class="rankingChangeFontColor">免费</div>
                    </td>
                    <td>
                      <div class="rankingChange">
                        <img class="arrowsImg" src="../assets/keyword/arrows (1).png" alt>
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (2).png"
                          alt
                        >
                        <img
                          v-show="false"
                          class="arrowsImg"
                          src="../assets/keyword/arrows (3).png"
                          alt
                        >
                        <div>0</div>
                        <img src="../assets/keyword/keyword01.png" alt>
                      </div>
                    </td>

                    <td>8000</td>
                    <td>500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result',
  data() {
    this.chartSettings = {
      yAxisType: ['percent']
    }
    return {
      //v-charts图表
      chartData_IOS11: {
        columns: ['日期', 'value'],
        rows: [
          { 日期: '25日0点', value: 0 },
          { 日期: '25日4点', value: 0.2 },
          { 日期: '25日8点', value: 0.2 },
          { 日期: '25日12点', value: 0.6 },
          { 日期: '25日16点', value: 0.2 },
          { 日期: '25日20点', value: 0.2 },
          { 日期: '26日0点', value: 0.8 },
          { 日期: '26日4点', value: 0.2 },
          { 日期: '26日8点', value: 0.4 },
          { 日期: '26日12点', value: 0.2 }
        ]
      },
      chartData_IOS12: {
        columns: ['日期', 'value'],
        rows: [
          { 日期: '25日0点', value: 0 },
          { 日期: '25日4点', value: 0.2 },
          { 日期: '25日8点', value: 0.2 },
          { 日期: '25日12点', value: 0.6 },
          { 日期: '25日16点', value: 0.2 },
          { 日期: '25日20点', value: 0.2 },
          { 日期: '26日0点', value: 0.8 },
          { 日期: '26日4点', value: 0.2 },
          { 日期: '26日8点', value: 0.4 },
          { 日期: '26日12点', value: 0.2 }
        ]
      },
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
      dateValue: '',
      // tab-pane选择面板
      activeName: 'first'
    }
  },
  methods: {
    // tab-pane选择面板
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
.flex-row {
  display: flex;
}
.compare_iOS > div:first-child div:first-child {
  font-family: SourceHanSansCN-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.compare_iOS > div:first-child div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.compare_iOS > div:first-child {
  width: 100%;
  height: 100px;
  border: solid 1px #f2f2f2;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 26px;
  box-sizing: border-box;
}
.compare_iOS {
  width: 100%;
}
.right_btn div:first-child {
  padding-left: 27px;
}
.right_btn {
  margin: 21px 0;
}

.right_title {
  font-family: SourceHanSansCN-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  border-left: 2px solid #429ae8;
  padding-left: 11px;
}
.left {
  width: 840px;
}
.right {
  width: 340px;
}
.left_and_right {
  display: flex;
}
.rankingChangeFontColor {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}
.rankingChange div {
  margin: 0 9px;
}
.rankingChange {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabsContentTable .arrowsImg {
  width: 4px;
  height: 8px;
}
.tabsContentTable .use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-left: 16px;
  margin-right: 9px;
}
.tabsContentTable .use {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabsContentTable thead tr {
  height: 40px;
}

.tabsContentTable tbody tr {
  border-bottom: 1px solid #f2f2f2;
}
.tabsContentTable tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
.tabsContentTable thead {
  width: 100%;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.tabsContentTable table {
  width: 100%;
  height: 121px;
  border: solid 1px #f2f2f2;
  text-align: center;
}
.tabsContentTable {
  margin-right: 22px;
}
.tabs {
  margin-top: 30px;
}

.keywordContentTable thead tr {
  height: 40px;
}
.keywordContentTable tbody tr td:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.keywordContentTable tbody {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  vertical-align: middle;
}
.keywordContentTable thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-family: SourceHanSansCN-Medium;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.keywordContentTable table {
  width: 1200px;
  height: 121px;
  border: solid 1px #f2f2f2;
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
}
</style>
