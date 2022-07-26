
const urlStock = 'http://localhost:3000/api/products/';
let url = window.location;
let search_params = new URLSearchParams (url.search);

    if (search_params.has ("id")) {
    var nom = search_params.get("id");
     console.log (nom);
    }
    
 
console.log (urlStock+nom)
        fetch(urlStock+nom)
        .then(response => response.json())
        .then((data) => infoStock(data)) 

        const infoStock = (data)=> {
            console.log(data);
        
        
            let title = document.getElementById("title");
            title.innerHTML = data.name;
        

        }
    