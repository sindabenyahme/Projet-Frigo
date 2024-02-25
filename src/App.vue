<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact">
      <v-app-bar-title>Vous avez faim, bienvenue chez Frigo Sinda</v-app-bar-title>
      <v-btn to="/PageFrigo">Page Frigo</v-btn>
      <v-btn to="/">Home</v-btn>
    </v-app-bar>

    <v-main>
      <v-container :class="{ 'home-page': $route.path === '/' }">
        <!-- les "composant view" s'afficheront ici -->
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.page {
  min-height: 100vh;
  text-align: center;
}

.home-page {
  min-height: 100vh;
  text-align: center;
  background-image: url('../src/assets/images/FrigoSinda.png');
  background-size: cover;
  background-position: center;
}
</style>
