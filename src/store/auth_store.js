import axios from '../axios-auth'
import globalAxios from 'axios'

const state = {
  idToken: null,
  userId: null,
  tenders: null,
}

const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
  },
  storeTenders (state, tenders) {
    tenders.forEach(tender => {
   //   tender['providers'] = []
      tender['synonyms'] = []
    })
    state.tenders = tenders
  },
  storeProviders (state, providers) {
    state.providers = providers
  }
}

const actions = {
  login ({commit}, authData) {
    return new Promise((resolve, reject) => {
      axios.post('/verifyPassword?key=AIzaSyBtsrrBog7kE3NYpQhxxtIsdYKLugX9Ds8', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
    
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000) 
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          resolve(res)
        })
      
        .catch(error => reject(error))
    })
    
  },

  tryAutoLogin ({commit}) {
    const token = localStorage.getItem('token')
    if(!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId')
    commit('authUser', {
      token,
      userId
    })

  },

  fetchTenders ({commit}) {
    if(!state.idToken){
      return
    }
    globalAxios.get(`/tenders.json?auth=${state.idToken}`)
       .then(loadedTenders => {
         const tenders = loadedTenders.data
         commit('storeTenders', tenders)
    
       })
       .catch(error => console.log(error))
  },


}

const getters = {
  fetchTenders (state) {
    return !state.tenders ? false : state.tenders
  },
  isAuthenticated (state) {
    return state.idToken !== null
  },
  fetchProviders (state) {
    return !state.providers ? false : state.providers
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
