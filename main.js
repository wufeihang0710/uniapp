
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import { $http } from '@escook/request-miniprogram'

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
uni.$http = $http
uni.$http.baseUrl='https://api-hmugo-web.itheima.net'
uni.$showMsg=function(title = '数据加载失败！', duration = 1500){
  wx.showToast({
    title,
    icon: 'error',
    duration: 2000
  })
}
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
// 按需导入 $http 对象

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif