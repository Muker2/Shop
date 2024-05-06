const API= "https://dummyjson.com/products?skip=0&limit=10";

fetch(API)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const products = data.products || [];
    products.forEach(product => {
        const template = `<div class="grid-item" data-product-type="Notebook">
        <div class="prod-img"> <img src=${product.thumbnail} alt=""></div>
        <div class="grid-item-info">
            <div class="grid-item-header">
                <h2>${product.title}</h2>
            </div>
        </div>
        <div class="grid-price">
            <p>${product.price}€</p>
            <span>inkl. Mwst.</span>
            <button>Add to Cart</button>
        </div>
    </div>`;
        document.querySelector(".grid").insertAdjacentHTML("beforeend", template);

    });
  })
  .catch(error => console.error('Error:', error));







