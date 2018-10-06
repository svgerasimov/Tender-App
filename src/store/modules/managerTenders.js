
const state = {
  tenders: null,
  openReplaceProduct: false,
  openCommonProducts: false,
  openAddNewProducts: false,

  selectedProduct: null,


  changedProducts: null,
  matches: null,
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
  },
  'CHANGE_PRODUCTS' (state, newData) {

  //  state.changedProducts = newData
  let tender = state.tenders.find(tender => {
    return tender.products.includes(newData.selectedProduct)
  })
  let indexOfProduct = tender.products.findIndex(product => {
    return product === newData.selectedProduct
  })
  state.tenders.forEach(tender => {
    if(tender.products.includes(newData.selectedProduct)) {
      tender.products.splice(indexOfProduct, 1, newData.name)
      tender['synonyms'].push(newData.synonyms)

    }
    
  })
  },
  'ADD_MATCHES' (state, matches) {
    let tender = state.tenders.find(tender => {
      return tender.products.includes(matches.selectedProduct)
    })
    let indexOfProduct = tender.products.findIndex(product => {
      return product === matches.selectedProduct
    })
    state.tenders.forEach(tender => {
      if(tender.products.includes(matches.selectedProduct)) {
        tender.products.splice(indexOfProduct, 1, ...matches.addProducts)
      }
    })
  //state.matches = matches

  }
}

const actions = {
  /* access selectedTenders state from AnalystTenders */
  getProcessedTendersFromAnalystTenders (context) {
    state.tenders = context.rootState.analystTenders.selectedTenders
  },
  changeProductsData ({commit}, changeProducts) { 
    commit('CHANGE_PRODUCTS' ,changeProducts )
  },
  addMatchesToProducts ({commit}, matches) {
    commit('ADD_MATCHES', matches)
  }
}

const getters = {
  getTendersM: (state) => state.tenders,
  openReplaceProductDialog: state => state.openReplaceProduct,
  openCommonProductsDialog: state => state.openCommonProducts,
  openAddNewProductsWindow: state => state.openAddNewProducts,
  showProd: state => state.changedProducts,
  showMatches: state => state.matches
}

export default {
  state,
  mutations,
  actions,
  getters
}
