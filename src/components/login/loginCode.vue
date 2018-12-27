<template>
    <div>
        <div>
            <div class="login-headImg">
                <img src="static/images/zcn_logo.png" alt="">
                <p>招财猫</p>
            </div>
            <group>
                <x-input title="手机号" v-model="codeData.phoneNo" :max="11" name="phoneNo" type="tel" placeholder="请输入手机号码" keyboard="number"></x-input>
                <x-input title="验证码" v-model="loginData.verifyCode" :min="4" :max="6" name="code" placeholder="请输入短信验证码">
                    <button @click="getCode" :class="textColorClass" :disabled="sendDisabled" slot="right" >{{sendBtn}}</button>
                </x-input>
                <x-input v-if='isShowCode' title="邀请码" v-model="loginData.inviteCode" :max="6" name="inviteCode" type="text" placeholder="可选填"></x-input>
            </group>
        </div>
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>登录</x-button>
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
import { checkPhone, checkCode } from '../common/common.js'
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
                sourceType: SOURCE_TYPE,//微信
                chanNo: localStorage.mChanNo?localStorage.mChanNo:'',//注册时需要加这个渠道参数
                userSource: USER_SOURCE,
                inviteCode: localStorage.qrCode,//邀请码
                appType: APP_TYPE1,
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
        Confirm
    },
    mixins: [Timer],//混入验证码倒计时
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
            this.loginData.lastLoginIp = this.loginData.regIpAddress =  localStorage.ip
            let that = this;
            that.$axios.post(that.$api.loginCode, {params:that.loginData})
            .then((response) => {
                if(response.code === "0000") {
                    if(response.result.isRegister !== '13900002'){//13900002注册
                        that.$vux.toast.text("登录成功!")
                        that.$router.push({"path": that.link})
                    }else{
                        that.$vux.toast.show({
                            text: "注册成功!",
                            onHide() {
                                that.$router.push({"path": "/passwordSet"})
                            }
                        });
                    }
                    let token = response.result.receToken;//获取token值
					localStorage.setItem("token", token);
                    localStorage.setItem("phoneNo", that.loginData.phoneNo);
                    if(that.loginData.inviteCode){
                        localStorage.setItem("qrCode", that.loginData.inviteCode);
                    }
                }else{
					that.$vux.toast.text(response.msg);
                }
            })
        }
    }

}
</script>


