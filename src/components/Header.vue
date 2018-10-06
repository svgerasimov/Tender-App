<template>
  <v-container style="position: relative">
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
    <template v-if="auth">
        <v-list>
        <v-list-tile
          v-for="link in authLinks"
          :key="link.title"
        >

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>
    <template v-else>
      <v-list>
        <v-list-tile
          v-for="link in notAuthLinks"
          :key="link.title"
        >

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>
    

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
        

        <template v-if="auth">
        <v-btn
          v-for="link in authLinks"
          :key="link.title"
          :to="link.url"
          flat
        >{{ link.title }}
        </v-btn>
    </template>
    <template v-else>
      <v-btn
          v-for="link in notAuthLinks"
          :key="link.title"
          :to="link.url"
          flat
        >{{ link.title }}
        </v-btn>
    </template>

      </v-toolbar-items>

    </v-toolbar>

  </v-container>
</template>

<script>
  export default {
  
    data () {
      return {
        drawer: false,
        authLinks: [
          /*{
            title: 'Вход',
            url: '/login'
          },*/
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
        ],
         notAuthLinks: [
          {
            title: 'Вход',
            url: '/login'
          },
          {
            title: 'Главная',
            url: '/'
          }
        ],
      }
    },

    computed: {
      auth(){
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style scoped="">
  .logo:hover {
    cursor: pointer
  }
</style>
