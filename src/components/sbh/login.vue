
<template>
    <div class="sbnLogin">
        <img src="static/images/sbh/bg.png" alt="" class="bg">
        <img src="static/images/sbh/bg_top.png" alt="" class="bg_top">
        <div class="login_block">
            <group>
                <x-input v-model="codeData.phoneNo" :max="11" name="phoneNo" type="tel" placeholder="请输入手机号码" keyboard="number"></x-input>
                <x-input v-model="loginData.verifyCode" :min="4" :max="6" name="code" placeholder="请输入短信验证码">
                    <button @click="getCode" :class="textColorClass" :disabled="sendDisabled" slot="right" >{{sendBtn}}</button>
                </x-input>
            </group>
        </div>
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>立刻领取额度</x-button>
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
import { XInput, Group, XButton, Confirm, TransferDomDirective as TransferDom} from 'vux'
import { Timer} from '../common/common.js'
import { checkPhone, checkCode } from '../common/common.js'
export default {
    data(){
        return{
            codeData:{
                phoneNo: '',//手机号
                templateNo: '1', //0表示验证码，1表示验证码登录模板
                imgCode: '',//图形验证码
                sendApp: '41800029'
            },
            loginData:{
                phoneNo: '',//手机号
                verifyCode: '' ,//验证码
                sourceType: SOURCE_TYPE,//微信
                chanNo: localStorage.mChanNo?localStorage.mChanNo:'',//注册时需要加这个渠道参数
                userSource: USER_SOURCE,
                appType: APP_TYPE1,
                lastLoginIp: localStorage.ip,
                regIpAddress: localStorage.ip
            },
            imgSrc: "",//图形验证码src
            show: false,//是否显示弹窗
        }
    },
    directives: {
        TransferDom
    },
    components: {
        XInput,
        Group,
        XButton,
        Confirm
    },
    mixins: [Timer],//混入验证码倒计时
    mounted(){
        this.refresh()
    },
    methods:{
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
                        that.$router.push({"path": "/sbhInfo"})
                    }else{
                        that.$vux.toast.show({
                            text: "注册成功!",
                            onHide() {
                                that.$router.push({"path": "/sbhInfo"})
                            }
                        });
                    }
                    localStorage.setItem("phoneNo", that.loginData.phoneNo);
                }else{
					that.$vux.toast.text(response.msg);
                }
            })
        }
    }
}
</script>

