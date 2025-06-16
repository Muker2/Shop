const shoppingList = document.querySelector(".cart");
const grid = document.querySelector("#grid");
const categories = document.querySelector("#sidebar-filter");
let categoryList = [];

const cart = document.querySelector("#cartList");
const cartBtn = document.querySelector("#acc-btn");
const closeBtn = document.querySelector("#closeBtn");
const cartBar = document.querySelector("#cart-bar");
const cartTotal = document.querySelector("#totalPrice");
const cartRemove = document.querySelector("#cartBtnList");

const searchBar = document.querySelector(".search-bar");
const destxt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla orci sit amet placerat finibus."
const img = "images/Laptop.jpg";
let cartItems = [];
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
    const API = "https://dummyjson.com/products?skip=0&limit=20";
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
function updateTotal(price) {
    if (price <= 0) {
        price = 0;
    }
    document.querySelector("#totalPrice").textContent = "Your Total:" + " " + Math.round(price * 100) / 100 + "€";
}

function clearCart() {
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }
    cartList = [];
    totalCost = 0;
    updateTotal(totalCost);
}

closeBtn.addEventListener("click", e => {
    cartBar.style.display = "none";
})

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    cartItems.forEach(item => {
        const isVisible = item.name.toLowerCase().includes(value);
        item.element.classList.toggle("hide", !isVisible);
    })
    console.log(cartItems);
})

cartBtn.addEventListener("click", e => {
    if (cartBar.style.display === "none" ) {
        cartBar.style.display = "block";
    }else {
        cartBar.style.display = "none";
    }
    }
)

function createCategories() {
    fetchData().then(data => {
        categoryList = data.map(item => {
            const categoryField = document.createElement("li");
            categoryField.classList.add("categoryField");
            categoryField.addEventListener("click", e => {
                console.log(e.target.innerText);
            })
            
            const categoryNameLower = item.category;
            const categoryName = categoryNameLower.charAt(0).toUpperCase() + categoryNameLower.slice(1);

            categoryField.innerText = categoryName;
            categories.append(categoryField);

            
        
        })
    })
}



//Display product list from API
function displayProducts() {
    fetchData().then(data => {
        cartItems = data.map(product => {
            const productImg = document.createElement("img");
            productImg.classList.add("product-img");
            productImg.src = img;
            

            const productCard = document.createElement("div");
            productCard.classList.add("grid-item");

            const productName = document.createElement("p");
            productName.innerText = product.title;
            productName.classList.add("productName");
            productName.dataset.title = product.title;

            const productDesc = document.createElement("p");
            productDesc.innerText = destxt;
            productDesc.classList.add("productDescription");
            productDesc.dataset.title = destxt;

            const productPrice = document.createElement("p");
            productPrice.innerText = product.price + "€";
            productPrice.classList.add("productPrice");

            const productButtonField = document.createElement("div");
            productButtonField.classList.add("buttonField");

            const productButton = document.createElement("button");
            productButton.innerText = "Add to Cart";
            productButton.addEventListener("click", addItem);
            productButton.setAttribute("id", "addCart");

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
                if (qty < 1) {
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
            productButtonField.append(productButton);

            productCard.append(productImg);
            productCard.append(productName);
            productCard.append(productDesc);
            productCard.append(productPrice);
            productCard.append(productButtonField);

            grid.append(productCard);

            return {name: product.title, price: product.price, element: productCard};
        });
    });
}




function addItem(event) {
    const name = event.target.parentElement.parentElement.querySelector(".productName").innerText;
    const price = parseFloat(event.target.parentElement.parentElement.querySelector(".productPrice").innerText);
    const quantity = parseInt(event.target.parentElement.querySelector(".productQty").innerText, 10);

    //Index if item already exists in the cart
    const itemExists = cartList.findIndex(item => item.title == name);


    //Create object for Item
    const item = {
        title: name,
        quantity: quantity,
        price: price * quantity
    };

    //Check if Item exists and increase price and quantity if it does
    if(itemExists >= 0){
        const currentItem = cartList[itemExists];
        currentItem.quantity += quantity;
        currentItem.price += price * quantity;
        
        updateCart()
    }else{
    cartList.push(item);
    updateCart();
    }
}



function updateCart() {
    cart.innerHTML = "";
    totalCost = 0;
    for (var i = 0; i < cartList.length; i++) {
        const row = document.createElement("li");
        row.id = "cartRow";
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", removeItem);

        const rowName = document.createElement("p");
        rowName.classList.add("cartInfo");
        rowName.innerText = cartList[i].title;

        const rowPrice = document.createElement("p");
        rowPrice.classList.add("cartInfo");
        rowPrice.setAttribute("id", "productPrice");
        rowPrice.innerText = cartList[i].price.toFixed(2);

        const rowQty = document.createElement("p");
        rowQty.classList.add("cartInfo");
        rowQty.setAttribute("id", "productQty");
        rowQty.innerText = cartList[i].quantity;

        const rowBtnInc = document.createElement("button");
        rowBtnInc.classList.add("cartInfo");
        rowBtnInc.innerText = "+";
        rowBtnInc.addEventListener("click", e => )

        const rowBtnDec = document.createElement("button");
        rowBtnDec.classList.add("cartInfo");
        rowBtnDec.innerText = "-";

        row.append(rowName);
        row.append(rowPrice);
        row.append(rowBtnInc);
        row.append(rowQty);
        row.append(rowBtnDec);
        row.append(removeBtn);

        cart.append(row);

        totalCost += cartList[i].price * cartList[i].quantity;
        console.log(totalCost);
        cartTotal.innerText = "Your total: " + totalCost;
    }
}


//Remove Item from Shopping Cart
function removeItem(event) {
    const item = event.target.parentElement;
    const itemPrice = item.querySelector("#productPrice").innerText;
    const itemQty = item.querySelector("#productQty").innerText;

    totalCost -= (itemPrice / itemQty) * itemQty;
    updateTotal(totalCost);
    item.remove();
}

createCategories();
displayProducts();