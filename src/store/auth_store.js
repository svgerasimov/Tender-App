import axios from '../axios-auth'
import globalAxios from 'axios'

const state = {
  idToken: null,
  userId: null,
  tenders: null
}

const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
  },
  storeTenders (state, tenders) {
    tenders.forEach(tender => {
      tender['providers'] = []
    })
    state.tenders = tenders
  }
}

const actions = {
  login ({commit}, authData) {
    axios.post('/verifyPassword?key=AIzaSyBtsrrBog7kE3NYpQhxxtIsdYKLugX9Ds8', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => {
        console.log(res)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId
        })
      }
        )
      .catch(error => console.log(error))
  },
  fetchTenders ({commit}) {
    globalAxios.get(`/tenders.json?auth=${state.token}`)
       .then(loadedTenders => {
         const tenders = loadedTenders.data
         commit('storeTenders', tenders)
       })
       .catch(error => console.log(error))
  }
}

const getters = {
  tendersGet (state) {
    return state.tenders
  },
  isAuthenticated (state) {
    return state.idToken !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
