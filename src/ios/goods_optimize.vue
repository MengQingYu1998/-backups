<template>
  <div id="goods_optimize" class="content">
    <!-- 自定义组件 -->
    <ios_header @childFn="parentFn" />
    <div class="left_and_right">
      <div class="left">
        <left_nav />
      </div>
      <div class="right">
        <div class="right_nav">竞品优化方案</div>
        <div class="line"></div>
        <div v-show="true" class="not_login">
          <div>您暂时还未登录，请先登录后查看</div>
          <div>登录</div>
        </div>
        <table v-show="true">
          <thead>
            <tr>
              <th>应用</th>
              <th>搜索排名变动</th>
              <th>总榜排名</th>
              <th>分类榜排名</th>
              <th>关键词覆盖数</th>
              <th>top3关键词数</th>
              <th>top3关键词数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="use">
                  <div>
                    <img src="../assets/keyword/test.png" alt />
                  </div>
                  <div>
                    <div>好几家军军军...</div>
                    <div class="now_app">当前应用</div>
                    <div class="rankingChangeFontColor">好几家军军军...</div>
                  </div>
                </div>
              </td>

              <td>
                <div class="rankingChangeFontColor">（总榜）</div>
                <div class="rankingChangeFontColor">免费</div>
              </td>
              <td>
                <div class="rankingChangeFontColor">（总榜）</div>
                <div class="rankingChangeFontColor">免费</div>
              </td>
              <td class="rankingChangeFontColor">8000</td>
              <td>
                <div class="rankingChangeFontColor">（总榜）</div>
                <div class="rankingChangeFontColor">免费</div>
              </td>
              <td>
                <div class="rankingChangeFontColor">（总榜）</div>
                <div class="rankingChangeFontColor">免费</div>
              </td>
              <td class="operation">
                <div>
                  <div v-show="false">添加应用</div>
                  <div>关键词</div>
                  <div>实时排名</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ios_header from './ios_header'
import left_nav from './left_nav'
export default {
  name: 'goods_optimize',
  components: { ios_header, left_nav },
  data() {
    return {}
  }
}
</script>
<style scoped>
.not_login {
  text-align: center;
}
.not_login div:last-child {
  width: 70px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #009bef;
  
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  text-align: center;
  margin: 30px auto;
  letter-spacing: 0px;
  color: #009bef;
}
.not_login div:first-child {
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  margin-top: 247px;
}
.operation > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.operation > div > div:last-child {
  margin-bottom: 0px;
}
.operation > div > div {
  width: 62px;
  height: 26px;
  border-radius: 4px;
  border: solid 1px #009bef;
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #009bef;
  margin-bottom: 9px;
}
.now_app {
  width: 58px;
  height: 20px;
  background-color: #f5fcff;
  border-radius: 4px;
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #009bef;
  position: absolute;
  right: -9px;
  top: 0;
}
.rankingChangeFontColor {
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
}

.use img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-left: 16px;
  margin-right: 9px;
}
.use {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
thead tr {
  height: 40px;
}
tbody tr td:last-child {
  
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
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
}
thead {
  width: 1200px;
  background-color: #f7f7f7;
  font-weight: 600 !important;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
}
table {
  width: 100%;
  height: 121px;
 border: solid 1px #eaeaea;
  text-align: center;
}
.right {
  padding-left: 57px;
  position: relative;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 22px;
}
.right_nav {
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
  border-bottom: 1px solid #009bef;
  width: 100px;
  text-align: center;
}
.left_and_right {
  display: flex;
  margin-top: 14px;
}
.breadcrumb span:last-child {
  
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
  
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.breadcrumb {
  margin: 20px 0;
}
.content {
  width: 1200px;
  margin: 0 auto;
}.left {
  width: 231px;position: relative;
  min-height: 621px;
}
</style>
