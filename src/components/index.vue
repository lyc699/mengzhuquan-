<template>
    <div class="indexContainer">
		<!-- <img src="static/images/index/active.png" alt="" class="active" @click="toSign"> -->
		<div class="newsFlash box advTip" v-if="advList.length">
	    	<img src="static/images/index/Home_Microphone_News@2x.png" style="width:15px"/>
	    	<div class="flex-1">
	    		<ul :class="marquee_left">
		    		<li v-for="(item, index) in advList" :key="index" @click.stop="toAdv(item)">
		    			"<i>{{item.advertiseName}}</i>"{{item.advertiseDocument}}
		    		</li>
		    	</ul>
	    	</div>
	    </div>
    	<scroller style="top: 0" :on-refresh="refresh" :on-infinite="infinite">
		<swiper :class="advList.length?'mt30':''" :list="bannerList" loop auto :aspect-ratio="160/375" :show-desc-mask="false" :show-dots="false" :index="currentIndex" @click.native="hasUrl()"  @on-index-change="onIndexChange"></swiper>
	    <div class="newsFlash box">
	    	<img src="static/images/index/Home_Title_News@2x.png" />
	    	<div class="flex-1">
	    		<ul :class="marquee">
		    		<li v-for="(item, index) in newsList" :key="index" @click="toDetail(item.prodNo)">
		    			"<i>{{item.name}}</i>"{{item.message}}
		    		</li>
		    	</ul>
	    	</div>
	    </div>
	    <article>
	    	<p class="box">
	    		<router-link tag="span" class="flex-1" :to="{path:'newMouth',query:{tag:'新口子'}}"><img src="static/images/index/Home_Img_NewEntrance@2x1.png" /></router-link>
	    		<span class="flex-1" @click="toVip"><img src="static/images/index/Home_Img_CreditCard@2x1.png" /></span>
	    	</p>
	    	<h3><img src="static/images/index/Home_Title_HotRecommend@2x.png" /><router-link :to="{path:'newMouth'}" class="right" tag="span">更多&gt;</router-link></h3>
	    	<div v-for="(item, index) in recProList" :key="index" @click="toDetail(item.prodNo)">
	    		<p class="box">
	    			<img :src="item.prodPicUrl" />
	    			<label class="flex-4">
						<b>{{item.prodName}}<span v-for="(item1, index) in item.prodTag" :key="index" :style="{'backgroundColor':item1.backgroundColor?item1.backgroundColor:'#fff','borderColor':item1.borderColor?item1.borderColor:'#adb2b9','fontColor':item1.fontColor?item1.fontColor:'#000'}">{{item1.keywordDocument}}</span></b>
	    				<span>{{item.slogan}}</span>
	    			</label>
	    		</p>
    			<p class="box">
    				<span>
	    				<i>最高额度</i>
	    				<strong>{{item.maxLoanLimit}}<span>额度(元)</span></strong>
	    			</span>
    				<span class="flex-1">
	    				<i>日利率</i>
	    				<span><b>{{item.loanRate}}%</b></span>
	    			</span>
	    			<span>
	    				<i class="btn_bg" @click.self.stop="sendApply(item.othVisitUrl,item.prodNo,item.prodName)">立即申请</i>
	    				<span>已有<i>{{item.succApplyNum}}</i>人申请</span>
	    			</span>
    			</p>
    		</div>
	    </article>
	    <p class="noData" v-if="noData">暂无更多数据</p>
	    </scroller>
	     <div v-transfer-dom class="noWhite">
			<x-dialog v-model="inviteView" class="dialog-demo">
			    <div class="inviteBox text-center">
		      		<img :src="dialogSrc" style="border-radius:5px"/>
		      		<span @click="invite">立即拿钱</span>
		      	</div>
			    <div class="closeBtn">
		        	<img src="static/images/index/close.png" @click="inviteView=false" />
		        </div>
			</x-dialog>
		</div>
    </div>
</template>

<script>
import { Swiper, TransferDom, XDialog } from 'vux'
import { ChannelCode, getQueryString, recordScan, isWeiXin} from './common/common.js'
import { getPhoneType } from '../assets/js/dll.js'
import {GetShare} from "./common/mixin/GetShare"

export default {
	directives: {
		TransferDom
	},
	components: {
	    Swiper,
	    XDialog
	},
 	data () {
	    return {
	        bannerList: [],
			marquee: "",
			marquee_left:'',
			newsList: [],
			advList:[],
			hasData: false,
        	noData: false,
			recProJson:{
				pageNo: 1,//当前页码
				pageSize: 5,//当前页显示条数
				prodTwoType: '',//现金贷
				prodTag:'',
				firstRecommend:'13900001'//是否是首页产品13900001：是，13900002：否
			},
			recProList: [],
			recordJson: {
				ip: localStorage.ip,
                phoneNo: '',
                prodNo: "0001",
                prodName: "page_Home",
                pageId: "index",
                opType: "42100003",//产品列表PV:42100003
        		sourceType: SOURCE_TYPE,  //表示微信
                chanNo: '',
				inviteCode: '',
				userSource: USER_SOURCE,
                appType: APP_TYPE1,
			},
			inviteView: false,
			toBannerUrl: false,//点击banner是否提示登录
			activeIndexArr:[],// 链接的第三方地址数组
			currentIndex:0,
			dialogSrc:''
	    }
	 },
	mixins:[ChannelCode, GetShare],
	beforeRouteLeave(to, from, next){
		this.$store.commit('checkShowToast', false)
		next()
	},
 	created() {
		 //判断是否是第三方回来
		if(localStorage.isCrossOrigin){
			this.inviteView = false
			this.$store.commit('checkShowToast', false)
			localStorage.removeItem('isCrossOrigin')
		}
		//判断是否来自APP
		if(this.$route.query.sourceType){
			this.fromApp()
		}
		//如果有电话号码则自动登录
		if(getQueryString("phoneNo") || this.$route.query.phoneNo){
			this.getChannel().then(()=>{
				this.autoLogin()
			})    
		}	
		// //如果是"有钱365"
		// if(localStorage.mChanNo === '46300006'){
		// 	global.SEND_APP = '41800026'//有钱365
		// }	
		//判断是否有邀请码
		if(this.$route.query.qrCode){
			localStorage.setItem("qrCode",this.$route.query.qrCode)
		}
		this.init()
	},
	mounted(){
		//微信分享配置
		 if(isWeiXin()){
			 let data = null
			 if(localStorage.mChanNo === '46300006'){
				 data = {
					 link: location.href,
					 title: '让你天天有钱花',
					 desc: '贷款神器，一键申请，5分钟到账20000元',
					 imgUrl: `${SHARE_URL}/static/images/yq365.png`
				 }
			 }else{
				  data = {
					 link: location.href,
					 title: '盟主挥挥手，钱钱马上有',
					 desc: '超多额度，5分钟到账50000元，速来！',
					 imgUrl: `${SHARE_URL}/static/images/meng.png`
				 }
			 }
			 this.getSignature(data) 
		 }  
	},
    methods: {
		/*
		* 初始化页面
		*/
		init(){
			this.recordJson.phoneNo = this.$route.query.phoneNo || localStorage.phoneNo;
			this.recordJson.inviteCode = localStorage.qrCode;
			this.recordJson.chanNo = this.$route.query.mChanNo || localStorage.mChanNo;
			
			this.getBanner() //获取banner
			this.getNews() //获取快讯	
			this.getRecProList()	
			this.getDialog()//获取弹窗
			this.getAdv()//获取顶部	
			
		},
    	// 获取轮播图
    	getBanner() {
			let data = {
				params:{
					adType:'41500001',
					status:'13900001',
					applyApp:'30500008'
				}
			}
    		this.$axios.post(this.$api.queryAdvertiseInfo,data)
    		.then(response => {				
    			if(response.code === "0000") {
					let result = response.result
    				if(result){
    					let bannerArr = []
	    				for (var i = 0; i < result.length; i++) {
							let bannerObj = {
								url: result[i].adUrl,
								img: result[i].pictureUrl,
								prodNo: result[i].advertiseNo,
								prodName: result[i].advertiseName
							}
							if(result[i].adUrl && result[i].adUrl.length > 0) {
								this.activeIndexArr.push(i)
							}
							if(localStorage.getItem("phoneNo")){
								if(result[i].adUrl === RECOMMEND_URL){//如果是活动链接并且登录了
									bannerObj.url = result[i].adUrl + `?phoneNo=${localStorage.getItem("phoneNo")}&sourceType=26600005&token=${localStorage.getItem("token")}`	
								}
							}
							else{
								if(result[i].adUrl === RECOMMEND_URL){//如果是活动链接没有登录了
									bannerObj.url = ''
									this.toBannerUrl = true
								}
							}
                    		bannerArr.push(bannerObj)
						  }
						this.bannerList = bannerArr
    				}
    			}else{
    				if(response.msg){
    					this.$vux.toast.text(response.msg)
    				}
    			}
    		})
    		.catch(function(response){

    		})
    	},
		//获取首推弹窗信息
		getDialog(){
			let data = {
				params:{
					adType:'41500002',
					status:'13900001',
					applyApp:'30500008'
				}
			}
    		this.$axios.post(this.$api.queryAdvertiseInfo,data)
    		.then(response => {				
    			if(response.code === "0000") {
					if(response.result.length){
						this.inviteView = this.$store.getters.getCheckShowToast
						this.dialogSrc = response.result[Math.floor(Math.random()*response.result.length)].pictureUrl
					}
				}
			})
		},
    	// 获取快讯信息
    	getNews() {
			setInterval(this.showMarquee, 3000)
    		this.$axios.post(this.$api.getActualAD, {})
    		.then(response => {
				this.recordJson.ip = localStorage.ip
				this.countApply()//统计
    			if(response.code === "0000") {
    				this.newsList = response.result
    			}else{
    				if(response.msg){
    					this.$vux.toast.text(response.msg)
    				}
    			}
    		})
    		.catch(function(response){

    		})
    	},
    	// 快讯信息滚动
    	showMarquee() {
            this.marquee = "marquee_top"
            setTimeout(() => {
                this.newsList.push(this.newsList[0]);
	            this.newsList.shift()
	            this.marquee = ""
        	},1000)
		},
		//获取顶部广告
		getAdv(){
			let data = {
				params:{
					adType:'41500003',
					status:'13900001',
					applyApp:'30500008'
				}
			}
			setInterval(this.showMarquee1, 3000)
			this.$axios.post(this.$api.queryAdvertiseInfo,data)
			.then(response => {				
				if(response.code === "0000") {
					this.advList = response.result
				}else{
					this.$vux.toast.text(response.msg)
				}
			})
		},
		// 顶部信息滚动
    	showMarquee1() {
            this.marquee_left = "marquee_left"
            setTimeout(() => {
                this.advList.push(this.advList[0]);
	            this.advList.shift()
	            this.marquee_left = ""
        	},1000)
		},
        //下拉刷新
        refresh (done) {
	        setTimeout(() => {
		    	this.getRecProList()
	            done()
	        }, 1500)
	    },
	    //上拉加载
	    infinite (done) {
	    	if(!this.hasData){
	    		done()
	    		return
	    	}
	        setTimeout(() => {
		    	this.recProJson.pageNo++
			    this.$axios.post(this.$api.productList, {params: this.recProJson})
	    		.then(response => {
	    			if(response.code === "0000") {
	    				let data = response.result
	    				done()
	    				if(data.length == 0){
	    					this.hasData = false
	    					this.noData = true
						}
						for(let i=0;i<data.length;i++){
							this.recProList.push(data[i])
						}
	    			}else{
	    				if(response.msg){
	    					this.$vux.toast.text(response.msg)
	    				}
	    			}
	    		})
	    		.catch(function(response){

	    		})
	        }, 1500)
	    },
        // 获取推荐产品列表
        getRecProList() {
    		this.recProJson.pageNo = 1
    		this.noData = false
    		this.$axios.post(this.$api.productList, {params: this.recProJson})
    		.then(response => {
    			if(response.code === "0000") {
    				let data = response.result
    				if(data.length > 0){
    					this.hasData = true
    				}
    				this.recProList = data
    			}else{
    				if(response.msg){
    					this.$vux.toast.text(response.msg)
    				}
    			}
    		})
    		.catch(function(response){

    		})
    	},
		// 跳转vip
        toVip(){
        	let that = this
          	// if(!localStorage.getItem("phoneNo")){
			//  	that.$vux.toast.show({
			//  		text: "请登录!",
			//  		onHide() {
			//  			if(that.$store.state.sourceType === "app"){
			//  				var phonetype = getPhoneType();
			//                 if (phonetype == "android") {
			//                     myObj.goLogin("");
			//                 } else {
			//                     window.webkit.messageHandlers.goLogin.postMessage({body:""});
			//                 }
			//  			}else{
			//  				that.$router.push({"path": "/login"})
			//  			}
			//  		}
			//  	})
			// }else{
				// that.recordJson.opType = '42100006',//招财猫VIP页面PV：42100006
				// that.recordJson. prodName = 'vip',
				// that.countApply()
				// that.$router.push({"path": "/vip"})
			// }
			that.recordJson.opType = '42100003',//招财猫VIP页面PV：42100006
			that.recordJson. prodName = 'XYK',
			that.recordJson. pageId = 'xyk_index',
			that.countApply()
			that.$router.push({"path": "/xjd"})
        },
        // 跳转产品详情页面
        toDetail(prodNo){
			let that = this
			if(!localStorage.getItem("phoneNo")){
				that.$vux.toast.show({
					text: "请登录!",
					onHide() {
						if(that.$store.state.sourceType === "app"){
			 				var phonetype = getPhoneType();
			                if (phonetype == "android") {
			                    myObj.goLogin("");
			                } else {
			                    window.webkit.messageHandlers.goLogin.postMessage({body:""});
			                }
			 			}else{
			 				that.$router.push({"path": "/login"})
			 			}
					}
				});
				return false
			}
			that.$router.push({path: '/productDetail', query: {prodNo: prodNo}})
		},
		// 顶部广告跳转
		toAdv(item){
			let that = this
			that.recordJson.opType = '42100007'//顶部广告
			that.recordJson.prodNo = item.advertiseNo
			that.recordJson.prodName = item.advertiseName
			that.countApply()
			if(item.adUrl === RECOMMEND_URL){//如果是活动链接
				if(!localStorage.getItem("phoneNo")){//如果点击不是顶部广告
					that.$vux.toast.show({
						text: "请登录!",
						onHide() {
							if(that.$store.state.sourceType === "app"){
								var phonetype = getPhoneType();
								if (phonetype == "android") {
									myObj.goLogin("");
								} else {
									window.webkit.messageHandlers.goLogin.postMessage({body:""});
								}
							}else{
								that.$router.push({"path": "/login"})
							}
						}
					});
					return false
				}
				localStorage.setItem("isCrossOrigin",true)
				window.location.href = item.adUrl + `?phoneNo=${localStorage.getItem("phoneNo")}&sourceType=26600005&token=${localStorage.getItem("token")}`	
			}else{
				localStorage.setItem("isCrossOrigin",true)
				window.location.href = item.adUrl
			}
		},
		/*
		* 统计浏览量
		*/
        countApply(recordJson){
	    	recordScan(this.$api.record, recordJson?recordJson:this.recordJson)//统计
		},
		/*
		* 来自客户端的处理
		*/
		fromApp(){
			localStorage.setItem("phoneNo",this.$route.query.phoneNo)
			localStorage.setItem("qrCode",this.$route.query.qrCode)
			if(this.$route.query.sourceType === 'app'){
				this.$store.commit('checkSourceType', 'app')
				this.$store.commit('showFooter', false)
			}
		},
		/*
		* url里有手机号自动登录
		*/
		autoLogin(){
			let data = {
				phoneNo: getQueryString("phoneNo") || this.$route.query.phoneNo,
				chanNo: localStorage.mChanNo,//渠道编号
				appType: APP_TYPE1,
				lastLoginIp: localStorage.ip,
                regIpAddress: localStorage.ip
			}
			this.$axios.post(this.$api.autoLogin, {params: data})
    		.then(response => {
				if(response.code === "0000") {
    				localStorage.setItem("phoneNo", data.phoneNo)
					localStorage.setItem("token", response.result.receToken);
					this.getBanner()//解决异步返回token的问题
    			}else{
					this.$vux.toast.text(response.msg)
    			}
				
    		})
    		.catch(function(response){

    		})
		},
		/**************************
		需求申请日期:2018-07-25
		函数描述:跳转邀请好友活动页面
		功能描述:立即邀请
		人员：yyp（姓名简称）
		**************************/
		invite() {
			if(localStorage.getItem("phoneNo")){
				let invPhoneNo = localStorage.getItem("phoneNo")
				this.inviteView = false
				localStorage.setItem("isCrossOrigin",true)
				let data = {
					params:{
						adType:'41500002',
						status:'13900001',
						applyApp:'30500008'
					}
				}
				this.$axios.post(this.$api.queryAdvertiseInfo,data)
				.then(response => {
					if(response.code === "0000") {
						if(response.result.length){
							this.recordJson.pageId = "productDetail",
							this.recordJson.prodNo = response.result[0].advertiseNo,
							this.recordJson.prodName = response.result[0].advertiseName,
							this.recordJson.opType = "42100009",//招财猫弹窗广告PV：42100009；
							this.countApply()
							window.location.href = response.result[0].adUrl
						}else{
							this.inviteView = false
							localStorage.setItem("isCrossOrigin",true)
						}
					}else{
						this.$vux.toast.text(response.msg)
					}
				})
			}else{
				let that = this
				that.$vux.toast.show({
					text: "请登录!",
					onHide() {
						if(that.$store.state.sourceType === "app"){
							var phonetype = getPhoneType();
							if (phonetype == "android") {
								myObj.goLogin("");
							} else {
								window.webkit.messageHandlers.goLogin.postMessage({body:""});
							}
						}else{
							that.$router.push({"path": "/login"})
						}
					}
				});
			}
		},
		/*
		* 根据登录状况对banner的url进行操作
		*/
		hasUrl() {
			if(this.toBannerUrl){
				let that = this
				that.$vux.toast.show({
					text: "请登录!",
					onHide() {
						if(that.$store.state.sourceType === "app"){
							var phonetype = getPhoneType();
							if (phonetype == "android") {
								myObj.goLogin("");
							} else {
								window.webkit.messageHandlers.goLogin.postMessage({body:""});
							}
						}else{
							that.$router.push({"path": "/login"})
						}
					}
				});
			}else{
				this.recordJson.opType = '42100004',// 招财猫Banner广告PV
				this.recordJson.prodNo = this.bannerList[this.currentIndex].prodNo,
				this.recordJson.prodName = this.bannerList[this.currentIndex].prodName,
				this.countApply()
				if(this.activeIndexArr.indexOf(this.currentIndex) !== -1 ){
					localStorage.setItem("isCrossOrigin",true)
				}
			}
		},
		/*
		* 获取当前banner是第几个
		*/
		onIndexChange(index){
      		this.currentIndex = index
		},
		/*
		* 是否跳转签到页面
		*/
		toSign(){
			let that = this;
			if(!localStorage.phoneNo){
				that.$vux.toast.show({
					text: "请登录!",
					onHide() {
						if(that.$store.state.sourceType === "app"){
							var phonetype = getPhoneType();
							if (phonetype == "android") {
								myObj.goLogin("");
							} else {
								window.webkit.messageHandlers.goLogin.postMessage({body:""});
							}
						}else{
							that.$router.push({"path": "/login"})
						}
					}
				});
			}else{
				that.$router.push({"path": "/sign"})
			}
		},
		//立即申请按钮
		sendApply(url,prodNo,prodName){

			let that = this
          	if(!localStorage.phoneNo){
			 	that.$vux.toast.show({
			 		text: "请登录!",
			 		onHide() {
			 			if(that.$store.state.sourceType === "app"){
			 				var phonetype = getPhoneType();
			                if (phonetype == "android") {
			                    myObj.goLogin("");
			                } else {
			                    window.webkit.messageHandlers.goLogin.postMessage({body:""});
			                }
			 			}else{
			 				that.$router.push({"path": "/login"})
			 			}
			 		}
			 	})
			}else{
				let recordJson = {
					ip: localStorage.getItem("ip"),
					phoneNo: localStorage.getItem("phoneNo"),
					prodNo: prodNo,
					pageId: "productDetail",
					opType: "42100002",//42100002：产品功能UV
					sourceType: SOURCE_TYPE,  //表示微信
					chanNo: localStorage.getItem("mChanNo"),
					inviteCode: localStorage.getItem("qrCode"),
					prodName: prodName,
					appType: APP_TYPE1,
					userSource: USER_SOURCE
				}
				this.countApply(recordJson)
				this.$axios.post(this.$api.updateApplyNums,{params:{prodNo}})
				.then(response => {
					localStorage.setItem("isCrossOrigin",true)
					window.location.href = url
				})
			}
		}
    }
}
</script>

<style>
</style>
