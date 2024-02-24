<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const { produit, handler1Add, handler1Delete, handlerAdd , handlerDelete} = defineProps(["produit", "handler1Add", "handler1Delete", "handlerAdd", "handlerDelete"]);

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
  <v-col
    cols="15"
    sm="6"
    md="3"
    lg="4"
    xl="2"
  >
    <v-card class="product-card">
      <v-img
        :src="`${produit.photo}`"
        :alt="`${produit.nom}` + ' image'"
        height="200px"
        weight="200px"
        cover
      ></v-img>
      <v-card-title class="text-center">
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="product-info">
                Nom: <span class="product-name"> {{ produit.nom }}</span> - Quantité: <span class="product-quantity">{{ produit.qte }}</span>
              </p>
              <br>
              <v-btn @click="handler1Delete(produit)" class="product-btn">-</v-btn>
              <v-btn @click="handlerDelete(produit.id)" class="product-btn">supprimer</v-btn>
              <v-btn @click="handler1Add(produit)" class="product-btn">+</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<style scoped>
.product-card {
  background-color: #f0f0f0; /* Couleur de fond de la carte */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

.product-info {
  
  font-size: 20px; /* Taille de la police */
  color: #007bff; /* Couleur du texte */
  font-family: "Times New Roman", Times, serif; /* Police */
}

.product-name {
  font-weight: bold;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif; /* Police */ /* Gras pour le nom du produit */
}

.product-quantity {
  font-weight: bold;
  font-size: 25px;
  font-style: italic; /* Italique pour la quantité */
}

.product-btn {
  background-color: #007bff; /* Couleur de fond des boutons */
  color: #fff; /* Couleur du texte des boutons */
  margin-right: 5px; /* Marge à droite pour espacement */
}

.product-btn:hover {
  background-color: #0056b3; /* Couleur de fond des boutons au survol */
}
</style>
