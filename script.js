const shoppingList = document.querySelector(".cart");
const grid = document.querySelector("#grid");
const cart = document.querySelector("#cartList");

const shoppingItems = [];
const cartList = [];

let qty = 1;
let totalCost = 0;

function addItem(event) {
    const productItem = event.target.closest(".grid-item").querySelector('[data-title]').dataset.title;
    const price = event.target.closest(".grid-item").querySelector('[data-price]').dataset.price;
    const quantity = event.target.closest(".grid-item").querySelector('[data-quantity]').dataset.quantity;

    const productContainer = document.createElement("div");
    const cartItem = document.createElement("li");
    const removeBtn = document.createElement("button");
    const productCount = document.createElement("p");
    const productPrize = document.createElement("p");

    //Set content for elements
    productContainer.className="productContainer";
    productContainer.dataset.cartprice = price;
    productContainer.dataset.productQuantity = quantity;
    cartItem.textContent = productItem;
    productCount.innerHTML = qty;
    productPrize.innerHTML = toNumber(price * qty); //added toNumber to fix the decimal error for single Items

    //Button
    removeBtn.addEventListener("click", removeItem);
    removeBtn.textContent = "X";

    //Append elements
    productContainer.append(cartItem);
    productContainer.append(productCount);
    productContainer.append(productPrize);
    productContainer.append(removeBtn);

    cart.appendChild(productContainer);

    console.log(totalCost);
    totalCost += toNumber(productPrize.innerHTML); //*100/100;
    //added toFixed converter to totalCost as finalcost variable

    updateTotal(totalCost);
    finalcost = totalCost.toFixed(2);
    console.log(totalCost);
    updateTotal(finalcost);
}

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


//Display product list from API
function displayProducts() {
    fetchData().then(items => {
        items.forEach(product => {
            shoppingItems.push(product);
                const productCard = document.createElement("div");
                productCard.classList.add("grid-item");

                const productName = document.createElement("p");
                productName.innerText = product.title;

                const productPrice = document.createElement("p");
                productPrice.innerText = product.price;

                const productButtonField = document.createElement("div");
                productButtonField.classList.add("buttonField");

                const productButton = document.createElement("button");
                productButton.innerText = "Add to Basket";

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

