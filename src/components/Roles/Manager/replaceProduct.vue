<template>
  <v-layout row justify-center>
    <v-dialog v-model="openReplaceProductDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Введите наименование вместо товара {{ product }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="newNameOfProduct"
                    label="Введите новый товар вместо текущего"
                  ></v-text-field>


                </v-form>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          {{ newNameOfProduct }}
          <v-btn color="blue darken-1" flat @click.native.prevent="closeWindow">Отменить удаление</v-btn>
          <v-btn color="blue darken-1" flat @click.native.prevent="replaceProduct">ОК</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

export default {
  props: ['product'],
  data(){
    return {
      newNameOfProduct: '',
    }
  },
  computed: {
    ...mapGetters([
      'openReplaceProductDialog'
    ])
  },
  methods: {
    closeWindow(){
      this.newNameOfProduct = ''
      this.$store.commit('TOGGLE_REPLACE_PRODUCT')
    },
    replaceProduct(){
      this.$store.commit('TOGGLE_COMMON_PRODUCTS')
      this.$store.commit('TOGGLE_REPLACE_PRODUCT')
    }
  }
}
</script>
