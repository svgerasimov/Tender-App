
const state = {
  tenders: null,
  showProvidersDialog: false,
  showCreateProvider: false,
  providers: []
}

const mutations = {
  'INIT_PROVIDERS' (state, providers) {
    state.providers = providers
  },
  'TOGGLE_PROV_WINDOW' (state) {
    state.showProvidersDialog = !state.showProvidersDialog
  },
  'TOGGLE_CREATE_PROV_WINDOW' (state) {
    state.showCreateProvider = !state.showCreateProvider
  },


}

const actions = {
  /* access processedTenders state from AnalystTenders */
  getProcessedTendersFromAnalystTenders (context) {
    state.tenders = context.rootState.analystTenders.processedTenders
  }
}

const getters = {
  getTenders: (state) => state.tenders,
  showProvidersDialog: (state) => state.showProvidersDialog,
  showProviders: (state) => state.providers,
  showCreateProv: (state) => state.showCreateProvider,
  getNewProviders: state => state.newProviders
}

export default {
  state,
  mutations,
  actions,
  getters
}
