<template>
	<div id="mineleft">
		<!-- 左导航 -->
		<div class="left">
		
			<div>
                <router-link to="/message" class="noactive" active-class="checkleft">
                  <span class="iconicon-test14"></span>
                  <span>消息中心</span>
                </router-link>
            </div>	
            <div>
                <router-link to="/setting" class="noactive" active-class="checkleft">
                  <span class="iconicon-test13"></span>
                  <span>账户设置</span>
                </router-link>
            </div>	
		</div>
	</div>


</template>


<script>
	export default{
		name: 'mineleft',
  		components: {},

		data(){
			return{
				isSelectm:'',
				msgImg:0,
				
			}
		},
		created(){
			// console.log(this.isSelectm)
			this.$emit('mineLeft','')
			// this.isSelectm=""
		},
		methods:{
		
		}
	}


</script>



<style scoped>
*{
	list-style: none;
	text-decoration: none;
}
#mineleft{
	width: 190px;
	height: 690px;
	background-color: #ffffff;
	/*margin-top: 30px;*/
}

.left{
	width: 100%;
	float: left;
}
.left>div{
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	/*margin-top: 7px;*/
	margin-top: 20px;
	cursor: pointer;
	font-size: 14px;
	color: #222;
}
.left>div:first-child{
	margin-top: 17px;
	/*margin-top: 60px;*/
}
.left>div a{
	width: 100%;
	height: 100%;
	display: inline-block;
}
.left .noactive{
	font-size: 14px;
	color: #222;
}
.left>div a:link,
.left>div a:active{
	text-decoration: none;
}
.left div span:first-child{
	 font-family: "iconfont" !important;
	 margin-right: 5px;
}

.checkleft{
	color: #009bef!important;
	background-color: #e4f3fe;
}

	.selected p{
	    color: #009bef!important;
	}

</style>