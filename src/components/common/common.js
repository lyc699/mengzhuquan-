/*
 * 登录时是否同意服务协议
 */
export const ChangeAgreeStatus ={
    data() {
        return {
            isAgree: true,//默认同意
            agreeImg: "static/images/check-box.png"
        }
    },
    methods: {
        /*
        * 点击选择框
        */
        clickAgree() {
            if(this.isAgree){
                this.agreeImg = "static/images/check-box-outline-blank.png",
                this.isAgree = false
            }else{
                this.agreeImg = "static/images/check-box.png",
                this.isAgree = true
            }
        }
    }
}

/*
 * 点击获取验证码的计时器
 */
export const Timer = { 
    data() {
        return {
            time: 60,   //倒计时长
            sendBtn: "获取验证码",   //发送验证码显示内容
            sendDisabled: false, //发送按钮是否被禁用
            textColorClass: "" //不可以点击文字的颜色
        }
    },
  methods: {      
    codeTimer() {   
        this.sendDisabled = true;
        let TIME_COUNT = this.time;
        let interval = window.setInterval(() => {
            if((TIME_COUNT--) <= 0) {
                TIME_COUNT = this.time;
                window.clearInterval(interval);
                this.sendBtn = "获取验证码";
                this.sendDisabled = false;
                this.textColorClass = ""
                
            }
            else {
                this.textColorClass = "disable"
                this.sendBtn = `${TIME_COUNT}s后重新获取`;
            }
        }, 1000) 
    }
  }
}
import _ from 'underscore';
/*
 * 获取渠道值
 */
export const ChannelCode = { 
    data() {
        return {
            codeList: [],//获取码表
            channelList: {
				"channelName": "",
				"channelCode": "",
				"channelVal": ""
			}
        }
    },
    created() {         
        this.getChannel()          
    },
    methods: {
        getChannel(){
            return new Promise((resolve)=>{
                this.initCode().then(()=>{
                    resolve()
                })
            })
        
        },
        initCode(){
            return this.$axios.post(this.$api.channelCode1,{params:{}})
            .then(response => {
                if(response.code === "0000") {
                    let result = response.result
                    _.map(result,(item)=>{
                        this.codeList.push({channelVal:item.promChanChineseName,channelCode:item.promChanNo,channelName:item.promChanChineseName}) 
                    })
                    this.getCode()
                }else{
                    if(response.msg){
                        this.$vux.toast.text(response.msg)
                    }
                }
            })
        },
        getCode(){
            //从url里取出渠道名        
            let mChanNo= getQueryString("mChanNo") || this.$route.query.mChanNo  
            if(mChanNo){
                //根据渠道名对应该渠道码值
                this.channelList = _.findWhere(this.codeList,{"channelCode": mChanNo})
                //如果匹配上码值，将码值存入本地
                if(this.channelList && this.channelList.channelCode){
                    localStorage.setItem("mChanNo",this.channelList.channelCode)
                    localStorage.setItem("mChanVal",this.channelList.channelCode)
                }else{
                    localStorage.removeItem("mChanNo")
                    localStorage.removeItem("mChanVal")
                    let that = this;
                    that.$vux.toast.show({
                        text:"渠道有误！",
                        type: "cancel",
                        onHide() {
                            that.$router.push({"path": "/error"})                                
                        }
                    })
                } 
            }else{
                //有一个渠道是不传值
                localStorage.setItem("mChanNo","")
                localStorage.removeItem("mChanVal")
            }
        }
    }
}
import qs from 'qs'
/*
 * 统计
 */
export function recordScan(url, parms){
    let img;
    img = new Image();
    url += '?'+ qs.stringify(parms)
    img.src = url;
}

/*
 * 手机号码验证
 */
export function checkPhone(val){
    return /^1[3456789]\d{9}$/.test(val)
}
/*
 * 登录密码验证
 */
export function checkPassWord(val){
    return /^[0-9A-Za-z]{6,20}$/.test(val)
}
/*
 * 验证码验证
 */
export function checkCode(val){
    return /^[0-9A-Za-z]{6}$/.test(val)
}
/*
 * url参数
 */
export function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&\/]*)(&|$|\/)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null)
        return  unescape(r[2]); 
    return null;
}

 //判断是否微信登陆
 export function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}