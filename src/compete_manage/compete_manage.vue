<template>
  <div id="compete_manage">
    <div class="left_and_right">
      <div class="left">
        <img src="../assets/compete_manage/img.png" alt />
        <span>竞品管理</span>
      </div>
      <div class="right">
        <div class="nav_tips">
          <div>竞品管理</div>
        </div>
        <div class="options mt_24">
          <div class="my_app">
            <span>我的应用</span>
            <el-select v-model="appValue">
              <el-option v-for="item in  app " :key="item.value" :value="item.value"></el-option>
            </el-select>
            <div class="add_app">添加应用</div>
            <div class="add_app_gray">添加应用</div>
          </div>
        </div>
        <table class="table_first">
          <thead>
            <tr>
              <th></th>
              <th>应用</th>
              <th>应用/游戏榜排名</th>
              <th>分类榜排名</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table_no_data">
              <td colspan="5">暂无数据</td>
            </tr>
            <tr>
              <td></td>
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
                  <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                  <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                  <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                  <div
                    :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                  >{{Math.abs(50)}}</div>
                </div>
              </td>
              <td>
                <div>1</div>
                <div>教育</div>
              </td>
              <td>20</td>
            </tr>
          </tbody>
        </table>
        <div class="title_tips">
          <div>参与竞价APP</div>
        </div>
        <div class="add_complete">添加竞品</div>
        <table class="table_second">
          <thead>
            <tr>
              <th></th>
              <th>应用</th>
              <th>应用/游戏榜排名</th>
              <th>分类榜排名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table_no_data">
              <td colspan="5">暂无数据</td>
            </tr>
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
                  <img v-show="false" src="../assets/keyword/arrows (1).png" alt />
                  <img v-show="false" src="../assets/keyword/arrows (3).png" alt />
                  <img v-show="true" src="../assets/keyword/arrows (2).png" alt />
                  <div
                    :class="{'pointer':true , 'gray':false , 'blue':false , 'red':true}"
                  >{{Math.abs(50)}}</div>
                </div>
              </td>
              <td>
                <div>1</div>
                <div>教育</div>
              </td>
              <td>
                <div>
                  <div>竞对报告</div>
                  <div>竞品当前优化</div>
                  <img src="../assets/ios/compare_del.png" alt />
                </div>
              </td>
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
// 引入工具类
import { formatDate } from '../common/util.js'
export default {
  name: 'hot_search',
  data() {
    return {
      currentPage: 1,
      total: 500,
      response_data: null,
      now_country: '中国',
      // 设备选择
      app: [
        {
          value: 'iPhone'
        },
        {
          value: 'iPad'
        }
      ],
      appValue: 'iPhone'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.paging {
  
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
.add_app {
  width: 74px;
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
  margin-left: 18px;
}
.add_app_gray {
  text-align: center;
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  letter-spacing: 0px;
  color: #ffffff;
  width: 74px;
  background-color: #dfdfdf;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  margin-left: 18px;
}
.nav_tips {
  div {
    width: 58px;
    font-weight: 600 !important;
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
  .app {
    display: flex;
    align-items: center;
    .title {
      width: 122px;
      
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
  tr {
    
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
      width: 300px;
      > div {
        display: flex;
        align-items: center;
        margin: 0 auto;
      }
      img {
        margin: 0 10px;
      }
    }
    td:nth-child(4) {
      width: 300px;
      > div:nth-child(1) {
        
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #444444;
      }
    }
    td:nth-child(5) {
      width: 300px;
      
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 30px;
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
.title_tips {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #222222;
  margin: 50px 0 22px 0;
  padding-left: 10px;
  border-left: 2px solid #429ae8;
}
.add_complete {
  width: 78px;
  border-radius: 4px;
  border: solid 1px #009bef;
  
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #009bef;
  text-align: center;
  float: right;
  margin-top: -55px;
}
.table_second {
  width: 100%;
  border: solid 1px #f2f2f2;
  text-align: center;
  margin-top: 23px;
  .app {
    display: flex;
    align-items: center;
    .title {
      width: 122px;
      
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
        height: 100px;
      }
      td:nth-child(1) {
        width: 50px;
      }
      td:nth-child(2) {
        width: 250px;
      }

      td:nth-child(3) {
        width: 229px;
        display: flex;
        align-items: center;
        > div {
          display: flex;
          align-items: center;
          margin: 0 auto;
        }
        img {
          margin: 0 10px;
        }
      }
      td:nth-child(4) {
        width: 155px;
        > div:nth-child(1) {
          
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 30px;
          letter-spacing: 0px;
          color: #444444;
        }
      }
      td:nth-child(5) {
        width: 325px;
        display: flex;
        align-items: center;
        > div {
          display: flex;
          align-items: center;
          margin: 0 auto;
        }
        img {
          width: 18px;
          height: 18px;
        }
        > div > div {
          
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 13px;
          letter-spacing: 0px;
          color: #009bef;
          padding: 6px;
          border-radius: 4px;
          border: solid 1px #009bef;
        }
        > div > div:nth-child(1) {
          width: 62px;
        }
        > div > div:nth-child(2) {
          width: 88px;
          margin-left: 12px;
          margin-right: 21px;
        }
      }
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

.gray {
  color: #888888;
}
.red {
  color: #f50202;
}
.blue {
  color: #009bef;
}
.my_app {
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
.mt_24 {
  margin-top: 24px;
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
    font-weight: 600 !important;
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
#compete_manage {
  width: 1200px;
  margin: 0 auto;
  padding-top: 31px;
}
</style>