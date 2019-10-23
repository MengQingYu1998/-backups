<template>
	<div class="box">
		<div class="left">
			<img src="../assets/NumImg/loginImg.png"/>
		</div>
		<div class="right">
			<p class="logintit">设置新密码</p>
			<div class="telDiv" >
				<div>
					<p class="codeInp" :class="{'focInp':focCode,'wroInp':wrocode}">
						<input type="password" placeholder="新密码" @blur="blurCode(codeval)"  @focus="focusCode()"  v-model="codeval" @keyup="nullInput()"/>
					</p>
					<p class="wrongCode" v-show="wrongCode" v-html="codeFont"></p>
				</div>
				<div>
					<p class="codeInp" :class="{'focInp':focsCode,'wroInp':wroscode}">
						<input type="password" placeholder="确认新密码" @blur="blurCodes(codesval)"  @focus="focusCodes()"  v-model="codesval" @keyup="nullInput()" />
					</p>
					<p class="wrongCode" v-show="wrongsCode" v-html="scodeFont"></p>
				</div>
				<div class="loginBtn" :class="{'nokong':ishas}" @click="cliSure()">确认</div>
			</div>
			
			
		</div>


	</div>
</template>


<script>
	export default{
		data(){
			return{
				ishas:false,//输入框是否为空
				focCode:false,//密码输入框获取焦点边框变色
				focsCode:false,//确认密码输入框获取焦点边框变色
				wrongCode:false,//是否提示密码错误
				wrongsCode:false,//是否提示确认密码错误
				codeFont:'密码不能为空',//密码提示内容
				scodeFont:'确认密码不能为空',//确认密码提示内容
				wrocode:false,//密码错误边框变色
				wroscode:false,//确认密码错误边框变色
				tel:'',
			}
		},
		methods:{
			
			nullInput(){
				if(this.codeval.length>=1&&this.codesval.length>=1){
					this.ishas=true
				}
			},
			// 密码
			focusCode(){
				this.focCode=true
				this.wrongCode=false
				this.wrocode=false
			},
			blurCode(codeval){
				this.focCode=false
				this.code=codeval
				var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,15}$/
				if(this.codeval==undefined){
					this.wrongCode=true
					this.wrocode=true
					return false;
				}else if(!reg.test(this.codeval)){
					this.wrongCode=true
					this.wrocode=true
					this.codeFont="密码至少包含数字、字母、特殊符号中的两种"
					return false;
				}
			},
			// 确认密码
			focusCodes(){
				this.focsCode=true
				this.wrongsCode=false
				this.wroscode=false
			},
			blurCodes(codesval){
				this.focsCode=false
				if(this.codesval==undefined){
					this.wrongsCode=true
					this.wroscode=true
					return false;
				}else if(codesval!=this.code){
					this.wrongsCode=true
					this.wroscode=true
					this.scodeFont="确认密码必须与密码保持一致"
					return false;
				}
			},
			// 点击确认
			cliSure(){
				if(this.ishas==true){
					// 设置新密码接口
					this.$axios({
						method:'post',
						url:'/NewPasswordSetting',
						data:{
							phone:this.tel,
							passwordNew:this.code,
						}
					})
					.then(res=>{
						if(res.data.Code==0){
							this.$router.push({path:'/login'})
						}
					})
					.catch(error=>{
						console.log(error)
					})
				}
			}
		},
		created(){
			// 获取上一页传过来的参数tel,并赋值
			this.tel=this.$route.query.tel
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
	/*font-family: SourceHanSansCN-Medium;*/
	font-weight: 600;
	font-size: 18px;
	color: #222222;
	text-align: center;
	margin-top: 44px;
}

.telDiv{
	width: 306px;
    margin: 0 auto;
}

.right .telDiv>div p input{
	width: 250px;
    padding-left: 10px;
    outline: none;
    border: none;
    margin-top: 12px;
    /*font-family: SourceHanSansCN-Normal;*/
    font-size: 14px;
    color: #222222;
}
.right .telDiv>div p:first-child input{
	width: 210px;
}
.right .telDiv>div p:first-child span{
	width: 84px;
    height: 42px;
    background-color: #dfdfdf;
    border-radius: 0px 4px 4px 0px;
    display: inline-block;
    float: right;
    /*font-family: SourceHanSansCN-Normal;*/
    font-size: 14px;
    color: #ffffff;
    line-height: 42px;
    text-align: center;
}

.right .telDiv>div p input::placeholder{
	/*font-family: SourceHanSansCN-Normal;*/
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
.right .telDiv>div p.wrongCode{
	/*font-family: SourceHanSansCN-Normal;*/
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

    
.right>div .loginBtn{
	width: 306px;
	height: 42px;
	line-height: 42px;
	text-align: center;
	margin:0 auto;
	background-color: #dfdfdf;
	border-radius: 4px;
	/*font-family: SourceHanSansCN-Normal;*/
	font-size: 16px;
	color: #ffffff;
}
.right>div.telDiv .loginBtn{
	margin-top: 60px;
}

</style>