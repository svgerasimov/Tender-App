const state = {
  tenders: []
}

const mutations = {
}

const actions = {
  getTenders: ({commit, rootState}) => {
    state.tenders.push(rootState.processedTenders)
  }
}

const getters = {
  getProcessedTenders: state => {
    return state.tenders
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
