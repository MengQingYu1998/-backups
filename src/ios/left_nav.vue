<template>
  <div id="left_nav">
    <div class="nav">
      <div class="nav_title">
        <img src="../assets/ios/left_nav01.png" alt>
        <div>应用信息</div>
      </div>
      <router-link to tag="div" class="nav_content">应用信息</router-link>
      <router-link to tag="div" class="nav_content">版本记录</router-link>
      <router-link to tag="div" class="nav_content">同开发者应用</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav03.png" alt>
        <div>ASO数据</div>
      </div>
      <router-link to tag="div" class="nav_content">榜单实时排名</router-link>
      <router-link to tag="div" class="nav_content">ASO关键词</router-link>
      <router-link to tag="div" class="nav_content">评分评论</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav02.png" alt>
        <div>竞品</div>
      </div>
      <router-link to tag="div" class="nav_content">竞品对比</router-link>
      <router-link to tag="div" class="nav_content">竞对报告</router-link>
      <router-link to tag="div" class="nav_content">竞品当前优化</router-link>
      <div to tag="div" class="nav_title">
        <img src="../assets/ios/left_nav04.png" alt>
        <div>ASM</div>
      </div>
      <router-link to tag="div" class="nav_content">ASM竞价词</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left_nav',
  data() {
    return {}
  }
}
</script>
<style scoped>
.nav_content:hover {
  color: #009bef;
}
.nav_content {
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #888888;
  margin: 30px 0;
  margin-left: 32px;
}
.nav_title div {
  margin-left: 15px;
}
.nav_title:first-child {
  margin: 0;
}
.nav_title {
  font-family: SourceHanSansCN-Bold;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  color: #222222;
  margin-top: 49px;
}
.nav {
  width: 157px;
  border-right: 1px solid #efefef;
  padding-bottom: 150px;
}
</style>
