// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueStore from './vuex/store.js';
import routes from './router'


import axios from './config/http' //axios
import api from './config/api'  //请求
import filters from './assets/js/filter'

import { LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))


Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

// 注册一个全局自定义指令 v-touch 用于ios点击按钮的效果
Vue.directive('touch', {
  inserted: function (el, bind) {
    el.ontouchstart=function(ev){
    };
  }
})

//利用路由的钩子修改网站标题  在这里定义的是全局
router.beforeEach(function(to, from, next){  

  vueStore.commit('showFooter', false);
  if (to.meta.hasFooter && vueStore.state.sourceType !== 'app') {//是否显示底部导航
      vueStore.commit('showFooter', true);
  }
  if(to.meta.name)
  {document.title = to.meta.name}
  next() //确保要调用next

})
/* eslint-disable no-new */
new Vue({
  router,
  render:h =>h(App)
}).$mount('#app')

let isPageHide = false; 
window.addEventListener('pageshow', function () { 
    if (isPageHide) {
        window.location.reload(); 
    } 
}); 
window.addEventListener('pagehide', function () { 
    isPageHide = true; 
}); 
