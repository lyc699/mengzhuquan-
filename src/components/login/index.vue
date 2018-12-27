<template>
    <div>
        <tab :animate="false">
            <tab-item selected @on-item-click="onItemLoginCode">验证码登录</tab-item>
            <tab-item @on-item-click="onItemLogin">密码登录</tab-item>
        </tab>
        <component
            v-bind:is="currentTab"
        ></component>
    </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import componentLogin from './login'
import componentLoginCode from './loginCode'
export default {
    data() {
        return{
            currentTab: 'componentLoginCode',
            tabs: ['componentLogin', 'componentLoginCode']
        }
    },
    components: {        
        Tab,
        TabItem,
        componentLogin,
        componentLoginCode
    },
    beforeRouteLeave (to, from , next) {
        if (to.name === 'setting') {
             next(false)
        }else if(to.name === 'index'){
            this.$store.commit('checkShowToast', true)
            next()
        }else{
            next()
        }
    },
    created(){
        this.$axios.post(this.$api.queryIp, {})
    },
    methods: {
        /*
        * 点击密码登录切换相应组件
        */
        onItemLogin(){
            this.currentTab = this.tabs[0]
        },
        /*
        * 点击验证码登录切换相应组件
        */
        onItemLoginCode(){
            this.currentTab = this.tabs[1]
        }
    }
}
</script>
