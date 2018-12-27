<template>
    <div class="pt10">         
        <group>           
            <Psw :psw.sync="setPswData.newPassword"/>
            <Psw title="重复密码" :psw.sync="setPswData.rePassword"/>
        </group>   
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>登录</x-button>
        </div> 
        <div class="login-agreement mt10">
            <p><img @click="clickAgree" :src="agreeImg" alt="">登录即表示您同意<router-link to="/agreement" @click.native="temporary()">《服务协议》</router-link></p>
        </div>           
    </div>
</template>
<script>
import { Group, XButton} from 'vux'
import { ChangeAgreeStatus, checkPassWord} from '../common/common.js'
import Psw from '../common/PswType'
export default {
    data() {
        return {
            setPswData: {
                phoneNo: localStorage.phoneNo,
                newPassword:localStorage.temporaryPsw || '',
                rePassword:localStorage.temporaryRePsw || '',
                appType: APP_TYPE1
            },
            link: "/index"//跳转首页的path
        }
    },
    components: {
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
        submit(){  
            this.clearTemporary()//清楚临时存储的两次密码
            if(!checkPassWord(this.setPswData.newPassword)){
                this.$vux.toast.text("密码为6-20位数字字母组合,请输入有效密码！")
                return false
            }
            if(this.setPswData.newPassword !== this.setPswData.rePassword){
                this.$vux.toast.text("两次输入的密码不一致！")
                return false
            }    
            if(!this.isAgree){
                this.$vux.toast.text("请同意服务协议！")
                return false
            }
            let that = this;
            that.$axios.post(that.$api.setPassword, {params:that.setPswData})
            .then((response) => {
                if(response.code === "0000") {
                    that.$vux.toast.show({
                        text: "密码设置成功!",
                        onHide() {
                            that.$router.push({"path": that.link})
                        }
                    });                    
                }else{
					that.$vux.toast.text(response.msg);
				}
            })
        },
        temporary() {//点击协议时记录input框里的值
            if(this.setPswData.newPassword){
                localStorage.setItem("temporaryPsw", this.setPswData.newPassword)
            }
            if(this.setPswData.rePassword){
                localStorage.setItem("temporaryRePsw", this.setPswData.rePassword)
            }
        },
        clearTemporary(){//清除临时值
            if(localStorage.temporaryPsw){
                localStorage.removeItem("temporaryPsw")
            }
            if(localStorage.temporaryRePsw){
                localStorage.removeItem("temporaryRePsw")
            }            
        }
    }
}
</script>