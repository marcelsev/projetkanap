
//declarer la URL de l'API--------
const urlStock = 'http://localhost:3000/api/products';

//fonction afficher les produits dans le DOM------------
function productStock() {
  fetch(urlStock)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      let product = document.getElementById("items");
      for (let i = 0; i < data.length; i++) {
        let article = document.createElement("article");
        article.textContent = "";
        let a = document.createElement("a");
        a.href = `./product.html?id=${data[i]._id}`;

        let img = document.createElement("img");
        img.src = data[i].imageUrl
        img.alt = data[i].altTxt;

        let nom = document.createElement("h3");
        nom.textContent = data[i].name;

        let p = document.createElement("p");
        p.textContent = data[i].description;

        a.insertAdjacentElement("afterbegin", article);
        article.append(img, nom, p);
        product.append(a);
      }
    })
    .catch((error) => { console.log("error") })
};

productStock();