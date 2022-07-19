const urlStock = 'http://localhost:3000/api/products';


let productStock = function (){
fetch(urlStock)
.then(response => response.json())
.then((data) => {
    console.log (data)

    let productItem = document.getElementById("items");

    for (let i = 0; i < data.length; i++) {
     const oneProduct = `<a href="./product.html?id=${data[i]._id}">
        <article>
          <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
          <h3 class="productName">${data[i].name}</h3>
          <p class="productDescription">${data[i].description}</p>
        </article>
      </a>`;

    productItem.innerHTML += oneProduct;
    }
});
}
productStock();