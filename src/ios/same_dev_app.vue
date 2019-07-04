<template>
  <div id="same_dev_app" class="content">
    <div class="breadcrumb">
      <span>iOS应用</span> >
      <span>学习强国</span>
    </div>
    <!-- 自定义组件 -->
    <ios_header/>
    <div class="left_and_right">
      <div class="left">
        <left_nav/>
      </div>
      <div class="right">
        <div class="right_nav">同开发者应用</div>
        <div class="line"></div>

        <table>
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
                    <img src="../assets/keyword/test.png" alt>
                  </div>
                  <div>
                    <div>好几家军军军...</div>
                    <!-- <div class="now_app">当前应用</div> -->
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
              </td>
              <td>
                <div class="rankingChangeFontColor">（总榜）</div>
              </td>
              <td class="operation">
                <div class="rankingChangeFontColor">（总榜）</div>
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
  name: 'same_dev_app',
  components: { ios_header, left_nav },
  data() {
    return {}
  }
}
</script>
<style scoped>
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
  font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Normal;
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
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
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
}
thead {
  width: 1200px;
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
}
.right {
  padding-left: 57px;
  position: relative;
}
.line {
  width: 985px;
  height: 1px;
  background-color: #f2f2f2;
  margin-bottom: 22px;
}
.right_nav {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
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
  margin-top: 27px;
}
.breadcrumb span:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
  font-family: SourceHanSansCN-Normal;
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
}
</style>
