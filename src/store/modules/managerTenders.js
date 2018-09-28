
const state = {
  tenders: [],
  openReplaceProduct: false
}

const mutations = {
  'TOGGLE_REPLACE_PRODUCT' (state) {
    state.openReplaceProduct = !state.openReplaceProduct
  }
}

const actions = {
  /* access processedTenders state from AnalystTenders */
  getProcessedTendersFromAnalystTenders (context) {
    state.tenders = context.rootState.analystTenders.processedTenders
  }
}

const getters = {
  getTenders: (state) => state.tenders,
  openReplaceProductDialog: (state) => state.openReplaceProduct
}

export default {
  state,
  mutations,
  actions,
  getters
}
