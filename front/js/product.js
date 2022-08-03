
const urlStock = 'http://localhost:3000/api/products/';
let url = window.location;
let search_params = new URLSearchParams (url.search);

    if (search_params.has ("id")) {
    var nom = search_params.get("id");
    // console.log (nom);
    }
    
        fetch(urlStock+nom)
        .then(response => response.json())
        .then((data) => infoStock(data)) 

        const infoStock = (data)=> {
            console.log(data);
        
     //nom du produit-----
        let name = document.getElementById("title");
            name.innerHTML = data.name;
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


// -------button ajouter au panier, gestion -------------
// selectors ----------
    const qtyProduct = document.getElementById("quantity");     
        //console.log(qtyProduct); 
    const  formColor= document.querySelector("#colors");
    const buttonPanier = document.getElementById("addToCart");
//console.log(buttonPanier); 

//ecouter le bouton et envoyer le panier---------

    buttonPanier.addEventListener("click", (e)=> {e.preventDefault();
        const optionColor = formColor.value;
        const qntity = qtyProduct.value;
        
    let optionProduct = {
        idProduit: nom,
        colorProduct: optionColor,
        quantite: qntity
    };

    //console.log(optionProduct); 
//------ --localstorage--------------

    let saveProduitLocalStorage = JSON.parse(localStorage.getItem("product"));

      if (saveProduitLocalStorage){
        saveProduitLocalStorage.push(optionProduct);
        localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
        }else {saveProduitLocalStorage = [];
        saveProduitLocalStorage.push(optionProduct);
        localStorage.setItem("product", JSON.stringify(saveProduitLocalStorage));
       
       // console.log(saveProduitLocalStorage);
        }
    });

    buttonPanier.addEventListener("click", () => {
    window.location.href = "./cart.html";
    });










    

  
