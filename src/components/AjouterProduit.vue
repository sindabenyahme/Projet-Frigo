<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const { produit,handlerAdd} = defineProps(["produit","handlerAdd"]);

const nomProduit = ref('');
const quantite = ref(0);
const photoUrl = ref('');

const ajouterProduit = () => {
  if (!nomProduit.value || !quantite.value || !photoUrl.value) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  // Appeler la fonction handlerAdd avec les données saisies par l'utilisateur
  handlerAdd(nomProduit.value, quantite.value, photoUrl.value);

  // Réinitialiser les champs après l'ajout du produit
  nomProduit.value = '';
  quantite.value = 0;
  photoUrl.value = '';
};
</script>

<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="text-center">
        <v-container>
          <v-row class="row">
            <v-col cols="12">
              <h3 class="title">Ajouter un Produit</h3>
              <v-text-field v-model="nomProduit" label="Nom du produit" persistent></v-text-field>
              <v-text-field v-model.number="quantite" label="Quantité" persistent></v-text-field>
              <v-text-field v-model="photoUrl" label="URL de la photo" persistent></v-text-field>
              <br>
              <v-btn @click="ajouterProduit" class="v-btn--small btn-add">Ajouter</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<style scoped>
.title {
  /* Style du titre "Ajouter un Produit" */
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  color: #1c9ee6; /* Couleur bleue */
  text-align: center;
}

.btn-add {
  /* Style du bouton "Ajouter" */
  background-color: #007bff; /* Couleur de fond bleue */
  color: white; /* Couleur du texte blanc */
  transition: background-color 0.3s, color 0.3s; /* Transition douce des couleurs */
  text-align: center;
  padding-left: 50px; 
  padding-right: 50px;/* Centrage horizontal */
}

.btn-add:hover {
  /* Style du bouton "Ajouter" au survol */
  background-color: #0056b3; /* Couleur de fond des boutons */
  color: #fff; /* Couleur du texte reste blanc */
}
</style>

