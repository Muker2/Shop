const API = "https://dummyjson.com/products?skip=0&limit=10";
const pic = "images/Laptop.jpg";
const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum nisl ac sagittis porttitor";
const shoppingList = document.querySelector(".cart");
const shoppingItems = [];

fetch(API)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const products = data.products || [];
    products.forEach(product => {
        const template = `<div class="grid-item" data-product-type="Notebook">
        <div class="prod-img"> <img src=${pic} alt=""></div>
        <div class="grid-item-info">
            <div class="grid-item-header">
                <h2>${product.title}</h2>
                <div class="rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                </div>
            </div>
        </div>
        <div class="grid-price">
            <p>${product.price}€</p>
            <button>Add to Cart</button>
        </div>
    </div>`;
        document.querySelector(".grid").insertAdjacentHTML("beforeend", template);

    });
  })
  .catch(error => console.error('Error:', error));

  function addItem(item){
        document.createElement("li");
  }







