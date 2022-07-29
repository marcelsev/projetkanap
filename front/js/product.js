
const urlStock = 'http://localhost:3000/api/products/';
let url = window.location;
let search_params = new URLSearchParams (url.search);

    if (search_params.has ("id")) {
    var nom = search_params.get("id");
     //console.log (nom);
    }
    
        fetch(urlStock+nom)
        .then(response => response.json())
        .then((data) => infoStock(data)) 

        const infoStock = (data)=> {
            //console.log(data);
        
        //nom du produit-----
        let nom = document.getElementById("title");
            nom.innerHTML = data.name;
        let tittle = document.querySelector("title");
            tittle.innerHTML=data.name;
            //image du produit-----
        let imgProduit = document.querySelector(".item__img");
            img = document.createElement("img");
            img.src= data.imageUrl
            img.alt= data.altTxt;
            imgProduit.append(img);

        let description = document.getElementById("description");
            description.innerHTML=data.description;
            //prix du produit------
        let price = document.getElementById("price");
            price.innerHTML= data.price;

        // option couleurs----------- 
        let allColors = document.getElementById("colors");
    for (let colorOption of data.colors){
        let color = document.createElement('option');
        color.value= colorOption
        color.textContent= colorOption
        allColors.append(color)
            }
        } 
        const qtyProduct = document.getElementById("quantity")
// button ajouter au panier -------
let addProduct = (data) =>{
let buttonPanier = document.getElementById("addToCart");
buttonPanier.addEventListener('click', (e) => {
    e.preventDefault();

    if (allColors.value  == false){
        confirm ('Sélectionner une couleur');
    } else if (qtyProduct.value == 0){
        confirm ('Sélectionner la quantité');
    } else {
        alert(" L'article a été ajouté au panier");
    }
    let optionProduct = {
        idProduit: data._id,
        colorProduct: allColors.value,
        quantite: perseInt(qtyProduct.value, 10)
      };

      //console.log(optionProduct)

      let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));
      if (saveProduitLocalStorage){}
      else {saveProduitLocalStorage = [];
      
       saveProduitLocalStorage.push(optionProduct);
       localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
   console.log(saveProduitLocalStorage);
} 
 PageCart.addEventListener("click", () => {
    window.location.href="./cart.html";
 });
})} 


    

  
