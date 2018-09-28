<template>
  <v-flex xs12>
    <v-card color="blue" class="white--text">
      <template v-if="enteredProduct.products">
      <v-card-title primary-title v-for="product in enteredProduct.products">

          <div class="col-sm-4 mr-2">{{ product }} </div>
          <p>Совпадений не найдено</p>
          <v-btn color="primary" fab small dark @click="">
            <v-icon>add</v-icon>
          </v-btn>
      </v-card-title>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
  import {mapActions} from 'vuex'

 export default {
   props: [
     'enteredProduct'
   ],
   data(){
     return {
       products: [ ],
       value: []
     }
   },

   methods: {
     ...mapActions([
     ]),
   }

 }
</script>
