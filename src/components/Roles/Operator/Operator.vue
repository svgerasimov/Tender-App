<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="text-xs-center">Дашборд Оператора</h1>

        <buttons />
        <operator-nav :tabs="tabs" @showComponent="selectedComponent = $event"></operator-nav>
        <component :is="selectedComponent"></component>



      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import buttons from './Buttons.vue'
  import processedTenders from './ProcessedTenders.vue'
  import products from './Products.vue'
  import operatorNav from './OperatorNav.vue'

  export default {
    data(){
      return {
        selectedComponent: 'processedTenders',
        tabs: [
          {
            title: 'Обработанные тендеры',
            name: 'processedTenders'
          },
          {
            title: 'Товары',
            name: 'products'
          },
        ]
      }
    },
    components: {
      buttons,
      processedTenders,
      products,
      operatorNav
    }
  }
</script>
