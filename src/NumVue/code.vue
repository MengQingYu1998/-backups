<template>
	<div class="box">
		<div class="left">
			<img src="../assets/NumImg/loginImg.png"/>
		</div>
		<div class="right">
			<p class="logintit">找回密码</p>
			<ul>
				<li :class="{'selected':isSelected==index}" v-for="(item,index) in items" @click="clickLi(index)">{{item.name}}</li>
			</ul>
			<!-- 邮箱找回 -->
			<div class="emailDiv" v-if="showemail">
				
				<p class="emailInp" :class="{'focInp':focemail,'wroInp':wroemail}">
					<input type="text" placeholder="请输入邮箱号" @blur="bluremail(emailval)"  @focus="focusemail()" v-model="emailval" @keyup="nullInput()"/>
				</p>
				<p class="wrongemail" v-show="wrongemail" v-html="emailFont"></p>
				<div class="loginBtn" :class="{'nokong':ishas}" @click="susLj()">确认</div>
			</div>
			<!-- 手机号找回 -->
			<div class="telDiv" v-else>
				<div>
					<p class="telInp" :class="{'focInp':focinp,'wroInp':wroinp}">
						<input type="text" placeholder="请输入手机号" @blur="blurState(telval)"  @focus="focusState()" v-model="telval" @keyup="telInput()"/>
						<el-button :class="{'nokong':telhas}" v-html="codeBtn" :plain="true" @click="huoqu()" :disabled="disabled"></el-button>
					</p>
					<p class="wrongTel" v-show="wrongTel" v-html="telFont"></p>
				</div>
				<div>
					<p class="telInp veriInp" :class="{'focInp':focveri,'wroInp':wroveri}">
						<input type="text" placeholder="请输入短信验证码" @blur="blurVeri(verival)"  @focus="focusVeri()" v-model="verival" @keyup="telInput()" maxlength="6" />
						
					</p>
					<p class="wrongVeri" v-show="wrongVeri" v-html="veriFont"></p>
				</div>
				<div class="loginBtn" :class="{'nokong':ishas}" @click="cliTel()">
					确认
					<!-- <router-link :to="{path:'/setTcode'}"></router-link> -->
				</div>
			</div>
			
			
		</div>
		<!-- 修改链接发送成功 -->
		<div class="maskR" v-show="reSus">
			<div class="conDiv">
				<p class="icon"><img src="../assets/NumImg/tick.png"/></p>
				<p class="font">密码修改链接已发送至您的邮箱请注意查收</p>
				<p class="btn" @click="closeM()">确定</p>
			</div>
		</div>

	</div>
</template>


<script>
	export default{
		data(){
			return{
				focemail:false,//点击邮箱时输入框样式
				wroemail:false,//邮箱错误时输入框样式
				ishas:false,//输入框是否为空
				telhas:false,//验证码按钮变色
				isSelected:'',//li点击样式
				index:0,
				items:[
					{name:'邮箱找回'},
					{name:'手机号找回'},
				],
				showemail:true,//邮箱找回
				emailFont:'邮箱不可以为空',//邮箱提示内容
				wrongemail:false,//邮箱错误提示
				codeBtn:'获取验证码',//获取验证码按钮
				wrongTel:false,//是否提示手机号错误
				wrongVeri:false,//是否提示验证码错误
				telFont:'手机号不能为空',//手机号提示内容
				veriFont:'验证码不能为空',//验证码提示内容
				focinp:false,//点击手机号时输入框样式
				wroinp:false,//手机号错误时输入框样式
				focveri:false,//点击验证码时输入框样式
				wroveri:false,//验证码错误时输入框样式
				tel:'',//手机号码
				email:'',//邮箱
				veri:'',//验证码
				reSus:false,//链接发送成功弹窗
				disabled:false,//禁止点击获取验证码按钮
				// input value
				emailval:'',
				telval:'',
				verival:'',
			}
		},
		methods:{
			// 点击切换找回方式
			clickLi(index){
				this.isSelected=index
				if(this.isSelected==0){
					this.showemail=true
				}else{
					this.showemail=false
				}
			},
			// 邮箱
			focusemail(){
				this.focemail=true
				this.wrongemail=false
				this.wroemail=false
			},
			bluremail(emailval){
				this.focemail=false
				this.email=emailval
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
			nullInput(){
				if(this.emailval.length>=1){
					this.ishas=true
				}
			},
			telInput(){
				if(this.telval.length>=11){
					this.telhas=true
					
				}
				if(this.telval.length>=11&&this.verival.length>=1){
					this.ishas=true
				}
				
			},
			// 账号
			focusState(){
				this.focinp=true
				this.wrongTel=false
				this.wroinp=false
			},
			blurState(telval){
				this.focinp=false
				this.tel=this.telval
				var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(this.telval==undefined){
					this.wrongTel=true
					this.wroinp=true
					return false;
				}else if(!reg.test(this.telval)){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号输入错误"
					return false;
				}
			},
			// 验证码
			focusVeri(){
				this.focveri=true
				this.wrongVeri=false
				this.wroveri=false
			},
			blurVeri(verival){
				this.veri=verival
				this.focveri=false
				var reg=/^\d{6}$/;
				if(this.verival==undefined){
					this.wrongVeri=true
					this.wroveri=true
					return false;
				}else if(!reg.test(this.verival)){
					this.wrongVeri=true
					this.wroveri=true
					this.veriFont="验证码输入错误"
					return false;
				}else if(this.verival!=this.veri){
					this.wrongVeri=true
					this.wroveri=true
					this.veriFont="验证码输入错误"
				}
			},
			// 获取验证码
			huoqu(){
				var reg=/^1(3|4|5|6|7|8|9)\d{9}$/;
				if(this.tel==undefined){
					this.wrongTel=true
					this.wroinp=true
					return false;
				}else if(!reg.test(this.tel)){
					this.wrongTel=true
					this.wroinp=true
					this.telFont="手机号输入错误"
					return false;
				}else{
					this.telhas=true
					// 获取验证码接口
					this.$axios({
						method:"get",
						url:"/GetAuthCode?phone="+this.tel,
						
					})
					.then(res=>{
						this.veri=res.data.Data
						//倒计时
					    let time = 60;
					    let timer = setInterval(() => {
						    if(time == 0) {
							    clearInterval(timer);
							    this.codeBtn = "重新获取";
							    this.disabled=false
						    } else {
							    this.codeBtn =time + '秒';
							    time--
							    this.disabled=true
						    }

					  	},1000)
					  	this.$message({
				          message: '验证码已发送，请注意查收',
				          type: 'success',
				          iconClass:'successicon',
				          duration:1500,
				        });
						
					})
					.catch(error=>{
						console.log(error)
					})



					
				}
			},
			//通过邮箱找回点击确认按钮
			susLj(){
				if(this.ishas==true){
					this.$axios({
						method:"get",
						url:"/VerifyEmail?email="+this.email,
						
					})
					.then(res=>{
						if(res.data.Code==0){
							this.reSus=true
							document.getElementsByTagName('body')[0].setAttribute('style', 'position:fixed; width:100%;')
						}else if(res.data.Code==1){
							this.wrongemail=true
							this.wroemail=true
							this.emailFont="邮箱不存在"
						}
					})
					.catch(error=>{
						console.log(error)
					})
				}
				
				
			},
			//点击弹窗上的确定按钮
			closeM(){
				this.reSus=false
				document.getElementsByTagName('body')[0].setAttribute('style', 'position:relative;')
			},
			// 通过手机找回点击确认按钮
			cliTel(){
				if(this.ishas==true){
					this.$axios({
						method:"get",
						url:"/VerifyPhone?phone="+this.tel,
					})
					.then(res=>{
						if(res.data.Code==-1){
							// 手机号不存在
							this.wrongTel=true
							this.wroinp=true
							this.telFont="手机号不存在"

						}else if(res.data.Code==0){
							// 手机号存在
							this.$axios({
								method:"get",
								url:"/FindPwdByPhone?phone="+this.tel+"&code="+this.veri,
								
							})
							.then(res=>{
								if(res.data.Code==-1){
									this.wrongVeri=true
									this.wroveri=true
									this.veriFont="验证码不正确"
								}else if(res.data.Code==0){
									this.$router.push({path:'/setTcode',query:{tel:this.tel}})
								}
							})
							.catch(error=>{
								console.log(error)
							})
						}
					})
					.catch(error=>{
						console.log(error)
					})

					
				}
			}
		},
		created(){

		}
	}
</script>



<style scoped>
*{
	margin:0;
	padding:0;
	list-style: none;
	text-decoration: none;
}

.box{
	width: 1200px;
	margin:0 auto;
	min-height: 770px;
	clear: both;
}
.left,.right{
	display: inline-block;
}
.left{
	float: left;
	margin-left: 140px;
	margin-top: 130px;
}
.left,.left img{
	width: 528px;
	height: 528px;
}
.right{
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
.right .logintit{
	font-family: SourceHanSansCN-Medium;
	font-size: 18px;
	color: #222222;
	text-align: center;
	margin-top: 44px;
}
.right ul{
	margin-left: 38px;
	margin-top: 30px;
}
.right ul li{
	height: 33px;
	padding: 0 7px;
	line-height: 33px;
	font-family: SourceHanSansCN-Regular;
	font-size: 14px;
	color: #888888;
	display: inline-block;
	text-align: center;
}
.right ul li:hover{
	cursor: pointer;
}
.selected{
	font-family: SourceHanSansCN-Medium!important;
	color: #222222!important;
	border-bottom: 1px solid #009bef!important;
}
.right ul{
	width: 306px;
	border-bottom:1px solid #f2f2f2;
}
.right ul li:last-child{
	margin-left: 20px;
}
.emailDiv,.telDiv{
	width: 306px;
    margin: 0 auto;
}
.right .emailDiv .emailInp{
	height: 42px;
    border-radius: 4px;
    border: solid 1px #f2f2f2;
    margin-top: 70px;
}
.right .emailDiv .emailInp input,
.right .telDiv>div p input{
	width: 250px;
    padding-left: 10px;
    outline: none;
    border: none;
    margin-top: 12px;
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    color: #222222;
}
.right .telDiv>div p:first-child input{
	width: 210px;
}
.right .telDiv>div p:first-child span,
.right .telDiv>div p:first-child button{
	width: 84px;
    height: 42px;
    background-color: #dfdfdf;
    border-radius: 0px 4px 4px 0px;
    display: inline-block;
    float: right;
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    color: #ffffff!important;
    line-height: 42px;
    text-align: center;
    border:none;
}
.right .emailDiv .emailInp input::placeholder,
.right .telDiv>div p input::placeholder{
	font-family: SourceHanSansCN-Normal;
	font-size: 14px;
	color: #bfbfbf;
}
.right .telDiv>div{
	height: 60px;
	margin-top: 40px;
}
.right .telDiv>div:first-child{
	margin-top: 60px;
}
.right .telDiv>div p:first-child{
	width: 306px;
	height: 42px;
	border-radius: 4px;
	border: solid 1px #f2f2f2;
}
.right .telDiv>div p.wrongTel,
.right .telDiv>div p.wrongVeri{
	font-family: SourceHanSansCN-Normal;
	font-size: 12px;
	color: #f50202;
}
.focInp{
	border:solid 1px #009bef!important;
}
.focInp input{
	color: #009bef!important;
}
.wroInp{
	border:solid 1px #f50202!important;
}
.nokong{
	background-color: #009bef!important;
}
.right .emailDiv .wrongemail{
	font-family: SourceHanSansCN-Normal;
    font-size: 12px;
    color: #f50202;
}

    
.right>div .loginBtn{
	width: 306px;
	height: 42px;
	line-height: 42px;
	text-align: center;
	margin:0 auto;
	background-color: #dfdfdf;
	border-radius: 4px;
	font-family: SourceHanSansCN-Normal;
	font-size: 16px;
	color: #ffffff;
}
.right>div .loginBtn a{
	width: 100%;
	height: 100%;
	display: inline-block;
	font-family: SourceHanSansCN-Normal;
	font-size: 16px;
	color: #ffffff;
}
.right>div.telDiv .loginBtn{
	margin-top: 60px;
}
.right .emailDiv .loginBtn{
	margin-top: 70px;
}
/*注册成功弹窗*/
.maskR{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
	position: absolute;
	top:0;
	left:0;
	z-index: 99;
}
.maskR .conDiv{
	width: 400px;
	height: 300px;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 10px;
	margin-top: 200px;
	text-align: center;
	border-top:1px solid transparent;
}
.maskR .conDiv .icon img{
	width: 50px;
	height: 50px;
	margin-top: 40px;
}
.maskR .conDiv .font{
	width: 253px;
	margin:0 auto;
	text-align: center;
	font-family: SourceHanSansCN-Normal;
	font-size: 18px;
	color: #222222;
	margin-top: 28px;
}
.maskR .conDiv .btn{
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
</style>