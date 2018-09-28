<template>
  <v-dialog v-model="getOpenEnteredProducts" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
           <product-matches v-for="enteredProduct in getProcessedTenders"
                             :enteredProduct="enteredProduct"
                              >{{ enteredProduct }}
            </product-matches>
          </v-layout>


        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="closeWindow">Готово</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'
  import productMatches from './ProductsMatchesRow.vue'

  export default {

    computed: {
      ...mapGetters([
        'getOpenEnteredProducts',
        'getProcessedTenders'
        ]
      )
    },
    components: {
      productMatches
    },
    methods: {
      closeWindow(){
        this.$store.commit('TOGGLE_ENTERED_PRODUCTS_WINDOW')
      }
    }


  }
</script>
