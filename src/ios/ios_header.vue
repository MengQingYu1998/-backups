<template>
  <div id="ios_header">
    <div class="wrap">
      <img src="../assets/keyword/test.png" alt>
      <div class="app_description">
        <div>学习强国</div>
        <div>多闪好友小视频社交多闪是一闪是一</div>
      </div>
      <div class="app_field">
        <div>版本更新时间</div>
        <div>2019年2月19日</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>分类</div>
        <div>摄影与录像</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>价格</div>
        <div>免费</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>APPID</div>
        <div>1426355645</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>国家/地区</div>
        <!-- 选择国家 -->
        <country></country>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from '../common/country_select/country'
export default {
  name: 'ios_header',
  components: { country },
  data() {
    return {
      // 选择国家和地区
      country: [
        {
          value: '中国'
        },
        {
          value: '美国'
        }
      ],
      countryValue: '中国'
    }
  }
}
</script>
<style scoped>
.border {
  margin-top: 30px;
  width: 1198px;
  height: 1px;
  background-color: #efefef;
}
.line {
  width: 1px;
  height: 20px;
  background-color: #f2f2f2;
  margin: 0 30px;
}
.app_field div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  text-align: center;
}
.app_field div:first-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
}

.app_description div:first-child {
  font-family: SourceHanSansCN-Medium;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;
}
.app_description div:last-child {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.app_description {
  display: inline-block;
  margin-left: 19px;
  width: 190px;
  margin-right: 88px;
}
.wrap img {
  width: 67px;
  height: 67px;
}
.wrap {
  display: flex;
  align-items: center;
}
</style>
