<template>
    <div>  
        <p class="login-tip">您正在修改账户{{codeData.phoneNo|phoneToken}}的密码</p>       
        <group>
            <x-input title="验证码" :min="4" :max="6" v-model="changePswData.verifyCode" name="code" placeholder="请输入短信验证码">
                <button @click="getCode" :class="textColorClass" :disabled="sendDisabled" slot="right" >{{sendBtn}}</button>
            </x-input>
            <Psw title="新密码" :psw.sync="changePswData.newPassword"/>
            <Psw title="确认密码" :psw.sync="changePswData.rePassword" placeholder="请再次输入密码"/>
        </group>   
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>提交</x-button>
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
import { Tab, TabItem, XInput, Group, XButton, Confirm, TransferDomDirective as TransferDom } from 'vux'
import { Timer} from '../common/common.js'
import Psw from '../common/PswType'
import { checkPhone, checkPassWord, checkCode} from '../common/common.js'
export default {
    data () {
      return {
        codeData:{
            phoneNo: localStorage.phoneNo,//手机号
            templateNo: '0', //0表示验证码，1表示验证码登录模板
            imgCode: '',//图形验证码
            sendApp: SEND_APP
        },
        changePswData: {
            phoneNo: localStorage.phoneNo,
            verifyCode: '',
            newPassword:'',
            rePassword:'',
            appType: APP_TYPE1
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
        Psw,
        Confirm
    },
    mixins: [Timer],//混入验证码倒计时
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
            this.show = true //弹出输入图形验证码的弹窗

        },
        /*
        * 修改密码
        */
        submit(){ 
            if(!checkCode(this.changePswData.verifyCode)){
                this.$vux.toast.text("请输入有效的验证码！")
                return false
            } 
            if(!checkPassWord(this.changePswData.newPassword)){
                this.$vux.toast.text("密码为6-20位数字字母组合,请输入有效密码！")
                return false
            }   
            if(this.changePswData.newPassword !== this.changePswData.rePassword){
                this.$vux.toast.text("两次输入的密码不一致！")
                return false
            } 
            let that = this;  
            that.$axios.post(that.$api.resetPassword, {params:that.changePswData})
            .then((response) => {
                if(response.code === "0000") {
                    that.$vux.toast.show({
                        text: "密码修改成功!",
                        onHide() {
                            localStorage.removeItem("token");
                            localStorage.removeItem("phoneNo");
                            localStorage.removeItem("qrCode");
                            that.$router.push({"path": "/login"})
                        }
                    });
                }else{
					that.$vux.toast.text(response.msg);
				}
            })
        }
    }
}
</script>