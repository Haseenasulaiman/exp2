document.addEventListener("DOMContentLoaded", function () {
    function filterProducts(category) {
        let products = document.querySelectorAll(".book-card");

        products.forEach(product => {
            if (category === "all") {
                product.style.display = "block"; // Show all books
            } else {
                product.style.display = product.classList.contains(category) ? "block" : "none";
            }
        });
    }

    // Attach event listeners to category buttons
    document.getElementById("filter-all").addEventListener("click", function () {
        filterProducts("all");
    });

    document.getElementById("filter-fiction").addEventListener("click", function () {
        filterProducts("fiction");
    });

    document.getElementById("filter-non-fiction").addEventListener("click", function () {
        filterProducts("non-fiction");
    });

    document.getElementById("filter-sci-fi").addEventListener("click", function () {
        filterProducts("sci-fi");
    });

    // Ensure Add to Cart buttons work
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let title = this.getAttribute("data-title");
            let price = parseFloat(this.getAttribute("data-price"));
            let image = this.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.title === title);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ title, price, image, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${title} added to cart!`);
        });
    });

    filterProducts("all"); // Show all products on page load
});
