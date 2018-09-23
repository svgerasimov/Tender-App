const state = {
  tenders: [],
  products: [],
  openProductsWindow: false
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
    state.openProductsWindow = true
  }
}

const actions = {
  getTenders: ({commit, rootState}) => {
    state.tenders.push(rootState.processedTenders)
  },
  setProducts: ({commit}, products) => {
    commit('SET_PRODUCTS', products)
  }
}

const getters = {
  getProcessedTenders: state => {
    return state.tenders
  },
  getEnteredProducts: state => {
    return state.products
  },
  getOpenProductsWindowProp: state => {
    return state.openProductsWindow
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
