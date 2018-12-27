import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    footer   : true,
    sourceType : 'h5',
    count: true //首页弹窗显示的次数
  },
  //private 不公开
  mutations: {
    showFooter(state, amount) {
      state.footer = amount
    },
    checkSourceType(state, amount) {
      state.sourceType = amount
    },
    checkShowToast(state, amount) {
      state.count = amount
    }
  },
  //获取
  getters: {
    getShowFooter: (state) => {
      return state.footer
    },
    getCheckSourceType: (state) => {
      return state.sourceType
    },
    getCheckShowToast: (state) => {
      return state.count
    },
  }
});
