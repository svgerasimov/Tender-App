<template>
  <v-data-table
    :headers="headers"
    :items="processedTenders"
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
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.area }}</td>
      <td class="text-xs-right">{{ props.item.uploadDate }}</td>
      <td class="text-xs-right">{{ props.item.expirationDate }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data(){
      return {
        selectedTender: '',
        tenderInfo: false,

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
  }
</script>
