<template>
  <v-dialog v-model="getOpenProductsWindowProp" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12>
              {{ getEnteredProducts }}
            </v-flex>
          </v-layout>
        </v-container>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="getOpenProductsWindowProp = false">Готово</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'getEnteredProducts',
        'getOpenProductsWindowProp'
        ]
      )
    }

  }
</script>
