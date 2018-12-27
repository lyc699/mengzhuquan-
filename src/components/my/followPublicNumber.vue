<style>

</style>
<template>
<section class="follow-cnt">
  <p>方法一：扫描下方二维码,关注“{{logoName}}”微信公众号</p>
  <div>
    <img :src="qrcode" style="width: 143px!important; margin-bottom: 35px;" alt="">
  </div>
  <p>方法二：打开微信→点击搜索框→选择公众号→输入<span style="color: #336dff;">{{logoName}}</span>，就能关注{{logoName}}公众号啦</p>
  <div>
    <img :src="wechat" style="width: 227px!important;" alt="">
  </div>
  <div class="follow-btn">
    <a href="weixin://" target="_blank">马上去微信</a>
  </div>
</section>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
               qrcode: 'static/images/follow/erCode.png',
               wechat: 'static/images/follow/searchPublic.png',
               logoName :'盟主圈'
            }
        },
        created(){
          if(localStorage.mChanNo === '46300006'){//如果渠道是有钱365
            this.qrcode = 'static/images/follow/qrcode.jpg'
            this.wechat = 'static/images/follow/wechat.png'
            this.logoName = '有钱365'
          }
        }
    }
</script>
