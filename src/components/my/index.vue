<template>
  <div class="my pb60">
    <group class="head-cell">
        <router-link :to="{path:loginLink,query:{nickname:userName}}" tag="div">
          <cell :title="isLogin?userName:''" :inline-desc='phoneNo|phoneToken' is-link>
            <img slot="icon" class="headImg" width="20" style="display:block;margin-right:5px;" :src="headPic" onerror="onerror=null;src='static/images/Mine_Img_HeadPortrait@2x.png'">
            <img v-if="isVip" slot="after-title" style="width:20px" src="static/images/vip.png">
            <img style="width:20px" src="static/images/setting.png">
          </cell>
        </router-link>
    </group>
    <group>
        <router-link to="/followPublicNumber" tag="div">
            <cell title="关注公众号" is-link>
            <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" src="static/images/Mine_Icon_Attention@2x.png">
            </cell>
        </router-link>
    </group>
    <group>
        <router-link to="/commonProblem" tag="div">
            <cell title="常见问题" is-link>
            <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" src="static/images/Mine_Icon_Question@2x.png">
            </cell>
        </router-link>
    </group>
    <group>
        <router-link to="/step1" tag="div" v-if="isLogin">
            <cell title="修改个人资料" is-link>
            <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" src="static/images/Mine_Icon_Info@2x.png">
            </cell>
        </router-link>
    </group>
    <group v-if="isLogin && isShowSet">
        <router-link to="/passwordChange" tag="div">
            <cell title="修改密码" is-link>
                <img slot="icon" class="icon" width="20" style="display:block;margin-right:5px;" src="static/images/Mine_Icon_Set@2x.png">
            </cell>
        </router-link>
    </group>
    <group>
        <cell title="客服微信号" value="2234413672" @click.native="getCopy" class="tag-read" data-clipboard-text="2234413672">
            <img slot="icon" class="icon" width="20" src="static/images/Mine_Icon_custom@2x.png">
        </cell>
    </group>
    <group v-if="isLogin && isShowSet">
        <cell title="退出" @click.native="signOut" class="signOut-btn">
            <!-- <img slot="icon" class="icon" width="20" src="static/images/Mine_Icon_exit@2x.png"> -->
        </cell>
    </group>
    <div @click="goUrl">
        <img src="static/images/banner.png" alt="" v-if='isVip'>
        <img src="static/images/banner1.png" alt="" v-else>
    </div>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
import Clipboard from 'clipboard';  
export default {
    data() {
      return{
          phoneNo:localStorage.phoneNo || "请登录",//如果登录了显示电话号码，如果没登录显示请登录
          isLogin:localStorage.phoneNo?true:false,//根据电话号码判断是否登录了
          loginLink:"",//此链接用于没有登录时跳转到登录页面
          isShowSet: localStorage.mChanNo === '46300004'?false:true,//如果是线下引流渠道不显示设置
          isVip:false,
          userName: localStorage.phoneNo?'zcm_'+ localStorage.phoneNo.substr(localStorage.phoneNo.length - 4):'',
          headPic:''
      }
    },
    components: {
        Group,
        Cell
    },
    created(){
        //没有登录的情况下，点击请登录跳转到登录页面
        this.loginLink = this.isLogin?"/setting":"/login"
        if(this.isLogin){
            this.getVip()
            this.getHead()
        }
    },
    methods:{
        getHead(){
            let num = new Date().getTime()
            this.headPic = this.$api.downLoad+"?busiNo="+localStorage.phoneNo+"_03&"+num
        },
        getVip(){
            this.$axios.post(this.$api.queryUserAllInfo,{params:{phoneNo:localStorage.phoneNo,appType: APP_TYPE1}})
            .then(res => {
                let {code,msg,result} = res
                if (code == "0000") {
                    this.isVip = result[0].isVip === '13900001'?true:false
                    if(this.isVip){
                        localStorage.setItem('isVipSuccess',true)
                    }
                    if(result[0].nickname){
                        this.userName = result[0].nickname
                    }
                }else{
                    if(msg) this.$vux.toast.text(msg)
                }
            })
        },
        goUrl(){
            if(this.isVip){
                this.$router.push({"path":"/vipSuccess"})
            }else{
                this.$router.push({"path":"/vip"})
            }
        },
        signOut () {
            const that = this
            that.$vux.confirm.show({
            title: "温馨提示",
            content: "您确定退出吗？",
            onCancel () {
            },
            onConfirm () {
                let mChanNo = localStorage.getItem("mChanNo")
                localStorage.clear()
                localStorage.setItem("mChanNo",mChanNo)
                that.$router.push({
                    path: "/login"
                })
            }
            })
        },
        getCopy(){
            var clipboard = new Clipboard('.tag-read')  
            clipboard.on('success', e => {  
                this.$vux.toast.text("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                // 释放内存  
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                // 不支持复制  
                console.log('该浏览器不支持自动复制')  
                // 释放内存  
                clipboard.destroy()  
            })  
            
        }
    }
}
</script>

