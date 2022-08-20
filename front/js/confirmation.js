//recuperer l'IDorder et l'afficher----------

function recupId() {
    return new URL(location.href).searchParams.get("orderId");
}

const orderNumber = recupId();
console.log(orderNumber)
const divOrder = document.querySelector("#orderId");
function putId() {
    divOrder.textContent = orderNumber;
    localStorage.clear();
}
putId();
//----------------------------------------------