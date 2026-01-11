// 1. Service ko cart mein add karne ka function
function addToCart(name, price, btn) {
    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];
    
    // Check karo ki kahin ye pehle se to add nahi hai
    if (cart.find(item => item.name === name)) {
        alert("Ye service aapne pehle hi select kar li hai!");
        return;
    }

    // Nayi service add karo
    cart.push({ name: name, price: parseInt(price) });
    localStorage.setItem("bhawnaCart", JSON.stringify(cart));
    
    // Button ka look change karo (Professional feedback)
    let originalText = btn.innerHTML;
    btn.innerHTML = "Added ✓";
    btn.style.background = "#4caf50";
    btn.style.color = "white";
    
    // Nav bar ka count update karo
    updateCartCount();

    // 2 second baad button wapas normal
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = ""; 
        btn.style.color = "";
    }, 2000);
}

// 2. Cart ka count (Nav bar ke liye)
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];
    let countElements = document.querySelectorAll('.cart-count');
    
    // Agar index page par cart-count span hai to update hoga
    countElements.forEach(el => {
        el.innerText = cart.length;
    });

    // Agar "My Selection" link mein span nahi hai to wahan bhi text dikhayega
    const cartLink = document.querySelector('.nav-links a[href="checkout.html"]');
    if (cartLink && cart.length > 0) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Selection (${cart.length})`;
    }
}

// 3. WhatsApp par booking bhejne ka function (For checkout.html)


function sendBooking() {
    let cart = JSON.parse(localStorage.getItem("bhawnaCart")) || [];
    
    // Naye fields nikaalna
    let name = document.getElementById('custName').value;
    let email = document.getElementById('custEmail').value;
    let address = document.getElementById('custAddress').value;
    
    // Validation: Sab bharna zaroori hai
    if(!name || !email || !address) { 
        alert("Please fill Name, Email, and Address to proceed!"); 
        return; 
    }
    
    if(cart.length === 0) { 
        alert("Selection is empty!"); 
        return; 
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let serviceList = cart.map((item, i) => `${i+1}. ${item.name} (₹${item.price})`).join('%0A');

    // WhatsApp Message Design
    let message = `*BHAWNA BEAUTY STUDIO*%0A`;
    message += `--------------------------%0A`;
    message += `*CUSTOMER DETAILS*%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Email:* ${email}%0A`;
    message += `*Address:* ${address}%0A%0A`;
    message += `*SERVICES SELECTED:*%0A${serviceList}%0A`;
    message += `--------------------------%0A`;
    message += `*TOTAL AMOUNT: ₹${total}*%0A%0A`;
    message += `Please confirm my home service appointment.`;

    // WhatsApp Redirect
    window.location.href = `https://wa.me/918429844057?text=${message}`;
    
    // Booking ke baad data clear karna
    localStorage.removeItem("bhawnaCart");
}




