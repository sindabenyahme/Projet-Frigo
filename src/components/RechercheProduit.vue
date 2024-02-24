<script setup>
import { defineEmits, defineProps } from "vue";

// -- les events émis par le composant
const emit = defineEmits(["searchP"]);
// -- handler utile si on veut gérer le submit de cette manière
// <form @submit.prevent="handlerSubmit">
</script>
<template>
  <!-- Utilisation des composants Vuetify -->
  <v-form @submit.prevent="$emit('searchP', motcle)" id="recherche">
    <v-text-field v-model="motcle" label="Rechercher ?" id="champ"></v-text-field>
    <v-btn type="submit" id="bouton" color="primary" class="mx-auto d-block btn-addd">Valider</v-btn>
  </v-form>
</template>

<style scoped>
.btn-addd{
  /* Style du bouton "Valider" */
  background-color: #007bff; /* Couleur de fond bleue */
  color: white; /* Couleur du texte blanc */
  text-align: center; /* Centrage horizontal du texte */
  padding-left: 50px; /* Ajout de marge à gauche */
  padding-right: 50px; /* Ajout de marge à droite */
}

.btn-addd:hover {
  /* Style du bouton "Valider" au survol */
  background-color: #0056b3; /* Couleur de fond plus foncée */
}
</style>
