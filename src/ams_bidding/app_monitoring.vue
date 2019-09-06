<template>
  <div id="app_monitoring">
    <div class="nav_tips">
      <span>ASM</span>
      <span>> 竞价应用监控</span>
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
      <div class="search">
        <span>搜索</span>
        <el-input v-model="search_input" placeholder="请输入搜索关键词"></el-input>
        <div class="search_confirm pointer">搜索</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th></th>
          <th>应用</th>
          <th>应用/游戏榜排名</th>
          <th>分类榜排名</th>
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
            <div>
              <div>20</div>
              <el-popover placement="bottom" trigger="hover" width="129">
                <div class="my_popover">对比昨日排名上升1名</div>
                <div slot="reference">
                  <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                  <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                  <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                </div>
              </el-popover>
              <div
                :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
              >{{Math.abs(20)}}</div>
            </div>
          </td>
          <td>
            <div>1</div>
            <div>教育</div>
          </td>
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
      radio1: '总榜',
      search_input: '',
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
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
.search {
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    width: 145px !important;
  }
  .search_confirm {
    width: 48px !important;
    height: 27px;
    background-color: #009bef;
    border-radius: 4px;
    font-family: SourceHanSansCN-Normal;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 27px;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
    margin-left: 15px;
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
table {
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
      td:nth-child(3) {
        display: flex;
        align-items: center;
        > div {
          margin: 0 auto;
          display: flex;
          align-items: center;
        }
        img {
          margin: 0 10px;
        }
        .gray {
          color: #888888;
        }
        .red {
          color: #f50202;
        }
        .blue {
          color: #009bef;
        }
      }
      td:nth-child(4) {
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

// =======单选按钮组加悬浮框========
.classes {
  display: flex;
  align-items: center;
  img {
    width: 8px;
  }
  > span:first-child {
    font-family: SourceHanSansCN-Medium;
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
    font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Normal;
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
#app_monitoring {
  width: 1200px;
  margin: 0 auto;
}
</style>