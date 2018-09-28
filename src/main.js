
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://tenders-90270.firebaseio.com'
axios.defaults.headers.get['Accepts'] = 'application/json'

import {store} from './store/store'

Vue.use(Vuetify)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
