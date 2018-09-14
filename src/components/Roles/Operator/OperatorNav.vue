<template>
  <div>
    <v-toolbar
      color="blue darken-1"
      dark
      tabs
    >
      <v-tabs
        slot="extension"
        centered
        color="blue darken-1"
        slider-color="blue lighten-5"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.title"
          @click="$emit('showComponent', tab.name)"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    props: ['tabs']
  }
</script>
