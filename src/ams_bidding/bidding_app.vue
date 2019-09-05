<template>
  <div id="bidding_app">
    <div class="nav_tips">「抖音」参与竞价APP</div>
    <div class="options">
      <div class="country">
        <span>国家/地区</span>
        <country @childFn="parentFn"></country>
      </div>
      <div class="date">
        <span>类别</span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="7天"></el-radio-button>
          <el-radio-button label="30天"></el-radio-button>
          <el-radio-button label="历史竞价应用"></el-radio-button>
        </el-radio-group>
        <div class="ml_12"></div>
        <el-date-picker
          :picker-options="pickerOptions"
          v-model="dateValue"
          type="date"
          placeholder="选择日期"
          clear-icon
        ></el-date-picker>
      </div>
    </div>
    <table class="table_first">
      <thead>
        <tr>
          <th>关键词</th>
          <th>流行度</th>
          <th>竞价APP数量</th>
          <th>搜索指数</th>
          <th>搜索结果数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td>
            555
            <img src="../assets/ams_bidding/trend.png" alt />
          </td>
          <td>
            555
            <img src="../assets/ams_bidding/trend.png" alt />
          </td>
          <td>
            555
            <img src="../assets/ams_bidding/trend.png" alt />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="tab_nav">
      <div>参与竞价APP</div>
    </div>
    <table class="table_second">
      <thead>
        <tr>
          <th></th>
          <th>应用</th>
          <th>应用/游戏榜排名</th>
          <th>分类榜排名</th>
          <th>竞价占比</th>
          <th>近7天/历史竞价词数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 15" :key="item">
          <td>1</td>
          <td>
            <div class="app">
              <img src="../assets/keyword/arrows_down.png" alt />
              <div>
                <div class="title">多闪多闪多闪多闪多闪多闪多闪多闪</div>
                <div class="sub_title">多闪多闪多闪多闪多闪多闪多闪多闪</div>
              </div>
            </div>
          </td>

          <td>
            <div>1</div>
            <div>教育</div>
          </td>
          <td>
            <div>1</div>
            <div>教育</div>
          </td>
          <td>20</td>
          <td class="blue_font">300 / 4500</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// 引入国家选择组件
import country from '../common/country_select/country'
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'hot_search',
  components: { country },
  data() {
    return {
      response_data: null,
      now_country: '中国',
      radio1: '7天',
      //当前选中的日期
      dateValue: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      }
    }
  },
  methods: {
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style lang="less" scoped>
.tab_nav {
  div {
    width: 96px;
    font-family: SourceHanSansCN-Medium;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 38px;
    letter-spacing: 0px;
    color: #222222;
    border-bottom: 1px solid #009bef;
  }
  border-bottom: 1px solid #f2f2f2;
}
.table_first {
  width: 100%;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 23px;
  table-layout: fixed;
  img {
    margin-left: 7px;
    vertical-align: -2px;
  }
  tbody {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    tr td {
      height: 80px !important;
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
.table_second {
  width: 100%;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 23px;
  .app {
    display: flex;
    align-items: center;
    .title {
      width: 122px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sub_title {
      width: 178px;
      font-family: SourceHanSansCN-Normal;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #888888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: solid 1px #f2f2f2;
      margin-right: 5px;
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
  tbody {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    vertical-align: middle;
    tr {
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #888888;
      border-bottom: 1px solid #f2f2f2;
      td {
        height: 100px;
      }
      td:nth-child(1) {
        width: 50px;
      }
      td:nth-child(2) {
        width: 250px;
      }

      td:nth-child(4),
      td:nth-child(3) {
        div:nth-child(1) {
          font-family: SourceHanSansCN-Normal;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          letter-spacing: 0px;
          color: #444444;
        }
      }
    }
    tr:nth-child(1) td:nth-child(1),
    tr:nth-child(2) td:nth-child(1),
    tr:nth-child(3) td:nth-child(1) {
      font-family: SourceHanSansCN-Bold;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
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

.date {
  display: flex;
  align-items: center;
  .ml_12 {
    margin-left: 12px;
  }
  img {
    width: 8px;
  }
  > span {
    font-family: SourceHanSansCN-Medium;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 13px;
    letter-spacing: 0px;
    color: #222222;
    margin-right: 9px;
  }
}
.country {
  display: flex;
  align-items: center;
  > span {
    font-family: SourceHanSansCN-Medium;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 13px;
    letter-spacing: 0px;
    color: #222222;
    margin-right: 9px;
  }
}
.options {
  display: flex;
  align-items: center;
  > div {
    margin-left: 29px;
  }
  > div:nth-child(1) {
    margin-left: 0;
  }
}
.nav_tips {
  font-family: SourceHanSansCN-Medium;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 60px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 1px solid #efefef;
  margin-bottom: 22px;
}
#bidding_app {
  width: 1200px;
  margin: 0 auto;
}
</style>