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
    const movieId = localStorage.getItem('selectedMovieId');
    const showtimeIndex = localStorage.getItem('selectedShowtimeIndex');
    
    // For demo, we'll use dummy data if localStorage is empty
    if (!movieId) {
        movieData = {
            id: 1,
            title: "Sample Movie",
            poster: "https://source.unsplash.com/300x450/?movie",
            genre: "Action, Adventure",
            duration: "2h 15m",
            rating: 4.5,
            director: "John Doe"
        };
        
        showtimeData = {
            time: "7:30 PM",
            theater: "Theater 2",
            date: "March 26, 2025"
        };
    } else {
        // In a real app, you'd fetch this from your data source
        // For the demo, we'll use localStorage
        // In a real-world scenario, this would come from your backend
        
        const movies = JSON.parse(localStorage.getItem('movies'));
        if (movies) {
            movieData = movies.find(movie => movie.id === parseInt(movieId));
            if (movieData && showtimeIndex) {
                showtimeData = movieData.showtimes[parseInt(showtimeIndex)];
            }
        }
        
        // If we still don't have data, use the dummy data
        if (!movieData) {
            movieData = {
                id: movieId,
                title: "Interstellar 2",
                poster: "https://source.unsplash.com/300x450/?space",
                genre: "Sci-Fi, Adventure",
                duration: "2h 49m",
                rating: 4.8,
                director: "Christopher Nolan"
            };
            
            showtimeData = {
                time: "8:15 PM",
                theater: "Theater 1",
                date: "March 26, 2025"
            };
        }
    }
    
    displayMovieInfo();
}

// Display movie information in the banner
function displayMovieInfo() {
    movieInfoBanner.innerHTML = `
        <div class="movie-banner-content">
            <div class="movie-banner-poster">
                <img src="${movieData.poster}" alt="${movieData.title} Poster">
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
                seat.addEventListener('click', () => toggleSeat(seatId, seat));
            }
            
            // Add tooltip with seat ID
            seat.setAttribute('title', seatId);
            
            rowElement.appendChild(seat);
        }
        
        seatingPlan.appendChild(rowElement);
    }
}

// Toggle seat selection
function toggleSeat(seatId, seatElement) {
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
        const row = seatId.charAt(0);
        const isPremium = seatMap.premiumRows.includes(row.charCodeAt(0) - 65);
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
}

// Initialize the page
function init() {
    initOccupiedSeats();
    loadMovieData();
    createSeatingPlan();
    
    // Add event listener to proceed button
    proceedButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);