const urlStock = 'http://localhost:3000/api/products';


function productStock() {
  fetch(urlStock)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      let product = document.getElementById("items");
      for (let i = 0; i < data.length; i++) {
        let article = document.createElement("article");
        article.innerHTML = "";
        let a = document.createElement("a");
        a.href = `./product.html?id=${data[i]._id}`;

        let img = document.createElement("img");
        img.src = data[i].imageUrl
        img.alt = data[i].altTxt;

        let nom = document.createElement("h3");
        nom.innerHTML = data[i].name;

        let p = document.createElement("p");
        p.innerHTML = data[i].description;

        a.insertAdjacentElement("afterbegin", article);
        article.append(img, nom, p);
        product.append(a);
      }
    });
};

productStock();