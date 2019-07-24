import Vue from 'vue'
import '../../thirdParty.js'

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import router from './router.js'
import App from '../../App'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#manage')
