<template>
    <div class="pt10">        
        <div>          
            <group>
                <x-input title="手机号" v-model="codeData.phoneNo" :max="11" name="phoneNo" type="tel" placeholder="请输入手机号码" keyboard="number"></x-input>
                <x-input title="验证码" v-model="loginData.verifyCode" :min="4" :max="6" name="code" placeholder="请输入短信验证码">
                    <button @click="getCode" :class="textColorClass" :disabled="sendDisabled" slot="right" >{{sendBtn}}</button>
                </x-input>
                <Psw :psw.sync="loginData.password"/>
                <Psw title="重复密码" :psw.sync="loginData.rePassWord"/>
                <x-input v-if='isShowCode' title="邀请码" v-model="loginData.inviteCode" :max="6" name="inviteCode" type="text" placeholder="可选填"></x-input>
            </group>       
            <div class="login-agreement mt20">
                <p style="text-align: left; margin-left: 15px;"><img @click="clickAgree" :src="agreeImg" alt="">同意<router-link to="/agreement" @click.native="temporary()">《服务协议》</router-link></p>
            </div>
        </div>
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>确定</x-button>
        </div>
        <div v-transfer-dom>
            <confirm v-model="show" class="imgCodeBlock" title="请输入下方验证码" @on-confirm="onConfirm" :close-on-confirm="false">
                <x-input placeholder="请输入" name="verificationCode" class="img-code" v-model="codeData.imgCode">
                    <img slot="right-full-height" :src="imgSrc" @click="refresh()">
                </x-input>
            </confirm>
        </div>
    </div>  
</template>
<script>
import { Tab, TabItem, XInput, Group, XButton, XSwitch, Confirm, TransferDomDirective as TransferDom } from 'vux'
import { Timer} from '../common/common.js'
import { ChangeAgreeStatus, checkPhone, checkCode, checkPassWord } from '../common/common.js'
import Psw from '../common/PswType'
export default {
    data() {
        return {
            codeData:{
                phoneNo: '',//手机号
                templateNo: '1', //0表示验证码，1表示验证码登录模板
                imgCode: '',//图形验证码
                sendApp: SEND_APP
            },
            loginData:{
                phoneNo: '',//手机号
                verifyCode: '' ,//验证码
                password: '',
                sourceType: SOURCE_TYPE,//微信
                userSource: USER_SOURCE,
                chanNo: localStorage.mChanNo?localStorage.mChanNo:'',//注册时需要加这个渠道参数
                inviteCode:localStorage.qrCode,//邀请码
                rePassWord: '',
                appType: APP_TYPE1,//盟主圈
                lastLoginIp: localStorage.ip,
                regIpAddress: localStorage.ip
            },
            link: "/index",//跳转首页的path
            imgSrc: "",//图形验证码src
            show: false,//是否显示弹窗
            isShowCode: localStorage.qrCode?false:true//是否显示邀请码输入框
        }
    },
    directives: {
        TransferDom
    },
    components: {
        XInput, 
        Group, 
        XButton,
        XSwitch,
        Confirm,
        Psw
    },
    mixins: [Timer, ChangeAgreeStatus],//混入验证码倒计时和同意协议按钮的切换功能
    created(){
        //有渠道，将码值加在首页path之后
        this.link = localStorage.mChanVal?this.link+"?mChanNo="+localStorage.mChanVal:this.link
    },
    methods: {
        /*
        * 提交图形验证码
        */
        onConfirm(){
            if(!this.codeData.imgCode){
                this.$vux.toast.text("请输入有效的图形验证码！")
                return false
            }
            this.$axios.post(this.$api.phoneCaptchaByPicture, {params:this.codeData})
            .then((response) => {
                if(response.code === "0000") {
                    this.show = false
                    this.$vux.toast.text("验证码获取成功！")
                    this.codeTimer()//开启倒计时，该方法在混入文件里面
                }else{
					this.$vux.toast.text(response.msg);
				}
            })
        },
        /*
        * 获取图形验证码
        */
        refresh() {
            this.imgSrc = `${this.$api.getCodeImg}?phoneNo=${this.codeData.phoneNo}&random_num=${Math.random()}`
        },
        /*
        * 点击获取验证码
        */
        getCode(){
            if(!checkPhone(this.codeData.phoneNo)){
                this.$vux.toast.text("请输入有效的手机号码！")
                return false
            } 
            this.refresh()//获取图形验证码
            this.codeData.imgCode=''//讲输入框置空
            this.show = true //弹出输入图形验证码的弹窗
            
        },
        /*
        * 点击登录，对每个输入框的值做验证
        */
        submit(){    
            this.loginData.phoneNo = this.codeData.phoneNo
            if(!checkPhone(this.loginData.phoneNo)){
                this.$vux.toast.text("请输入有效的手机号码！")
                return false
            } 
            if(!checkCode(this.loginData.verifyCode)){
                this.$vux.toast.text("请输入有效的验证码！")
                return false
            } 
            if(!checkPassWord(this.loginData.password)){
                this.$vux.toast.text("密码为6-20位数字字母组合,请输入有效密码！")
                return false
            }   
            if(this.loginData.password !== this.loginData.rePassWord){
                this.$vux.toast.text("两次输入的密码不一致！")
                return false
            } 
            if(!this.isAgree){
                this.$vux.toast.text("请同意服务协议！")
                return false
            }
            let that = this;
            that.$axios.post(that.$api.reg, {params:that.loginData})
            .then((response) => {
                if(response.code === "0000") {
                    let token = response.result.receToken;//获取token值
					localStorage.setItem("token", token);
					localStorage.setItem("phoneNo", that.loginData.phoneNo);
                    if(that.loginData.inviteCode){
                        localStorage.setItem("qrCode", that.loginData.inviteCode);
                    }                
                    that.$vux.toast.text("注册成功!")
                    that.$router.push({"path": that.link})
                }else{
					that.$vux.toast.text(response.msg);
                }
            })
        }
    }

}
</script>


