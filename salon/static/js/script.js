// =======================================
// ADD TO CART
// =======================================

function addToCart(name, price, btn) {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    // Check if already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    // Save cart
    localStorage.setItem("bhawnaCart", JSON.stringify(cart));

    // Button update
    let qty = cart.find(item => item.name === name).quantity;

    btn.innerHTML = `Added (${qty}) ✓`;

    btn.style.background = "green";

    // Update cart count
    updateCartCount();
}



// =======================================
// UPDATE CART COUNT
// =======================================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    let totalCount = 0;

    cart.forEach(item => {

        totalCount += item.quantity;

    });

    document.querySelectorAll(".cart-count").forEach(el => {

        el.innerText = totalCount;

    });

}



// =======================================
// DISPLAY CART ITEMS
// =======================================

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    let cartList = document.getElementById("cart-list");

    let totalBill = document.getElementById("totalBill");

    if (!cartList) return;

    cartList.innerHTML = "";

    let total = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartList.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
            </div>
        `;

        if (totalBill) {
            totalBill.innerHTML = "";
        }

        return;
    }

    // Loop cart items
    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        cartList.innerHTML += `

        <div class="cart-item">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Subtotal: ₹${subtotal}</p>

            </div>

            <div class="cart-actions">

                <button onclick="changeQty(${index}, -1)">
                    -
                </button>

                <button onclick="changeQty(${index}, 1)">
                    +
                </button>

                <button class="remove-btn"
                        onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;
    });

    // Total Bill
    if (totalBill) {

        totalBill.innerHTML = `
            <h2>Total Bill: ₹${total}</h2>
        `;
    }

    updateCartCount();
}



// =======================================
// CHANGE QUANTITY
// =======================================

function changeQty(index, change) {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    cart[index].quantity += change;

    // Remove if quantity becomes 0
    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    // Save
    localStorage.setItem("bhawnaCart", JSON.stringify(cart));

    // Reload cart
    displayCart();
}



// =======================================
// REMOVE ITEM
// =======================================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("bhawnaCart", JSON.stringify(cart));

    displayCart();
}



// =======================================
// SEND BOOKING TO WHATSAPP
// =======================================

function sendBooking() {

    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];

    // Empty cart check
    if (cart.length === 0) {

        alert("Cart is empty!");

        return;
    }

    // Form values
    let name = document.getElementById("custName").value;

    let phone = document.getElementById("custPhone").value;

    let email = document.getElementById("custEmail").value;

    let address = document.getElementById("custAddress").value;

    // Validation
    if (
        name === "" ||
        phone === "" ||
        email === "" ||
        address === ""
    ) {

        alert("Please fill all details!");

        return;
    }
// =======================================
// WHATSAPP MESSAGE
// =======================================

let message = `
🛒 *New Booking*

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
🏠 Address: ${address}

`;

let total = 0;

// CART ITEMS
cart.forEach((item, index) => {

    let subtotal = item.price * item.quantity;

    total += subtotal;

    message += `
━━━━━━━━━━━━━━
📦 Item ${index + 1}

✨ ${item.name}

🔢 Quantity: ${item.quantity}
💵 Price: ₹${item.price}
🧾 Subtotal: ₹${subtotal}

`;

});

message += `
━━━━━━━━━━━━━━
💰 *Total Bill: ₹${total}*
`;
    // YOUR WHATSAPP NUMBER
    let whatsappNumber = "919335300518";

    // WhatsApp URL
    let whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Clear cart after order
    localStorage.removeItem("bhawnaCart");

    // Reload cart
    displayCart();

    // Reset form
    document.getElementById("custName").value = "";

    document.getElementById("custPhone").value = "";

    document.getElementById("custEmail").value = "";

    document.getElementById("custAddress").value = "";

}



// =======================================
// PAGE LOAD
// =======================================

window.onload = function () {

    updateCartCount();

    displayCart();

};