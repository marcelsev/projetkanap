//recuperer l'IDorder et l'afficher----------

function recupId() {
    return new URL(location.href).searchParams.get("orderId");
}

let orderNumber = recupId();
console.log(orderNumber)
let divOrder = document.querySelector("#orderId");
function putId() {
    divOrder.innerHTML = orderNumber;
    localStorage.clear();
}
putId();
//----------------------------------------------