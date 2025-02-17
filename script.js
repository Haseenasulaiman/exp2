document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        });
    });

    if (document.getElementById("cart-items")) {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotalContainer = document.getElementById("cart-total");

        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button></td>
                </tr>
            `;
        });

        cartTotalContainer.innerText = total.toFixed(2);

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.dataset.id;
                const index = cart.findIndex(item => item.id === id);
                if (index !== -1) {
                    cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    location.reload();
                }
            });
        });
    }
});

