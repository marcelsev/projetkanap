
// info du localStorage---------
      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("products"));
      console.log(saveProduitLocalStorage);
// id DOM----------------
      const ItemProduit = document.querySelector("#cart__items");
    
//afficher le produit sur le DOM-------------     
        if (saveProduitLocalStorage === null || saveProduitLocalStorage== 0 ) {
            const panierVide = `<article class="cart__item">Le panier est vide</article>`;
            ItemProduit.innerHTML= panierVide;
        } else {
        for (let i = 0; i < saveProduitLocalStorage.length; i++){
        //console.log(saveProduitLocalStorage.length);
    // article--------------

        let article = document.createElement("article");
            article.innerHTML="";
            article.classList.add("cart__item")
    //image------------------
        let containerImg= document.createElement("div");
            article.append(containerImg);   
            containerImg.classList.add("cart__item__img")   
        let img= document.createElement("img")
            img.src= saveProduitLocalStorage[i].imgUrl;
            img.alt=saveProduitLocalStorage[i].imgAlt; 
                containerImg.append(img);

    //contenu-----------           
        let containerContenu = document.createElement("div");
            article.append(containerContenu);
            containerContenu.classList.add("cart__item__content");
    //contenu description--------
        let containerContenuDescription= document.createElement("div");
            containerContenu.append(containerContenuDescription);
            containerContenuDescription.classList.add("cart__item__content__description");
    //nom----------- 
        let h2 = document.createElement("h2")
            h2.innerHTML= saveProduitLocalStorage[i].nameProduct;
    //color---------

        let colorItem= document.createElement("p");
            colorItem.innerHTML= saveProduitLocalStorage[i].colorProduct;
    //prix------------------
        let prixItem = saveProduitLocalStorage[i].price;
        let qtyItem = saveProduitLocalStorage[i].quantite;
        let multiplication = prixItem * qtyItem;
        let priceItem = document.createElement("p");
            priceItem.innerHTML= `Total produits: ${multiplication}€`;
            containerContenuDescription.append(h2, colorItem, priceItem);
    //product parametres------
        let parametresItem= document.createElement("div");
            parametresItem.classList.add("cart__item__content__settings");
            article.append(parametresItem);
    // quantite product ---------         
        let quantiteItem=document.createElement("div");
            quantiteItem.classList.add("cart__item__content__settings__quantity")
            parametresItem.append(quantiteItem);
        let parQte= document.createElement("p");
            parQte.innerHTML= "Qté : "; 
            quantiteItem.append(parQte);
    //input------
        let inputQte= document.createElement("input");
            inputQte.type= "number"
            inputQte.name= "itemQuantity"
            inputQte.min = "1"
            inputQte.max = "100"
            inputQte.valueAsNumber= saveProduitLocalStorage[i].quantite
            inputQte.classList.add("itemQuantity")   
            quantiteItem.append (inputQte);   
    // bouton supprimer---------
        let buttonDelete = document.createElement("div");
            buttonDelete.classList.add("cart__item__content__settings__delete")
            parametresItem.append(buttonDelete);
        let pDelete= document.createElement("p");
            pDelete.classList.add("deleteItem");
            pDelete.innerHTML="Supprimer";
            buttonDelete.append(pDelete);

            ItemProduit.append(article);
        }}       

// gestion bouton suppimer------------------- 
        let boutonSupprimer = document.querySelectorAll(".deleteItem");

        for (let s = 0 ; s < boutonSupprimer.length; s++ ){
            boutonSupprimer[s].addEventListener("click", (e) =>{
             e.preventDefault();
    
        let selectProductSup = saveProduitLocalStorage[s].idProduit;
            console.log(selectProductSup);
            saveProduitLocalStorage= saveProduitLocalStorage.filter( (el) => el.idProduit !== selectProductSup);
            localStorage.setItem("products", JSON.stringify(saveProduitLocalStorage));
            alert("Ce produit a été supprimé");
            window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        })
        }

// changer quantite -------------
        const changeQty = document.querySelectorAll("input");
            changeQty.forEach((quantiteInput)=>{
            quantiteInput.addEventListener('change', (e)=>{
            e.preventDefault();
        let changement= saveProduitLocalStorage.quantite;
            changement = e.target.valueAsNumber;
            if (changement == saveProduitLocalStorage.quantite){

            }else {
                
            }

        console.log (changement);
            }) 
                  // toujours à travailler pour trouver comme faire 
            });  
// total products ---------------
            let totalProduct= [];
            for (let i = 0 ; i < saveProduitLocalStorage.length;i++){
                let quantiteTotal = saveProduitLocalStorage[i].quantite;
                let changerNumber = Number(quantiteTotal);
                    totalProduct.push(changerNumber);
                    //console.log(quantiteTotal)
                }
                const reducer = (accumulator, currentValue)=> accumulator + currentValue;
                const qtyTotalPanier = totalProduct.reduce(reducer,0);
                    //console.log (qtyTotalPanier)
                const qtyAffichage= document.querySelector("#totalQuantity");
                    qtyAffichage.innerHTML=qtyTotalPanier;

       /*let totalProduct= [];
        for (let i = 0 ; i < saveProduitLocalStorage.length;i++){
        let quantiteTotal = saveProduitLocalStorage[i].quantite;
            totalProduct.push(quantiteTotal);
            console.log(quantiteTotal)
        }
        const reducer = (accumulator, currentValue)=> accumulator + currentValue;
        const qtyTotalPanier = totalProduct.reduce(reducer,0);
            //console.log (qtyTotalPanier)
        const qtyAffichage= document.querySelector("#totalQuantity");
            qtyAffichage.innerHTML=qtyTotalPanier;*/

// total price --------------------
        let totalPrice = [];
        for(let p = 0; p< saveProduitLocalStorage.length; p++){
        let prixTotalProduct= saveProduitLocalStorage[p].price * saveProduitLocalStorage[p].quantite;
            totalPrice.push(prixTotalProduct);
        //console.log(prixTotalProduct);
        }
        const prixPayer = totalPrice.reduce(reducer,0);
        //console.log (prixPayer)
        const priceAffichage= document.querySelector("#totalPrice");
            priceAffichage.innerHTML=prixPayer;

// formulaire gestion --------------------------
        let btnCommander= document.querySelector("#order");
        btnCommander.addEventListener("click", (e)=>{
            e.preventDefault();
        const formulaireInfoClient={
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value
        }
       
     // valider le formulaire ----------------------------
        // erreur de text dans le formulaire-------------------
        const regexFormulaire = (value)=>{
            return /^([A-Z a-z]{3,20})?([-]{0,1})?([A-Z a-z]{3,20})$/.test(value);
        }
        // gestion validation de text -------------------
            
            //Prenom--------
        function validerPrenom (){
          const prenom = formulaireInfoClient.firstName;
          if(regexFormulaire(prenom)){
            document.querySelector("#firstNameErrorMsg").textContent= "";
            return true;
          }else{
            document.querySelector("#firstNameErrorMsg").textContent= "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
            return false;
            }
        }

            //Nom----------
        function validerNom (){
          const nom = formulaireInfoClient.lastName;
          if(regexFormulaire(nom)){
             document.querySelector("#lastNameErrorMsg").textContent="";
             return true;
          }else{
             document.querySelector("#lastNameErrorMsg").textContent= "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
             return false;
             }
        }
        
            //Ville---------
        function validerVille (){
          const ville = formulaireInfoClient.city;
          if(regexFormulaire(ville)){
             document.querySelector("#cityErrorMsg").textContent="";
             return true;
          }else{
             document.querySelector("#cityErrorMsg").textContent= "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
             return false;
             }
        }
       
            //Address-------
        function validerAdresse (){
          const adresse = formulaireInfoClient.address;
          if(/^[0-9]{1,20}[A-Z a-z]{1,20}[0-9]{5,5}$/.test(adresse)){
              document.querySelector("#addressErrorMsg").textContent= "";
              return true;
          }else{
              document.querySelector("#addressErrorMsg").textContent= "Indiquez dans cet ordre: le numéro l'adresse et le code postal. ";
              return false;
              }
        }
                
            //Email----------
        function validerEmail (){
          const email = formulaireInfoClient.email;
          if(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)){
              document.querySelector("#emailErrorMsg").textContent="";
              return true;
          }else{
              document.querySelector("#emailErrorMsg").textContent= "Saisissez une adresse Email valide ";
              return false;
              }
        }
                    
       //----Valider l'info ---------- 
        if (validerPrenom()&& validerNom() && validerAdresse()&& validerVille() && validerEmail()){
          localStorage.setItem("contact", JSON.stringify(formulaireInfoClient));
        }else{
          alert ("Veuillez bien remplir le formulaire");
        }
        const envoyerCommande= {
            saveProduitLocalStorage,
            formulaireInfoClient
        }
        console.log(envoyerCommande);
        // boutton valider commande-----------
        const envoyerData = fetch ('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(envoyerCommande),
            headers:{ "Content-Type": "application/json",},

        });
        console.log (envoyerData);
        });




//-------------------------------try
  