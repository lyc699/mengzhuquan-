<template>
	<div class="proDetContainer">
	    <div>
	  		<p class="box multiHigh">
				<img :src="productDetData.prodPicUrl" />
				<label class="flex-2">
					<b>{{productDetData.prodName}}</b>
					<span>{{productDetData.slogan}}</span>
					<span>通过率<rater class="ml5" :font-size="15" v-model="productDetData.passRate"></rater></span>
				</label>
			</p>
			<p class="box text-center hasLine">
			  	<label class="flex-1">
			  	  	<span>最高额度</span>
			  	  	<i>{{productDetData.maxLoanLimit}}<span>元</span></i>
			  	</label>
			  	<label class="flex-1">
			  	 	 <span>日利率</span>
			  	 	 <i>{{productDetData.loanRate}}%</i>
			  	</label>
			  	<label class="flex-1">
			  	  	<span>期限</span>
			  	  	<i>{{productDetData.deadlineInterval}}</i>
			  	</label>
			</p>
    
			<article>
			  <p class="applyInput box text-center">
		  	  <label class="flex-1">
	  		    <i>金额</i>
	  		    <span>
	  		    	<x-input placeholder="请输入" type="number" v-model="applyAtm" @on-blur="changeAtm"></x-input>&nbsp;元
	  		    	<!--<input type="text" placeholder="请输入金额" />&nbsp;元-->
	  		    </span>
		  	  </label>
		  	  <label class="flex-1">
	  		    <i>期限</i>
	  		    <span>
	  		    	<!--<popup-picker :data="termList" show-name v-model="selectedTerm" placeholder=""></pop.up-picker>-->
	  		    	<popup-picker :data="termList" v-model="selectedTerm" 
	  		    		placeholder="请选择" value-text-align="center" @on-change="onChange"></popup-picker>
	  		    	<!--<b>12</b>&nbsp;-->
	  		    	<!--<i>月</i>-->
	  		    	<!--<img src="../../../static/images/index/Home_Arrow_Gray_Right@2x.png" />-->
	  		    </span>
		  	  </label>
			  </p>
			  <p class="applyBtn text-center">
			  	  <i>预计还款总额：<b>{{reymentAtm}}</b>元</i>
			  	  <span @click="sendApply(productDetData.othVisitUrl)">立即申请</span>
			  </p>
			  <label>资料认证</label>
			  <ul>
			  	<li class="box">
			  		<img src="static/images/index/ProDetail_Icon_1.png" />
			  		<p class="flex-1">
			  			<label>申请条件</label>
			  			<span>{{productDetData.applyTerms}}</span>
			  		</p>
			  	</li>
			  	<li class="box">
			  		<img src="static/images/index/ProDetail_Icon_1.png" />
			  		<p class="flex-1">
			  			<label>借款流程</label>
			  			<span>{{productDetData.loanFlow}}</span>
			  		</p>
			  	</li>
			  	<li class="box">
			  		<img src="static/images/index/ProDetail_Icon_1.png" />
			  		<p class="flex-1">
			  			<label>产品优势</label>
			  			<span>{{productDetData.prodAdvantage}}</span>
			  		</p>
			  	</li>
			  </ul>
			</article>
		</div>
		
	</div>
</template>
<script>
import { XInput, PopupPicker, Rater } from 'vux'
import { getPhoneType } from '../../assets/js/dll.js'
import { recordScan} from '../common/common.js'
export default {
	components: {
	    XInput,
		PopupPicker,
		Rater
	},
    data(){
        return {
			star:5,
        	prodNo: "",
        	productDetData: {},
        	applyAtm: "",
        	termList: [],
        	selectedTerm: [],
        	chooseTerm: "",
        	reymentAtm: "",
        	recordJson: {
				ip: localStorage.getItem("ip"),
                phoneNo: localStorage.getItem("phoneNo"),
                prodNo: "",
                pageId: "productDetail",
                opType: "42100001",//42100001:产品页面PV
        		sourceType: SOURCE_TYPE,  //表示微信
                chanNo: localStorage.getItem("mChanNo"),
                inviteCode: localStorage.getItem("qrCode"),
                prodName: "",
				appType: APP_TYPE1,
				userSource: USER_SOURCE
        	}
        }
    },
    created () { 
		this.init()    	
    },
    methods: {
		/*
		* 初始化页面
		*/
		init(){
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
			that.prodNo = that.$route.query.prodNo
    		that.getProDetail()
		},
		/*
		* 获取产品详情信息
		*/
    	getProDetail(){
    		this.$axios.post(this.$api.productDetailed, {"params":{"prodNo": this.prodNo}})
    		.then(response => {
    			if(response.code === "0000") {
					this.productDetData = response.result
					this.productDetData.passRate = this.productDetData.passRate/20
    				this.termList = response.result.prodList.length?this.toData(response.result.prodList):[]
					this.applyAtm = this.productDetData.minLoanLimit
					this.selectedTerm.push(this.termList[0][0].name)    				
    				this.recordJson.prodNo = response.result.prodNo
    				this.recordJson.prodName = response.result.prodName
    				this.countApply()
    			}else{
					this.$vux.toast.text(response.msg)
    			}
    		})
    		.catch(function(response){
    			
    		})
		},
		/*
		* 期数数据处理
		*/
    	toData(data) {
	        let that = this
	        //vux格式处理
	        return [data.map(item => { 
	        	return { name:item.pordDeadline+item.unit, value: item.pordDeadline+item.unit }
	        })]
		},
		/*
		* 金额输入失去焦点
		*/
	    changeAtm(){
	    	this.loadcaculate()
		},
		/*
		* 选择期限
		*/
	    onChange(){
	    	let that = this
	    	if(that.selectedTerm[0].slice(-1) == "月"){
	    		that.chooseTerm = parseInt(that.selectedTerm[0])*30
	    	}else{
	    		that.chooseTerm = parseInt(that.selectedTerm[0])
	    	}
	    	that.loadcaculate()
		},
		/*
		* 计算还款总额
		*/
		loadcaculate() {
			let that = this
			let sum
			if(that.applyAtm){
				sum = parseFloat(that.applyAtm)
			}else{
				sum = ""
			}
			let rate = parseFloat(that.productDetData.loanRate)/100
			let term = that.chooseTerm
			
		    if (!sum || sum == 0 || sum == NaN) {
		        that.reymentAtm = ""
		        return false
		    }
		    if (!term || term == 0) {
		        that.reymentAtm = ""
		        return false
		    }
		    if (sum - that.productDetData.maxLoanLimit > 0) {
		        that.$vux.toast.text("申请额度过高!")
		        return false
		    }
		    if (that.productDetData.minLoanLimit - sum > 0) {
		        that.$vux.toast.text("申请额度太低!")
		        return false
		    }
		    
		    let total = sum + sum * rate * term
		    that.reymentAtm = total.toFixed(2)
		},
		/*
		* 立即申请
		*/
	    sendApply(url){
	    	if(!this.applyAtm) {
		        this.$vux.toast.text("请输入申请金额")
		        return false
	        }else{
	        	if (this.applyAtm - this.productDetData.maxLoanLimit > 0) {
			        this.$vux.toast.text("申请额度过高!")
			        return false
			    }
			    if (this.productDetData.minLoanLimit - this.applyAtm > 0) {
			        this.$vux.toast.text("申请额度太低!")
			        return false
			    }
	        }
	    	if(this.selectedTerm.length===0){
	            this.$vux.toast.text("请选择期限")
	            return false
	        }
	    	this.recordJson.opType = "42100002"//42100002：产品功能UV
			this.countApply()
			localStorage.setItem("isCrossOrigin",true)
	        window.location.href = url
		},
		/*
		* 页面访问统计
		*/
	    countApply(){
	    	recordScan(this.$api.record, this.recordJson)
	    }
    }
  }
</script>

