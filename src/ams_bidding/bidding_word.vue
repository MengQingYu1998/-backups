<template>
  <div id="bidding_word">
    <div class="nav_tips">
      <span>ASM</span>
      <span>> 竞价词监控</span>
    </div>
    <div class="options">
      <div class="country">
        <span>国家/地区</span>
        <country @childFn="parentFn"></country>
      </div>
      <div class="classes">
        <span>类别</span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="总榜"></el-radio-button>
          <el-radio-button label="应用">
            应用
            <img src="../assets/keyword/arrows_down.png" v-show="radio1!='应用'" />
            <img src="../assets/keyword/white_arrows_down.png" alt v-show="radio1=='应用'" />
          </el-radio-button>
          <el-radio-button label="游戏">
            游戏
            <img src="../assets/keyword/arrows_down.png" v-show="radio1!='游戏'" />
            <img src="../assets/keyword/white_arrows_down.png" alt v-show="radio1=='游戏'" />
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="my_popover" v-show="false"></div>
    <div class="options MT_20">
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
    <table>
      <thead>
        <tr>
          <th></th>
          <th>关键词</th>
          <th>搜索指数</th>
          <th>
            流行度
            <el-popover placement="bottom" trigger="hover" width="229">
              <div class="popover_content">流行度是指每个关键词在App Store的搜索热度。通常情况，指数越高说明该关键词每天被搜索次数也越多。</div>
              <img slot="reference" class="tan_hao" src="../assets/ams_bidding/tan_hao.png" alt />
            </el-popover>
          </th>
          <th>结果数</th>
          <th>近7天/历史竞价应用数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 15" :key="item">
          <td>1</td>
          <td class="blue_font">1</td>
          <td class="blue_font">2</td>
          <td>3</td>
          <td class="blue_font">5</td>
          <td class="blue_font">4</td>
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
      visible: false,
      now_country: '中国',
      radio1: '总榜',
      ranking_min_input: '',
      ranking_max_input: ''
    }
  },
  methods: {
    // 清空搜索指数的input的值
    clear_ranking_input() {
      this.ranking_max_input = ''
      this.ranking_min_input = ''
    },
    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload
      // console.log(this.now_country)
    }
  }
}
</script>
<style lang="less" scoped>
.my_popover {
  width: 168px;
  min-height: 317px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
  border-radius: 4px;
}
table {
  width: 100%;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-bottom: 50px;
  table-layout: fixed;
  margin-top: 23px;

  .tan_hao {
    margin-left: 8px;
    vertical-align: -2px;
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
        height: 50px !important;
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
.MT_20 {
  margin-top: 20px;
}
.classes {
  display: flex;
  align-items: center;

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
  padding: 27px 0 23px 0;
  span:nth-child(1) {
    font-family: SourceHanSansCN-Regular;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    line-height: 13px;
    color: #009bef;
  }
  span:nth-child(2) {
    font-family: SourceHanSansCN-Regular;
    font-size: 13px;
    font-weight: normal;
    letter-spacing: 0px;
    line-height: 13px;
    color: #888888;
  }
}
#bidding_word {
  width: 1200px;
  margin: 0 auto;
}
</style>