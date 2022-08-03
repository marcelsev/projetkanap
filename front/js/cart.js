 const urlStock= 'http://localhost:3000/api/products/';


      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
      console.log(saveProduitLocalStorage);

      const ItemProduit = document.querySelector("#cart__items");
      //console.log (ItemProduit);

      fetch(urlStock)
        .then(response => response.json())
        .then((data) => infoStock(data)) 
        const infoStock = (data)=> {

        
            
        if (saveProduitLocalStorage === null) {
            const panierVide = `<article class="cart__item">Le panier est vide</article>`;
            ItemProduit.innerHTML= panierVide;

        } else {
            let carteProduct = [];
            for (let i = 0; i < saveProduitLocalStorage.length; i++){
        //console.log(cart.length);
// article--------------

        let article = document.createElement("article");
            article.innerHTML="";
            article.classList.add("cart__item")
    //image------------------
        let containerImg= document.createElement("div");
            article.append(containerImg);   
            containerImg.classList.add("cart__item__img")   
        let img= document.createElement("img")
            img.src=""
            img.alt=""; 
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
            h2.innerHTML= "Nom du produit";
    //color---------

        let colorItem= document.createElement("p");
            colorItem.innerHTML= saveProduitLocalStorage.colorProduct;
    //prix------------------
        let priceItem = document.createElement("p");
            priceItem.innerHTML=" €"
            containerContenuDescription.append(h2, colorItem, priceItem);
//product quantite------
        let quantiteItem= document.createElement("div");
            quantiteItem.classList.add("cart__item__content__settings");
            article.append( quantiteItem);
        let parQte= document.createElement("p");
            parQte.innerHTML= "Qté :"
            quantiteItem.append(parQte);
          //input------
        let inputQte= document.createElement("input");
            inputQte.type= "number"
            inputQte.name= "itemQuantity"
            inputQte.min = "1"
            inputQte.max = "100"
            inputQte.valueAsNumber= "42"
            inputQte.classList.add("itemQuantity")   
            quantiteItem.append (inputQte);   


        ItemProduit.append(article);
   }}}         
          /*  carteProduct = carteProduct + `<article class="cart__item" 
            data-id="" data-color="">
            <div class="cart__item__img">
              <img src="" alt="">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2></h2>
                <p></p>
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
                  }