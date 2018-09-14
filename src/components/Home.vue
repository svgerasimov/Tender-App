<template>

   <v-container fluid >
     <div class="fullscreen-video-wrap" style="padding: 0">
       <video src="../assets/background-video.mp4" autoplay="true" loop="true"></video>
     </div>

     <div class="video-overlay"></div>
     <v-container align-content-center class="video-content">

       <h1 class="h1 text-xs-center">КБ Автоматика - Тендерная площадка</h1>
     </v-container>
   </v-container>


</template>

<script>

  export default {

  }
</script>

<style>
  body {
    overflow-y: hidden;
  }
  .fullscreen-video-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .video-overlay {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: black;
    opacity: .3;

  }
  .video-content {
    position: absolute;
    z-index: 2;
    color: white;
  }
  .h1 {
    font-size: 36px;
    margin-bottom: 20px
  }

</style>
