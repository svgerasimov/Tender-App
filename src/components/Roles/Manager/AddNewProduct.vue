<template>
  <v-layout row justify-center>
    <v-dialog v-model="openAddNewProductsWindow" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавление товара</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="name"
                    label="Наименование товара"
                  ></v-text-field>

                </v-form>

                  <v-combobox
                    v-model="model"
                    :items="items"
                    :search-input.sync="search"
                    hide-selected
                    label="Введите ваши синонимы"
                    multiple
                    persistent-hint
                    small-chips
                  >
                    <template slot="no-data">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-combobox>


              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Отменить удаление</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">ОК</v-btn>
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
        dialog: false,
        name: '',
        items: ['Первый синоним'],
        model: ['Первый синоним'],
        search: null

      }
    },
    computed: {
      ...mapGetters([
        'openAddNewProductsWindow'
      ])
    },
  }
</script>
