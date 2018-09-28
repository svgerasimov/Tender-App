
const state = {
  selectedTender: '',
  openTendersDialog: false, // open CurrentTenders Dialog window
  processedTenders: []
}

const mutations = {
  'OPEN_CURRENT_TENDERS_WINDOW' (state) {
    state.openTendersDialog = !state.openTendersDialog
  },

  'SHOW_TENDER' (state, selectedTender) {
    state.selectedTender = selectedTender
    state.openTendersDialog = true
  },
  'PROCESS_TENDER' (state, selectedTender) {
    state.processedTenders.push(selectedTender)
    state.openTendersDialog = false
  }
}

const actions = {

  setProducts: ({commit}, products) => {
    commit('SET_ENTERED_PRODUCTS', products)
  },
  showTender: ({commit}, payload) => {
    commit('SHOW_TENDER', payload)
  },
  processTender: ({commit}, payload) => {
    commit('PROCESS_TENDER', payload)
  }
}

const getters = {

  getSelectedTender: state => {
    return state.selectedTender
  },
  getTenderInfo: state => {
    return state.tenderInfo
  },
  getProcessedTenders: state => {
    return state.processedTenders
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
