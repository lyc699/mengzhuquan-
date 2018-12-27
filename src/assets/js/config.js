//生产环境
if(process.env.NODE_ENV === 'production' && process.env.srconfig === 'prod'){
    //邀请好友的地址
    global.RECOMMEND_URL = "http://activity.boyacx.com/recommend"
    global.SHARE_URL = 'http://wechat-dmz.boyacx.com/views'
    global.zcm_URL = 'http://cjd.boyacx.com/ccbjyy/home'
}

//本地环境/测试环境
if(process.env.NODE_ENV === 'development'|| process.env.srconfig === 'test' || process.env.srconfig===''){
    //邀请好友的测试地址
    global.RECOMMEND_URL = "http://activity-test.boyacx.com/recommend"
    global.SHARE_URL = 'http://wechat-dmztext.boyacx.com/views'
    global.zcm_URL = 'http://cjd-test.boyacx.com/ccbjyy/home'
}