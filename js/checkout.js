// DOM Elements
const movieSummary = document.getElementById('movie-summary');
const adultTicketsInput = document.getElementById('adult-tickets');
const childTicketsInput = document.getElementById('child-tickets');
const adultMinusBtn = document.getElementById('adult-minus');
const adultPlusBtn = document.getElementById('adult-plus');
const childMinusBtn = document.getElementById('child-minus');
const childPlusBtn = document.getElementById('child-plus');
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
const ADULT_PRICE = 15.00;
const CHILD_PRICE = 10.00;
const BOOKING_FEE = 1.50;
const TAX_RATE = 0.08;

// Variables
let movieData = null;
let showtimeData = null;
let theaterName = null;
let selectedSeats = [];

// Load data from localStorage
function loadOrderData() {
    // Get movie data
    const movieId = localStorage.getItem('selectedMovieId');
    
    // In a real app, we would fetch this from the server
    // For this demo, we'll use hardcoded sample data
    
    // Sample movie data
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
    
    if (!movieId) {
        // Default movie data if none selected
        movieData = movies[0];
    } else {
        // Find selected movie
        const foundMovie = movies.find(movie => movie.id == movieId);
        movieData = foundMovie || movies[0];
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
    
    // Get selected seats from localStorage or use defaults
    const seatsData = localStorage.getItem('selectedSeats');
    if (seatsData) {
        selectedSeats = JSON.parse(seatsData);
    }
    
    // Display data on the page
    displayMovieSummary();
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

// Ticket quantity controls
function setupTicketControls() {
    // Adult tickets
    adultMinusBtn.addEventListener('click', () => {
        const currentValue = parseInt(adultTicketsInput.value);
        if (currentValue > 0) {
            adultTicketsInput.value = currentValue - 1;
            calculateTotal();
        }
    });
    
    adultPlusBtn.addEventListener('click', () => {
        const currentValue = parseInt(adultTicketsInput.value);
        adultTicketsInput.value = currentValue + 1;
        calculateTotal();
    });
    
    // Child tickets
    childMinusBtn.addEventListener('click', () => {
        const currentValue = parseInt(childTicketsInput.value);
        if (currentValue > 0) {
            childTicketsInput.value = currentValue - 1;
            calculateTotal();
        }
    });
    
    childPlusBtn.addEventListener('click', () => {
        const currentValue = parseInt(childTicketsInput.value);
        childTicketsInput.value = currentValue + 1;
        calculateTotal();
    });
}

// Calculate total
function calculateTotal() {
    const adultTickets = parseInt(adultTicketsInput.value) || 0;
    const childTickets = parseInt(childTicketsInput.value) || 0;
    
    // Ensure at least one ticket is selected
    if (adultTickets === 0 && childTickets === 0) {
        adultTicketsInput.value = 1;
        const adultTickets = 1;
    }
    
    const subtotal = (adultTickets * ADULT_PRICE) + (childTickets * CHILD_PRICE);
    const tax = (subtotal + BOOKING_FEE) * TAX_RATE;
    const total = subtotal + BOOKING_FEE + tax;
    
    subtotalElement.textContent = subtotal.toFixed(2);
    bookingFeeElement.textContent = BOOKING_FEE.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
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
    const adultTickets = parseInt(adultTicketsInput.value) || 0;
    const childTickets = parseInt(childTicketsInput.value) || 0;
    
    // Create ticket details HTML
    ticketDetails.innerHTML = `
        <div class="ticket-info">
            <p><strong>Movie:</strong> ${movieData.title}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${showtimeData.time}</p>
            <p><strong>Theater:</strong> ${theaterName}</p>
            <p><strong>Tickets:</strong> ${adultTickets} Adult, ${childTickets} Child</p>
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
}

// Initialize
function init() {
    loadOrderData();
    setupTicketControls();
    paymentForm.addEventListener('submit', handleFormSubmit);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);