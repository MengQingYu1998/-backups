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
        <!-- 选择总榜 -->
        <div>
          <div
            :class=" {'change_bg':change_bg_all,'radio_one':true,'pointer':true}"
            @click="click_all"
          >总榜</div>
        </div>
        <!-- 选择应用 -->
        <el-popover placement="bottom" trigger="click" width="168" v-model="visible">
          <div class="selected_popover">
            <div class="pointer" v-for="item in 10" :key="item" @click="visible=false">{{item+'游戏'}}</div>
          </div>
          <div slot="reference">
            <div
              :class=" {'change_bg':change_bg_app,'radio_one':true,'pointer':true}"
              @click="click_app"
            >
              应用
              <img src="../assets/keyword/arrows_down.png" alt v-show="!change_bg_app" />
              <img
                src="../assets/keyword/white_arrows_up.png"
                alt
                v-show="change_bg_app&&visible==true"
              />
              <img
                src="../assets/keyword/white_arrows_down.png"
                alt
                v-show="change_bg_app&&visible==false"
              />
            </div>
          </div>
        </el-popover>
        <!-- 选择游戏 -->
        <el-popover placement="bottom" trigger="click" width="168" v-model="visible01">
          <div class="selected_popover">
            <div
              class="pointer"
              v-for="item in 10"
              :key="item"
              @click="visible01=false"
            >{{item+'游戏'}}</div>
          </div>
          <div slot="reference">
            <div
              :class=" {'change_bg':change_bg_game,'radio_one':true,'pointer':true}"
              @click="click_game"
            >
              游戏
              <img src="../assets/keyword/arrows_down.png" alt v-show="!change_bg_game" />
              <img
                src="../assets/keyword/white_arrows_up.png"
                alt
                v-show="change_bg_game&&visible01==true"
              />
              <img
                src="../assets/keyword/white_arrows_down.png"
                alt
                v-show="change_bg_game&&visible01==false"
              />
            </div>
          </div>
        </el-popover>
      </div>
    </div>
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
      popover_visible: false,
      response_data: null,
      visible: false,
      now_country: '中国',
      radio1: '总榜',
      ranking_min_input: '',
      ranking_max_input: '',
      // =======单选按钮组加悬浮框========
      change_bg_all: true,
      change_bg_app: false,
      change_bg_game: false,
      visible: false, //悬浮框是否隐藏
      visible01: false //悬浮框是否隐藏
      // =======单选按钮组加悬浮框========
    }
  },
  methods: {
    // =======单选按钮组加悬浮框========
    // 点击游戏
    click_game() {
      this.change_bg_all = false
      this.change_bg_app = false
      this.change_bg_game = true
    },
    // 点击应用
    click_app() {
      this.change_bg_all = false
      this.change_bg_app = true
      this.change_bg_game = false
    },
    // 点击总榜
    click_all() {
      this.change_bg_all = true
      this.change_bg_app = false
      this.change_bg_game = false
    },
    // =======单选按钮组加悬浮框========
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
    
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #009bef;
  }
  tbody {
    
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    vertical-align: middle;
    tr {
      
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
      font-weight: 600 !important;
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
    font-weight: 600 !important;
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
    font-weight: 600 !important;
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
// =======单选按钮组加悬浮框========
.classes {
  display: flex;
  align-items: center;
  img {
    width: 8px;
  }
  > span:first-child {
    font-weight: 600 !important;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 13px;
    letter-spacing: 0px;
    color: #222222;
    margin-right: 9px;
  }

  .change_bg {
    color: #ffffff !important;
    background-color: #009bef;
    border: solid 1px #009bef !important;
  }
  .radio_one {
    text-align: center;
    line-height: 26px;
    
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    width: 48px !important;
    height: 24px;
    border-radius: 4px;
    border: solid 1px #dfdfdf;
    letter-spacing: 0px;
    color: #444444;
    margin-right: 10px;
    display: inline-block;
  }
}
.selected_popover {
  display: flex;
  align-items: center;
  width: 142px;
  flex-wrap: wrap;
  justify-content: space-between;
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  > div {
    width: 65px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// =======单选按钮组加悬浮框========

.country {
  display: flex;
  align-items: center;
  > span {
    font-weight: 600 !important;
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
    
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    line-height: 13px;
    color: #009bef;
  }
  span:nth-child(2) {
    
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