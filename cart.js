// Shopping Cart JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    setupEventListeners();
});

// Initialize cart on page load
function initializeCart() {
    updateCartDisplay();
    updateCartCount();
}

// Set up event listeners
function setupEventListeners() {
    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }

    // Promo code
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    // Recommended course buttons
    const recommendedBtns = document.querySelectorAll('.add-recommended-btn');
    recommendedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseName = this.getAttribute('data-course');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(courseName, price);
        });
    });

    // Checkout modal
    setupCheckoutModal();
}

// Get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('learnspace_cart') || '[]');
}

// Save cart items to localStorage
function saveCartItems(items) {
    localStorage.setItem('learnspace_cart', JSON.stringify(items));
}

// Add item to cart
function addToCart(courseName, price, instructor = 'Expert Instructor', rating = 4.8, reviews = 1000, duration = '8 weeks', level = 'Beginner') {
    const cartItems = getCartItems();
    
    // Check if item already exists
    const existingItem = cartItems.find(item => item.name === courseName);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Updated ${courseName} quantity in cart`, 'success');
    } else {
        const newItem = {
            id: Date.now().toString(),
            name: courseName,
            price: price,
            instructor: instructor,
            rating: rating,
            reviews: reviews,
            duration: duration,
            level: level,
            quantity: 1,
            addedAt: new Date().toISOString()
        };
        cartItems.push(newItem);
        showNotification(`${courseName} added to cart!`, 'success');
    }
    
    saveCartItems(cartItems);
    updateCartDisplay();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(itemId) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    saveCartItems(updatedItems);
    updateCartDisplay();
    updateCartCount();
    showNotification('Item removed from cart', 'info');
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.id === itemId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCartItems(cartItems);
        updateCartDisplay();
        updateCartCount();
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('learnspace_cart');
        updateCartDisplay();
        updateCartCount();
        showNotification('Cart cleared', 'info');
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = getCartItems();
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';
    
    // Generate cart items HTML
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="Img/course-placeholder.jpg" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="instructor">By ${item.instructor}</p>
                <div class="item-meta">
                    <span class="rating">
                        <i class="fas fa-star"></i> ${item.rating} (${item.reviews.toLocaleString()} reviews)
                    </span>
                    <span class="duration">${item.duration}</span>
                    <span class="level">${item.level}</span>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="item-price">
                <span class="price">$${item.price}</span>
                <span class="total">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const cartItems = getCartItems();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Apply discount if promo code is active
    const discount = getActiveDiscount();
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;
    
    // Update summary elements
    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    
    // Show/hide discount row
    const discountRow = document.getElementById('discountRow');
    if (discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discountAmount').textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
        discountRow.style.display = 'none';
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cartItems = getCartItems();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
    });
}

// Promo code functionality
function applyPromoCode() {
    const promoInput = document.getElementById('promoInput');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    const validPromoCodes = {
        'WELCOME10': 0.10,
        'STUDENT20': 0.20,
        'SAVE15': 0.15,
        'NEWUSER': 0.25
    };
    
    if (validPromoCodes[promoCode]) {
        localStorage.setItem('learnspace_promo', JSON.stringify({
            code: promoCode,
            discount: validPromoCodes[promoCode]
        }));
        
        promoInput.value = '';
        updateCartSummary();
        showNotification(`Promo code ${promoCode} applied! ${(validPromoCodes[promoCode] * 100)}% discount`, 'success');
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Get active discount
function getActiveDiscount() {
    const promoData = localStorage.getItem('learnspace_promo');
    if (promoData) {
        const promo = JSON.parse(promoData);
        return promo.discount || 0;
    }
    return 0;
}

// Checkout modal functionality
function setupCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeCheckoutModal');
    const cancelBtn = document.getElementById('cancelCheckout');
    const completeOrderBtn = document.getElementById('completeOrderBtn');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCheckoutModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeCheckoutModal);
    }
    
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', completeOrder);
    }
    
    // Close modal when clicking outside
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cardForm = document.getElementById('cardForm');
            if (this.value === 'card') {
                cardForm.style.display = 'block';
            } else {
                cardForm.style.display = 'none';
            }
        });
    });
    
    // Card number formatting
    const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.value = formattedValue;
        });
    }
    
    // Expiry date formatting
    const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
}

function openCheckoutModal() {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    // Populate checkout summary
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = getActiveDiscount();
    const total = subtotal - (subtotal * discount);
    
    summaryItems.innerHTML = cartItems.map(item => `
        <div class="checkout-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    if (discount > 0) {
        summaryItems.innerHTML += `
            <div class="checkout-item discount">
                <span>Discount (${(discount * 100)}%)</span>
                <span>-$${(subtotal * discount).toFixed(2)}</span>
            </div>
        `;
    }
    
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function completeOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Simulate order processing
    const completeOrderBtn = document.getElementById('completeOrderBtn');
    const originalText = completeOrderBtn.innerHTML;
    
    completeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    completeOrderBtn.disabled = true;
    
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('learnspace_cart');
        localStorage.removeItem('learnspace_promo');
        
        // Close modal
        closeCheckoutModal();
        
        // Show success message
        showOrderSuccessModal();
        
        // Reset button
        completeOrderBtn.innerHTML = originalText;
        completeOrderBtn.disabled = false;
        
        // Update display
        updateCartDisplay();
        updateCartCount();
    }, 2000);
}

function showOrderSuccessModal() {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Successful!</h2>
            <p>Thank you for your purchase. You'll receive an email confirmation shortly with access to your courses.</p>
            <div class="success-actions">
                <button class="cta-btn" onclick="window.location.href='courses.html'">
                    Browse More Courses
                </button>
                <button class="secondary-btn" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow = 'auto';">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successModal.parentNode) {
            successModal.remove();
            document.body.style.overflow = 'auto';
        }
    }, 10000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#20bf6b' : type === 'error' ? '#ff4757' : '#4f93ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;

