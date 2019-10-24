<template>
  <div id="country_select">
    <div class="country_name" @click.stop="country_show_hidden=!country_show_hidden">
      <!-- <img :src="'../../../static/flag/'+country_code+'.svg'" alt /> -->
      <span>{{country_name}}</span>
      <img src="./arrows.png" alt :class="{'arrows':true,'arrows_active':country_show_hidden}" />
    </div>
    <transition name="fade">
      <div class="country_wrap" v-show="country_show_hidden">
        <div class="country_header" @click.stop>
          <input type="text" placeholder="搜索地区/国家" v-model="input" @input="inputChange" />
          <img src="./search.png" alt />
        </div>
        <div class="country_content" v-if="arr_country!=null">
          <div class="list" v-show="input.trim()==''&&!app_id">
            <div class="list_header">热门国家</div>
            <div class="item" @click="change_country_name('中国','CN')">
              <img :src="'../../../static/flag/CN.svg'" alt />
              <span>中国</span>
            </div>
            <div class="item" @click="change_country_name('美国','US')">
              <img :src="'../../../static/flag/US.svg'" alt />
              <span>美国</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()!=''">
            <div
              class="item"
              v-for="(item,index) in arr_country[0]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[0].length!=0">
            <div class="list_header">亚洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[0]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[1].length!=0">
            <div class="list_header">北美洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[1]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[2].length!=0">
            <div class="list_header">南美洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[2]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[3].length!=0">
            <div class="list_header">欧洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[3]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[4].length!=0">
            <div class="list_header">大洋洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[4]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="list" v-show="input.trim()==''&&arr_country[5].length!=0">
            <div class="list_header">非洲</div>
            <div
              class="item"
              v-for="(item,index) in arr_country[5]"
              :key="'arr_country'+index"
              @click="change_country_name(item.name,item.code)"
            >
              <img :src="'../../../static/flag/'+item.code+'.svg'" alt />
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'country_select',
  components: {},

  data() {
    return {
      arr_country: null,
      input: '',
      country_show_hidden: false,
      country_name: '中国',
      country_code: 'CN'
    }
  },
  props: ['custom_country', 'app_id'],
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      // alert(555555)
      this.$emit('childFn', this.country_name)
    }
  },
  created() {
    if (this.custom_country) {
      this.country_name = this.custom_country
    }

    this.get_data()
    this.$emit('childFn', this.country_name)
    this.$watch('country_name', function(newValue, oldValue) {
      this.$emit('childFn', this.country_name)
    })
  },

  mounted: function() {
    this.globalClick(() => {
      // alert(111)
      this.country_show_hidden = false
    })
  },
  methods: {
    get_data() {
      // 亚洲是1 Asia
      // 欧洲是4 Europe
      // 南美洲是3 South_America
      // 大洋洲是5 Oceania
      // 北美洲是2  North_America
      // 非洲是6 Africa
      let url
      if (this.app_id) {
        url = '/GetCountry?appId=' + this.app_id
      } else {
        url = '/GetCountry'
      }
      this.$axios
        .get(url)
        .then(response => {
          // 获取国家ID

          this.arr_country = new Array()
          if (this.input.trim() == '') {
            // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia // 亚洲是1 Asia
            let Asia = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 1) {
                Asia.push(element)
              }
            })
            this.arr_country.push(Asia)
            // 北美洲是2  North_America// 北美洲是2  North_America// 北美洲是2  North_America// 北美洲是2  North_America// 北美洲是2  North_America// 北美洲是2  North_America
            let North_America = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 2) {
                North_America.push(element)
              }
            })
            this.arr_country.push(North_America)
            // 南美洲是3 South_America// 南美洲是3 South_America// 南美洲是3 South_America// 南美洲是3 South_America
            let South_America = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 3) {
                South_America.push(element)
              }
            })
            this.arr_country.push(South_America)
            // 欧洲是4 Europe // 欧洲是4 Europe // 欧洲是4 Europe // 欧洲是4 Europe // 欧洲是4 Europe // 欧洲是4 Europe // 欧洲是4 Europe
            let Europe = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 4) {
                Europe.push(element)
              }
            })
            this.arr_country.push(Europe)
            // 大洋洲是5 Oceania// 大洋洲是5 Oceania// 大洋洲是5 Oceania// 大洋洲是5 Oceania// 大洋洲是5 Oceania
            let Oceania = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 5) {
                Oceania.push(element)
              }
            })
            this.arr_country.push(Oceania)
            // 非洲是6 Africa// 非洲是6 Africa// 非洲是6 Africa// 非洲是6 Africa// 非洲是6 Africa// 非洲是6 Africa
            let Africa = new Array()
            response.data.Data.forEach(element => {
              if (element.areaid == 6) {
                Africa.push(element)
              }
            })
            this.arr_country.push(Africa)
          } else if (this.input.trim() != '') {
            let nothing = new Array()
            response.data.Data.forEach(element => {
              if (element.name.indexOf(this.input) != -1) {
                nothing.push(element)
              }
            })
            this.arr_country.push(nothing)
          }
          // console.log(this.arr_country)
        })
        .catch(error => {
          console.log(error)
        })
    },
    inputChange() {
      this.get_data()
    },
    change_country_name(parm, parm1) {
      this.country_name = parm
      this.country_code = parm1
      this.country_show_hidden = false
    }
  }
}
</script>
<style scoped>
.item span {
  line-height: 0;
}
.item:hover {
  background-color: #f7f7f7;
}
.list {
  border-top: 1px solid #d6d6d6;
  margin-top: 10px;
  width: 95%;
  padding-top: 4px;
}
.list_header {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  cursor: pointer;
  letter-spacing: 0px;
  color: #666;
}
.arrows_active {
  transform: rotate(-90deg) !important;
  -ms-transform: rotate(-90deg) !important;
  -moz-transform: rotate(-90deg) !important;
  -webkit-transform: rotate(-90deg) !important;
  -o-transform: rotate(-90deg) !important;
  transition-duration: 0.3s;
}
.arrows {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transition-duration: 0.3s;
}
.country_name span {
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'PingFangSC', 'helvetica neue', 'hiragino sans gb', 'arial',
    'microsoft yahei ui', 'microsoft yahei', 'simsun', 'sans-serif' !important;
}
.country_name {
  width: 81px;
  height: 26px;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px #dfdfdf;

  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  cursor: pointer;
  letter-spacing: 0px;
  color: #444444;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 9px;
  box-sizing: border-box;
}
.item {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #222222;
  display: flex;
  align-items: center;
  padding: 6px 0;
  cursor: pointer;
}
.item img {
  font-size: 24px;
  background-color: #00bcfc;
  border: solid 1px #dfdfdf;
  margin-right: 9px;
}
.country_content {
  padding-left: 24px;
  height: 300px;
  overflow-y: scroll;
  background-color: #fff;
}
.country_wrap {
  width: 276px;
  margin-top: 6px;

  border-radius: 4px;
  padding-bottom: 14px;
  border: solid 1px #dfdfdf;
  box-sizing: border-box;
  position: absolute;
  background-color: #fff;
}
.country_header input {
  width: 242px;
  height: 34px;
  border-radius: 4px;
  border: solid 1px #dfdfdf;
  padding-left: 11px;
  padding-right: 40px;
  box-sizing: border-box;
  outline: none;
  margin-top: 14px;
}
.country_header img {
  position: absolute;
  right: 40px;
  top: 24px;
}
.country_header {
  padding-left: 14px;
  position: relative;
  background-color: #fff;
}
#country_select {
  z-index: 300 !important;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>