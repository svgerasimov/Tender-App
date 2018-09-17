import currentTenders from '../../data/tenders'

const state = {
  currentTenders: [],
  selectedTender: '',
  tenderInfo: false
}

const getters = {
  getCurrentTenders: state => {
    return state.currentTenders
  }
}

const mutations = {
  'SET_TENDERS' (state, currentTenders) {
    this.currentTenders = currentTenders
  },
  'SHOW_TENDER' (state, selectedTender) {
    this.selectedTender = selectedTender
    this.tenderInfo = true
  }
}

const actions = {
  initTenders: ({commit}) => {
    commit('SET_TENDERS', currentTenders)
  },
  showTender: ({commit}) => {
    commit('SHOW_TENDER')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
