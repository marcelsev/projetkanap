
const urlStock = 'http://localhost:3000/api/products';
let url = new URL(urlStock);
let search_params = new URLSearchParams (url.search);

    if (search_params.has ("_id")) {
    var nom = search_params.get("_id");
     console.log ("_id");
    }
    
 

        fetch(urlStock)
        .then(response => response.json())
        .then((data) => infoStock(data)) 

        const infoStock = (data)=> {
            console.log(data);
        
            let title = document.getElementById("title");
            title.innerHTML = infoStock.name;

        }