<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive v-if="$route.meta.keepAlive">
        <router-view>
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
    </keep-alive>

    <router-view v-else>
        <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import store from "./vuex/store.js";
import "./assets/js/config.js";
import Footer from "./components/common/Footer";
import './common/global.js'
export default {
    components: {
        "app-footer": Footer
    },
    store: store,
    created(){
        this.$axios.post(this.$api.queryIp, {})
    }  
}
</script>

<style lang="less">
  @import "./less/main.less";
</style>
