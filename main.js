import Vue from 'vue'
import App from './App'
import uView from '@/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
import * as http from './config/http.js';
import * as common from './config/common.js';
Vue.prototype.$http = http;
Vue.prototype.$common = common;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
