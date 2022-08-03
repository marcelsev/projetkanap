

      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
      console.log(saveProduitLocalStorage);

      const ItemProduit = document.querySelector("#cart__items");
      //console.log (ItemProduit);

      

        
            
        if (saveProduitLocalStorage === null) {
            const panierVide = `<article class="cart__item">Le panier est vide</article>`;
            ItemProduit.innerHTML= panierVide;

        } else {
            let carteProduct = [];
        for (let i = 0; i < saveProduitLocalStorage.length; i++){
        console.log(saveProduitLocalStorage.length);
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
        let priceItem = document.createElement("p");
            priceItem.innerHTML= `${saveProduitLocalStorage[i].price} €`;
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
// delete---------
            let buttonDelete = document.createElement("div");
            buttonDelete.classList.add("cart__item__content__settings__delete")
            parametresItem.append(buttonDelete);
            let pDelete= document.createElement("p");
            pDelete.classList.add("deleteItem");
            pDelete.innerHTML="Supprimer";
            buttonDelete.append(pDelete);

        ItemProduit.append(article);
   }}      







          /* carteProduct = carteProduct + `<article class="cart__item" 
            data-id="" data-color="">
            <div class="cart__item__img">
              <img src="" alt="">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2></h2>
                <p>"${saveProduitLocalStorage[i].colorProduct}</p>
                <p>€</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article> `;
          ItemProduit.innerHTML=carteProduct;

        }
              }
                  } */