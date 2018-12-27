<template>
    <div>
        <tab :animate="false">
            <tab-item selected @on-item-click="onItemLogin">密码登录</tab-item>
            <tab-item @on-item-click="onItemLoginCode">验证码登录</tab-item>
        </tab>
        <component
            v-bind:is="currentTab"
        ></component>
    </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import Password from './password'
import Code from './code'
export default {
    data() {
        return{
            currentTab: 'Password',
            tabs: ['Password', 'Code']
        }
    },
    components: {        
        Tab,
        TabItem,
        Password,
        Code
    },
    methods: {
        onItemLogin(){
            // console.log(this.currentTab)
            this.currentTab = this.tabs[0]
        },
        onItemLoginCode(){
            // console.log(this.tabs[1])
            this.currentTab = this.tabs[1]
        }
    }
}
</script>
