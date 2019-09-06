<template>
  <div id="asm">
    <div class="header">
      <div>掌上学堂—ASM</div>
    </div>
    <div class="content">
      <div class="item">
        <img src="../assets/hand_school/img_temp.png" alt />
        <div>
          <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
          <div>
            2018 财年，全球游戏收入共 1379 亿美元，同比增长 13.3%，其中有 714 亿美元来自亚太地区。尽管中国游戏版号等政策的管控力度加大
            但中国市场的游戏收入占全球总收入的 28%，达到 379 亿美元，超过美国市场的 304 亿美元。中国手游行业前景还是十分可观的。
          </div>
          <div>ASM 丨 2019-05-20</div>
        </div>
      </div>
      <div class="item">
        <img src="../assets/hand_school/img_temp.png" alt />
        <div>
          <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
          <div>
            2018 财年，全球游戏收入共 1379 亿美元，同比增长 13.3%，其中有 714 亿美元来自亚太地区。尽管中国游戏版号等政策的管控力度加大
            但中国市场的游戏收入占全球总收入的 28%，达到 379 亿美元，超过美国市场的 304 亿美元。中国手游行业前景还是十分可观的。
          </div>
          <div>ASM 丨 2019-05-20</div>
        </div>
      </div>
      <div class="item">
        <img src="../assets/hand_school/img_temp.png" alt />
        <div>
          <div>产品运营万字解析 | 西西弗书店，书不能卖给读书人</div>
          <div>
            2018 财年，全球游戏收入共 1379 亿美元，同比增长 13.3%，其中有 714 亿美元来自亚太地区。尽管中国游戏版号等政策的管控力度加大
            但中国市场的游戏收入占全球总收入的 28%，达到 379 亿美元，超过美国市场的 304 亿美元。中国手游行业前景还是十分可观的。
          </div>
          <div>ASM 丨 2019-05-20</div>
        </div>
      </div>
    </div>
    <div class="more_item">加载更多</div>
  </div>
</template> 

<script>
export default {
  name: 'asm',
  created() {},
  components: {}
}
</script>

<style scoped lang="less">
.more_item {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #009bef;
  margin-top: 56px;

  width: 100%;
  text-align: center;
}
.content {
  width: 1200px;
  background-color: #ffffff;
  box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.04);
  padding: 18px 30px;
  position: relative;
  margin: 0 auto;
  margin-top: -60px;
  box-sizing: border-box;
  img {
    width: 329px;
    height: 200px;
    margin-right: 29px;
  }
  .item {
    display: flex;
    align-items: center;
    > div {
      height: 235px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #f2f2f2;
      > div:nth-child(1) {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 13px;
        margin-top: 37px;
      }
      > div:nth-child(2) {
        height: 106px;
        font-family: SourceHanSansCN-Normal;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 30px;
        letter-spacing: 0px;
        color: #444444;
      }
      > div:nth-child(3) {
        font-family: SourceHanSansCN-Normal;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: #888888;
      }
    }
  }
}
.header {
  background-image: url('../assets/hand_school/header_bg.png');
  background-repeat: no-repeat;
  width: 100%;
  height: 240px;
  font-family: SourceHanSansCN-Medium;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 240px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
  > div {
    background-color: #000000;
    opacity: 0.2;
  }
}
#asm {
  padding-bottom: 56px;
}
</style>
