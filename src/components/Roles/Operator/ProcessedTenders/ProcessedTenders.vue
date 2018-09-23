<template>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="getProcessedTenders"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
            <span>
          {{ props.header.text }}
        </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td class="text-xs-right" @click = "selectTender(props.item)">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.area }}</td>
          <td class="text-xs-right">{{ props.item.uploadDate }}</td>
          <td class="text-xs-right">{{ props.item.expirationDate }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
        </template>

      </v-data-table>

      <!-- WINDOW WITH SELECTED TENDER -->
      <selected-tender-window :selectedTender="selectedTender"></selected-tender-window>

      <!-- WINDOW WITH ENTERED PRODUCTS -->
      <entered-products-window></entered-products-window>
    </v-container>

</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  import SelectedTenderWindow from './SelectedTenderWindow.vue'
  import EnteredProductsWindow from './EnteredProductsWindow.vue'

  export default {
    data(){
      return {
        selectedTender: {},
        showTender: false,
        search: '',
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Электронная площадка', value: 'area' },
          { text: 'Дата начала приёма заявок', value: 'uploadDate' },
          { text: 'Дата окончания приёма заявок', value: 'expirationDate' },
          { text: 'Начальная цена', value: 'price' }
        ],
      }
    },

    computed: {
      ...mapGetters([
        'getProcessedTenders'
      ])
    },

    methods: {
      selectTender(tender){
        this.selectedTender = {
          tender,
          showTender: true
        }
      }
    },

    components: {
      SelectedTenderWindow,
      EnteredProductsWindow
    }
  }
</script>
