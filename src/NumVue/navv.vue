<template>
	<div>
		<div class="nav">
			<img src="../assets/NumImg/logo.png" class="logo" />
			<ul>
				<li><router-link :to="{path:'/index'}">首页</router-link></li>
				<li @mouseover="showAppstore()" @mouseout="hideAppstore()">
					<p v-bind:class="{up:isUp}" v-html="appVal"></p>
					<img src="../assets/NumImg/down.png" class="down" v-if="down">
					<img src="../assets/NumImg/shang.png" class="down" v-else>
				</li>
				<li @mouseover="showAso()" @mouseout="hideAso()">
					<p v-bind:class="{up:isUpaso}" v-html="asoVal"></p>
					<img src="../assets/NumImg/down.png" class="down" v-if="downaso">
					<img src="../assets/NumImg/shang.png" class="down" v-else>
				</li>
			</ul>
			
			<div class="searchDiv">
				<img src="../assets/NumImg/pingguo.png" class="ios" />
				<select name="country" class="fastbannerform__country">
			        <option value="ASA" title="AA" >美国</option>
		            <option value="AND" title="AD" >安道尔</option>
		            <option value="ARE" title="AE" >阿拉伯联合酋长国</option>
		            <option value="AFG" title="AF" >阿富汗</option>
		            <option value="ATG" title="AG" >安提瓜和巴布达</option>
		            <option value="ALB" title="AL" >阿尔巴尼亚</option>
		            <option value="ARM" title="AM" >亚美</option>
		            <option value="AGO" title="AO" >安哥拉</option>
		            <option value="ARG" title="AR" >阿根廷</option>
		            <option value="AUT" title="AT" >奥地利</option>
		            <option value="AUS" title="AU" >澳大利亚</option>
		           	<option value="ABW" title="AW" >阿鲁巴</option>
		            <option value="AZE" title="AZ" >阿塞拜疆</option>
		            <option value="BIH" title="BA" >波斯尼亚和黑塞哥维那</option>
		            <option value="BRB" title="BB" >巴巴多斯</option>
		            <option value="BGD" title="BD" >孟加拉</option>
		            <option value="BEL" title="BE" >比利时</option>
		            <option value="BFA" title="BF" >布基纳法索</option>
		            <option value="BGR" title="BG" >保加利亚</option>
		            <option value="BHR" title="BH" >巴林</option>
		            <option value="BDI" title="BI" >布隆迪</option>
		            <option value="BEN" title="BJ" >贝宁</option>
		            <option value="BMU" title="BM" >百慕大</option>
		            <option value="BRN" title="BN" >文莱</option>
		            <option value="BOL" title="BO" >玻利维亚</option>
		            <option value="BRA" title="BR" >巴西</option>
		            <option value="BHS" title="BS" >巴哈马</option>
		            <option value="BTN" title="BT" >不丹</option>
		            <option value="BWA" title="BW" >博茨瓦纳</option>
		            <option value="BLR" title="BY" >白俄罗斯</option>
		            <option value="BLZ" title="BZ" >伯利兹</option>
		            <option value="CAN" title="CA" >加拿大</option>
			        <option value="COD" title="CD" >刚果共和国</option>
			        <option value="CAF" title="CF" >中非</option>
			        <option value="COG" title="CG" >刚果共和国</option>
			        <option value="CHE" title="CH" >瑞士</option>
			        <option value="CHL" title="CL" >智利</option>
			        <option value="CMR" title="CM" >喀麦隆</option>
			        <option value="CHN" title="CN" selected="selected">中国</option>
			        <option value="COL" title="CO" >哥伦比亚</option>
			        <option value="CRI" title="CR" >哥斯达黎加</option>
			        <option value="CUB" title="CU" >古巴</option>
			        <option value="CPV" title="CV" >佛得角</option>
			        <option value="CYP" title="CY" >塞浦路斯</option>
			        <option value="CZE" title="CZ" >捷克共和国</option>
			        <option value="DEU" title="DE" >德国</option>
			        <option value="DJI" title="DJ" >吉布提</option>
			        <option value="DNK" title="DK" >丹麦</option>
			        <option value="DMA" title="DM" >多米尼加</option>
			        <option value="DOM" title="DO" >多米尼加共和国</option>
			        <option value="DZA" title="DZ" >阿尔及利亚</option>
			        <option value="ECU" title="EC" >厄瓜多尔</option>
			        <option value="EST" title="EE" >爱沙尼亚</option>
			        <option value="EGY" title="EG" >埃及</option>
			        <option value="ERI" title="ER" >厄立特里亚</option>
			        <option value="ESP" title="ES" >西班牙</option>
			        <option value="ETH" title="ET" >埃塞俄比亚</option>
			        <option value="FIN" title="FI" >芬兰</option>
			        <option value="FJI" title="FJ" >斐济</option>
			        <option value="FLK" title="FK" >法罗群岛</option>
			        <option value="FSM" title="FM" >马来西亚</option>
			        <option value="FRO" title="FO" >法罗群岛</option>
			        <option value="FRA" title="FR" >法国</option>
			        <option value="GAB" title="GA" >加蓬</option>
			        <option value="GBR" title="GB" >英国</option>
			        <option value="GRD" title="GD" >格林纳达</option>
			        <option value="GEO" title="GE" >格鲁吉亚</option>
			        <option value="GHA" title="GH" >加纳</option>
			        <option value="GIB" title="GI" >直布罗陀</option>
			        <option value="GMB" title="GM" >冈比亚</option>
			        <option value="GIN" title="GN" >几内亚</option>
			        <option value="GNQ" title="GQ" >赤道几内亚</option>
			        <option value="GRC" title="GR" >希腊</option>
			        <option value="GTM" title="GT" >危地马拉</option>
			        <option value="GNB" title="GW" >几内亚比绍</option>
			        <option value="GUY" title="GY" >圭亚那</option>
			        <option value="HKG" title="HK" >香港</option>
			        <option value="HND" title="HN" >洪都拉斯</option>
			        <option value="HRV" title="HR" >克罗地亚</option>
			        <option value="HTI" title="HT" >海地</option>
			        <option value="HUN" title="HU" >匈牙利</option>
			        <option value="IDN" title="ID" >印度尼西亚</option>
			        <option value="IRL" title="IE" >爱尔兰</option>
			        <option value="ISR" title="IL" >以色列</option>
			        <option value="IND" title="IN" >印度</option>
			        <option value="IRQ" title="IQ" >伊拉克</option>
			        <option value="IRN" title="IR" >伊朗</option>
			        <option value="ISL" title="IS" >冰岛</option>
			        <option value="ITA" title="IT" >意大利</option>
			        <option value="JAM" title="JM" >牙买加</option>
			        <option value="JOR" title="JO" >约旦</option>
			        <option value="JPN" title="JP" >日本</option>
			        <option value="KEN" title="KE" >肯尼亚</option>
			        <option value="KGZ" title="KG" >吉尔吉斯斯坦</option>
			        <option value="KHM" title="KH" >柬埔寨</option>
			        <option value="KIR" title="KI" >基里巴斯</option>
			        <option value="COM" title="KM" >科摩罗</option>
			        <option value="KNA" title="KN" >圣基茨和尼维斯</option>
			        <option value="PRK" title="KP" >朝鲜</option>
			        <option value="KOR" title="KR" >韩国</option>
			        <option value="KWT" title="KW" >科威特</option>
			        <option value="CYM" title="KY" >开曼群岛</option>
			        <option value="KAZ" title="KZ" >哈萨克斯坦</option>
			        <option value="LAO" title="LA" >老挝</option>
			        <option value="LBN" title="LB" >黎巴嫩</option>
			        <option value="LCA" title="LC" >圣卢西亚</option>
			        <option value="LIE" title="LI" >列支敦士登</option>
			        <option value="LKA" title="LK" >斯里兰卡</option>
			        <option value="LBR" title="LR" >利比里亚</option>
			        <option value="LSO" title="LS" >莱索托</option>
			        <option value="LTU" title="LT" >立陶宛</option>
			        <option value="LUX" title="LU" >卢森堡</option>
			        <option value="LVA" title="LV" >拉脱维亚</option>
			        <option value="LBY" title="LY" >利比亚</option>
			        <option value="MAR" title="MA" >摩洛哥</option>
			        <option value="MCO" title="MC" >摩纳哥</option>
			        <option value="MDA" title="MD" >摩尔多瓦</option>
			        <option value="MNE" title="ME" >黑山</option>
			        <option value="MDG" title="MG" >马达加斯加</option>
			        <option value="MKD" title="MK" >马其顿</option>
			        <option value="MLI" title="ML" >马里</option>
			        <option value="MMR" title="MM" >缅甸</option>
			        <option value="MNG" title="MN" >蒙古</option>
			        <option value="MAC" title="MO" >澳门</option>
			        <option value="MRT" title="MR" >毛里塔尼亚</option>
			        <option value="MLT" title="MT" >马耳他</option>
			        <option value="MUS" title="MU" >毛里求斯</option>
			        <option value="MDV" title="MV" >马尔代夫</option>
			        <option value="MWI" title="MW" >马拉维</option>
			        <option value="MEX" title="MX" >墨西哥</option>
			        <option value="MYS" title="MY" >马来西亚</option>
			        <option value="MOZ" title="MZ" >莫桑比克</option>
			        <option value="NAM" title="NA" >纳米比亚</option>
			        <option value="NER" title="NE" >尼日尔</option>
			        <option value="NGA" title="NG" >尼日利亚</option>
			        <option value="NIC" title="NI" >尼加拉瓜</option>
			        <option value="NLD" title="NL" >荷兰</option>
			        <option value="NOR" title="NO" >挪威</option>
			        <option value="NPL" title="NP" >尼泊尔</option>
			        <option value="NRU" title="NR" >瑙鲁</option>
			        <option value="NZL" title="NZ" >新西兰</option>
			        <option value="OMN" title="OM" >阿曼</option>
			        <option value="PAN" title="PA" >巴拿马</option>
			        <option value="PER" title="PE" >秘鲁</option>
			        <option value="PNG" title="PG" >巴布亚新几内亚</option>
			        <option value="PHL" title="PH" >菲律宾</option>
			        <option value="PAK" title="PK" >巴基斯坦</option>
			        <option value="POL" title="PL" >波兰</option>
			        <option value="PRI" title="PR" >波多黎各</option>
			        <option value="PSE" title="PS" >巴勒斯坦</option>
			        <option value="PRT" title="PT" >葡萄牙</option>
			        <option value="PLW" title="PW" >帕劳</option>
			        <option value="PRY" title="PY" >巴拉圭</option>
			        <option value="QAT" title="QA" >卡塔尔</option>
			        <option value="ROU" title="RO" >罗马尼亚</option>
			        <option value="SRB" title="RS" >塞尔维亚</option>
			        <option value="RUS" title="RU" >俄罗斯</option>
			        <option value="RWA" title="RW" >卢旺达</option>
			        <option value="SAU" title="SA" >沙特阿拉伯</option>
			        <option value="SLB" title="SB" >所罗门群岛</option>
			        <option value="SYC" title="SC" >塞舌尔</option>
			        <option value="SDN" title="SD" >苏丹</option>
			        <option value="SWE" title="SE" >瑞典</option>
			        <option value="SGP" title="SG" >新加坡</option>
			        <option value="SVN" title="SI" >斯洛文尼亚</option>
			        <option value="SVK" title="SK" >斯洛伐克共和国</option>
			        <option value="SLE" title="SL" >塞拉利昂</option>
			        <option value="SMR" title="SM" >圣马力诺</option>
			        <option value="SEN" title="SN" >塞内加尔</option>
			        <option value="SOM" title="SO" >索马里</option>
			        <option value="SUR" title="SR" >苏里南</option>
			        <option value="STP" title="ST" >圣多美和普林西比</option>
			        <option value="SLV" title="SV" >萨尔瓦多</option>
			        <option value="SYR" title="SY" >叙利亚</option>
			        <option value="SWZ" title="SZ" >斯威士兰</option>
			        <option value="TCD" title="TD" >乍得</option>
			        <option value="TGO" title="TG" >多哥</option>
			        <option value="THA" title="TH" >泰国</option>
			        <option value="TJK" title="TJ" >塔吉克斯坦</option>
			        <option value="TKM" title="TM" >土库曼斯坦</option>
			        <option value="TUN" title="TN" >突尼斯</option>
			        <option value="TON" title="TO" >汤加</option>
			        <option value="TUR" title="TR" >土耳其</option>
			        <option value="TTO" title="TT" >特立尼达和多巴哥</option>
			        <option value="TUV" title="TV" >图瓦卢</option>
			        <option value="TWN" title="TW" >台湾</option>
			        <option value="TZA" title="TZ" >坦桑尼亚</option>
			        <option value="UKR" title="UA" >乌克兰</option>
			        <option value="UGA" title="UG" >乌干达</option>
			        <option value="URY" title="UY" >乌拉圭</option>
			        <option value="UZB" title="UZ" >乌兹别克斯坦</option>
			        <option value="VCT" title="VC" >圣文森特和格林纳丁</option>
			        <option value="VEN" title="VE" >委内瑞拉</option>
			        <option value="VGB" title="VG" >英属维尔京群岛</option>
			        <option value="VNM" title="VN" >越南</option>
			        <option value="VUT" title="VU" >瓦努阿图</option>
			        <option value="WLF" title="WF" >瓦利斯和富图纳</option>
			        <option value="WSM" title="WS" >西萨摩亚</option>
			        <option value="YEM" title="YE" >也门</option>
			        <option value="ZAF" title="ZA" >南非</option>
			        <option value="ZMB" title="ZM" >赞比亚</option>
			        <option value="ZWE" title="ZW" >津巴布韦</option>
			    </select>
			    <input type="text" placeholder="应用名称或APPID" >
			    <p><img src="../assets/NumImg/search.png"/></p>
			</div>
			<div class="denglu"><router-link :to="{ path: '/login'}">登录</router-link></div>
			<div class="zhuce"><router-link :to="{ path: '/register'}">注册</router-link></div>
			<div class="Combox">
			<!-- app store监控下拉框 -->
				<div class="appstore" v-show="appstore" @mouseover="showAppstore()" @mouseout="hideAppstore()">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<p v-for="(app,index) in apps">
							<router-link :to="{path:app.path}">		
								{{app.name}}
							</router-link>
						</p>
					</div>
				</div>
				<div class="aso" v-show="aso" @mouseover="showAso()" @mouseout="hideAso()">
					<img src="../assets/NumImg/jiao.png" class="jiao" />
					<div class="lie">
						<p v-for="aso in asos">{{aso.name}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	

</template>

<script>
	export default{
		data(){
			return{
				appstore:false,
				aso:false,
				down:true,
				downaso:true,
				isUp:false,
				isUpaso:false,
				appVal:'App Store监控',
				asoVal:'ASO优化',
				// app store监控
				apps:[
					{name:'榜单实时排名',path:'/bangdan'},
					{name:'榜单更新监控',path:'/monitor'},
					{name:'排名上升/下降监控',path:'/rank'},
					{name:'App Store上下架监控',path:'/application'},
				],
				// aso优化
				asos:[
					{name:'搜索指数排名'},{name:'实时热搜榜'},
				],
			}
		},
		methods:{
			// 显示app store监控下拉框
			showAppstore(){
				this.appstore=true,
				this.down=false,
				this.isUp=true
			},
			// 隐藏app store监控下拉框
			hideAppstore(){
				this.appstore=false,
				this.down=true,
				this.isUp=false
			},
			// 显示aso监控下拉框
			showAso(){
				this.aso=true,
				this.downaso=false,
				this.isUpaso=true
			},
			// 隐藏aso监控下拉框
			hideAso(){
				this.aso=false,
				this.downaso=true,
				this.isUpaso=false
			},
		}
	}

</script>

<style>
*{
  margin:0;
  padding:0;
  list-style: none;
  text-decoration:none; 
}
.down{
  width: 8px;
  height: 8px;
}
.nav{
  width: 1200px;
  height: 66px;
  margin:0 auto;
}
.nav .logo{
  width: 124px;
  height: 34px;
  float: left;
  margin-top: 16px;
}
.nav ul li{
  float: left;
  line-height: 66px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  color: #222222;
  margin-left: 58px;
}
.nav ul li a{
	font-family: SourceHanSansCN-Regular;
	font-size: 16px;
	color: #222222;
}
.nav ul li:hover,
.nav ul li a:hover{
  color: #009bef!important;
  cursor:pointer;
}
.nav ul li:first-child{
  margin-left: 66px;
}
.nav ul li p{
  display: inline-block;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #222222;
}
.up{
  color: #009bef!important;
}
.nav .searchDiv{
  width: 331px;
  height: 36px;
  float: left;
  margin-left: 150px;
  margin-top: 15px;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.nav .searchDiv>img{
  width: 18px;
  height: 20px;
  margin-top:7px;
  margin-left: 16px;
}
.nav .searchDiv input{
  width: 140px;
  border:none;
  outline: none;
  background-color: transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  color: #bfbfbf;
  vertical-align: text-bottom;
}
.nav .searchDiv>p{
  width: 50px;
  height: 36px;
  background-color: #009bef;
  border-radius: 0px 4px 4px 0px;
  float: right;
  text-align: center;
}
.nav .searchDiv>p img{
  width: 18px;
  height: 18px;
  margin-top: 9px;
}
.nav .denglu,.nav .zhuce{
  font-family: SourceHanSansCN-Regular;
  font-size: 15px;
  width: 70px;
  height: 36px;
  line-height: 37px;
  text-align: center;
  border-radius: 4px;
  float: left;
  margin-top: 15px;
}
.nav .denglu{
  border: solid 1px #009bef;
  color: #009bef;
  margin-left: 30px;
}
.nav .denglu a{
	color: #009bef;
}
.nav .zhuce{
  background-color: #009bef;
  color: #ffffff;
  margin-left: 16px;
}
.nav .zhuce a{
	color: #ffffff;
}
.Combox{
	position: absolute;
	top:41px;
	z-index: 99;
}
.Combox >div .jiao{
	width: 23px;
	height: 12px;
}
.Combox >div{
	display: inline-block;
	text-align: center;
}
.Combox >div.appstore{
	margin-left:245px;
}
.Combox >div.aso{
	margin-left:410px;
}
.Combox >div >div.lie{
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	box-shadow: 0px 0px 4px 0px 
		rgba(0, 0, 0, 0.28);
	border-radius: 4px;
	border-top: 0.013rem solid transparent;
	text-align: left;
	margin-top: -4px;
}
.Combox >div >div p,
.Combox >div >div p a{
	font-family: SourceHanSansCN-Normal;
	font-size: 13px;
	color: #444444;
	margin:0 25px;
	line-height: 30px;
}
.Combox >div >div p a{
	margin: 0;
}
.Combox >div >div p:hover,
.Combox >div >div p a:hover{
	color: #009bef;
	cursor: pointer;
}
.Combox >div >div p:first-child{
	margin-top: 15px;
}
.Combox >div >div p:last-child{
	margin-bottom: 15px;
}
</style>