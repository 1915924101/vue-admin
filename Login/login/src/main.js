// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import service from './service'
// import axios from 'axios'
import echarts from "echarts";
// import echartsGL from 'echarts-gl' // 引入echarts
import 'echarts-gl';
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI) 
Vue.config.productionTip = false
Vue.prototype.service=service

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
