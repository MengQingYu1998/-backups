<template>
  <div
    id="left_nav"
    :class="{
      position_fixed: position_fixed,
      position_fixed_02: position_fixed_02
    }"
  >
    <div class="nav_meng">
      <div class="nav_title">
        <img src="../assets/ios/left_nav01.png" alt />
        <div>应用信息</div>
      </div>
      <router-link
        :to="
          '/app_message?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >应用信息</router-link
      >
      <router-link
        :to="
          '/version_message?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >版本记录</router-link
      >
      <router-link
        :to="
          '/same_dev_app?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >同开发者应用</router-link
      >
      <div class="nav_title">
        <img src="../assets/ios/left_nav03.png" alt />
        <div>ASO数据</div>
      </div>
      <router-link
        :to="
          '/now_ranking?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >榜单实时排名</router-link
      >
      <router-link
        :to="
          '/data_table?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >ASO关键词</router-link
      >
      <router-link
        :to="
          '/grade_start?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >评分评论</router-link
      >
      <router-link
        :to="
          '/apple_history?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
        >苹果历史推荐</router-link
      >
      <div class="nav_title">
        <img src="../assets/ios/left_nav02.png" alt />
        <div>竞品</div>
      </div>
      <!-- 第一步 -->
      <router-link
        :to="
          '/goods_show?now_country=' +
            this.$route.query.now_country +
            '&now_app_id=' +
            this.$route.query.now_app_id
        "
        tag="div"
        class="nav_content"
        active-class="active"
      ></router-link>
      <div
        class="shade"
        @click.stop="shade_function()"
        :class="{ blue_bg: blue_bg }"
      >
        竞品对比
      </div>
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
  name: "left_nav",
  data() {
    return {
      // 第二部
      blue_bg: false,
      // 第二部
      position_fixed: false, //滚动条滚动
      position_fixed_02: false
    };
  }, // 接受父组件的值
  props: ["position_fixed_form_father", "position_fixed_form_father02"],

  created: function() {
    this.$watch("position_fixed_form_father", function(newValue, oldValue) {
      this.position_fixed = this.position_fixed_form_father;
    });
    this.$watch("position_fixed_form_father02", function(newValue, oldValue) {
      this.position_fixed_02 = this.position_fixed_form_father02;
    });
    // 第三部
    switch (this.$route.path) {
      case "/goods_show":
        this.blue_bg = true;
        break;
      case "/ranking_compare":
        this.blue_bg = true;
        break;
      case "/cover_compare":
        this.blue_bg = true;
        break;
      default:
        this.blue_bg = false;
        break;
    }
    // 第三部
  },
  mounted() {
    let that = this;
    // 判断横向是否出现滚动条 不然left_nav会跟着动
    $(window).resize(function() {
      if ($("body")[0].clientWidth < 1200) {
        // alert(111);
        that.position_fixed = false;
      }
    });
    this.$nextTick(() => {
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
        var int = Math.round(scrollTop + windowHeight);
        // 这个if是让左侧导航固定到某一个位置
        if (scrollTop > 160) {
          // 判断横向是否出现滚动条 不然left_nav会跟着动
          if ($("body")[0].clientWidth > 1200) {
            that.position_fixed = true;
          }
        } else {
          that.position_fixed = false;
        }

        // 解决左侧导航到达底部溢出
        if (scrollHeight - scrollTop <= 310 + 548 + 68) {
          if ($("body")[0].clientWidth > 1200) {
            that.position_fixed_02 = true;
          } else {
            that.position_fixed_02 = false;
          }
        } else {
          that.position_fixed_02 = false;
        }
      };
    });
  },
  methods: {
    // 第四部
    shade_function() {
      this.blue_bg = true;
      this.$router.push({
        path:
          "/goods_show?now_country=" +
          this.$route.query.now_country +
          "&now_app_id=" +
          this.$route.query.now_app_id
      });
    }
    // 第四部
  }
};
</script>
<style scoped>
.position_fixed_02 {
  position: absolute !important;
  bottom: 0px;
}
.position_fixed {
  position: fixed;
  margin-top: -160px;
  background-color: #fff;
  z-index: 9999;
}
.blue_bg {
  color: #009bef !important;
  background-color: #e5f3fd;
}
/* 第五步 */
.shade:hover {
  color: #009bef;
}
.shade {
  width: 125px;
  position: absolute;
  top: 400px;
  right: -32px;
  cursor: pointer;
  width: 190px;
  height: 40px;
  font-size: 14px;
  font-weight: normal;
  box-sizing: border-box;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222;
  padding-left: 52px;
  cursor: pointer;
  line-height: 40px;
}
/* 第五步 */

.active {
  color: #009bef !important;
  background-color: #e5f3fd;
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
  z-index: 1;
  width: 190px;
}
</style>
