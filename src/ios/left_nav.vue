<template>
  <div id="left_nav">
    <div class="nav" @click="change_country">
      <div class="nav_title">
        <img src="../assets/ios/left_nav01.png" alt />
        <div>应用信息</div>
      </div>
      <router-link to="app_message" tag="div" class="nav_content" active-class="active">应用信息</router-link>
      <router-link to="version_message" tag="div" class="nav_content" active-class="active">版本记录</router-link>
      <router-link to="same_dev_app" tag="div" class="nav_content" active-class="active">同开发者应用</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav03.png" alt />
        <div>ASO数据</div>
      </div>
      <router-link to="now_ranking" tag="div" class="nav_content" active-class="active">榜单实时排名</router-link>
      <router-link to="data_table" tag="div" class="nav_content" active-class="active">ASO关键词</router-link>
      <router-link to="grade_start" tag="div" class="nav_content" active-class="active">评分评论</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav02.png" alt />
        <div>竞品</div>
      </div>
      <router-link
        to="goods_show"
        tag="div"
        :class="{'nav_content':true,'blue_router':blue_router}"
      >竞品对比</router-link>
      <!-- <router-link
        to="nothing"
        tag="div"
        class="nav_content"
        active-class="active"
      >竞对报告</router-link>-->
      <!-- <router-link
        to="nothing"
        tag="div"
        class="nav_content"
        active-class="active"
      >竞品当前优化</router-link>-->
      <div class="nav_title">
        <img src="../assets/ios/left_nav04.png" alt />
        <div>ASM</div>
      </div>
      <!-- <router-link
        to="nothing"
        tag="div"
        class="nav_content"
        active-class="active"
      >ASM竞价词</router-link>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'left_nav',
  data() {
    return { blue_router: false }
  },

  created: function() {},
  mounted() {
    // this.blue_router = this.$store.state.router_color
    // console.log(this.$store.state)
  },
  methods: {
    change_country() {
      // alert(now_country)
      // this.$store.state.now_country_name = '法国'
    }
  }
}
</script>
<style scoped>
.active {
  color: #009bef !important;
}
.nav_content:hover {
  color: #009bef;
  cursor: pointer;
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
  cursor: pointer;
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
  min-height: 500px;
}
</style>
