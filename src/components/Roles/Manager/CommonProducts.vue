<template>
  <v-layout row justify-center>
    <v-dialog v-model="openCommonProductsDialog" persistent max-width="500px">

      <v-card>
        <v-card-title>
          <span class="headline">Найденные совпадения</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="items"
                  v-model="value"
                  label="Найдено"
                  multiple
                >
                  <template
                    slot="selection"
                    slot-scope="{ item, index }"
                  >
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="grey--text caption"
                    >(+{{ value.length - 1 }} других)</span>
                  </template>
                </v-select>
              </v-flex>
              <v-btn color="info" @click="openAddNewProducts">Добавить свой</v-btn>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeWindow">Отменить удаление</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeWindow">ОК</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
        items: ['Солпаделние 1', 'Солпаделние 2', 'Солпаделние 3', 'Солпаделние 4'],
        value: ['Солпаделние 1', 'Солпаделние 2', 'Солпаделние 3']
      }
    },
    computed: {
      ...mapGetters([
        'openCommonProductsDialog'
      ])
    },
    methods: {
      closeWindow(){
        this.$store.commit('TOGGLE_COMMON_PRODUCTS')
      },
      openAddNewProducts(){
        this.$store.commit('TOGGLE_ADD_PRODUCTS_PRODUCTS')
      }
    }
  }
</script>
