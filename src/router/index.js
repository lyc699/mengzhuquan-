// 引入组件
const login = resolve => require(['../components/login/index.vue'], resolve);
const passwordForget = resolve => require(['../components/login/passwordForget.vue'], resolve);
const passwordSet = resolve => require(['../components/login/passwordSet.vue'], resolve);
const agreement = resolve => require(['../components/login/agreement.vue'], resolve);
const agreement1 = resolve => require(['../components/login/agreement1.vue'], resolve);
const passwordChange = resolve => require(['../components/my/passwordChange.vue'], resolve);
const my = resolve => require(['../components/my/index.vue'], resolve);
const changePhone = resolve => require(['../components/my/tab.vue'], resolve);
const index = resolve => require(['../components/index.vue'], resolve);
const newMouth = resolve => require(['../components/product/newMouth.vue'], resolve);
const productDetail = resolve => require(['../components/product/productDetail.vue'], resolve);
const setting = resolve => require(['../components/my/setting.vue'], resolve);
const followPublicNumber = resolve => require(['../components/my/followPublicNumber.vue'], resolve);
const commonProblem = resolve => require(['../components/my/commonProblem.vue'], resolve);
const error = resolve => require(['../components/common/error.vue'], resolve);
const register = resolve => require(['../components/login/register.vue'], resolve);
const manageMoney = resolve => require(['../components/money/manageMoney.vue'], resolve);
const sign = resolve => require(['../components/sign/sign.vue'], resolve);
const cardDetail = resolve => require(['../components/product/cardDetail.vue'], resolve);
const vip = resolve => require(['../components/vip/index.vue'], resolve);
const step1 = resolve => require(['../components/vip/step1.vue'], resolve);
const step2 = resolve => require(['../components/vip/step2.vue'], resolve);
const step3 = resolve => require(['../components/vip/step3.vue'], resolve);
const vipSuccess = resolve => require(['../components/vip/vipSuccess.vue'], resolve);
const theme = resolve => require(['../components/theme/index.vue'], resolve);
const ticketList = resolve => require(['../components/ticket/ticketList.vue'], resolve);
const ssq = resolve => require(['../components/ticket/ssq.vue'], resolve);
const dlt = resolve => require(['../components/ticket/dlt.vue'], resolve);
const qlc = resolve => require(['../components/ticket/qlc.vue'], resolve);
const qxc = resolve => require(['../components/ticket/qxc.vue'], resolve);
const fcsd = resolve => require(['../components/ticket/fcsd.vue'], resolve);
const pls = resolve => require(['../components/ticket/pls.vue'], resolve);
const plw = resolve => require(['../components/ticket/plw.vue'], resolve);
const dreamQuery = resolve => require(['../components/dream/index.vue'], resolve);
const dreamDetail = resolve => require(['../components/dream/detail.vue'], resolve);
const joy = resolve => require(['../components/joy/index.vue'], resolve);
const xjd = resolve => require(['../components/product/xjd.vue'], resolve);
const dxcp = resolve => require(['../components/product/page7.vue'], resolve);
const sbhLogin = resolve => require(['../components/sbh/login.vue'], resolve);
const sbhInfo = resolve => require(['../components/sbh/sbhInfo.vue'], resolve);
const sbhList = resolve => require(['../components/sbh/sbhList.vue'], resolve);
export default [
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {keepAlive: false, name: "登录"}
  },
  {
    path: '/passwordForget',
    name: 'passwordForget',
    component: passwordForget,
    meta: {keepAlive: false, name: "忘记密码"}
  },
  {
    path: '/passwordSet',
    name: 'passwordSet',
    component: passwordSet,
    meta: {keepAlive: false, name: "设置密码"}
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {keepAlive: false, name: "借款", hasFooter: true}
  },
  {
    path: '/my',
    name: 'my',
    component: my,
    meta: {keepAlive: false, name: "我的", hasFooter: true}
  },
  {
    path: '/passwordChange',
    name: 'passwordChange',
    component: passwordChange,
    meta: {keepAlive: false, name: "修改密码"}
  },
  {
    path: '/changePhone',
    name: 'changePhone',
    component: changePhone,
    meta: {keepAlive: true, name: "变更手机号"}
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/newMouth',
    name: 'newMouth',
    component: newMouth,
    meta: {keepAlive: false, name: "智能推荐"}
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: productDetail,
    meta: {keepAlive: false, name: "产品详情"}
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    meta: {keepAlive: false, name: "设置"}
  },
  {
    path: '/followPublicNumber',
    name: 'followPublicNumber',
    component: followPublicNumber,
    meta: {keepAlive: true, name: "关注公众号"}
  },
  {
    path: '/commonProblem',
    name: 'commonProblem',
    component: commonProblem,
    meta: {keepAlive: true, name: "常见问题"}
  },
  {
    path: '/error',
    name: 'error',
    component: error,
    meta: {keepAlive: true, name: "error"}
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: agreement,
    meta: {keepAlive: true, name: "注册协议"}
  },
  {
    path: '/agreement1',
    name: 'agreement1',
    component: agreement1,
    meta: {keepAlive: true, name: "注册协议"}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {keepAlive: false, name: "注册"}
  },
  {
    path: '/manageMoney',
    name: 'manageMoney',
    component: manageMoney,
    meta: {keepAlive: false, name: "理财", hasFooter: true}
  },
  {
    path: '/sign',
    name: 'sign',
    component: sign,
    meta: {keepAlive: false, name: "签到"}
  },
  {
    path: '/cardDetail',
    name: 'cardDetail',
    component: cardDetail,
    meta: {keepAlive: false, name: "服务详情"}
    
  },
  {
    path: '/vip',
    name: 'vip',
    component: vip,
    meta: {keepAlive: false, name: "盟主圈VIP"}
    
  },
  {
    path: '/step1',
    name: 'step1',
    component: step1,
    meta: {keepAlive: false, name: "盟主圈VIP申请"}
    
  },
  {
    path: '/step2',
    name: 'step2',
    component: step2,
    meta: {keepAlive: false, name: "盟主圈VIP申请"}
    
  },
  {
    path: '/step3',
    name: 'step3',
    component: step3,
    meta: {keepAlive: false, name: "盟主圈VIP申请"}
    
  },
  {
    path: '/vipSuccess',
    name: 'vipSuccess',
    component: vipSuccess,
    meta: {keepAlive: false, name: "盟主圈VIP"}
    
  },
  {
    path: '/theme',
    name: 'theme',
    component: theme,
    meta: {keepAlive: false, name: "查拒贷", hasFooter: true}
  },
  {
    path: '/ticketList',
    name: 'ticketList',
    component: ticketList,
    meta: {keepAlive: false, name: "查彩票"}
    
  },
  {
    path: '/ssq',
    name: 'ssq',
    component: ssq,
    meta: {keepAlive: false, name: "双色球"}
    
  },{
    path: '/dlt',
    name: 'dlt',
    component: dlt,
    meta: {keepAlive: false, name: "超级大乐透"}
    
  },
  {
    path: '/qlc',
    name: 'qlc',
    component: qlc,
    meta: {keepAlive: false, name: "七乐彩"}
    
  },
  {
    path: '/qxc',
    name: 'qxc',
    component: qxc,
    meta: {keepAlive: false, name: "七星彩"}
    
  },
  {
    path: '/fcsd',
    name: 'fcsd',
    component: fcsd,
    meta: {keepAlive: false, name: "福彩3d"}
    
  },
  {
    path: '/pls',
    name: 'pls',
    component: pls,
    meta: {keepAlive: false, name: "排列三"}
    
  },
  {
    path: '/plw',
    name: 'plw',
    component: plw,
    meta: {keepAlive: false, name: "排列五"}
    
  },
  {
    path: '/dreamQuery',
    name: 'dreamQuery',
    component: dreamQuery,
    meta: {keepAlive: false, name: "周公解梦"}
    
  },
  {
    path: '/dreamDetail',
    name: 'dreamDetail',
    component: dreamDetail,
    meta: {keepAlive: false, name: "周公解梦"}
    
  },
  {
    path: '/joy',
    name: 'joy',
    component: joy,
    meta: {keepAlive: false, name: "看笑话"}
    
  },
  {
    path: '/xjd',
    name: 'xjd',
    component: xjd,
    meta: {keepAlive: false, name: "信用卡", hasFooter: true}
  },
  {
    path: '/dxcp',
    name: 'dxcp',
    component: dxcp,
    meta: {keepAlive: false, name: "电销产品中转站"}
  },
  {
    path: '/sbhLogin',
    name: 'sbhLogin',
    component: sbhLogin,
    meta: {keepAlive: false, name: "随便花"}
  },
  {
    path: '/sbhInfo',
    name: 'sbhInfo',
    component: sbhInfo,
    meta: {keepAlive: false, name: "随便花"}
  },{
    path: '/sbhList',
    name: 'sbhList',
    component: sbhList,
    meta: {keepAlive: false, name: "随便花"}
  }
]
