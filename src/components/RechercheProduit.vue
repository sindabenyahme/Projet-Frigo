<script setup>
import { defineEmits, defineProps } from "vue";


const emit = defineEmits(["searchP"]);

</script>
<template>
  
  <v-form @submit.prevent="$emit('searchP', motcle)" id="recherche">
    <v-text-field v-model="motcle" label="Rechercher ?" id="champ"></v-text-field>
    <v-btn type="submit" id="bouton" color="primary" class="mx-auto d-block btn-addd">Valider</v-btn>
  </v-form>
</template>

<style scoped>
.btn-addd{
 
  background-color: #1c9ee6;
  color: white; 
  text-align: center; 
  padding-left: 50px; 
  padding-right: 50px; 
}

.btn-addd:hover {
  
  background-color: #0056b3; 
}
</style>
