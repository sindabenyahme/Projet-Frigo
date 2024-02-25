<script setup>
import {onMounted, reactive} from "vue";
import Produit from "../Produit.js";
import CarteProduit from "@/components/CarteProduit.vue";
import AjouterProduit from "../components/AjouterProduit.vue"
import RechercheProduit from "../components/RechercheProduit.vue";

const listeP = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/5/produits"

function getProduit() {
  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((dataJson) => {
      console.log(dataJson)
      listeP.splice(0, listeP.length);
      for (let produit of dataJson) {
        listeP.push(new Produit(produit.id, produit.nom, produit.qte, produit.photo));
      }
      
    })
    .catch((error) => {
      console.log(error)
    })
}


onMounted(() => {
  getProduit();
})



function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return { status: 1 }; // Succès
      } else {
        return { status: 0 }; // Échec
      }
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProduit()
    })
    .catch((error) => {
      console.error(error);
      return { status: 0 }; // Échec en cas d'erreur
    });
}




function ModifierP(fetchUrl, fetchOptions) {
  fetch(fetchUrl, fetchOptions)
    .then((reponse) => {
      return reponse.json();
    })
    .then((dataJson) => {
      if (dataJson.status !== 1) {
        console.log(fetchOptions);
      }
      getProduit();
    })
    .catch((error) => {
      console.log(error)
      console.log(fetchOptions)
    })
}


function handler1Add(p) {
 ModifierP(url,p.add1P)
}
  
function handler1Delete(p) {
 ModifierP(url,p.delete1P)
}


function handlerAdd(nom, qte, photo) {
  console.log(nom, qte);
  if (qte <= 0) {
    
    qte = 1;
  }
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ id: Math.floor(Math.random() * 1000) + 100, nom: nom, qte: qte, photo: photo }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return { status: 1 }; // Succès
      } else {
        return { status: 0 }; // Échec
      }
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProduit()
    })
    .catch((error) => {
      console.error(error);
      return { status: 0 }; // Échec en cas d'erreur
    });
}

function handlerSearch(motcle) {
  const fetchOptions = { method: "GET" };
  fetch(url + "?search=" + motcle, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let ProduitExist = dataJSON;
      let rechercheElement = document.getElementById("recherche");
      rechercheElement.innerHTML = ""; 
      let ulElement = document.createElement("ul");
      ulElement.style.listStyleType = "none";
      for (let p of ProduitExist) {
        let liElement = document.createElement("li");
        let imageElement = document.createElement("img");
        imageElement.src = p.photo;
        imageElement.style.cssText = "width: 200px; height: auto; display: block; margin: 0 auto;"; 
        liElement.appendChild(imageElement);
        let messageElement = document.createElement("p");
        messageElement.textContent = p.nom + "  il en reste " + p.qte;
        messageElement.style.textAlign = "center"; 
        messageElement.style.color = "#007bff";
        messageElement.style.fontSize = "20px"; 
        liElement.appendChild(messageElement);

        ulElement.appendChild(liElement);
      }
      rechercheElement.appendChild(ulElement);
    })
    .catch((error) => console.log(error));
}






</script>

<template>
 <div>
  <p id="ici"></p>
  <h3>Qu'est-ce que vous voulez manger ? </h3>

  <RechercheProduit @searchP="handlerSearch" />
  <p id="ici2"></p>
  <h3>Les aliments qu'on propose</h3>
  <v-row dense>
   
    <CarteProduit v-for="produit in listeP"
                   :key="produit.id"
                   :produit="produit"
                   :handler1Delete="handler1Delete"
                   :handler1Add="handler1Add"
                   :handlerDelete="handlerDelete"
                   />
    <AjouterProduit :handlerAdd="handlerAdd"/>
    
  </v-row>
  
  
</div>

</template>




<style scoped>
h3 {
  text-align: center;
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  color: #1c9ee6;
  padding: 20px;
}

#ici{
padding-top: 50px;
}
#ici2{
  padding-bottom: 20px;
}

</style>

