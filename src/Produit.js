// produit.js
export default class Produit {
    constructor(id, nom, qte, photo) {
        this._id = id;
        this._nom = nom;
        this._qte = qte;
        this._photo = photo;
    }

    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

    get qte() {
        return this._qte;
    }

    get photo() {
        return this._photo;
    }
   
      get add1P() {
        return this.changerQuantite(this.qte + 1, "PUT")
      }
    
      get delete1P() {
        if (this.qte-1>=0){
        return this.changerQuantite(this.qte - 1, "PUT")
      }else
      {return 0;}
    }

      changerQuantite(qtechanger, method) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        return {
          method: method,
          headers: myHeaders,
          body: JSON.stringify({id: this.id, nom: this.nom, qte: qtechanger, photo: this.photo}),
        };
      }

   
        
      
      
    
}