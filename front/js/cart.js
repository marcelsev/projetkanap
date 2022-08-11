
// info du localStorage---------
let orderId = ""
let products = [];
let panier = JSON.parse(localStorage.getItem("products"));
console.log(panier)


// modification DOM----------------
async function contenuPanier() {
    const ItemProduit = document.querySelector("#cart__items");
    if (!panier || panier.length === 0) {
        const panierVide = `<article class="cart__item">Le panier est vide</article>`;
        ItemProduit.innerHTML = panierVide;
    } else {
        for (let i = 0; i < panier.length; i++) {
            //console.log(panier)
            // article--------------
            let product = await getIdKanap(panier[i].id);
            //console.log(product)
            const totalPrice = (product.price *= panier[i].quantite);
            let article = document.createElement("article");
            article.dataset.id = panier[i].id
            article.dataset.color = panier[i].color
            article.innerHTML = "";
            article.classList.add("cart__item")
            //image------------------
            let containerImg = document.createElement("div");
            article.append(containerImg);
            containerImg.classList.add("cart__item__img")
            let img = document.createElement("img")
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            containerImg.append(img);
            //contenu-----------           
            let containerContenu = document.createElement("div");
            article.append(containerContenu);
            containerContenu.classList.add("cart__item__content");
            //contenu description--------
            let containerContenuDescription = document.createElement("div");
            containerContenu.append(containerContenuDescription);
            containerContenuDescription.classList.add("cart__item__content__description");
            //nom----------- 
            let h2 = document.createElement("h2")
            h2.innerHTML = product.name;
            //color---------
            let colorItem = document.createElement("p");
            colorItem.innerHTML = panier[i].color;
            //prix------------------
            let priceItem = document.createElement("p");
            priceItem.innerHTML = `Total produits: ${totalPrice}€`;
            containerContenuDescription.append(h2, colorItem, priceItem);
            //product parametres------
            let parametresItem = document.createElement("div");
            parametresItem.classList.add("cart__item__content__settings");
            article.append(parametresItem);
            // quantite product ---------         
            let quantiteItem = document.createElement("div");
            quantiteItem.classList.add("cart__item__content__settings__quantity")
            parametresItem.append(quantiteItem);
            let parQte = document.createElement("p");
            parQte.innerHTML = "Qté : ";
            quantiteItem.append(parQte);
            //input------
            let inputQte = document.createElement("input");
            inputQte.dataset.id = panier[i].id
            inputQte.dataset.color = panier[i].color
            inputQte.type = "number"
            inputQte.name = "itemQuantity"
            inputQte.min = "1"
            inputQte.max = "100"
            inputQte.valueAsNumber = panier[i].quantite
            inputQte.classList.add("itemQuantity")
            quantiteItem.append(inputQte);
            // bouton supprimer---------
            let buttonDelete = document.createElement("div");
            buttonDelete.classList.add("cart__item__content__settings__delete")
            parametresItem.append(buttonDelete);
            let pDelete = document.createElement("p");
            pDelete.classList.add("deleteItem");
            pDelete.innerHTML = "Supprimer";
            buttonDelete.append(pDelete);

            ItemProduit.append(article);
        }
    }
    //calcul prix-----------------------
    let totalPrice = 0
    for (let i = 0; i < panier.length; i++) {
        let item = await getIdKanap(panier[i].id);
        totalPrice += parseInt(item.price * panier[i].quantite);
    }
    supprimerProduct();
    changeQuantite();
    document.getElementById("totalPrice").innerHTML = totalPrice;
}
contenuPanier();

//Appel l'API--------------------------------
async function getIdKanap(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            return res;
        })
        .catch((error) => { console.log("error") })
}

// gestion bouton suppimer------------------- 
function supprimerProduct() {
    const boutonSupprimer = document.querySelectorAll(".deleteItem");
    //console.log(boutonSupprimer);
    for (let s = 0; s < boutonSupprimer.length; s++) {
        boutonSupprimer[s].addEventListener("click", (e) => {
            e.preventDefault();
            let selectProductSup = panier[s].id;
            let colorSup = panier[s].color;
            console.log(colorSup)
            console.log(selectProductSup);
            panier = panier.filter((el) => !(el.id == selectProductSup && el.color == colorSup));
            localStorage.setItem("products", JSON.stringify(panier));
            alert("Ce produit a été supprimé");
            window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        })
    }
}
supprimerProduct();

// changer quantite -------------
function changeQuantite() {
    const changeQty = document.querySelectorAll(".itemQuantity");
    changeQty.forEach((quantiteInput) => {
        quantiteInput.addEventListener("change", (e) => {
            e.preventDefault();
            let changement = e.target.valueAsNumber;
            let infoId = e.target.getAttribute("data-id");
            let infoColor = e.target.getAttribute("data-color");
            console.log(changement)
            console.log(infoId)
            console.log(infoColor)
            //console.log(newPanier)
            for (let i = 0; i < panier.length; i++) {
                if (infoId === panier[i].id && infoColor === panier[i].color) {
                    panier[i].quantite = changement;
                    localStorage.setItem("products", JSON.stringify(panier));
                    location.reload();
                    console.log(panier)
                } else { }
            }
        });
    });
}
changeQuantite();

// total products ---------------
function quantiteTotal() {
    let totalProduct = [];
    for (let i = 0; i < panier.length; i++) {
        let quantiteTotal = panier[i].quantite;
        let changerNumber = Number(quantiteTotal);
        totalProduct.push(changerNumber);
        //console.log(quantiteTotal)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const qtyTotalPanier = totalProduct.reduce(reducer, 0);
    //console.log (qtyTotalPanier)
    const qtyAffichage = document.querySelector("#totalQuantity");
    qtyAffichage.innerHTML = qtyTotalPanier;
}
quantiteTotal();



// ---------------------formulaire gestion --------------------------

let btnCommander = document.querySelector("#order");
btnCommander.addEventListener("click", (e) => {
    e.preventDefault();
    const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }
    // valider le formulaire ----------------------------
    // erreur de text dans le formulaire-------------------
    const regexFormulaire = (value) => {
        return /^([A-Z a-z]{3,20})?([-]{0,1})?([A-Z a-z]{3,20})$/.test(value);
    }
    // gestion validation de text -------------------
    //Prenom--------
    function validerPrenom() {
        const prenom = contact.firstName;
        if (regexFormulaire(prenom)) {
            document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#firstNameErrorMsg").textContent = "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
            return false;
        }
    }
    //Nom----------
    function validerNom() {
        const nom = contact.lastName;
        if (regexFormulaire(nom)) {
            document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#lastNameErrorMsg").textContent = "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
            return false;
        }
    }
    //Ville---------
    function validerVille() {
        const ville = contact.city;
        if (regexFormulaire(ville)) {
            document.querySelector("#cityErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#cityErrorMsg").textContent = "Seules les lettres a-z sont autorisées, 20 caractères maximum, 3 minimum.";
            return false;
        }
    }
    //Address-------
    function validerAdresse() {
        const adresse = contact.address;
        if (/^[0-9]{1,20}?([,]{0,1})?[A-Z a-z]{1,20}[0-9]{5,5}$/.test(adresse)) {
            document.querySelector("#addressErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#addressErrorMsg").textContent = "Indiquez dans cet ordre: le numéro l'adresse et le code postal. ";
            return false;
        }
    }
    //Email----------
    function validerEmail() {
        const email = contact.email;
        if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
            document.querySelector("#emailErrorMsg").textContent = "";
            return true;
        } else {
            document.querySelector("#emailErrorMsg").textContent = "Saisissez une adresse Email valide ";
            return false;
        }
    }

    //----Valider l'info ---------- 
    if (validerPrenom() && validerNom() && validerAdresse() && validerVille() && validerEmail()) {
        localStorage.setItem("contact", JSON.stringify(contact));
    } else {
        alert("Veuillez bien remplir le formulaire");
    }
    //obtenir l'info produits et formulaire --------------------
    let cart = contact;
    for (let i = 0; i < panier.length; i++) {
        products.push(panier[i].id);
        console.log(cart)
    }
    let order = {
        contact: cart,
        products: products
    }
    console.log(order)
    //fonction envoyer la commande--------------
    function sendOrder() {
        const envoyerData = fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json", },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                orderId = data.orderId;
                console.log(orderId);
            })
            .catch((err) => {
                (err);
            })
        if (orderId != "") {
            location.href = `./confirmation.html?orderId=${orderId}`;
        } else {
        }
    }
    sendOrder();
});















//-------------------------------BROUILLON-------
/* 
ItemProduit.innerHTML += `<article class="cart__item" data-id="${panier[i].id}" data-color="${panier[i].color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${panier[i].color}</p>
        <p>${totalPrice} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" data-id= ${panier[i].id} data-color= ${panier[i].color} class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p   data-id= ${panier[i].id} data-color= ${panier[i].color} class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;

function fetchData() {
    fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
            if (saveProduitLocalStorage === null || saveProduitLocalStorage == 0) {
                const panierVide = `<article class="cart__item">Le panier est vide</article>`;
                ItemProduit.innerHTML = panierVide;
            } else {
                let dataProduct = saveProduitLocalStorage + data;
                for (let i = 0; i < dataProduct.length; i++) {
                    //console.log(saveProduitLocalStorage+data.length);
                    // article--------------
                    let productCart = `<article class="cart__item" data-id="${saveProduitLocalStorage._id}" data-color="${saveProduitLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${dataProduct[i].imageUrl}" alt="${data[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data[i].name}</h2>
        <p>${saveProduitLocalStorage[i].colorProduct}</p>
        <p>${data[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveProduitLocalStorage[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
                    ItemProduit.innerHTML = productCart;
                }
            }
        })

    /*
            let article = document.createElement("article");
            article.innerHTML = "";
            article.classList.add("cart__item")
            //image------------------
            let containerImg = document.createElement("div");
            article.append(containerImg);
            containerImg.classList.add("cart__item__img")
            let img = document.createElement("img")
            img.src = saveProduitLocalStorage[i].imgUrl;
            img.alt = saveProduitLocalStorage[i].imgAlt;
            containerImg.append(img);
    
            //contenu-----------           
            let containerContenu = document.createElement("div");
            article.append(containerContenu);
            containerContenu.classList.add("cart__item__content");
            //contenu description--------
            let containerContenuDescription = document.createElement("div");
            containerContenu.append(containerContenuDescription);
            containerContenuDescription.classList.add("cart__item__content__description");
            //nom----------- 
            let h2 = document.createElement("h2")
            h2.innerHTML = saveProduitLocalStorage[i].nameProduct;
            //color---------
    
            let colorItem = document.createElement("p");
            colorItem.innerHTML = saveProduitLocalStorage[i].colorProduct;
            //prix------------------
            let prixItem = saveProduitLocalStorage[i].price;
            let qtyItem = saveProduitLocalStorage[i].quantite;
            let multiplication = prixItem * qtyItem;
            let priceItem = document.createElement("p");
            priceItem.innerHTML = `Total produits: ${multiplication}€`;
            containerContenuDescription.append(h2, colorItem, priceItem);
            //product parametres------
            let parametresItem = document.createElement("div");
            parametresItem.classList.add("cart__item__content__settings");
            article.append(parametresItem);
            // quantite product ---------         
            let quantiteItem = document.createElement("div");
            quantiteItem.classList.add("cart__item__content__settings__quantity")
            parametresItem.append(quantiteItem);
            let parQte = document.createElement("p");
            parQte.innerHTML = "Qté : ";
            quantiteItem.append(parQte);
            //input------
            let inputQte = document.createElement("input");
            inputQte.type = "number"
            inputQte.name = "itemQuantity"
            inputQte.min = "1"
            inputQte.max = "100"
            inputQte.valueAsNumber = saveProduitLocalStorage[i].quantite
            inputQte.classList.add("itemQuantity")
            quantiteItem.append(inputQte);
            // bouton supprimer---------
            let buttonDelete = document.createElement("div");
            buttonDelete.classList.add("cart__item__content__settings__delete")
            parametresItem.append(buttonDelete);
            let pDelete = document.createElement("p");
            pDelete.classList.add("deleteItem");
            pDelete.innerHTML = "Supprimer";
            buttonDelete.append(pDelete);
    
            ItemProduit.append(article);
        }

        boutonSupprimer.forEach((supprimerBtn) => {
        supprimerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let selectProductSup = e.target.getAttribute("data-id");
            let supColor = e.target.getAttribute("data-color");
            console.log(selectProductSup)
            panier = panier.filter((el) => el.id == selectProductSup && el.color == supColor);
            localStorage.setItem("products", JSON.stringify(panier));
            alert("Ce produit a été supprimé");
            window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        })
    })

    for (let s = 0; s < boutonSupprimer.length; s++) {
        boutonSupprimer[s].addEventListener("click", (e) => {
            e.preventDefault();
            let selectProductSup = panier[s].id;
            console.log (selectProductSup)
            panier = panier.filter((el) => el.id !== selectProductSup);
            localStorage.setItem("products", JSON.stringify(panier));
            alert("Ce produit a été supprimé");
            window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        })
    }

    let totalPrice = [];
for (let p = 0; p < panier.length; p++) {
    let itemPrice = getIdKanap(panier[p].id)
    let prixTotalProduct = (itemPrice[p].price * panier[p].quantite);
    totalPrice.push(prixTotalProduct);
    //console.log(prixTotalProduct);
}
const prixPayer = totalPrice.reduce(reducer, 0);
//console.log (prixPayer)
const priceAffichage = document.querySelector("#totalPrice");
priceAffichage.innerHTML = prixPayer;
*/