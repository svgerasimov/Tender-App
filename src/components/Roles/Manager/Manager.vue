<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <h1>Дашборд менеджера</h1>
      
  
          <pre>
            {{ displayTenders }}
          </pre>

            <pre>
              {{ selectedProduct }}
            </pre>
                    

          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="displayTenders"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-flex xs12 sm6>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="props.item.menu"
                      :nudge-right="40"
                      :return-value.sync="props.item.expirationDate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="330px"
                    >
                      <v-combobox
                        slot="activator"
                        v-model="props.item.expirationDate"
                        multiple
                        chips
                        small-chips
                        label="Дата окончания тендера"
                        prepend-icon="event"
                        readonly
                      ></v-combobox>
                      <v-date-picker v-model="props.item.expirationDate" multiple no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="props.item.menu = false">Закрыть</v-btn>

                      </v-date-picker>
                    </v-menu>
                  </v-flex>


                </td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">
        
                  <tr v-for="product in props.item.products">
                    <v-layout row align-center>
                          <v-flex xs6>
                      <span>{{ product.name }}</span>
                      <v-btn @click="pickProduct(product)"  flat icon color="red">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs6>

                      <template v-if="product.providers.length <= 1">
                        <span>{{ product.providers[0].name }}</span>
                      </template>

                      <template v-else>
                        <v-select
                        v-model="select"
                        :items="product.providers"
                        item-text="name"
                        label="Поставщики"
                        persistent-hint
                        return-object
                        single-line

                      ></v-select>
                      </template>

                    </v-flex>
                    </v-layout>
                    
                    
            

                  </tr>
                </td>
        

              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                По вашему запросу "{{ search }}" совпадений не нашлось.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>




    </v-container>
    
    <!-- REPLACE PRODUCT DIALOG -->
      <replace-product></replace-product>
  </v-content>

</template>

<script>
import replaceProduct from './ReplaceProduct.vue'


  export default {
    components: {
      replaceProduct
    },
  
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Дата окончания',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Тендеры', value: 'calories' },
          { text: 'Товары и поставщики', value: 'fat' },
       
        ],
        selectedProduct: null,
      }
    },

    computed: {
      displayTenders(){
        return this.$store.getters.getTendersM
      },
     
     
    },
    methods: {
      pickProduct(product){
        this.selectedProduct = product
        this.$store.commit('TOGGLE_REPLACE_PRODUCT')
      }
     

    },

    created() {
      this.$store.dispatch('getProcessedTendersFromAnalystTenders')
    
      const output = []
      let chunk = []
      let chunk2 = []
      this.displayTenders.forEach(tender => {
        output.push(tender.expirationDate)
      })
      while(output.length > 0) {
        chunk = output.splice(0, 1)
        chunk2.push(chunk)
      }
      this.displayTenders.forEach((tender, index) =>{
        tender.expirationDate = chunk2[index]
      })
    }

  }
</script>

<style scoped>
  td a {
    display: block;
    margin-bottom: 10px;

  }
  
</style>
