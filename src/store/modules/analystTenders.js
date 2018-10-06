
const state = {
  selectedTender: '',
  openTendersDialog: false, // open CurrentTenders Dialog window
  processedTenders: [],
  selectedTenders: []
}

const mutations = {
  'OPEN_CURRENT_TENDERS_WINDOW' (state) {
    state.openTendersDialog = !state.openTendersDialog
  },

  'SELECT_TENDER' (state, tender) {
    state.selectedTenders.push(tender)
    state.openTendersDialog = false
    
  },
  'PROCESS_TENDER' (state, tender) {
    state.selectedTender = tender
    state.processedTenders.push(tender)
    state.openTendersDialog = true
  }
}

const actions = {

  setProducts: ({commit}, products) => {
    commit('SET_ENTERED_PRODUCTS', products)
  },
  selectTender: ({commit}, tender) => {
    commit('SELECT_TENDER', tender)
  },
  processTender: ({commit}, tender) => {
    commit('PROCESS_TENDER', tender)
  }

}

const getters = {

  getSelectedTender: state => {
    return state.selectedTender
  },
  getProcessedTenders: state => {
    return state.processedTenders
  },
  getSelectedTenders: state => {
    return state.selectedTenders
  },
  getOpenTendersDialog: state => {
    return state.openTendersDialog
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
