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
  // -- il faut créer un nouveau "livre" instance de la classe

  console.log(nom, qte);
  if (qte <= 0) {
    // Si la quantité est négative ou nulle, on force la quantité à 1
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
  /* on récupère le mot clé nécessaire à la recherche */
  const fetchOptions = { method: "GET" };

  fetch(url + "?search=" + motcle, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let ProduitExist = dataJSON;
      let rechercheElement = document.getElementById("recherche");
      rechercheElement.innerHTML = ""; // Clear existing content
      let ulElement = document.createElement("ul");
      ulElement.style.listStyleType = "none"; // Désactiver les points de la liste
      for (let p of ProduitExist) {
        let liElement = document.createElement("li");
        let imageElement = document.createElement("img");
        imageElement.src = p.photo;
        // Ajout de la classe CSS au style de l'image
        imageElement.style.cssText = "width: 200px; height: auto; display: block; margin: 0 auto;"; // Exemple de style CSS pour centrer l'image
        liElement.appendChild(imageElement);

        // Création d'un élément de paragraphe pour afficher le nom et la quantité restante
        let messageElement = document.createElement("p");
        messageElement.textContent = p.nom + "  il en reste " + p.qte;
        messageElement.style.textAlign = "center"; // Centrer le texte
        messageElement.style.color = "#007bff"; // Couleur du texte
        messageElement.style.fontSize = "20px"; // Taille de la police
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
  <p id="ici2"></p>
  <h3>Liste des Produits</h3>
  <v-row dense>
    <!-- Boucle pour afficher les cartes produits -->
    <CarteProduit v-for="produit in listeP"
                   :key="produit.id"
                   :produit="produit"
                   :handler1Delete="handler1Delete"
                   :handler1Add="handler1Add"
                   :handlerDelete="handlerDelete"
                   />
    <AjouterProduit :handlerAdd="handlerAdd"/>
    
  </v-row>
  <p id="ici"></p>
  <h3>Rechercher un Produit</h3>

  <RechercheProduit @searchP="handlerSearch" />
  
</div>

</template>




<style scoped>
h3 {
  text-align: center;
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  color: #1c9ee6;
}

#ici{
padding-top: 50px;
}
#ici2{
  padding-bottom: 20px;
}

</style>

