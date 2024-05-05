const API= "https://fakestoreapi.com/products";

fetch(API)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(product => {
        const template = `<div class="grid-item" data-product-type="Notebook">
        <div class="prod-img"> <img src=${product.image} alt=""></div>
        <div class="grid-item-info">
            <div class="grid-item-header">
                <h2>${product.title}</h2>
            </div>
            <div class="grid-item-desc">
                <p>${product.description}</p>   
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







