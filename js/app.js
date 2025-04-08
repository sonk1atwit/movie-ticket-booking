// app.js - Main application functions

// Function to update cart count in the header
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    
    // Get selected seats from localStorage
    const seatsData = localStorage.getItem('selectedSeats');
    let count = 0;
    
    if (seatsData) {
        // Parse the seats data and count the number of seats
        const selectedSeats = JSON.parse(seatsData);
        count = selectedSeats.length;
    }
    
    // Update the cart count display
    if (cartCountElement) {
        cartCountElement.textContent = count;
        
        // Highlight the count if it's greater than 0
        if (count > 0) {
            cartCountElement.classList.add('has-items');
        } else {
            cartCountElement.classList.remove('has-items');
        }
    }
}

// Function to handle navigation in the application
function setupNavigation() {
    // Update active link in navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-navigation a');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (link.getAttribute('href').includes(currentPath) || 
            (currentPath.endsWith('/') && link.getAttribute('href').includes('index.html'))) {
            link.classList.add('active');
        }
    });
    
    // Cart click handler (if not already handled by href)
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon && cartIcon.getAttribute('href') === '#') {
        cartIcon.addEventListener('click', () => {
            // Get seat data from localStorage
            const seatsData = localStorage.getItem('selectedSeats');
            
            if (seatsData && JSON.parse(seatsData).length > 0) {
                window.location.href = 'pages/checkout.html';
            } else {
                alert('Your cart is empty. Please select seats first.');
            }
        });
    }
}

// Initialize the application
function initApp() {
    updateCartCount();
    setupNavigation();
    
    // Log some debug info
    console.log('App initialized');
    console.log('selectedMovieId:', localStorage.getItem('selectedMovieId'));
    console.log('selectedSeats:', localStorage.getItem('selectedSeats'));
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Expose the updateCartCount function globally so it can be called from other scripts
window.updateCartCount = updateCartCount;