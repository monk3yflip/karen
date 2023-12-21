let cartItems = [];
function addToCart(item) {

    let existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {

        existingItem.quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }
    updateCart();
}
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let total = 0;
    cartList.innerHTML = "";
    cartItems.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = ${ item.title } x ${ item.quantity } = ${ item.price * item.quantity } rub.;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });
    let totalLi = document.createElement("li");
    totalLi.innerText = Itogo: ${ total } rub.;
    cartList.appendChild(totalLi);
}
function sendOrder() {
    let order = {
        items: cartItems,
        total: getTotal(),
        date: new Date(),
    };
    fetch("https://my-server.com/orders", {
        method: "POST",
        body: JSON.stringify(order),
    })
        .then((response) => response.json())
        .then((data) => {

            cartItems = [];
            updateCart();
            alert("Thanks");
        })
        .catch((error) => {
            alert("error");
        });
}
function getTotal() {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}