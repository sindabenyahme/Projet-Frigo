<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const { produit, handler1Add, handler1Delete , handlerDelete} = defineProps(["produit", "handler1Add", "handler1Delete", "handlerDelete"]);
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
  background-color: #f0f0f0; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.product-info {
  
  font-size: 20px; 
  color: #007bff; 
  font-family: "Times New Roman", Times, serif; 
}

.product-name {
  font-weight: bold;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif; 
}

.product-quantity {
  font-weight: bold;
  font-size: 25px;
  font-style: italic; 
}

.product-btn {
  background-color: #007bff; 
  color: #fff; 
  margin-right: 5px; 
}

.product-btn:hover {
  background-color: #0056b3; 
}
</style>
