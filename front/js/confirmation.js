//recuperer l'IDorder et l'afficher----------

function recupID() {
    return new URL(location.href).searchParams.get("orderId");
}

let orderNumber = recupID();
console.log(orderNumber)
let divOrder = document.querySelector("#orderId");
function putID() {
    divOrder.innerHTML = orderNumber;
    localStorage.clear();
}
putID();
//----------------------------------------------