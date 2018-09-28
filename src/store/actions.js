
import axios from 'axios'

export const loadProducts = ({commit}) => {
  axios.get(`https://tenders-90270.firebaseio.com/products.json`)
    .then(loadedProducts => {
      if (loadedProducts) {
        const products = loadedProducts
        commit('SET_PRODUCTS', products)
      }
    })
}
