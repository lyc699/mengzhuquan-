

export const GetShare ={
    data() {
        return {
            
        }
    },
    methods: {
        getSignature(data){
            this.$axios.post('/api/bycx-drainage-service/weChat/wkx_getToken',{params:{wkx_url:location.href ,appType:'30500008'}})
            .then(res => {
                if(res.code == '0000'){
                    this.params = res.result
                    this.wxInit(this.params, data)                    
                }
            })
        },
        //微信分享使用方法
        wxInit(sd, data){
            let that=this
            let links= data.link;   //分享出去的链接
            let title= data.title;   //分享的标题
            let desc= data.desc;  //分享的详情介绍
            let imgUrl = data.imgUrl//分享的图片
            wx.config({
                debug: false,
                appId: sd.appId,
                timestamp: sd.timestamp,
                nonceStr: sd.nonceStr,
                signature: sd.signature,
                jsApiList: [
                    'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ']
            });  
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                    // 用户点击了分享后执行的回调函数
                        // that.$vux.toast.text('分享成功')
                    }
                }); 
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                    // 用户点击了分享后执行的回调函数
                        // that.$vux.toast.text('分享成功')
                    }
                });
                wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                    // 用户确认分享后执行的回调函数
                        // that.$vux.toast.text('分享成功')
                    },
                    cancel: function () {
                    // 用户取消分享后执行的回调函数
                    }
                });
            });
            wx.error(function(res){
                // alert("error")
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    }
}

