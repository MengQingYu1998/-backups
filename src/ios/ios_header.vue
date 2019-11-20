<template>
  <div id="ios_header">
    <div class="breadcrumb">
      <span>iOS应用</span>
      <span>> {{ response_data && response_data.appName }}</span>
    </div>
    <div class="wrap">
      <div class="header_img" v-if="response_data">
        <img
          :src="response_data.icon"
          :class="{ gray: response_data.is_online == 0 }"
          alt
        />
        <img
          v-if="
            response_data.expectedReleaseDate != '无' &&
              response_data.expectedReleaseDate != '0001/1/1 0:00:00'
          "
          src="../assets/ios/order.png"
          alt
        />
        <img
          v-if="response_data.is_online == 0"
          src="../assets/ios/death.png"
          alt
        />
        <div
          class="white"
          v-if="
            response_data.expectedReleaseDate == '无' &&
              response_data.expectedReleaseDate == '0001/1/1 0:00:00'
          "
        ></div>
      </div>
      <div class="app_description" v-if="response_data">
        <div v-if="response_data">{{ response_data.appName }}</div>
        <div v-if="response_data">
          {{ response_data.subtitle == "无" ? "" : response_data.subtitle }}
        </div>
      </div>
      <div class="app_field">
        <div>开发者</div>
        <el-popover
          popper-class="ios_header_popper"
          placement="top-start"
          trigger="hover"
          :content="response_data && response_data.developer"
        >
          <div slot="reference" class="app_field_developer">
            {{ response_data && response_data.developer }}
          </div>
        </el-popover>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div v-if="response_data">
          {{
            response_data.expectedReleaseDate == "无" ||
            response_data.expectedReleaseDate == "0001/1/1 0:00:00" ||
            response_data.expectedReleaseDate <= new Date()
              ? "版本更新时间"
              : "预计上线时间"
          }}
        </div>
        <div v-if="response_data">
          {{
            response_data.expectedReleaseDate == "无" ||
            response_data.expectedReleaseDate == "0001/1/1 0:00:00"
              ? response_data.appUpdateTime.slice(0, 10)
              : response_data.expectedReleaseDate.slice(0, 10)
          }}
        </div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>分类</div>
        <div v-if="response_data">{{ response_data.genreName }}</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>价格</div>
        <div v-if="response_data">{{ response_data.price }}</div>
      </div>
      <div class="line"></div>
      <div class="app_field">
        <div>APPID</div>
        <div>{{ $route.query.now_app_id }}</div>
      </div>
      <div class="line"></div>
      <div class="app_field country">
        <div>国家/地区</div>
        <!-- 选择国家 -->
        <country
          @childFn="parentFn"
          :custom_country="this.$route.query.now_country"
          :app_id="$route.query.now_app_id"
        ></country>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
// 引入国家选择组件
import country from "../common/country_select/country";
// 引入工具类
import { myTime } from "../common/util.js";
export default {
  name: "ios_header",
  components: { country },
  data() {
    return {
      now_country: "中国",
      response_data: null,
      now_app_id: null
    };
  },

  created: function() {
    this.$route.query.now_app_id
      ? (this.now_app_id = this.$route.query.now_app_id)
      : (this.now_app_id = null);
    this.$route.query.now_country
      ? (this.now_country = this.$route.query.now_country)
      : (this.now_country = "中国");

    this.get_data();
    //'当前国家发生变化，重新请求数据...'
    this.$watch("now_country", function(newValue, oldValue) {
      let that = this;

      if (
        that.$route.path == "/ranking_compare" ||
        that.$route.path == "/cover_compare"
      ) {
        this.$router.push({
          path:
            that.$route.path +
            "?now_country=" +
            this.now_country +
            "&now_app_id=" +
            this.now_app_id +
            "&now_app_id02=" +
            this.$route.query.now_app_id02
        });
      } else {
        this.$router.push({
          path:
            that.$route.path +
            "?now_country=" +
            this.now_country +
            "&now_app_id=" +
            this.now_app_id
        });
      }
    });
  },
  methods: {
    // 请求数据
    get_data() {
      this.$axios
        .get("/GetCountry")
        .then(response => {
          // 获取国家ID
          let country_id;
          let arr_country = response.data.Data;
          arr_country.forEach(element => {
            if (element.name == this.now_country) {
              country_id = element.id;
              return false;
            }
          });
          // 请求数据
          // 1:iPhone 2:ipad

          let url =
            "/GetAppSynopsis?countryId=" +
            country_id +
            "&appId=" +
            this.now_app_id;
          // console.log(url);

          // 请求数据
          this.$axios
            .get(url)
            .then(response => {
              // console.log(response);
              this.response_data = response.data.Data;
              if (response.data.Data != null) {
                this.price_to_now_ranking(response.data.Data.price);
                this.appname_to_data_table(response.data.Data.appName);

                // console.log(this.$route);
                if (this.$route.name == "now_ranking") {
                  document.title = response.data.Data.appName;
                }
              }

              // }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 获取当前选中的国家
    parentFn(payload) {
      this.now_country = payload;
    },
    // 把获取到的价格传递给父组件的now_ranking.vue
    price_to_now_ranking(parm) {
      this.$emit("price_to_now_ranking", parm);
    },
    // 把应用面名字传递给父组件的data_table.vue
    appname_to_data_table(parm) {
      this.$emit("appname_to_data_table", parm);
    }
  }
};
</script>
<style scoped>
.app_field_developer {
  width: 140px !important;
  word-break: break-all;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  font-size: 14px !important;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px !important;
  letter-spacing: 0px;
  color: #444444 !important;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.header_img {
  width: 68px;
  position: relative;
}
.gray {
  -webkit-filter: grayscale(100%);
  -webkit-filter: grayscale(1);
  filter: grayscale(100%);
  filter: gray;
  opacity: 0.7;
}
.white {
  width: 69px;
  height: 69px;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 0;
  top: 0;
}
.header_img > img:nth-child(2),
.header_img > img:nth-child(3) {
  position: absolute;
  left: 1px;
  top: 1px;
  z-index: 10;
  width: 41px;
  height: 41px;
}
.header_img > img:nth-child(1) {
  border-radius: 10px;
  border: solid 1px #f2f2f2;
  width: 67px;
  height: 67px;
}
.country {
  height: 65px;
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.line {
  width: 1px;
  height: 20px;
  background-color: #d6d6d6;
  margin: 0 34px;
}
.app_field {
  /* padding: 0 9px; */
}
.app_field div:last-child {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #444444;
  /* text-align: center; */
}
.app_field div:first-child {
  font-size: 13px;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;
}

.app_description div:first-child {
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #222222;

  width: 180px;
  height: 30px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app_description div:last-child {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #888888;

  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 180px;
}
.app_description {
  display: inline-block;
  margin-left: 19px;
  margin-right: 30px;
}

.wrap {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 28px;
}

.breadcrumb span:last-child {
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #888888;
}
.breadcrumb span:first-child {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #009bef;
}
.breadcrumb {
  padding: 7px 0;
}
</style>
