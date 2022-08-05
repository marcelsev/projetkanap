
// info du localStorage---------
      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
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
            localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
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
            if (changement == saveProduitLocalStorage){

            }else {

                localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
                changement.push(saveProduitLocalStorage.quantite)
            }

        console.log (changement);
            }) 
                  // toujours à travailler pour trouver comme faire 
            });  
// total products ---------------

        let totalProduct= [];
        for (let i = 0 ; i < saveProduitLocalStorage.length;i++){
        let quantiteTotal = saveProduitLocalStorage[i].quantite;
            totalProduct.push(quantiteTotal);
            //console.log(quantiteTotal)
        }
        const reducer = (accumulator, currentValue)=> accumulator + currentValue;
        const qtyTotalPanier = totalProduct.reduce(reducer,0);
            //console.log (qtyTotalPanier)
        const qtyAffichage= document.querySelector("#totalQuantity");
            qtyAffichage.innerHTML=qtyTotalPanier;

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

// formulaire--------------
        btnCommander= document.querySelector("#order");
        btnCommander.addEventListener("click", (e)=>{
            e.preventDefault();

            localStorage.setItem("firstName", document.querySelector("#firstName").value);
            localStorage.setItem("lastName", document.querySelector("#lastName").value);
            localStorage.setItem("address", document.querySelector("#address").value);
            localStorage.setItem("city", document.querySelector("#city").value);
            localStorage.setItem("email", document.querySelector("#email").value);
        })

// boutton valider commande-----------


//-------------------------------try
       //console.log(changeQty)
    /*function changerLaQuantite (){
        const changeQty = document.querySelectorAll("input");
        changeQty.forEach
        changeQty.addEventListener("change", (e)=>{
            e.preventDefault();
         let quantityChange= saveProduitLocalStorage[c].quantite;
         console.log(quantityChange);
          quantityChange = e.target.valueAsNumber;
            localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
            return quantityChange;
            //console.log(quantityChange) 
        })
        }     
    
    
        changerLaQuantite();*/