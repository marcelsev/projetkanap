// prendre l'ID du produit----------------

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
    .catch((error) => { console.log("error") })

// DECLARER LES variables pour le DOM innerhtml-----------
const nameProduct = document.getElementById("title");
const tittle = document.querySelector("title");
const imgProduit = document.querySelector(".item__img");
const description = document.getElementById("description");
const allColors = document.getElementById("colors");
// selection pour quantite et bouton panier ----------
let qtyProduct = document.getElementById("quantity");
let buttonPanier = document.getElementById("addToCart");

//Fonction afficher le produit sur le DOM----------
const infoProduct = (product) => {
    //nom et tittle du produit-----
    nameProduct.textContent = product.name;
    tittle.textContent = product.name;
    //image du produit-----
    img = document.createElement("img");
    img.src = product.imageUrl
    img.alt = product.altTxt;
    imgProduit.append(img);
    description.textContent = product.description;
    //prix du produit------
    price.textContent = product.price;
    // option couleurs----------- 
    for (let colorOption of product.colors) {
        let color = document.createElement('option');
        color.value = colorOption
        color.textContent = colorOption
        allColors.append(color)
    }
}
//Fonction garder le produit dans la LS--------------
const saveProduct = (product) => {
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








