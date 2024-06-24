const shoppingList = document.querySelector(".cart");
const grid = document.querySelector("#grid");
const cart = document.querySelector("#cartList");

const shoppingItems = [];
const cartList = [];

let qty = 1;
let totalCost = 0;

//Update the Total Cost field in the Shopping Cart
function updateTotal(price){
    document.querySelector("#totalPrice").textContent = "Your Total:" + " " + price + "€";
}

//Remove Item from Shopping Cart
function removeItem(event){
    const item = event.target.closest(".productContainer");
    const itemPrice = item.dataset.cartprice;
    const itemQuantity = item.dataset.productQuantity;
    const itemTotal = itemPrice * itemQuantity;
    console.log(itemQuantity);
    totalCost -= itemTotal;
    cart.removeChild(item);

    updateTotal(totalCost);
}

//Convert string to Floats with two decimals for innerHTML in the addItem function
function toNumber(string){
    return Math.round(string * 100) / 100;
    const num = Math.toFixed(2);
    return num;
}

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

function addItem(event){
    const row = document.createElement("li");
    const productRow = document.createElement("div");

    const name = event.target.parentElement.querySelector(".productName").innerText;
    const price = event.target.parentElement.querySelector(".productPrice").innerText;
    const quantity = event.target.parentElement.querySelector(".productQty").innerText;

    const rowName = document.createElement("p");
    rowName.innerText = name;

    const rowPrice = document.createElement("p");
    rowPrice.innerText = price;

    const rowQty = document.createElement("p");
    rowQty.innerText = quantity;

    productRow.append(rowName);
    productRow.append(rowPrice);
    productRow.append(rowQty);

    row.append(productRow);

    cart.append(row);
    
    

    console.log(name, price, quantity);
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
                productCard.append(productButton);
                productCard.append(productButtonField);

                grid.append(productCard)
                console.log(product);
        });
    });
}

displayProducts();

