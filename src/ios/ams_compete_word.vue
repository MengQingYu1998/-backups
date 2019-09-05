<template>
  <div id="ams_compete_word">
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="nav_tips">
          <div>ASM竞价词</div>
        </div>
        <div class="no_country">
          <div>中国</div>
          <div>当前国家/地区暂时未开放ASM关键词查询</div>
        </div>
        <div class="no_login">
          <img src="../assets/ios/no_data.png" alt />
          <span>您还未登录，登录后可查看更多ASO相关数据</span>
          <div>
            <span>登录</span>
            <span>注册</span>
          </div>
        </div>
        <div class="options mt_23">
          <div class="date">
            <span>类别</span>
            <el-radio-group v-model="radio1" size="mini">
              <el-radio-button label="近7天竞价词"></el-radio-button>
              <el-radio-button label="历史竞价词"></el-radio-button>
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
        <div class="options mt_18">
          <div class="ranking">
            <span>搜索指数</span>
            <div class="all" @click="clear_ranking_input">全部</div>
            <div class="min_max">
              <el-input v-model="ranking_min_input" placeholder="最小值" type="number"></el-input>
              <div class="three_line">---</div>
              <el-input v-model="ranking_max_input" placeholder="最大值" type="number"></el-input>
            </div>
          </div>
          <div class="ranking">
            <span>流行度</span>
            <div class="all" @click="clear_ranking_input">全部</div>
            <div class="min_max">
              <el-input v-model="ranking_min_input" placeholder="最小值" type="number"></el-input>
              <div class="three_line">---</div>
              <el-input v-model="ranking_max_input" placeholder="最大值" type="number"></el-input>
            </div>
          </div>
          <div class="ranking">
            <span>搜索结果数</span>
            <div class="all" @click="clear_ranking_input">全部</div>
            <div class="min_max">
              <el-input v-model="ranking_min_input" placeholder="最小值" type="number"></el-input>
              <div class="three_line">---</div>
              <el-input v-model="ranking_max_input" placeholder="最大值" type="number"></el-input>
            </div>
          </div>
        </div>
        <table class="table_first">
          <thead>
            <tr>
              <th>关键词</th>
              <th>排名</th>
              <th>流行度</th>
              <th>搜索指数</th>
              <th>搜索结果数</th>
              <th>近期竞价应用数量</th>
              <th>近期竞价APP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="blue_font">222</td>
              <td>222</td>
              <td>222</td>
              <td class="blue_font">222</td>
              <td class="blue_font">222</td>
              <td class="blue_font">222</td>
              <td class="blue_font">222</td>
            </tr>
          </tbody>
        </table>

        <div class="paging">
          <div>显示第 {{(currentPage-1)*100}} 至 {{currentPage*100}} 项结果，共 {{total}} 项</div>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total/10"
              :current-page.sync="currentPage"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
// 引入工具类
import { formatDate, timestamp } from '../common/util.js'
export default {
  name: 'ams_compete_word',
  components: { ios_header, left_nav },
  data() {
    return {
      currentPage: 1,
      total: 500,
      response_data: null,
      radio1: '近7天竞价词',
      //当前选中的日期
      dateValue: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
          // 这里就是设置当天后的日期不能被点击
        }
      },
      ranking_min_input: '',
      ranking_max_input: ''
    }
  },
  methods: {
    // 清空搜索指数的input的值
    clear_ranking_input() {
      this.ranking_max_input = ''
      this.ranking_min_input = ''
    }
  }
}
</script>
<style lang="less" scoped>
.no_country {
  text-align: center;
  width: 100%;
  margin-top: 239px;
  div:first-child {
    font-family: SourceHanSansCN-Medium;
    font-size: 22px;
    line-height: 22px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    margin-bottom: 13px;
  }
  div:last-child {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    left: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #888888;
  }
}
.no_login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    margin-top: 119px;
  }
  > span {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #888888;
  }
  > div {
    width: 140px;
    margin-top: 20px;
    span:first-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #009bef;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #009bef;
      text-align: center;
    }
    span:last-child {
      display: inline-block;
      width: 60px;
      height: 32px;
      background-color: #009bef;
      border-radius: 4px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 32px;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
    }
  }
}
.ranking {
  display: flex;
  align-items: center;
  .min_max {
    display: flex;
    align-items: center;
    margin-left: 12px;
    > .three_line {
      font-size: 13px;
      width: 20px !important;
      margin-left: 2px;
      margin-right: 2px;
      color: #dfdfdf;
      text-align: center;
    }
    > div:nth-child(1),
    div:nth-child(3) {
      width: 75px !important;
    }
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
  > .all {
    width: 48px;
    background-color: #009bef;
    border-radius: 4px;
    border: solid 1px #009bef;
    font-family: SourceHanSansCN-Normal;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
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
.date {
  display: flex;
  align-items: center;
  .ml_12 {
    margin-left: 12px;
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
.paging {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 50px 0;
}

.nav_tips {
  div {
    width: 72px;
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
}
.table_first {
  width: 100%;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-top: 23px;
  table-layout: fixed;
  tr {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
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
.mt_18 {
  margin-top: 18px;
}
.mt_23 {
  margin-top: 23px;
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
.left_and_right {
  display: flex;
}
#ams_compete_word {
  width: 1200px;
  margin: 0 auto;
  padding-top: 31px;
}
</style>