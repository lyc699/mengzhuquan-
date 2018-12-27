export default {
  login: '/zcm/bycx-luckycat-service/bMarketUserInfo/mzqLogin', // 登录
  loginCode: '/zcm/bycx-luckycat-service/bMarketUserInfo/mzqLoginCapcha', // 验证码登录
  getCode: '/zcm/bycx-luckycat-service/bMarketUserInfo/sendSms',//获取验证码
  resetPassword: '/zcm/bycx-luckycat-service/bMarketUserInfo/resetPassword',//忘记密码
  setPassword: '/zcm/bycx-luckycat-service/bMarketUserInfo/setPassword',//首次注册设置密码
  getPictureAD: '/zcm/bycx-luckycat-service/bMarketAdvertisementInfo/getPictureAD',//banner图
  getActualAD: '/zcm/bycx-luckycat-service/bMarketAdvertisementInfo/getInfoAD',//快讯信息
  // productList: '/zcm/bycx-drainage-service/bMarketProdDetails/getProductList',//产品列表
  // record: '/zcm/bycx-luckycat-service/bMarketVisitRecord/record',//访问统计
  // productDetailed: '/zcm/bycx-luckycat-service/bMarketProdDetails/getProductDetail',//产品详情
  getCodeImg: '/zcm/bycx-luckycat-service/bMarketUserInfo/getCodeImg',//获取图形验证码    
  phoneCaptchaByPicture: '/zcm/bycx-luckycat-service/bMarketUserInfo/sendSmsByCodeImg',//验证图形验证码并获取短信验证码
  reg: '/zcm/bycx-luckycat-service/bMarketUserInfo/regist',//注册
  autoLogin: '/zcm/bycx-luckycat-service/bMarketUserInfo/autoSaveIntoDMZ',//注册
  querySigninDays: '/zcm/bycx-luckycat-service/bMarketSigninInfo/querySigninDays',//查询用户连续签到天数和当天是否签到
  signIn: '/zcm/bycx-luckycat-service/bMarketSigninInfo/signIn',//签到
  takePrize: '/zcm/bycx-luckycat-service/bMarketPrizeInfo/takePrize',//领取奖品
  getAdvUrl: '/zcm/bycx-luckycat-service/bMarketActivityInfo/getOne',//获取广告链接
  queryPrizeAddr: '/zcm/bycx-luckycat-service/bMarketPrizeInfo/queryPrizeAddr',//获取奖品url
  advClick: '/zcm/bycx-luckycat-service/bMarketActivityInfo/updateClickNums',//统计点击广告次数
  channelCode: '/zcm/bycx-luckycat-service/aSysAtt/mobile/query',//获取渠道
  channelCode1: '/zcm/bycx-luckycat-service/bMarketPromoteChannel/queryChannelSelectList',//获取渠道
  saveUserProfitRecord:'/zcm/bycx-luckycat-service/bMarketUserProfitDetails/saveUserProfitRecord',//保存用户收益的API
  userInfoPerfect:'/zcm/bycx-luckycat-service/bMarketUserDetails/userInfoPerfect',//用户信息完善保存接口
  saveOrEdit:'/zcm/bycx-luckycat-service/bMarketUserInterest/saveOrEdit',//用户偏好信息更新保存接口
  queryUserAllInfo:'/zcm/bycx-luckycat-service/bMarketUserInfo/queryUserAllInfo',//查询用户所有信息接口
  queryIp:'/zcm/bycx-luckycat-service/aSysAtt/getHeaderInfo',//为了获取ip
  queryAdvertiseInfo: '/zcm/bycx-luckycat-service/bMarketAdvertisementInfo/queryAdvertiseInfo',
  productList: '/zcm/bycx-luckycat-service/bMarketProdDetails/getProductList',//产品列表
  productDetailed: '/zcm/bycx-luckycat-service/bMarketProdDetails/getProductDetail',//产品详情
  keywordList:'/zcm/bycx-luckycat-service/bMarketKeyword/keywordList',//获取关键字列表
  queryTagDetail:'/zcm/bycx-luckycat-service/bMarketKeyword/queryTagDetail',//获取关键字
  record: '/zcm/bycx-luckycat-service/bMarketVisitRecord/record',//访问统计
  base64UploadCert:'/zcm/bycx-luckycat-service/bMarketUserDetails/base64UploadCert',//上传头像
  downLoad:'/zcm/bycx-luckycat-service/aSysAtt/downLoad',//下载头像
  personInfo:'/zcm/bycx-luckycat-service/bMarketUserDetails/savePersonalInfo',//用户昵称
  updateApplyNums:'/zcm/bycx-luckycat-service/bMarketProdDetails/updateApplyNums',//申请次数
  queryLotteryList:'/mzq/bycx-drainage-service/juhe/queryLotteryList',//开奖列表
  queryLotteryHistory:'/mzq/bycx-drainage-service/juhe/queryLotteryHistory',//查询历史开奖
  dream:'/aaa/dream/query',//解梦
  joy:'/mzq/bycx-drainage-service/bMarketJokeBook/queryJokeBook',//获取笑话
  likeTotal:"/mzq/bycx-drainage-service/bMarketJokeBook/likeTotal",//点赞
  queryLotteryInfo:'/mzq/bycx-drainage-service/juhe/queryLotteryInfo',//获取开奖详情
  queryProdChannelList:'/zcm/bycx-luckycat-service/bMarketProdChannelRel/queryProdChannelList'
  // error: '/topc/5433d5e4e737cbe96dcef312', // url错误
  // backEnd: '/topic/5433d5e4e737cbe96dcef31' // 参数错误
}