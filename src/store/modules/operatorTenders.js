const state = {
  openProductsWindow: false,
  openAddSynonymsWindow: false,
  openEnteredProducts: false,
  openSelectedTenderWindow: false,
  selectedProduct: {},
  tenders: [],
  products: []
}

const mutations = {
  'TOGGLE_PRODUCTS_WINDOW' (state) {
    state.openProductsWindow = !state.openProductsWindow
  },
  'TOGGLE_ADD_SYNONYMS_WINDOW' (state, synonym) {
    state.openAddSynonymsWindow = !state.openAddSynonymsWindow
  },
  'TOGGLE_ENTERED_PRODUCTS_WINDOW' (state) {
    state.openEnteredProducts = !state.openEnteredProducts
  },
  'TOGGLE_SELECTED_TENDER_WINDOW' (state) {
    state.openSelectedTenderWindow = !state.openSelectedTenderWindow
  },

  // select Tender in ProcessedTender Component
  'SELECT_TENDER' (state, selectedTender) {
    state.selectedTender = selectedTender
  },

  // init list of products from server
  'SET_PRODUCTS' (state, products) {
    state.products = products
  },

  'SET_PRODUCTS_TO_TENDER' (state, enteredProducts) {
    state.selectedTender['products'] = enteredProducts
  },

  'ADD_SYNONYMS_TO_SELECTED_PRODUCT' (state, addedSynonyms) {
    // merge two arrays - addedSynonyms into products synonyms
    const mergedSynonyms = addedSynonyms.filter(function (synonym) {
      return state.selectedProduct.synonyms.indexOf(synonym) < 0
    })
    state.selectedProduct.synonyms.push(...mergedSynonyms)
  }
}

const actions = {

  setProductsToTender: ({commit}, enteredProduts) => {
    commit('SET_PRODUCTS_TO_TENDER', enteredProduts)
  },
  getTenders: ({commit, rootState}) => {
    state.tenders.push(rootState.processedTenders)
  },

  selectProduct: ({commit}, product) => {
    commit('SELECT_PRODUCTS', product)
  },
  mergeSynonyms: ({commit}, arrOfAddedSynonyms) => {
    commit('ADD_SYNONYMS_TO_SELECTED_PRODUCT', arrOfAddedSynonyms)
  }
}

const getters = {
  getSelectedTender: state => {
    return state.selectedTender
  },
  getProcessedTenders: state => {
    return state.tenders
  },
  getProducts: state => {
    return state.products
  },
  getOpenEnteredProducts: state => {
    return state.openEnteredProducts
  },
  getOpenAddSynonymsWindow: state => {
    return state.openAddSynonymsWindow
  },
  getSelectedProduct: state => {
    return state.selectedProduct
  },
  getOpenSelectedTenderWindow: state => {
    return state.openSelectedTenderWindow
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
