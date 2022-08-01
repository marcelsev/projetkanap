
      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
      console.log(saveProduitLocalStorage);

      const ItemProduit = document.querySelector("#cart__items");
      //console.log (ItemProduit);

        if (saveProduitLocalStorage === null) {
            const panierVide = `<article class="cart__item"> Le panier est vide</article>`;
            ItemProduit.innerHTML= panierVide;

        } else {
            let carteProduct = [];
            for (let ele = 0; ele < saveProduitLocalStorage.length; ele++){
        console.log(saveProduitLocalStorage.length);
         
            carteProduct = carteProduct + `<article class="cart__item" data-id="${saveProduitLocalStorage[ele].idProduit}" data-color="${saveProduitLocalStorage[ele].colorProduct}">
            <div class="cart__item__img">
              <img src="${saveProduitLocalStorage[ele].imageURL}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${saveProduitLocalStorage[ele].idProduit}</h2>
                <p>${saveProduitLocalStorage[ele].colorProduct}</p>
                <p>42,00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveProduitLocalStorage[ele].quantite} ">
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

        /* let article = document.createElement("article");
                article.innerHTML= "";
       
     let img = document.createElement("img");
        img.src= data[i].imageUrl
        img.alt= data[i].altTxt;
    
     let nom = document.createElement("h3");
         nom.innerHTML= data[i].name;

     let p = document.createElement("p");
         p.innerHTML= data[i].description;

         a.insertAdjacentElement("afterbegin", article);
         article.append(img,nom,p);
         product.append(a);  */
            