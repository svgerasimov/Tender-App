
const state = {
  tenders: [],
  openReplaceProduct: false,
  openCommonProducts: false,
  openAddNewProducts: false
}

const mutations = {
  'TOGGLE_REPLACE_PRODUCT' (state) {
    state.openReplaceProduct = !state.openReplaceProduct
  },
  'TOGGLE_COMMON_PRODUCTS' (state) {
    state.openCommonProducts = !state.openCommonProducts
  },
  'TOGGLE_ADD_PRODUCTS_PRODUCTS' (state) {
    state.openAddNewProducts = !state.openAddNewProducts
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
  openReplaceProductDialog: (state) => state.openReplaceProduct,
  openCommonProductsDialog: (state) => state.openCommonProducts,
  openAddNewProductsWindow: (state) => state.openAddNewProducts,
}

export default {
  state,
  mutations,
  actions,
  getters
}
