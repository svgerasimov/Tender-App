<template>
  <v-app>

    <v-content>
      <app-header></app-header>

      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
  import HeaderLogin from './components/HeaderLogin.vue'
  import Header from './components/Header.vue'
  import axios from 'axios'

  export default {
    components: {
      appHeader: Header
    },
    computed: {
      auth(){
        return this.$store.getters.isAuthenticated
      }
    },

    created() {
      this.$store.dispatch('tryAutoLogin')

     /*  axios.get(`https://tenders-90270.firebaseio.com/products.json`)
        .then(loadedProducts => {
          const products = loadedProducts.data
          this.$store.commit('SET_PRODUCTS',products)
        }),
        this.$store.dispatch('getProcessedTendersFromAnalystTenders'); */


    }

    }


</script>
