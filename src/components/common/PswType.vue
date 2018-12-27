<template>
    <x-input :title="title1" :min="6" :max="20" v-model="password" name="password" :type="passwordType" :placeholder="placeholder1">
        <img style="width:20px" @click="changePswType" slot="right" :src="passwordImg">
    </x-input>
</template>
<script>
import { XInput} from 'vux'

export default {
    data() {
        return {
            passwordType: "password", //input的type=‘password’
            passwordImg: "static/images/LogIn_Icon_Hide@2x.png",//默认密码不可见的icon
            title1: "密码",//默认input前的label为密码二字
            password: '',
            placeholder1:"请输入密码"
        }
    },
    components: {
        XInput
    },
    props: [ "title", "psw", "placeholder"],
    created() {
        this.password = this.psw
        //如果父组件传了input前label名就改掉默认的
        if(this.title){
            this.title1 = this.title
        }
        if(this.placeholder){
            this.placeholder1 = this.placeholder
        }
    },
    watch: {
        /*
        * 监听input的变化并将值传给父组件
        */
        password(val){
            this.$emit('update:psw', val)
        }
    },
    methods: {
        /*
        * 点击密码可见或者不可见的icon，改成相反的icon，将输入框的类型改成相对应的
        */
        changePswType() {
            if(this.passwordType === "password"){
                this.passwordType = "text",
                this.passwordImg = "static/images/LogIn_Icon_Show@2x.png"
            }else{
                this.passwordType = "password",
                this.passwordImg = "static/images/LogIn_Icon_Hide@2x.png"
            }
        }
    }
}
</script>