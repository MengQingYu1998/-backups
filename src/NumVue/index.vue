<template>
	<div class="index" id="index">
		<div class="content" >
			<div class="block">
			    <el-carousel>
			      <el-carousel-item v-for="(item,index) in items" :key="index">
			        <img :src="item.img"/>
			      </el-carousel-item>
			    </el-carousel>
			</div>
			<div class="des">
				<p>每日快讯</p>
				<div>
					<img src="../assets/NumImg/5.jpg"/>
					<p class="titindex">最前线 | 可折叠iPhone或将在2021年发布的哈哈哈哈哈哈</p>
					<p class="des">CNBC报道称，瑞银分析师认为苹果公司的第一款可
折叠产品最快可能会在明年问世，不过2021年更...</p>
				</div>
				<div>
					<img src="../assets/NumImg/5.jpg"/>
					<p class="titindex">最前线 | 可折叠iPhone或将在2021年发布的哈哈哈哈哈哈</p>
					<p class="des">CNBC报道称，瑞银分析师认为苹果公司的第一款可
折叠产品最快可能会在明年问世，不过2021年更...</p>
				</div>
				<div>
					<img src="../assets/NumImg/5.jpg"/>
					<p class="titindex">最前线 | 可折叠iPhone或将在2021年发布的哈哈哈哈哈哈</p>
					<p class="des">CNBC报道称，瑞银分析师认为苹果公司的第一款可
折叠产品最快可能会在明年问世，不过2021年更...</p>
				</div>
				<p class="moreNew">更多新闻</p>
			</div>
		</div>
		
	</div>

</template>

 

<script>
	export default{
		data(){
			return{
				items:[
					{img:require('../assets/NumImg/1.jpg')},
					{img:require('../assets/NumImg/2.jpg')},
					{img:require('../assets/NumImg/3.jpg')},
					{img:require('../assets/NumImg/4.jpg')}
				]
			}
		},
		created(){
			//防止页面后退

			history.pushState(null, null, document.URL);
			window.addEventListener('popstate', function () {
			history.pushState(null, null, document.URL);
			});
			
			if(location.href.indexOf("#reloaded")==-1){
		        location.href=location.href+"#reloaded";
		        location.reload();
		    }
		}
	}


</script>

<style scoped>
*{
	margin:0;
	padding: 0;
	list-style: none;
	text-decoration: none;
}
.content{
	width: 100%!important;
	margin:0 auto;
	min-height: 600px;
}
.content>.des{
	width: 1200px;
	margin:0 auto;
	margin-top: 80px;
}
.content>.des p{
	/*font-family: SourceHanSansCN-Medium;*/
	font-weight: 600;
	font-size: 24px;
	color: #222222;
}
.content>.des p.moreNew{
	width: 90px;
	height: 36px;
	line-height: 36px;
	border-radius: 4px;
	border: solid 1px #009bef;
	/*font-family: SourceHanSansCN-Regular;*/
	font-size: 16px;
	color: #009bef;
	margin:0 auto;
	margin-top: 60px;
	margin-bottom: 80px;
}
.content>.des>div{
	width: 360px;
	height: 290px;
	background-color: #ffffff;
	box-shadow: 0px 0px 30px 0px 
		rgba(0, 0, 0, 0.05);
	border-radius: 10px;
	display: inline-block;
	margin-left: 36px;
	margin-top: 40px;
	/*border: 1px solid red;*/
}
.content>.des>div:first-child{
	margin-left: 0;
}
.content>.des>div img{
	width: 360px;
	height: 174px;
	border-radius: 10px 10px 0px 0px;
}
.content>.des>div p.titindex{
	width: 323px;
	/*font-family: SourceHanSansCN-Medium;*/
	font-weight: 600;
	font-size: 16px;
	color: #222222;
	overflow: hidden;    
 	text-overflow: ellipsis; 
 	white-space: nowrap;
 	margin:0 auto;
 	text-align: left;
 	margin-top: 10px;
 	/*border:1px solid red;*/
}
.content>.des>div p.des{
	width: 323px;
	/*font-family: SourceHanSansCN-Normal;*/
	font-size: 14px;
	color: #888888;
	overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin:0 auto;
    text-align: left;
    margin-top: 10px;
    line-height: 20px;
    /*border:1px solid red;*/
}

p{
	text-align: center;
	font-size: 40px;
}
</style>