<template>

  <v-content>
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

      <v-data-table
        :headers="headers"
        :items="getCurrentTenders"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left" @click="showTender(props.item)" >{{ props.item.name }}</td>
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
    {{ getProcessedTenders }}


    <!-- MODAL WINDOW -->

      <v-dialog v-model="getTenderInfo" persistent max-width="290">
    <!--    <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>-->

          <v-card class="p-2">
            <v-card-title class="h5">{{ getSelectedTender.name }}</v-card-title>
            <p class="ml-3">Дата начала приёма заявок: {{ displayUploadDate  }}</p>
            <p class="ml-3">Дата окончания приёма заявок: {{ displayExpirationDate  }}</p>
            <p class="ml-3">Начальная цена: {{ getSelectedTender.price  }}</p>
            <p class="ml-3">Ссылка на тендер: <a :href="getSelectedTender.link">{{ getSelectedTender.link }}</a> </p>
            <v-card-actions>

              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="getTenderInfo = false">Неинтересно</v-btn>
              <v-btn color="green darken-1" flat @click.native="processTender(getSelectedTender)">Интересно</v-btn>
            </v-card-actions>
          </v-card>


      </v-dialog>


  </v-content>

</template>

<script>
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';

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
       ],
     }
    },
    computed: {
      ...mapGetters([
        'getSelectedTender',
        'getTenderInfo',
        'getCurrentTenders',
        'getProcessedTenders'
      ]),
      displayUploadDate(){
        if(!!this.selectedTender){
          let date = this.selectedTender.uploadDate;
          let dd = date.getDate();
          let mm = date.getMonth()+1;
          let yy = date.getFullYear();

          if(dd < 10) {
            dd = '0'+ dd
          }

          if(mm < 10) {
            mm = '0'+ mm
          }
          return date = mm + '/' + dd + '/' + yy;

        }

      },
      displayExpirationDate(){
        if(!!this.selectedTender){
          let date = this.selectedTender.expirationDate;
          let dd = date.getDate();
          let mm = date.getMonth()+1;
          let yy = date.getFullYear();

          if(dd < 10) {
            dd = '0'+ dd
          }

          if(mm < 10) {
            mm = '0'+ mm
          }
          return date = mm + '/' + dd + '/' + yy;
        }
      },
    },
    methods: {
      ...mapActions([
        'showTender',
        'processTender'
      ])
    }
  }
</script>
