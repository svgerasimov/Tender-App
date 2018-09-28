<template>
  <v-layout row justify-center>
    <v-dialog v-model="openSelectedTender" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ selectedTender.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <p><span class="font-weight-bold mr-3">Ссылка:</span><a :href="selectedTender.link">{{ selectedTender.link }}</a></p>

              </v-flex>
              <v-flex xs12 sm12>
                <p><span class="font-weight-bold mr-3">Дата начала обработки:</span>{{ selectedTender.uploadDate }}</p>
              </v-flex>
              <!-- Upload files Window  -->
              <upload-files></upload-files>

              <!-- Products -->
              <v-flex xs12 sm12>
                <v-combobox
                  v-model="products"
                  :products="products"
                  label="Товарные позиции"
                  multiple
                  small-chips
                >
                </v-combobox>
              </v-flex>

            </v-layout>

          </v-container>

        </v-card-text>
        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeSelectedTenderWindow">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addProductsToTender">Проверить</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapActions} from 'vuex';
  import uploadFiles from './UploadFile.vue'

  export default {
    components: {
      uploadFiles
    },
    props: ['selectedTender'],
    data(){
      return {
        products: [],
      }
    },
    methods: {
      ...mapActions({
        placeEnteredProducts: 'setProductsToTender',
        findIntersectedProducts: 'findCommonProducts'
      }),

      closeSelectedTenderWindow(){
        this.products = []
        this.$store.commit('TOGGLE_SELECTED_TENDER_WINDOW')
      },
      findCommonProducts(){
        this.findIntersectedProducts(this.products, this.selectedTender)
      },
      addProductsToTender(){
        this.selectedTender['products'] = this.products
        this.$store.commit('TOGGLE_ENTERED_PRODUCTS_WINDOW')

      }
    },
    computed: {
      openSelectedTender(){
        return this.$store.getters.getOpenSelectedTenderWindow
      },

    }





  }
</script>
