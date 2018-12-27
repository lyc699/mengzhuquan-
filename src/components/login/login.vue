<style lang="less">
    
</style>

<template>
    <div class="login-div">        
        <div>  
            <div class="login-headImg">
                <img src="static/images/zcn_logo.png" alt="">
                <p>招财猫</p>
            </div>          
            <group>
                <x-input v-model="loginData.phoneNo" title="手机号" :max="11" name="phoneNo" type="tel" placeholder="请输入手机号码" keyboard="number"></x-input>
                <Psw :psw.sync="loginData.password"/>
            </group>              
        </div>
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>登录</x-button>
        </div>
        <p class="login-link">
            <router-link to='/register' class='goRegister'>免费注册</router-link>
            <router-link to='/passwordForget'>忘记密码?</router-link>
        </p>
        <div class="login-agreement agreement-position">
            <p><img @click="clickAgree" :src="agreeImg" alt="">登录即表示您同意<a @click="temporary()">《服务协议》</a></p>
            <img src="static/images/Login_Img_bg@2x.png" alt="">
        </div>
    </div>  
</template>
<script>
import { Tab, TabItem, XInput, Group, XButton} from 'vux'
import { ChangeAgreeStatus, checkPhone, checkPassWord} from '../common/common.js'
import Psw from '../common/PswType'
export default {
    data() {
        return {
            loginData:{
                phoneNo: localStorage.temporaryPhone ||  '',//手机号
                password: localStorage.temporaryPsw || '',
                appType: APP_TYPE1,
                lastLoginIp: localStorage.ip,
                regIpAddress: localStorage.ip
            },
            link: "/index" //跳转首页的path
        }
    },
    components: {
        XInput, 
        Group, 
        XButton,
        Psw
    },
    mixins: [ ChangeAgreeStatus],//混入同意协议按钮的切换功能    
    created(){
        //有渠道，将码值加在首页path之后
        this.link = localStorage.mChanVal?this.link+"?mChanNo="+localStorage.mChanVal:this.link
    },
    methods: {
        /*
        * 点击登录，对每个输入框的值做验证
        */
        submit(){
            this.clearTemporary()//清楚临时存储的电话号码和密码
            if(!checkPhone(this.loginData.phoneNo)){
                this.$vux.toast.text("请输入有效的手机号码！")
                return false
            }   
            if(!checkPassWord(this.loginData.password)){
                this.$vux.toast.text("密码为6-20位数字字母组合,请输入有效密码！")
                return false
            }   
            if(!this.isAgree){
                this.$vux.toast.text("请同意服务协议！")
                return false
            }
            this.loginData.lastLoginIp = this.loginData.regIpAddress =  localStorage.ip
            let that = this;
            that.$axios.post(that.$api.login, {params:that.loginData})
            .then((response) => {
                if(response.code === "0000") {
                    that.$vux.toast.text("登录成功!");
                    that.$router.push({"path": that.link})
                    let token = response.result.receToken;//获取token值
					localStorage.setItem("token", token);
					localStorage.setItem("phoneNo", that.loginData.phoneNo);
                    
                }else{
					that.$vux.toast.text(response.msg);
				}
            })
        },
        temporary() {//点击协议时记录input框里的值
            if(this.loginData.phoneNo){
                localStorage.setItem("temporaryPhone", this.loginData.phoneNo)
            }
            if(this.loginData.password){
                localStorage.setItem("temporaryPsw", this.loginData.password)
            }
            //如果是有钱365，注册协议有变化
            if(localStorage.mChanNo === '46300006'){
                this.$router.push({"path":"/agreement1"})
            }else{
                this.$router.push({"path":"/agreement"})
            }
        },
        clearTemporary(){//清除临时值
            if(localStorage.temporaryPhone){
                localStorage.removeItem("temporaryPhone")
            }
            if(localStorage.temporaryPsw){
                localStorage.removeItem("temporaryPsw")
            }            
        }
    }
}
</script>


