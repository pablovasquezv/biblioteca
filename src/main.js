import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
