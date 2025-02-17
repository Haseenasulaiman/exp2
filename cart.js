document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    function updateCart() {
        cartContainer.innerHTML = "";
        let totalAmount = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<h3 class='text-center'>Your cart is empty</h3>";
        } else {
            cart.forEach((item, index) => {
                let totalPrice = (item.price * item.quantity).toFixed(2);
                totalAmount += parseFloat(totalPrice);

                let col = document.createElement("div");
                col.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
                col.innerHTML = `
                    <div class="card">
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">$${item.price.toFixed(2)}</p>
                            <div class="quantity-controls">
                                <button class="btn btn-sm btn-light decrease" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-sm btn-light increase" data-index="${index}">+</button>
                            </div>
                            <p class="mt-2">Total: $${totalPrice}</p>
                            <button class="btn btn-danger btn-sm remove" data-index="${index}">Remove</button>
                        </div>
                    </div>
                `;
                cartContainer.appendChild(col);
            });
        }

        cartTotal.textContent = totalAmount.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Handle Increase & Decrease Quantity
    cartContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("increase")) {
            let index = e.target.getAttribute("data-index");
            cart[index].quantity += 1;
            updateCart();
        }

        if (e.target.classList.contains("decrease")) {
            let index = e.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        }

        if (e.target.classList.contains("remove")) {
            let index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    updateCart();
});
