const filter = Array.from(document.getElementsByClassName("filter"));
const product = Array.from(document.querySelectorAll(".grid-item"));

product.forEach(prod =>
    prod.style.display =""
);

/*filter.forEach(item => 
    item.addEventListener("change", function(){
        if(item.checked){
            product.forEach(prod => {
                if(item.parentElement.textContent.trim().toLowerCase() !== prod.dataset.productType.trim().toLowerCase()){
                    prod.style.display = "none";
                } else {
                    prod.style.display = "";
                }
            });
        }else{
            product.forEach(prod =>
                prod.style.display =""
            );
        }
    })
);*/




