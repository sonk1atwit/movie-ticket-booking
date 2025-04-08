// DOM Elements
const movieSummary = document.getElementById('movie-summary');
const seatsList = document.getElementById('seats-list');
const subtotalElement = document.getElementById('subtotal');
const bookingFeeElement = document.getElementById('booking-fee');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const paymentForm = document.getElementById('payment-form');
const paymentFormContainer = document.getElementById('payment-form-container');
const confirmation = document.getElementById('confirmation');
const ticketDetails = document.getElementById('ticket-details');
const confirmationEmail = document.getElementById('confirmation-email');

// Constants
const REGULAR_SEAT_PRICE = 12.50;
const PREMIUM_SEAT_PRICE = 15.50;
const BOOKING_FEE = 1.50;
const TAX_RATE = 0.08;

// Variables
let movieData = null;
let showtimeData = null;
let theaterName = null;
let selectedSeats = [];

// Sample movie data to match movies.js
const movies = [
    {
        id: 1,
        title: "Interstellar 2",
        poster: "../assets/images/Interstellar2.png",
        genre: "Sci-Fi, Adventure",
        duration: "2h 49m"
    },
    {
        id: 2,
        title: "The Lost City",
        poster: "../assets/images/TheLostCity.png",
        genre: "Adventure, Comedy",
        duration: "1h 52m"
    },
    {
        id: 3,
        title: "Moonfall",
        poster: "../assets/images/Moonfall.png",
        genre: "Sci-Fi, Action",
        duration: "2h 10m"
    },
    {
        id: 4,
        title: "The Batman Returns",
        poster: "../assets/images/BatmanReturns.png",
        genre: "Action, Crime",
        duration: "2h 56m"
    },
    {
        id: 5,
        title: "Wonder Woman 3",
        poster: "../assets/images/WonderWoman3.png",
        genre: "Action, Fantasy",
        duration: "2h 25m"
    },
    {
        id: 6,
        title: "The Haunting",
        poster: "../assets/images/TheHaunting.png",
        genre: "Horror, Thriller",
        duration: "1h 48m"
    }
];

// Load data from localStorage
function loadOrderData() {
    console.log("Checkout Page - Loading order data");
    
    // Get movie data
    const movieId = localStorage.getItem('selectedMovieId');
    console.log("Checkout Page - Selected movie ID:", movieId);
    
    if (!movieId) {
        // Default movie data if none selected
        console.log("No movie ID in localStorage, using default");
        movieData = movies[0];
    } else {
        // Find selected movie
        const foundMovie = movies.find(movie => movie.id == movieId);
        if (foundMovie) {
            console.log("Found movie:", foundMovie.title);
            movieData = foundMovie;
        } else {
            console.log("Movie ID not found, using default");
            movieData = movies[0]; // Default to first movie if not found
        }
    }
    
    // Get showtime data
    const date = localStorage.getItem('selectedShowtimeDate') || "2025-03-26";
    const time = localStorage.getItem('selectedShowtimeTime') || "8:15 PM";
    theaterName = localStorage.getItem('theaterName') || "Lincoln Square Cinema";
    
    showtimeData = {
        date,
        time,
        theaterName
    };
    
    // Get selected seats from localStorage
    const seatsData = localStorage.getItem('selectedSeats');
    if (seatsData) {
        selectedSeats = JSON.parse(seatsData);
        console.log("Selected seats from localStorage:", selectedSeats);
    } else {
        // Sample seat data if none in localStorage
        selectedSeats = [
            { id: "F7", isPremium: false, price: REGULAR_SEAT_PRICE },
            { id: "F8", isPremium: false, price: REGULAR_SEAT_PRICE }
        ];
        console.log("No seats in localStorage, using sample seat data");
    }
    
    // Display data on the page
    displayMovieSummary();
    displaySelectedSeats();
    calculateTotal();
}

// Display movie summary
function displayMovieSummary() {
    // Format the date
    let formattedDate = showtimeData.date;
    try {
        const dateObj = new Date(showtimeData.date);
        formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
    }
    
    // Create poster HTML with fallback to green square
    const posterHTML = movieData.poster ? 
        `<img src="${movieData.poster}" alt="${movieData.title} Poster">` : 
        `<div class="placeholder-poster" style="background-color: #4CAF50; width: 100%; height: 100%;"></div>`;
    
    movieSummary.innerHTML = `
        <div class="movie-poster-small">
            ${posterHTML}
        </div>
        <div class="movie-info-small">
            <h3>${movieData.title}</h3>
            <div class="movie-meta-small">
                <span>${movieData.genre}</span> | <span>${movieData.duration}</span>
            </div>
            <div class="showtime-info-small">
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${showtimeData.time}</p>
                <p><strong>Theater:</strong> ${theaterName}</p>
            </div>
        </div>
    `;
}

// Display selected seats
function displaySelectedSeats() {
    if (selectedSeats.length === 0) {
        // Show empty state if no seats selected
        seatsList.innerHTML = `
            <div class="empty-state">
                <p>No seats selected</p>
                <a href="seat-selection.html" class="select-seats-btn">Select Seats</a>
            </div>
        `;
        return;
    }
    
    // Sort seats for better display
    const sortedSeats = [...selectedSeats].sort((a, b) => a.id.localeCompare(b.id));
    
    // Group by seat type for summary
    const regularSeats = sortedSeats.filter(seat => !seat.isPremium);
    const premiumSeats = sortedSeats.filter(seat => seat.isPremium);
    
    // Create seat tags
    seatsList.innerHTML = '';
    sortedSeats.forEach(seat => {
        const seatTag = document.createElement('div');
        seatTag.className = `seat-tag${seat.isPremium ? ' premium' : ''}`;
        seatTag.textContent = seat.id;
        seatsList.appendChild(seatTag);
    });
    
    // Add seat summary
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'seats-summary';
    summaryDiv.innerHTML = `
        <p>${selectedSeats.length} seat${selectedSeats.length !== 1 ? 's' : ''} selected</p>
        ${regularSeats.length > 0 ? `<p>${regularSeats.length} Regular seat${regularSeats.length !== 1 ? 's' : ''} @ $${REGULAR_SEAT_PRICE.toFixed(2)} each</p>` : ''}
        ${premiumSeats.length > 0 ? `<p>${premiumSeats.length} Premium seat${premiumSeats.length !== 1 ? 's' : ''} @ $${PREMIUM_SEAT_PRICE.toFixed(2)} each</p>` : ''}
    `;
    seatsList.appendChild(summaryDiv);
}

// Calculate total
function calculateTotal() {
    // Calculate subtotal based on seat prices
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    
    // Calculate tax and total
    const tax = (subtotal + BOOKING_FEE) * TAX_RATE;
    const total = subtotal + BOOKING_FEE + tax;
    
    // Update display
    subtotalElement.textContent = subtotal.toFixed(2);
    bookingFeeElement.textContent = BOOKING_FEE.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    
    // Disable confirm button if no seats selected
    const confirmBtn = document.querySelector('.confirm-btn');
    if (confirmBtn) {
        confirmBtn.disabled = selectedSeats.length === 0;
    }
}

// Generate a random ticket code
function generateTicketCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    
    // Generate 8 character code in format XXXX-XXXX
    for (let i = 0; i < 8; i++) {
        if (i === 4) code += '-';
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Basic validation
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!cardName || !cardNumber || !expiryDate || !cvv || !email) {
        alert('Please fill in all payment details');
        return;
    }
    
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat before checkout');
        return;
    }
    
    // Show confirmation
    showConfirmation(email);
}

// Show confirmation
function showConfirmation(email) {
    // Format the date
    let formattedDate = showtimeData.date;
    try {
        const dateObj = new Date(showtimeData.date);
        formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
    }
    
    const ticketCode = generateTicketCode();
    
    // Sort seats for display
    const sortedSeats = [...selectedSeats].sort((a, b) => a.id.localeCompare(b.id));
    const seatsDisplay = sortedSeats.map(seat => seat.id).join(', ');
    
    // Create ticket details HTML
    ticketDetails.innerHTML = `
        <div class="ticket-info">
            <p><strong>Movie:</strong> ${movieData.title}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${showtimeData.time}</p>
            <p><strong>Theater:</strong> ${theaterName}</p>
            <p><strong>Seats:</strong> ${seatsDisplay}</p>
        </div>
        <div class="ticket-code">${ticketCode}</div>
        <p>Please show this code at the cinema or print your tickets at the kiosk.</p>
    `;
    
    // Set confirmation email
    confirmationEmail.textContent = email;
    
    // Hide payment form and show confirmation
    paymentFormContainer.style.display = 'none';
    confirmation.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Clear localStorage for next booking (in a real app, you'd want to save this to a database)
    localStorage.removeItem('selectedMovieId');
    localStorage.removeItem('selectedShowtimeDate');
    localStorage.removeItem('selectedShowtimeTime');
    localStorage.removeItem('theaterName');
    localStorage.removeItem('selectedSeats');
    
    // Update cart count to zero
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}

// Format card number with spaces
function formatCardNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    value = value.substring(0, 19);
    
    // Update input value
    input.value = value;
}

// Format expiry date
function formatExpiryDate(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Add slash after first 2 digits
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    
    // Limit to 5 characters (MM/YY)
    value = value.substring(0, 5);
    
    // Update input value
    input.value = value;
}

// Format CVV
function formatCVV(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 3 or 4 digits
    value = value.substring(0, 4);
    
    // Update input value
    input.value = value;
}

// Setup input formatters
function setupInputFormatters() {
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', () => formatCardNumber(cardNumberInput));
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', () => formatExpiryDate(expiryDateInput));
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', () => formatCVV(cvvInput));
    }
}

// Initialize
function init() {
    console.log("Initializing checkout page");
    loadOrderData();
    setupInputFormatters();
    
    // Update cart count when page loads
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
    
    // Add event listener to payment form
    if (paymentForm) {
        paymentForm.addEventListener('submit', handleFormSubmit);
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);