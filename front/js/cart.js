
      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
      console.log(saveProduitLocalStorage);

      const ItemProduit = document.querySelector("#cart__items");
      console.log (ItemProduit);

        if (saveProduitLocalStorage === null) {
        } else {
            let CarteProduct = [];
            for (ele = 0; ele < saveProduitLocalStorage.length; ele++){
        console.log(saveProduitLocalStorage.length);
            let article = document.createElement("article");
                article.innerHTML= "";
            let a = document.createElement("a");
                a.href=`./product.html?id=${data[i]._id}`;
       
     let img = document.createElement("img");
        img.src= data[i].imageUrl
        img.alt= data[i].altTxt;
    
     let nom = document.createElement("h3");
         nom.innerHTML= data[i].name;

     let p = document.createElement("p");
         p.innerHTML= data[i].description;

         a.insertAdjacentElement("afterbegin", article);
         article.append(img,nom,p);
         product.append(a);   

            
            
            
            
            
            `<article class="cart__item" data-id="${saveProduitLocalStorage.id}" data-color="${saveProduitLocalStorage.color}">
            <div class="cart__item__img">
              <img src="${saveProduitLocalStorage.imageUrl}" alt="${saveProduitLocalStorage.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${saveProduitLocalStorage.name}</h2>
                <p>${saveProduitLocalStorage.color}</p>
                <p>${saveProduitLocalStorage.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté :${saveProduitLocalStorage.quantite}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article> `;
          ItemProduit.innerHTML=produitPanier;

        }
      }