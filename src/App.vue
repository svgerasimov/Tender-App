<template>
  <v-app>

    <v-content>
      <template v-if="auth">
        <app-header></app-header>
      </template>
      <template v-else>
        <app-login-header></app-login-header>
      </template>

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
      appHeader: Header,
      appLoginHeader: HeaderLogin
    },
    computed: {
      auth(){
        return this.$store.getters.isAuthenticated
      }
    },

    data() {
      return {

      }
    },
    created() {
      axios.get(`https://tenders-90270.firebaseio.com/products.json`)
        .then(loadedProducts => {
          const products = loadedProducts.data
          this.$store.commit('SET_PRODUCTS',products)
        }),
        this.$store.dispatch('getProcessedTendersFromAnalystTenders');


    }

    }


</script>
