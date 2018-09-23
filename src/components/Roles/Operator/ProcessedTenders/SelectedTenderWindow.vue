<template>
  <v-layout row justify-center>
    <v-dialog v-model="selectedTender.showTender" persistent max-width="500px">

      <v-card>
        <v-card-title>
          <span class="headline">{{ selectedTender.tender.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <h4>Ссылка: {{ selectedTender.tender.link }}</h4>
              </v-flex>
              <v-flex xs12 sm12>
                <h4>Дата начала обработки: {{ selectedTender.tender.uploadDate }}</h4>
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
          <v-btn color="blue darken-1" flat @click.native="selectedTender.showTender = false">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click.native="setProducts">Проверить</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapActions} from 'vuex';
  import uploadFiles from './UploadFile.vue'

  export default {
    data(){
      return {
        products: []
      }
    },
    props: ['selectedTender'],
    components: {
      uploadFiles
    },
    methods: {
      ...mapActions({
        placeEnteredProducts: 'setProducts'
      }),
      setProducts(){
        this.selectedTender.showTender = false
        const products = this.products
        this.placeEnteredProducts(products)
      }
    }




  }
</script>
