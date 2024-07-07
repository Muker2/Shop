const shoppingList = document.querySelector(".cart");
const grid = document.querySelector("#grid");
const cart = document.querySelector("#cartList");
const cartTotal = document.querySelector("#totalPrice");
const cartRemove = document.querySelector("#cartBtnList");
let shoppingItems = [];
let cartList = [];
let qty = 1;
let totalCost = 0;

//Fetch request
fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer /* YOUR_TOKEN_HERE */',
    },
    body: JSON.stringify({
        expiresInMins: 30, // optional, defaults to 60
    })
})
    .then(res => res.json())
    .then(console.log);

    
//Fetch 10 products from API
function fetchData() {
    const API = "https://dummyjson.com/products?skip=0&limit=10";
    return fetch(API).then(response => {
        if (!response.ok) {
            throw new Error("Could not load data");
        }
        else {
            return response.json()
        }
    }).then(data => data.products || [])
}

//Update the Total Cost field in the Shopping Cart
function updateTotal(price){
    if(price <= 0){
        price = 0;
    }
    document.querySelector("#totalPrice").textContent = "Your Total:" + " " + price.toFixed(2) + "€";
}

function clearCart() {
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }
    cartList = [];
    totalCost = 0;
    updateTotal(totalCost);
}

//Display product list from API
function displayProducts() {
    fetchData().then(items => {
        items.forEach(product => {
            shoppingItems.push(product);
                const productCard = document.createElement("div");
                productCard.classList.add("grid-item");

                const productName = document.createElement("p");
                productName.innerText = product.title;
                productName.classList.add("productName");

                const productPrice = document.createElement("p");
                productPrice.innerText = product.price;
                productPrice.classList.add("productPrice");

                const productButtonField = document.createElement("div");
                productButtonField.classList.add("buttonField");

                const productButton = document.createElement("button");
                productButton.innerText = "Add to Basket";
                productButton.addEventListener("click", addItem);

                const increaseButton = document.createElement("button");
                increaseButton.innerText = "+";
                increaseButton.classList.add("counterBtn");
                increaseButton.addEventListener("click", event => {
                    qty++;
                    productQty.innerText = qty;
                }
                )

                const decreaseButton = document.createElement("button");
                decreaseButton.innerText = "-";
                decreaseButton.classList.add("counterBtn");
                decreaseButton.addEventListener("click", event => {
                    qty--;
                    if(qty < 1) {
                        qty = 1;
                    }
                    productQty.innerText = qty;
                }
                )

                const productQty = document.createElement("p");
                productQty.innerText = qty;
                productQty.classList.add("productQty");

                productButtonField.append(productButton);
                productButtonField.append(decreaseButton);
                productButtonField.append(productQty);
                productButtonField.append(increaseButton);

                productCard.append(productName);
                productCard.append(productPrice);
                productCard.append(productButtonField);
                productCard.append(productButton);

                grid.append(productCard)
        });
    });
}

cartRemove.addEventListener("click", clearCart);

/*Convert string to Floats with two decimals for innerHTML in the addItem function
function toNumber(string){
    return Math.round(string * 100) / 100;
    const num = Math.toFixed(2);
    return num;
}*/



function addItem(event){
    const row = document.createElement("li");
    const productRow = document.createElement("div");
    const removeBtn = document.createElement("button");
    removeBtn.addEventListener("click", removeItem);

    const name = event.target.parentElement.querySelector(".productName").innerText;
    const price = event.target.parentElement.querySelector(".productPrice").innerText;
    const quantity = event.target.parentElement.querySelector(".productQty").innerText;

    const itemExists = cartList.findIndex(item => item.title == name);

    if (itemExists > -1){
        const itemex = cartList[itemExists];
        itemex.quantity += quantity;
        itemex.price += price * quantity;

        const rowex = document.querySelector("#cartList li");
        if(rowex){
        rowex.querySelector(".productPrice").innerText = itemex.price;
        rowex.querySelector(".productQty").innerText = itemex.quantity;
}else{
    console.log("No rowex found")
}
    }else{
        //Push product into Array
        const item = {title: name,
        quantity: quantity,
        price: price,
    }

    cartList.push(item);

    const totalPrice = price * quantity;

    const rowName = document.createElement("p");
    rowName.innerText = name;

    const rowPrice = document.createElement("p");
    rowPrice.setAttribute("id", "productPrice");
    rowPrice.innerText = totalPrice;

    const rowQty = document.createElement("p");
    rowQty.setAttribute("id", "productQty");
    rowQty.innerText = quantity;

    productRow.append(rowName);
    productRow.append(rowPrice);
    productRow.append(rowQty);
    productRow.append(removeBtn);

    row.append(productRow);
    cart.append(row);

    totalCost += price * quantity;
    totalPrice.innerHTML = totalCost;
    
    updateTotal(totalCost);


}
}

function addItem(event) {
    const name = event.target.parentElement.parentElement.querySelector(".productName").innerText;
    const price = parseFloat(event.target.parentElement.parentElement.querySelector(".productPrice").innerText);
    const quantity = parseInt(event.target.parentElement.querySelector(".productQty").innerText, 10);

    const itemExists = cartList.findIndex(item => item.title === name);

    if (itemExists > -1) {
        const itemex = cartList[itemExists];
        itemex.quantity += quantity;
        itemex.price += price * quantity;

        const rows = cart.querySelectorAll("li");
        rows.forEach(row => {
            if (row.querySelector("p").innerText === name) {
                row.querySelector("#productPrice").innerText = itemex.price.toFixed(2);
                row.querySelector("#productQty").innerText = itemex.quantity;
            }
        });
    } else {
        const item = {
            title: name,
            quantity: quantity,
            price: price * quantity
        };

        cartList.push(item);

        const row = document.createElement("li");
        const productRow = document.createElement("div");
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", removeItem);

        const rowName = document.createElement("p");
        rowName.innerText = name;

        const rowPrice = document.createElement("p");
        rowPrice.setAttribute("id", "productPrice");
        rowPrice.innerText = item.price.toFixed(2);

        const rowQty = document.createElement("p");
        rowQty.setAttribute("id", "productQty");
        rowQty.innerText = quantity;

        productRow.append(rowName);
        productRow.append(rowPrice);
        productRow.append(rowQty);
        productRow.append(removeBtn);

        row.append(productRow);
        cart.append(row);
    }

    totalCost += price * quantity;
    updateTotal(totalCost);
}


//Remove Item from Shopping Cart
function removeItem(event){
    const item = event.target.parentElement;
    const itemPrice = item.querySelector("#productPrice").innerText;
    const itemQty = item.querySelector("#productQty").innerText;

    totalCost -= (itemPrice/itemQty) * itemQty;
    updateTotal(totalCost);
    item.remove();
}




displayProducts();

