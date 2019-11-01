<template>
  <div id="left_nav" :class="{'position_fixed':position_fixed}">
    <div class="nav_meng">
      <div class="nav_title">
        <img src="../assets/ios/left_nav01.png" alt />
        <div>应用信息</div>
      </div>
      <router-link
        :to="'/app_message?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >应用信息</router-link>
      <router-link
        :to="'/version_message?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >版本记录</router-link>
      <router-link
        :to="'/same_dev_app?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >同开发者应用</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav03.png" alt />
        <div>ASO数据</div>
      </div>
      <router-link
        :to="'/now_ranking?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >榜单实时排名</router-link>
      <router-link
        :to="'/data_table?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >ASO关键词</router-link>
      <router-link
        :to="'/grade_start?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >评分评论</router-link>
      <router-link
        :to="'/apple_history?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        class="nav_content"
        active-class="active"
      >苹果历史推荐</router-link>
      <div class="nav_title">
        <img src="../assets/ios/left_nav02.png" alt />
        <div>竞品</div>
      </div>
      <router-link
        v-show="goods_show"
        :to="'/goods_show?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        :class="{'nav_content':true,'blue_font':blue_font}"
        active-class="active"
      >竞品对比</router-link>
      <router-link
        v-show="ranking_compare"
        :to="'/ranking_compare?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        :class="{'nav_content':true,'blue_font':blue_font}"
        active-class="active"
      >竞品对比</router-link>
      <router-link
        v-show="cover_compare"
        :to="'/cover_compare?now_country_name=' +
          this.$route.query.now_country_name +
          '&now_app_id=' +
          this.$route.query.now_app_id"
        tag="div"
        :class="{'nav_content':true,'blue_font':blue_font}"
        active-class="active"
      >竞品对比</router-link>
      <!-- 第一步 -->
      <div
        class="shade"
        @mouseover="blue_font=true"
        @mouseleave="blue_font=false"
        @click.stop="$router.push({
        path: '/goods_show'
      })"
      ></div>
      <!-- 第一步 -->

      <!-- <div class="nav_title">
        <img src="../assets/ios/left_nav04.png" alt />
        <div>ASM</div>
      </div>-->
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
    return {
      // 第二部
      goods_show: false,
      ranking_compare: false,
      cover_compare: false,
      blue_font: false,
      position_fixed: false
      // 第二部
    }
  }, // 接受父组件的值
  props: ['position_fixed_form_father'],

  created: function() {
    this.$watch('position_fixed_form_father', function(newValue, oldValue) {
      this.position_fixed = this.position_fixed_form_father
    })
    // 第三部
    if (
      this.$route.name != 'ranking_compare' ||
      this.$route.name != 'cover_compare'
    ) {
      this.ranking_compare = false
      this.cover_compare = false
      this.goods_show = true
    }
    if (this.$route.name == 'ranking_compare') {
      this.ranking_compare = true
      this.cover_compare = false
      this.goods_show = false
    }
    if (this.$route.name == 'cover_compare') {
      this.ranking_compare = false
      this.cover_compare = true
      this.goods_show = false
    }
    // 第三部
  },
  mounted() {
    this.$nextTick(() => {
      let that = this
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight //滚动条到底部的条件
        var int = Math.round(scrollTop + windowHeight)
        // 这个if是让柱状图固定到某一个位置
        if (scrollTop > 160) {
          that.position_fixed = true
        } else {
          that.position_fixed = false
        }
      }
    })
  },
  methods: {}
}
</script>
<style scoped>
.position_fixed {
  position: fixed;
  margin-top: -160px;
  background-color: #fff;
  z-index: 9999;
}
.blue_font {
  color: #009bef !important;
}
.shade {
  background-color: transparent;
  width: 125px;
  height: 21px;
  position: absolute;
  top: 460px;
  right: -32px;
  cursor: pointer;
  width: 190px;
  height: 46px;
}
.active {
  color: #009bef !important;
  background-color: #009bef;
  background-color: rgba(0, 155, 239, 0.12);
}
.nav_content:hover {
  color: #009bef;
  cursor: pointer;
}
.nav_content {
  font-size: 14px;
  font-weight: normal;
  box-sizing: border-box;
  font-stretch: normal;
  width: 190px;
  letter-spacing: 0px;
  color: #222;
  padding-left: 52px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.nav_title div {
  margin-left: 15px;
}
.nav_title:first-child {
  margin: 0;
}
.nav_title img {
  width: 16px;
}
.nav_title {
  font-weight: 600 !important;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  line-height: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  color: #222222;
  padding-left: 20px;
}
.nav_meng {
  width: 157px;
  min-height: 536px;
  position: relative;
}
#left_nav {
  background-color: #fff;
  padding-top: 12px;

  width: 190px;
}
</style>
