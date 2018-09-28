<template>
  <v-container style="position: relative">
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.title"
          @click=""
        >

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
      >
      </v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="h4" >
          КБ Автоматика - Тендерная плащадка
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >{{ link.title }}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        links: [
          {
            title: 'Вход',
            url: '/login'
          },
          {
            title: 'Аналитик',
            url: '/analyst'
          },
          {
            title: 'Оператор',
            url: '/operator'
          },
          {
            title: 'Оператор Call-центра',
            url: '/call-center-operator'
          },
          {
            title: 'Менеджер',
            icon: '',
            url: '/manager'
          },
          {
            title: 'Руководитель',
            icon: '',
            url: '/head'
          }
        ]
      }
    }
  }
</script>

<style scoped="">
  .logo:hover {
    cursor: pointer
  }
</style>
