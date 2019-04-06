import Vue from 'vue'
import App from './App.vue'

import simValid from '../plugin/index'

Vue.use(simValid)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
