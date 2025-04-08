// DOM Elements
const movieInfoBanner = document.getElementById('movie-info-banner');
const seatingPlan = document.getElementById('seating-plan');
const selectedSeatsText = document.getElementById('selected-seats-text');
const totalPriceElement = document.getElementById('total-price');
const proceedButton = document.getElementById('proceed-btn');

// Constants
const TICKET_PRICE = 12.50;
const PREMIUM_SURCHARGE = 3.00;

// Variables
let selectedSeats = [];
let movieData = null;
let showtimeData = null;

// Sample movie data to match movies.js
const movies = [
    {
        id: 1,
        title: "Interstellar 2",
        poster: "../assets/images/Interstellar2.png",
        genre: "Sci-Fi, Adventure",
        duration: "2h 49m",
        rating: 4.8,
        director: "Christopher Nolan"
    },
    {
        id: 2,
        title: "The Lost City",
        poster: "../assets/images/TheLostCity.png",
        genre: "Adventure, Comedy",
        duration: "1h 52m",
        rating: 4.2,
        director: "Aaron Nee, Adam Nee"
    },
    {
        id: 3,
        title: "Moonfall",
        poster: "../assets/images/Moonfall.png",
        genre: "Sci-Fi, Action",
        duration: "2h 10m",
        rating: 3.9,
        director: "Roland Emmerich"
    },
    {
        id: 4,
        title: "The Batman Returns",
        poster: "../assets/images/BatmanReturns.png",
        genre: "Action, Crime",
        duration: "2h 56m",
        rating: 4.7,
        director: "Matt Reeves"
    },
    {
        id: 5,
        title: "Wonder Woman 3",
        poster: "../assets/images/WonderWoman3.png",
        genre: "Action, Fantasy",
        duration: "2h 25m",
        rating: 4.5,
        director: "Patty Jenkins"
    },
    {
        id: 6,
        title: "The Haunting",
        poster: "../assets/images/TheHaunting.png",
        genre: "Horror, Thriller",
        duration: "1h 48m",
        rating: 4.1,
        director: "James Wan"
    }
];

// Seat map configuration
const seatMap = {
    rows: 8,
    seatsPerRow: 12,
    premiumRows: [6, 7], // Rows with premium seats (0-indexed)
    layout: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row A
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row B
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row C
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row D
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1], // Row E (with aisle)
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1], // Row F (with aisle)
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Row G (premium)
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // Row H (premium)
    ],
    // Randomly generate occupied seats for demo
    occupiedSeats: []
};

// Initialize occupied seats randomly (for demo purposes)
function initOccupiedSeats() {
    const occupiedCount = Math.floor(Math.random() * 20) + 10; // 10-30 occupied seats
    const maxSeatIndex = seatMap.rows * seatMap.seatsPerRow;
    
    for (let i = 0; i < occupiedCount; i++) {
        let randomRow, randomSeat;
        let seatCode;
        
        do {
            randomRow = Math.floor(Math.random() * seatMap.rows);
            randomSeat = Math.floor(Math.random() * seatMap.seatsPerRow);
            seatCode = `${String.fromCharCode(65 + randomRow)}${randomSeat + 1}`;
            
            // Skip if this position is an aisle or already occupied
            if (seatMap.layout[randomRow][randomSeat] === 0) {
                continue;
            }
        } while (seatMap.occupiedSeats.includes(seatCode));
        
        seatMap.occupiedSeats.push(seatCode);
    }
}

// Load movie data from localStorage
function loadMovieData() {
    // Get the selected movie ID from localStorage
    const movieId = localStorage.getItem('selectedMovieId');
    console.log("Seat Selection Page - Selected movie ID:", movieId);
    
    // Get showtime data
    const time = localStorage.getItem('selectedShowtimeTime') || "8:15 PM";
    const date = localStorage.getItem('selectedShowtimeDate') || "2025-03-26";
    const theaterName = localStorage.getItem('theaterName') || "Theater 1";
    
    // Set showtime data
    showtimeData = {
        time,
        theater: theaterName,
        date
    };
    
    // Find the movie data from the sample array using the ID
    if (movieId) {
        const foundMovie = movies.find(movie => movie.id == movieId);
        if (foundMovie) {
            console.log("Found movie:", foundMovie.title);
            movieData = foundMovie;
        } else {
            console.log("Movie ID not found, using default");
            movieData = movies[0]; // Default to first movie if not found
        }
    } else {
        console.log("No movie ID in localStorage, using default");
        movieData = movies[0]; // Default to first movie
    }
    
    // Display the movie information
    displayMovieInfo();
}

// Display movie information in the banner
function displayMovieInfo() {
    console.log("Displaying movie info:", movieData.title);
    
    // Create poster HTML with fallback to green square
    const posterHTML = movieData.poster ? 
        `<img src="${movieData.poster}" alt="${movieData.title} Poster">` : 
        `<div class="placeholder-poster" style="background-color: #4CAF50; width: 100%; height: 100%;"></div>`;
        
    movieInfoBanner.innerHTML = `
        <div class="movie-banner-content">
            <div class="movie-banner-poster">
                ${posterHTML}
            </div>
            <div class="movie-banner-info">
                <h2>${movieData.title}</h2>
                <div class="movie-banner-meta">
                    <span>${movieData.genre}</span>
                    <span>|</span>
                    <span>${movieData.duration}</span>
                </div>
                <div class="showtime-info">
                    <p><strong>Date:</strong> ${showtimeData.date}</p>
                    <p><strong>Time:</strong> ${showtimeData.time}</p>
                    <p><strong>Theater:</strong> ${showtimeData.theater}</p>
                </div>
            </div>
        </div>
    `;
}

// Create seating plan
function createSeatingPlan() {
    seatingPlan.innerHTML = '';
    
    for (let i = 0; i < seatMap.rows; i++) {
        const rowLetter = String.fromCharCode(65 + i);
        const rowElement = document.createElement('div');
        rowElement.className = 'seat-row';
        
        // Add row label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-label';
        rowLabel.textContent = rowLetter;
        rowElement.appendChild(rowLabel);
        
        for (let j = 0; j < seatMap.seatsPerRow; j++) {
            // If this position is an aisle (0 in layout), add a gap
            if (seatMap.layout[i][j] === 0) {
                const seatGap = document.createElement('div');
                seatGap.className = 'seat-gap';
                rowElement.appendChild(seatGap);
                continue;
            }
            
            const seat = document.createElement('div');
            const seatNumber = j + 1;
            const seatId = `${rowLetter}${seatNumber}`;
            
            seat.className = 'seat';
            seat.id = seatId;
            
            // Check if seat is occupied
            if (seatMap.occupiedSeats.includes(seatId)) {
                seat.classList.add('occupied');
            } else {
                seat.classList.add('available');
            }
            
            // Check if seat is premium
            if (seatMap.premiumRows.includes(i)) {
                seat.classList.add('premium');
            }
            
            // Add click event to available seats
            if (!seat.classList.contains('occupied')) {
                seat.addEventListener('click', () => toggleSeat(seatId, seat, i));
            }
            
            // Add tooltip with seat ID
            seat.setAttribute('title', seatId);
            
            rowElement.appendChild(seat);
        }
        
        seatingPlan.appendChild(rowElement);
    }
}

// Toggle seat selection
function toggleSeat(seatId, seatElement, rowIndex) {
    if (seatElement.classList.contains('selected')) {
        // Deselect the seat
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
        
        // Remove from selected seats array
        const index = selectedSeats.findIndex(seat => seat.id === seatId);
        if (index > -1) {
            selectedSeats.splice(index, 1);
        }
    } else {
        // Select the seat
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');
        
        // Add to selected seats array
        const isPremium = seatMap.premiumRows.includes(rowIndex);
        const price = isPremium ? TICKET_PRICE + PREMIUM_SURCHARGE : TICKET_PRICE;
        
        selectedSeats.push({
            id: seatId,
            isPremium,
            price
        });
    }
    
    updateSelectedSeatsInfo();
}

// Update selected seats information
function updateSelectedSeatsInfo() {
    if (selectedSeats.length === 0) {
        selectedSeatsText.textContent = 'None';
        totalPriceElement.textContent = '0.00';
        proceedButton.disabled = true;
    } else {
        // Sort seats for display
        const sortedSeats = [...selectedSeats].sort((a, b) => a.id.localeCompare(b.id));
        selectedSeatsText.textContent = sortedSeats.map(seat => seat.id).join(', ');
        
        // Calculate total price
        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
        
        proceedButton.disabled = false;
    }
    
    // Save selected seats to localStorage for the checkout page
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    
    // Update cart count in the header
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}

// Initialize the page
function init() {
    initOccupiedSeats();
    loadMovieData();
    createSeatingPlan();
    
    // Check if there are already seats in localStorage
    const existingSeatsData = localStorage.getItem('selectedSeats');
    if (existingSeatsData) {
        const existingSeats = JSON.parse(existingSeatsData);
        
        // Pre-select those seats if they're available in this theater
        if (existingSeats && existingSeats.length > 0) {
            existingSeats.forEach(savedSeat => {
                const seatElement = document.getElementById(savedSeat.id);
                if (seatElement && seatElement.classList.contains('available')) {
                    const rowIndex = savedSeat.id.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
                    toggleSeat(savedSeat.id, seatElement, rowIndex);
                }
            });
        }
    }
    
    // Add event listener to proceed button
    proceedButton.addEventListener('click', () => {
        // We keep the selectedMovieId in localStorage for the checkout page
        console.log("Proceeding to checkout with movie ID:", localStorage.getItem('selectedMovieId'));
        window.location.href = 'checkout.html';
    });
    
    // Update the cart count
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);