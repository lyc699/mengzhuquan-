<template>
    <div class="mt5">
        <p class="login-tip">您正在修改账户18300000000的手机号</p>         
        <group>
            <x-input title="密码" name="password" type="password" placeholder="请输入密码">
                <img style="width:20px" slot="right" src="static/images/LogIn_Icon_Hide@2x.png">
            </x-input>
            <x-input title="新手机号" name="phoneNo" type="tel" placeholder="请输入新手机号码" keyboard="number"></x-input>
            <x-input title="验证码" name="code" placeholder="请输入短信验证码">
                <span slot="right">获取验证码</span>
            </x-input>
        </group>   
        <div class="login-btn">
            <x-button @click.native="submit" v-touch>确定</x-button>
        </div>            
    </div>
</template>
<script>
import { Tab, TabItem, XInput, Group, XButton} from 'vux'
export default {
    components: {
        XInput, 
        Group, 
        XButton
    }
}
</script>