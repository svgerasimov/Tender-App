<template>
  <v-layout row justify-center>
    <v-dialog v-model="showProvidersDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline text-xs-center">
            Поставщики для товаров
            <template v-for="product in tender.products">
              {{ product }}
            </template>
          </span>
          <v-spacer></v-spacer>
          <v-btn @click="openCreateProviderWindow" outline color="indigo">Добавить своего поставщика</v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="showProviders"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td><a :href="props.item.link">{{ props.item.link }}</a></td>
            <td class="text-xs-center">{{ props.item.bind.length < 3 ? 'Нет' : props.item.bind }}</td>
            <template v-if="props.item.bind.length < 3">
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
            </template>
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
   created() {
     axios.get(`https://tenders-90270.firebaseio.com/providers.json`)
       .then(loadedProviders => {
         const providers = loadedProviders.data
         this.$store.commit('INIT_PROVIDERS',providers)
       })
   },

   data(){
     return {
       headers: [

         { text: 'Ссылка на поставщика', value: 'calories' },
         { text: 'Привязка к компании', value: 'fat' },
         { text: 'Действия', value: 'carbs' }

       ],
     }
   },
   props: ['tender'],
   methods: {
     openCreateProviderWindow(){
        this.$store.commit('TOGGLE_CREATE_PROV_WINDOW')
     },
     closeProvisers(){
       this.$store.commit('TOGGLE_PROV_WINDOW')
     }
   },
   computed: {
     ...mapGetters([
       'showProvidersDialog',
       'showProviders'
     ]),
   },
 }
</script>
