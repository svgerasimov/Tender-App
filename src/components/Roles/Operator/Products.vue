<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="displayTenders"
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
        <td>
         <div class="product" style="margin-bottom: 10px" v-for="product in props.item.products ">{{ product.name}}</div>
        </td>
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
        ]
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      displayTenders (){
      
      return this.$store.getters.getProcessedTenders
      },
      displayProducts (){
       return this.displayTenders
      }


    }
  }
</script>

<style scoped>
  .product {
    margin-right: 10px;
    font-size: 14px
  }

  .product:hover{
    cursor: pointer
  }
</style>
