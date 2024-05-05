const API= "https://fakestoreapi.com/products";

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
        const template = `<div class="grid-item" data-product-type="Notebook">
        <img src="images/Laptop.jpg" alt="">
        <div class="grid-item-info">
            <div class="grid-item-header">
                <h2>${product.title}</h2>
            </div>
            <div class="grid-item-desc">
                <p>${product.description}</p>   
            </div>
        </div>
        <div class="grid-price">
            <p>${product.price}</p>
            <span>inkl. Mwst.</span>
            <button>Add to Cart</button>
        </div>
    </div>`;
        document.querySelector(".grid").insertAdjacentHTML("beforeend", template);

    });
  })
  .catch(error => console.error('Error:', error));







