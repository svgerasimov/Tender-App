<template>
  <v-layout row justify-center>
    <v-dialog v-model="getOpenAddSynonymsWindow" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавление товара</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <span class="font-weight-bold sm-6">Наименование:</span>
                <span class="sm-6">{{ getSelectedProduct.name }}</span>
              </v-flex>
              <v-flex xs12 sm12 mt-4>
                <v-combobox
                  v-model="addedSynonyms"
                  label="Введите синонимы"
                  multiple
                  persistent-hint
                  small-chips
                >
                </v-combobox>

              </v-flex>

            </v-layout>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="addSynonyms">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>


<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    data(){
      return {
        addedSynonyms: [],
      }
    },

    computed: {
      ...mapGetters([
        'getOpenAddSynonymsWindow',
        'getSelectedProduct',
      ])
    },
    methods: {
      ...mapActions([
        'mergeSynonyms'
      ]),

      addSynonyms(){
        this.mergeSynonyms(this.addedSynonyms)
        this.$store.commit('TOGGLE_ADD_SYNONYMS_WINDOW')
      }
    }

  }
</script>
