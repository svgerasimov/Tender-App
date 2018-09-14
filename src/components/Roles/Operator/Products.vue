<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
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
        <td class="text-xs-left">{{ props.item.synonyms }}</td>
        <td class="text-xs-left">{{ props.item.uploadDate }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Синонимы', value: 'synonyms' },
          { text: 'Дата добавления товара', value: 'uploadDate' },
          { text: 'Статус', value: 'status' }
        ],
        products: [
          {
            value: false,
            name: 'Товар 1',
            synonyms: 'Товар 45, Товар 56',
            uploadDate: new Date(2018, 24, 8),
            expirationDate: new Date(2018, 28, 9),
            status: 'Не проверено'
          },{
            value: false,
            name: 'Товар 2',
            synonyms: 'Товар 45, Товар 56',
            uploadDate: new Date(2018, 24, 8),
            expirationDate: new Date(2018, 28, 9),
            status: 'Отклонено'
          },{
            value: false,
            name: 'Товар 3',
            synonyms: 'Товар 45, Товар 56',
            uploadDate: new Date(2018, 24, 8),
            expirationDate: new Date(2018, 28, 9),
            status: 'Не проверено'
          },{
            value: false,
            name: 'Товар 4',
            synonyms: 'Товар 45, Товар 56',
            uploadDate: new Date(2018, 24, 8),
            expirationDate: new Date(2018, 28, 9),
            status: 'Отклонено'
          },{
            value: false,
            name: 'Товар 1',
            synonyms: 'Товар 45, Товар 56',
            uploadDate: new Date(2018, 24, 8),
            expirationDate: new Date(2018, 28, 9),
            status: 'Не проверено'
          },

        ]
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>
