<template>
  <div class="box">
    <div class="left">
      <img src="../assets/NumImg/loginImg.png" />
    </div>
    <div class="right">
      <p class="logintit">注册</p>
      <div class="inpDiv">
        <div>
          <p class="tel">手机号</p>
          <p class="telInp" :class="{'focInp':focinp,'wroInp':wroinp}">
            <input
              type="text"
              placeholder="请输入手机号"
              @blur="blurState(telval)"
              @focus="focusState()"
              v-model="telval"
              @keyup="nullInput()"
            />
          </p>
          <p class="wrongTel" v-show="wrongTel" v-html="telFont"></p>
        </div>
        <div>
          <p class="tel">验证码</p>
          <p class="telInp veriInp" :class="{'focInp':focveri,'wroInp':wroveri}">
            <input
              type="text"
              placeholder="请输入短信验证码"
              @blur="blurVeri(verival)"
              @focus="focusVeri()"
              v-model="verival"
              @keyup="nullInput()"
              maxlength="6"
            />
            <!-- <span :class="{'nokong':telhas}" v-html="codeBtn" @click="huoqu()" :disabled="disabled"></span> -->
            <button :class="{'nokong':telhas}" v-html="codeBtn" @click="huoqu()" :disabled="disabled"></button>
          </p>
          <p class="wrongVeri" v-show="wrongVeri" v-html="veriFont"></p>
        </div>
        <div>
          <p class="code">密码</p>
          <p class="codeInp" :class="{'focInp':focCode,'wroInp':wrocode}">
            <input
              type="password"
              placeholder="请输入密码"
              @blur="blurCode(codeval)"
              @focus="focusCode()"
              v-model="codeval"
              @keyup="nullInput()"
            />
          </p>
          <p class="wrongCode" v-show="wrongCode" v-html="codeFont"></p>
        </div>
        <div>
          <p class="code">确认密码</p>
          <p class="codeInp" :class="{'focInp':focsCode,'wroInp':wroscode}">
            <input
              type="password"
              placeholder="请输入确认密码"
              @blur="blurCodes(codesval)"
              @focus="focusCodes()"
              v-model="codesval"
              @keyup="nullInput()"
            />
          </p>
          <p class="wrongCode" v-show="wrongsCode" v-html="scodeFont"></p>
        </div>
      </div>

      <div class="loginBtn" :class="{'nokong':ishas}" @click="regisBtn()">注册</div>
      <div class="goRegiste">
        <p>
          已有账号，
          <span>
            <router-link :to="{ path: '/login'}">登录</router-link>
          </span>
        </p>
      </div>
    </div>
    <!-- 注册成功 -->
    <div class="maskR" v-show="reSus">
      <div class="conDiv">
        <p class="icon">
          <img src="../assets/NumImg/tick.png" />
        </p>
        <p class="font">恭喜您，注册成功</p>
        <p class="des">绑定邮箱，后期可方便订阅应用消息</p>
        <p class="btn" @click="toEmail()">绑定邮箱</p>
      </div>
    </div>
    <!-- 绑定邮箱 -->
    <div class="mask" v-show="emailMask">
      <div class="aDiv">
        <p class="tit">
          <span>绑定邮箱</span>
          <img src="../assets/NumImg/closeMask.png" @click="closeEmail()" />
        </p>
        <p>
          <input :class="{'focInp':focemail,'wroInp':wroemail}" type="text" placeholder="请输入您的邮箱" @blur="bluremail(emailval)" @focus="focusemail()" v-model="emailval"/>
        </p>
        <p class="wrongemail" v-show="wrongemail" v-html="emailFont"></p>
        <p class="des">确认绑定邮箱后将收到激活邮件，点击激活邮件里的链接验证邮箱成功。</p>
        <p class="sureBtn" @click="sureBind()">确认绑定</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      focinp: false, //账号输入框获取焦点边框变色
      focveri: false, //验证码输入框获取焦点边框变色
      focCode: false, //密码输入框获取焦点边框变色
      focsCode: false, //确认密码输入框获取焦点边框变色
      focemail:false, //邮箱输入框获取焦点边框变色
      ishas: false, //注册按钮变色
      telhas: false, //获取验证码按钮变色
      wrongTel: false, //是否提示账号错误
      wrongVeri: false, //是否提示验证码错误
      wrongCode: false, //是否提示密码错误
      wrongsCode: false, //是否提示确认密码错误
      wrongemail:false,//是否提示邮箱错误
      telFont: '手机号不能为空', //手机号提示内容
      veriFont: '验证码不能为空', //验证码提示内容
      codeFont: '密码不能为空', //密码提示内容
      scodeFont: '确认密码不能为空', //确认密码提示内容
      emailFont:'邮箱不可以为空',//邮箱提示内容
      wroinp: false, //账号错误边框颜色
      wroveri: false, //验证码错误边框颜色
      wrocode: false, //密码错误边框变色
      wroscode: false, //确认密码错误边框变色
      wroemail:false,//邮箱错误边框变色
      tel: '', //手机号
      veri: '', //验证码
      code: '', //获取密码
      scode: '', //确认密码
      codeBtn: '获取验证码', //获取验证码按钮
      reSus: false, //注册成功弹窗
      emailMask: false, //绑定邮箱弹窗
      disabled:false,//倒计时禁用
      // input value
      telval: '',
      codeval: '',
      codesval: '',
      verival: '',
      emailval:'',
      emailV:'',
    }
  },
  methods: {
    // 账号
    focusState() {
      this.focinp = true
      this.wrongTel = false
      this.wroinp = false
    },
    blurState(telval) {
      this.focinp = false
      this.tel = telval
      var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (this.telval == undefined || this.telval == '') {
        this.wrongTel = true
        this.wroinp = true
        this.telFont = '手机号不能为空'
        return false
      } else if (!reg.test(this.telval)) {
        this.wrongTel = true
        this.wroinp = true
        this.telFont = '手机号输入错误'
        return false
      }
    },
    // 验证码
    focusVeri() {
      this.focveri = true
      this.wrongVeri = false
      this.wroveri = false
    },
    blurVeri(verival) {
      this.focveri = false
      this.veriVal = verival
      var reg = /^\d{6}$/
      if (this.verival == undefined || this.verival == '') {
        this.wrongVeri = true
        this.wroveri = true
        this.veriFont = '验证码不能为空'
      } else if (!reg.test(this.verival)) {
        this.wrongVeri = true
        this.wroveri = true
        this.veriFont = '验证码错误'
      } else if (this.verival != this.veri) {
        this.wrongVeri = true
        this.wroveri = true
        this.veriFont = '验证码错误'
      }
    },
    // 密码
    focusCode() {
      this.focCode = true
      this.wrongCode = false
      this.wrocode = false
    },
    blurCode(codeval) {
      this.focCode = false
      this.code = codeval
      var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/
      if (this.codeval == undefined || this.codeval == '') {
        this.wrongCode = true
        this.wrocode = true
        this.codeFont = '密码不能为空'
        return false
      } else if (!reg.test(this.codeval)) {
        this.wrongCode = true
        this.wrocode = true
        this.codeFont = '密码输入错误'
        return false
      }
    },
    // 确认密码
    focusCodes() {
      this.focsCode = true
      this.wrongsCode = false
      this.wroscode = false
    },
    blurCodes(codesval) {
      this.scode = codesval
      this.focsCode = false
      if (this.codesval == undefined || this.codesval == '') {
        this.wrongsCode = true
        this.wroscode = true
        this.scodeFont = '确认密码不能为空'
        return false
      } else if (codesval != this.code) {
        this.wrongsCode = true
        this.wroscode = true
        this.scodeFont = '确认密码必须与密码保持一致'
        return false
      }
    },
    nullInput() {
      if (
        this.telval.length >= 1 &&
        this.verival.length >= 1 &&
        this.codeval.length >= 1 &&
        this.codesval.length >= 1
      ) {
        this.ishas = true
      }
      if (this.telval.length == 11) {
        this.telhas = true
      }
    },

    // 获取验证码
    huoqu() {
      var reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (this.tel == undefined || this.tel == '') {
        this.wrongTel = true
        this.wroinp = true
        this.telFont = '手机号不能为空'
        return false
      } else if (!reg.test(this.tel)) {
        this.wrongTel = true
        this.wroinp = true
        this.telFont = '手机号输入错误'
        return false
      } else {
        // this.telhas=true
        // 获取验证码接口
        this.$axios({
          method: 'get',
          url: '/GetAuthCode?phone=' + this.tel
        })
          .then(res => {
            this.veri = res.data.Data
            //倒计时
            let time = 60
            let timer = setInterval(() => {
              if (time == 0) {
                clearInterval(timer)
                this.codeBtn = '重新获取'
                this.disabled=true
              } else {
                this.codeBtn = time + '秒'
                time--
                this.disabled=true
              }
            }, 1000)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    //点击注册
    regisBtn() {
      if (this.ishas == true && this.scode == this.code) {
        // 注册接口
        this.$axios({
          method: 'post',
          url: '/PostAddAccount',
          data: {
            phone: this.tel,
            password: this.code,
            authCode: this.veri
          }
        })
          .then(res => {
            if (res.data.Code == 1) {
              // 注册成功弹窗
              this.reSus = true
              document
                .getElementsByTagName('body')[0]
                .setAttribute('style', 'position:fixed; width:100%;')
            } else if (res.data.Code == -1) {
              this.wrongTel = true
              this.wroinp = true
              this.telFont = '手机号已存在'
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 点击绑定邮箱
    focusemail(){
      this.focemail=true
    },
    bluremail(emailval){
      this.focemail=false
      this.emailV=this.emailval

      var reg=/^[1-9]\d{5,11}@qq\.com$/;
        if(this.emailval==undefined){
          this.wrongemail=true
          this.wroemail=true
          return false;
        }else if(!reg.test(this.emailval)){
          this.wrongemail=true
          this.wroemail=true
          this.emailFont="邮箱输入错误"
          return false;
        }
    },
    sureBind(){
      this.$axios({
            method:"post",
            url:"/SendEmail",
            data:{
              phone:this.tel,
              email:this.emailV
            }
      })
      .then(res=>{
           this.emailMask = false
           localStorage.setItem("email",this.emailV);//存储手机号
           // console.log(localStorage.getItem("email"))
      })
      .catch(error=>{
            console.log(error)
      })
    },
    //点击绑定邮箱
    toEmail(){
      this.emailMask = true
      this.reSus = false
    },
    //关闭绑定邮箱弹窗
    closeEmail() {
      this.emailMask = false
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'position:relative;')
    }
  },
  created() {}
}
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.box {
  width: 1200px;
  margin: 0 auto;
  min-height: 770px;
  clear: both;
}
.left,
.right {
  display: inline-block;
}
.left {
  float: left;
  margin-left: 140px;
  margin-top: 130px;
}
.left,
.left img {
  width: 528px;
  height: 528px;
}
.right {
  width: 382px;
  height: 590px;
  background-color: #ffffff;
  box-shadow: 0px 8px 18px 0px rgba(0, 85, 131, 0.08);
  border-radius: 4px;
  float: right;
  margin-top: 85px;
  position: relative;
  right: 165px;
  border-top: 1px solid transparent;
}
.right .logintit {
  font-family: SourceHanSansCN-Medium;
  font-size: 18px;
  color: #222222;
  text-align: center;
  margin-top: 44px;
}
.inpDiv,
.goRegiste,
.loginBtn,
.weixinLogin {
  width: 306px;
  margin: 0 auto;
}
.right .inpDiv > div {
  height: 88px;
  margin-top: 10px;
}
.right .inpDiv > div:first-child {
  margin-top: 20px;
}
.right .inpDiv .tel,
.right .inpDiv .code,
.right .inpDiv .Veri {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: #222222;
}
.right .inpDiv .telInp,
.right .inpDiv .codeInp,
.right .inpDiv .VeriInp {
  height: 42px;
  border-radius: 4px;
  border: solid 1px #f2f2f2;
  margin-top: 4px;
}
.focInp {
  border: solid 1px #009bef !important;
}
.focInp input {
  color: #009bef !important;
}
.wroInp {
  border: solid 1px #f50202 !important;
}
.right .inpDiv .telInp input::placeholder,
.right .inpDiv .codeInp input::placeholder,
.right .inpDiv .VeriInp input::placeholder {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #bfbfbf;
}

.right .inpDiv .telInp input,
.right .inpDiv .codeInp input,
.right .inpDiv .VeriInp input {
  width: 250px;
  padding-left: 10px;
  outline: none;
  border: none;
  margin-top: 12px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #222222;
}
.right .inpDiv .veriInp input {
  width: 210px;
}
.right .inpDiv .veriInp button {
  width: 84px;
  height: 42px;
  border: none;
  background-color: #dfdfdf;
  border-radius: 0px 4px 4px 0px;
  display: inline-block;
  float: right;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #ffffff;
  line-height: 42px;
  text-align: center;
}
.right .inpDiv .wrongTel,
.right .inpDiv .wrongCode,
.right .inpDiv .wrongVeri {
  font-family: SourceHanSansCN-Normal;
  font-size: 12px;
  color: #f50202;
}
.right .goRegiste p {
  margin-top: 10px;
  margin-left: 108px;
  font-family: SourceHanSansCN-Normal;
  font-size: 13px;
  color: #888888;
  float: left;
}
.right .goRegiste p span a {
  color: #009bef;
}
.right .goRegiste p span:hover {
  cursor: pointer;
}
.right .loginBtn {
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-color: #dfdfdf;
  border-radius: 4px;
  font-family: SourceHanSansCN-Normal;
  font-size: 16px;
  color: #ffffff;
  margin-top: 25px;
}
.nokong {
  background-color: #009bef !important;
}
.right .weixinLogin p {
  text-align: center;
  margin-top: 13px;
}
/*注册成功弹窗*/
.maskR,
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.maskR .conDiv {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 200px;
  text-align: center;
  border-top: 1px solid transparent;
}
.maskR .conDiv .icon img {
  width: 50px;
  height: 50px;
  margin-top: 40px;
}
.maskR .conDiv .font {
  font-family: SourceHanSansCN-Medium;
  font-size: 20px;
  color: #222222;
  margin-top: 28px;
}
.maskR .conDiv .des {
  font-family: SourceHanSansCN-Normal;
  font-size: 16px;
  color: #888888;
  margin-top: 15px;
}
.maskR .conDiv .btn {
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
  margin-top: 35px;
}
/*绑定邮箱弹窗*/
.mask .aDiv {
  width: 400px;
  height: 311px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 200px;
  border: 1px solid transparent;
}
.mask .aDiv .tit {
  margin-top: 24px;
}
.mask .aDiv .tit span {
  font-family: SourceHanSansCN-Medium;
  font-size: 20px;
  color: #222222;
}
.mask .aDiv .nowTel {
  margin-top: 30px;
}
.mask .aDiv .tit span,
.mask .aDiv .nowTel span:first-child {
  margin-left: 24px;
}
.mask .aDiv .tit img {
  width: 22px;
  height: 22px;
  float: right;
  margin-right: 16px;
}
.mask .aDiv .nowTel span {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #888888;
}
.mask .aDiv p input {
  width: 232px;
  height: 32px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #009bef;
  outline: none;
  border: solid 1px #f2f2f2;
  padding-left: 10px;
  margin-left: 24px;
  margin-top: 20px;
}
.mask .aDiv p input::placeholder {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #bfbfbf;
}
.mask .aDiv p.sureBtn {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: #009bef;
  border-radius: 4px;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #ffffff;
  margin: 0 auto;
  margin-top: 30px;
}
.mask .aDiv p.sureBtn:hover{
  cursor: pointer;
}
.mask .aDiv p span.codeBtn {
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #009bef;
  margin-left: 24px;
}
.mask .aDiv p.des {
  width: 350px;
  line-height: 30px;
  margin: 0 auto;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #888888;
  margin-top: 15px;
}
</style>