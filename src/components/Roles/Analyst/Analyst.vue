<template>
  <v-content>
    <v-container>

      <v-layout>

        <v-flex xs12>

          <p>{{ name }}</p>

          <h1 class="text-xs-center">Дашборд аналитика</h1>

          <analyst-nav :tabs="tabs" @showComponent="selectedComponent = $event"></analyst-nav>

          <component :is="selectedComponent"></component>


        </v-flex>

      </v-layout>

    </v-container>
  </v-content>

</template>

<script>
  import currentTenders from './CurrentTenders.vue'
  import archivedTenders from './ArchivedTenders.vue'
  import analystNav from './Nav.vue'

  export default {
    data(){
      return {
        selectedComponent: 'currentTenders',
        tabs: [
          {
            title: 'Текущие тендеры',
            name: 'currentTenders'
          },
          {
            title: 'Архив',
            name: 'archivedTenders'
          }
        ]
      }
    },
    components: {
      currentTenders,
      archivedTenders,
      analystNav,
    },

    computed: {
      name () {
        return this.$store.state.name
      }
    }

  }

</script>
