<template>

  <v-content v-if="fetchTenders">
    <v-card style="margin-top: 40px;">
      <v-card-title>
        <h3>Тендеры</h3>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <pre>
         {{ getProcessedTenders }}
      </pre>
             {{ getSelectedTenders }}
         
      <v-data-table
        :headers="headers"
        :items="fetchTenders"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left" @click="processTender(props.item)" >{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.area }}</td>
          <td class="text-xs-left">{{ props.item.uploadDate }}</td>
          <td class="text-xs-left">{{ props.item.expirationDate }}</td>
          <td class="text-xs-left">{{ props.item.price }}</td>

        </template>
    

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Такой тендер не найден
        </v-alert>
      </v-data-table>
    </v-card>

    <!-- MODAL WINDOW -->

    <v-layout row justify-center>
      <v-dialog v-model="getOpenTendersDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ getSelectedTender.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <p><span class="font-weight-bold">Дата начала приёма заявок:</span> {{getSelectedTender.uploadDate  }}</p>
                </v-flex>
                <v-flex xs12>
                  <p><span class="font-weight-bold">Дата окончания приёма заявок:</span> {{ getSelectedTender.expirationDate  }}</p>
                </v-flex>
                <v-flex xs12>
                  <p><span class="font-weight-bold">Начальная цена:</span> {{ getSelectedTender.price  }}</p>
                </v-flex>
                <v-flex xs12>
                  <p><span class="font-weight-bold">Ссылка на тендер:</span> <a :href="getSelectedTender.link">{{ getSelectedTender.link }}</a></p>
                </v-flex>

              </v-layout>
            </v-container>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="closeWindow">Неинтересно</v-btn>
            <v-btn color="green darken-1" flat @click.native="selectTender(getSelectedTender)">Интересно</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


  </v-content>

</template>

<script>
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';

  import axios from 'axios'

  export default {
    data(){
     return {
       search: '',
       headers: [
         {
           text: 'Название',
           align: 'left',
           sortable: false,
           value: 'name'
         },
         { text: 'Площадка', value: 'area' },
         { text: 'Дата добавления', value: 'uploadDate' },
         { text: 'Дата окончания', value: 'expirationDate' },
         { text: 'Цена', value: 'price' }
       ]
     }
    },

    computed: {
      ...mapGetters([
        'getSelectedTender',
        'getProcessedTenders',
        'getSelectedTenders',
        'getOpenTendersDialog',
        'fetchTenders'
     
      ])
   
    
    },

    methods: {
      ...mapActions([
        'processTender',
        'selectTender'
      ]),
      closeWindow(){
        this.$store.commit('OPEN_CURRENT_TENDERS_WINDOW')
      }
    },

    created() {
      this.$store.dispatch('fetchTenders')
    }
  }
</script>
