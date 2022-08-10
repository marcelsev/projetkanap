const getIdKanap = () => {
    return new URL(location.href).searchParams.get("id");
};
const productId = getIdKanap();
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => {
        return res.json();
    })
    .then((product) => {
        infoProduct(product);
        saveProduct(product);
    })
//.catch 

// declaration de variables -----------
/*const urlStock = 'http://localhost:3000/api/products/';
let url = window.location;
let search_params = new URLSearchParams(url.search);
const nom = search_params.get("id");*/

// variables pour le DOM innerhtml-----------
let nameProduct = document.getElementById("title");
let tittle = document.querySelector("title");
let imgProduit = document.querySelector(".item__img");
let description = document.getElementById("description");
let allColors = document.getElementById("colors");
// selection pour quantite et bouton panier ----------
let qtyProduct = document.getElementById("quantity");
let buttonPanier = document.getElementById("addToCart");
// function pour prendre l'ID du produit--------
/*function getId() {
    if (search_params.has("id")) {
        return true;
        // console.log (nom);
    } else {
        return false
    }
}
getId();*/
// appeler lAPI avec fetch -------
/*fetch(urlStock + nom)
    .then(response => response.json())
    .then((data) => infoStock(data))

// Modifier le DOM-------------------

function infoStock(data) */
let infoProduct = (product) => {
    //nom et tittle du produit-----
    nameProduct.innerHTML = product.name;
    tittle.innerHTML = product.name;
    //image du produit-----
    img = document.createElement("img");
    img.src = product.imageUrl
    img.alt = product.altTxt;
    imgProduit.append(img);
    description.innerHTML = product.description;
    //prix du produit------
    price.innerHTML = product.price;
    // option couleurs----------- 
    for (let colorOption of product.colors) {
        let color = document.createElement('option');
        color.value = colorOption
        color.textContent = colorOption
        allColors.append(color)
    }
}

let saveProduct = (product) => {
    buttonPanier.addEventListener("click", (e) => {
        e.preventDefault();
        if (allColors.value == false) {
            confirm("Veuillez sélectionner une couleur");
        } else if (qtyProduct.value == 0) {
            confirm("Veuillez sélectionner le nombre d'articles souhaités");
        } else {
            let optionProduct = {
                id: product._id,
                image: product.imageUrl,
                altTxt: product.altTxt,
                name: product.name,
                description: product.description,
                color: allColors.value,
                quantite: parseInt(qtyProduct.value, 10),

            }; 
            let saveProduitLocalStorage = JSON.parse(localStorage.getItem("products"));
            if (saveProduitLocalStorage) {
                let item = saveProduitLocalStorage.find((item) => item.id == optionProduct.id && item.color == optionProduct.color);
                if (item) {
                    item.quantite = item.quantite + optionProduct.quantite;
                    item.totalPrice += item.price + optionProduct.quantite;
                    localStorage.setItem("products", JSON.stringify(saveProduitLocalStorage));
                    return;
                }
                saveProduitLocalStorage.push(optionProduct);
                localStorage.setItem("products", JSON.stringify(saveProduitLocalStorage));

            } else {
                let kanapLocalStorage = [];
                kanapLocalStorage.push(optionProduct);
                localStorage.setItem("products", JSON.stringify(kanapLocalStorage));
            }
            window.location.href = "./cart.html";
        }
    })
}
//buttonPanier.addEventListener("click", () => {
  //  window.location.href = "./cart.html";
    //});


/*
const infoStock = (data) => {
    //nom du produit-----
 
    nameProduct.innerHTML = data.name;
    let tittle = document.querySelector("title");
    tittle.innerHTML = data.name;
    //image du produit-----
    let imgProduit = document.querySelector(".item__img");
    img = document.createElement("img");
    img.src = data.imageUrl
    img.alt = data.altTxt;
    imgProduit.append(img);
 
    let description = document.getElementById("description");
    description.innerHTML = data.description;
    //prix du produit------
    let price = document.getElementById("price");
    price.innerHTML = data.price;
 
    // option couleurs----------- 
    let allColors = document.getElementById("colors");
    for (let colorOption of data.colors) {
        let color = document.createElement('option');
        color.value = colorOption
        color.textContent = colorOption
        allColors.append(color)
    }
 
 
}
// -------button ajouter au panier, gestion -------------
// selectors ----------

const qtyProduct = document.getElementById("quantity");
const formColor = document.querySelector("#colors");
const buttonPanier = document.getElementById("addToCart");

//console.log(buttonPanier); 

//ecouter le bouton et envoyer le panier---------

buttonPanier.addEventListener("click", (e) => {
e.preventDefault();
const optionColor = allColors.value;
 const qntity = qtyProduct.value;
 const nomProduct = data.name;
 const imgProductSrc = data.imageUrl;
 const imgProductAlt = data.altTxt;
 const priceProduct = data.price;
let optionProduct = {
    idProduit: nom,
    colorProduct: allColors.value,
    quantite: qtyProduct.value,
}
nameProduct: nameProduct,
 imgUrl: imgProduit,
 price: priceProduct

};


//------ --localstorage--------------

let saveProduitLocalStorage = JSON.parse(localStorage.getItem("products"));

if (saveProduitLocalStorage) {
    saveProduitLocalStorage.push(optionProduct);
    localStorage.setItem("products", JSON.stringify(saveProduitLocalStorage));
} else {
    saveProduitLocalStorage = [];
    saveProduitLocalStorage.push(optionProduct);
    localStorage.setItem("products", JSON.stringify(saveProduitLocalStorage));

    console.log(saveProduitLocalStorage);
}
});

buttonPanier.addEventListener("click", () => {
window.location.href = "./cart.html";
});


*/










