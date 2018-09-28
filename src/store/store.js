import Vue from 'vue'
import Vuex from 'vuex'

import analystTenders from './modules/analystTenders'
import operatorTenders from './modules/operatorTenders'
import callCenter from './modules/callCenter'
import manager from './modules/managerTenders'
import authStore from './auth_store'

import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  modules: {
    analystTenders,
    operatorTenders,
    callCenter,
    manager,
    authStore
  }
})
