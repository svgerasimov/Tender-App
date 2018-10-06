<template>
  <v-layout row justify-center>
    <v-dialog v-model="showProvidersDialog" persistent max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline text-xs-center">
         
            Список потенциальных поставщиков для тендера
    
             <p v-bind:style="{fontStyle: italic}">{{ tender.name }}</p> 
           
          </span>
          <v-spacer></v-spacer>
          <v-btn @click="openCreateProviderWindow" outline color="indigo">Добавить своего поставщика</v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="tender.providers"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <div>{{ props.item.name }}</div>
              <v-btn style="margin-left: 0" small color="error">Ссылка невалидна</v-btn>
            </td>
            <td><a :href="props.item.link">{{ props.item.link }}</a></td>
            <td>
              <div style="margin-bottom: 10px; white-space: nowrap" v-for="(product, index) in tender.products">
              
                <span :class="{'strikethrough': (ind.indexOf(index) > -1)}">{{ product.name }}</span>
                <v-btn @click="approveSupplier(props.item, product, index)" flat icon color="green">
                  <v-icon>thumb_up</v-icon>
                </v-btn>

              </div>
            </td>
            <td>
              <div class="text-xs-center">
                <v-btn @click="addProviderToAllProducts(props.item)" round color="primary" dark>Да для всех</v-btn>
              </div>
            </td>
  
            <!-- <template v-if="props.item.bind.length < 3">
              <td class="text-xs-center">
                <div>
                  <v-btn @click="openCreateProviderWindow" :disabled="true" small color="primary">Создать поставщика</v-btn>
                </div>
                 <div>
                   <v-btn small color="error">Ссылка невалидна</v-btn>
                 </div>
              </td>
            </template>
            <template v-else>
              <td class="text-xs-center">
                <v-btn fab dark small color="success">
                  <v-icon dark>Да</v-icon>
                </v-btn>

                <v-btn fab dark small color="error">
                  <v-icon>Нет</v-icon>
                </v-btn>
              </td>
            </template> -->
          </template>

        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeProvisers">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'

 export default {
 
   data(){
     return {
       headers: [
         { text: 'Наименование компании', value: '' },
         { text: 'Ссылка на поставщика', value: '' },
         { text: 'Товары', value: '' },
       
       ],
       ind: []


     }
   },
   props: ['tender'],
   methods: {
     openCreateProviderWindow(){
        this.$store.commit('TOGGLE_CREATE_PROV_WINDOW')
     },
     closeProvisers(){
       this.$store.commit('TOGGLE_PROV_WINDOW')
     },


    approveSupplier(provider, product, index) {
      this.ind.push(index)
      const bindedProviderAndProduct = {
        provider,
        product
      }
      this.$store.commit('ADD_PROVIDER_TO_PRODUCT', bindedProviderAndProduct)
    },

    addProviderToAllProducts(provider) {
      const providerData = {
        provider,
        tender: this.tender
      }
      this.$store.commit('ADD_PROVIDER_TO_ALL_PRODUCTS', providerData)
      this.$store.commit('TOGGLE_PROV_WINDOW')

    }

   },
   computed: {
     ...mapGetters([
       'showProvidersDialog',
     ]),
   },
 }
</script>


<style scoped>
  .strikethrough {
    text-decoration: line-through;
  }
</style>

