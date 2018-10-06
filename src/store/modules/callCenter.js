
const state = {
  tenders: null,
  showProvidersDialog: false,
  showCreateProvider: false,
  providers: null
}

const mutations = {
  'TOGGLE_PROV_WINDOW' (state) {
    state.showProvidersDialog = !state.showProvidersDialog
  },
  'TOGGLE_CREATE_PROV_WINDOW' (state) {
    state.showCreateProvider = !state.showCreateProvider
  },
   'ADD_PROVIDER_TO_PRODUCT' (state, bindedProviderAndProduct) {
     state.tenders.forEach(tender => {
      for (let tenderProduct of tender.products) {
          if(tenderProduct.name === bindedProviderAndProduct.product.name) {
            tenderProduct.providers.push(bindedProviderAndProduct.provider)
      
          }
        }
    
    })

  },

  'ADD_PROVIDER_TO_ALL_PRODUCTS' (state, provider) {
     state.tenders.forEach(tender => {
      if (tender.id === provider.tender.id) {
        let product
        for (product of tender.products) {
          product.providers.push(provider.provider)
        }
        return
      }
     })
  }
}

const actions = {
  /* access selectedTenders state from AnalystTenders */
  fetchSelectedTenders (context) {
    state.tenders = context.rootState.analystTenders.selectedTenders
  },
  addProvidersToProducts ({commit}, bindedProviderAndProduct) {
    commit('ADD_PROVIDER_TO_PRODUCT', bindedProviderAndProduct)
  }
}

const getters = {
  getTendersCC: (state) => state.tenders,
  showProvidersDialog: (state) => state.showProvidersDialog,
  showCreateProv: (state) => state.showCreateProvider,
}

export default {
  state,
  mutations,
  actions,
  getters
}
