import Vue from 'vue'
import Vuex from 'vuex'

import analystTenders from './modules/analystTenders'
import operatorTenders from './modules/operatorTenders'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    analystTenders,
    operatorTenders
  }
})
