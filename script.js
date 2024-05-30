const pic = "images/Laptop.jpg";
const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl ac sagittis porttitor";
const shoppingList = document.querySelector(".cart");
const shoppingItems = [];
const cartBtn = document.querySelectorAll(".add");
const grid = document.querySelector("#grid");
const counter = document.querySelectorAll(".countBtn");
let qty = 0;

function count(event){

    const qtyField = event.target.closest("#grid-counter").querySelector("#grid-counter-qty");

    if (event.target.textContent === "+"){
        qty++;
        
    }else if (event.target.textContent === "-"){
        qty--;
    }
    if (qty < 0) qty = 0;

    qtyField.textContent  = qty;
}

grid.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        if (event.target.classList.contains("countBtn")) {
            count(event);
        } else if (event.target.classList.contains("add")) {
            addItem(event);
        }
    }
});


function addItem(event) {
    const cart = document.querySelector("#cartList");
    const productItem = event.target.closest(".grid-item").querySelector('[data-title]').dataset.title;
    const productContainer = document.createElement("div");
    productContainer.className="productContainer";
    const cartItem = document.createElement("li");
    cartItem.textContent = productItem;
    productContainer.append(cartItem);
    const removeBtn = document.createElement("button");
    productContainer.append(removeBtn);
    cart.appendChild(productContainer);
}

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

function displayProducts() {
    fetchData().then(items => {
        items.forEach(product => {
            const template = `<div class="grid-item" data-product-type="Notebook">
        <div class="prod-img"> <img src=${pic} alt=""></div>
        <div class="grid-item-info">
            <div class="grid-item-header">
                <h2 data-title="${product.title}">${product.title}</h2>
            </div>
            <div class="grid-item-desc">
            <p>${desc}</p>
            </div>
        </div>
        <div class="grid-price">
            <p data-price="${product.price}">${product.price}€</p>
            <div id="grid-checkout">
                <button class="add">Add to Cart</button>
                <div id="grid-counter">
                    <p id="grid-counter-qty">0<p>
                    <div id="grid-counter-btn">
                        <button class="countBtn">+</button>
                        <button class="countBtn">-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

            document.querySelector("#grid").insertAdjacentHTML("beforeend", template);

        });
    });
}

displayProducts();

