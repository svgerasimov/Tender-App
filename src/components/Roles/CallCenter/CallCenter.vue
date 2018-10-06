<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <h1 class="text-xs-center">Дашборд оператора call-центра</h1>
          <pre>
              {{ displayTenders }}
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
                <td @click="openProvidersDialog(props.item)">{{ props.item.name }}</td>
               <!--  <td class="text-xs-right">
                 <span @click="openProvidersDialog(props.item)" v-for="product in props.item.products">{{ product }}</span> 
                 <span @click="openProvidersDialog(props.item)" v-for="product in props.item.products">{{ product }}</span> 
          
                </td> -->
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Ваш запрос "{{ search }}" не дал результатов.
              </v-alert>
            </v-data-table>
          </v-card>

        </v-flex>
      </v-layout>

      <!-- Добавить поставщика -->
      <provider :tender="selectedTender"></provider>
      <!-- Cоздать поставщика -->
      <create-provider :tender="selectedTender"></create-provider>

    </v-container>
  </v-content>

</template>


<script>
  import ProviderDialog from './Provider.vue'
  import CreateProvider from './CreateProvider.vue'

  export default {
    data(){
      return {
        search: '',
        headers: [
          { text: 'Название'}

        ],
        selectedTender: null
      }
    },
    computed: {
      displayTenders(){
        return this.$store.getters.getTendersCC
      }
    },
    components: {
      provider: ProviderDialog,
      CreateProvider
    },
    methods: {
      openProvidersDialog(tender){
        this.selectedTender = tender
        this.$store.commit('TOGGLE_PROV_WINDOW')
      }
    },
    created(){
      this.$store.dispatch('fetchSelectedTenders')
    }
  }
</script>



<style scoped>
  span {
    font-size: 14px;
    margin-right: 10px;
    transition: all .2s ease-in-out
  }
  span:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
</style>

