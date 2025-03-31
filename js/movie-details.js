// DOM Elements
const movieDetailsContainer = document.getElementById('movie-details');
const dateSelector = document.getElementById('date-selector');
const showtimesContainer = document.getElementById('showtimes-container');

// Variables
let movieData = null;
let selectedDate = null;

// Load movie data from localStorage or use sample data
function loadMovieData() {
    const movieId = localStorage.getItem('selectedMovieId');
    
    // For demo purposes, we'll use sample data if no ID in localStorage
    if (!movieId) {
        movieData = {
            id: 1,
            title: "Interstellar 2",
            poster: "https://source.unsplash.com/300x450/?space",
            genre: "Sci-Fi, Adventure",
            duration: "2h 49m",
            rating: 4.8,
            director: "Christopher Nolan",
            releaseDate: "2025-03-15",
            synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. In this sequel, they face new challenges as they explore even more distant galaxies.",
            cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
            showtimes: [
                { time: "10:30 AM", theater: "Theater 1" },
                { time: "1:45 PM", theater: "Theater 3" },
                { time: "5:00 PM", theater: "Theater 2" },
                { time: "8:15 PM", theater: "Theater 1" }
            ]
        };
    } else {
        // In a real app, you'd fetch this from your data source
        // For now, we'll use the hard-coded movie object in movies.js
        
        // For the demo, let's use a sample movie
        movieData = {
            id: parseInt(movieId),
            title: "Interstellar 2",
            poster: "https://source.unsplash.com/300x450/?space",
            genre: "Sci-Fi, Adventure",
            duration: "2h 49m",
            rating: 4.8,
            director: "Christopher Nolan",
            releaseDate: "2025-03-15",
            synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. In this sequel, they face new challenges as they explore even more distant galaxies.",
            cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
            language: "English",
            subtitles: "Available",
            classification: "PG-13",
            showtimes: [
                { time: "10:30 AM", theater: "Theater 1" },
                { time: "1:45 PM", theater: "Theater 3" },
                { time: "5:00 PM", theater: "Theater 2" },
                { time: "8:15 PM", theater: "Theater 1" }
            ]
        };
    }
    
    displayMovieDetails();
}

// Display movie details
function displayMovieDetails() {
    // Convert rating to stars
    const fullStars = Math.floor(movieData.rating);
    const hasHalfStar = movieData.rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<span class="star">★</span>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<span class="star half">★</span>';
        } else {
            starsHTML += '<span class="star empty">☆</span>';
        }
    }
    
    // Format cast list
    const castHTML = movieData.cast ? 
        `<div class="movie-cast">
            <h3>Cast</h3>
            <div class="cast-list">
                ${movieData.cast.map(actor => `<span>${actor}</span>`).join(', ')}
            </div>
        </div>` : '';
    
    // Poster image HTML - with fallback to green square
    const posterHTML = movieData.poster ? 
        `<img src="${movieData.poster}" alt="${movieData.title} Poster">` : 
        `<div class="placeholder-poster" style="background-color: #4CAF50; width: 100%; height: 100%;"></div>`;
    
    // Display movie details
    movieDetailsContainer.innerHTML = `
        <div class="movie-poster">
            ${posterHTML}
        </div>
        <div class="movie-info">
            <h1 class="movie-title">${movieData.title}</h1>
            <div class="movie-meta">
                <span>${movieData.genre}</span>
                <span>|</span>
                <span>${movieData.duration}</span>
                <span>|</span>
                <span>Release: ${movieData.releaseDate}</span>
            </div>
            <div class="movie-rating">
                <p>Rating: ${movieData.rating}/5</p>
                <div class="stars">${starsHTML}</div>
            </div>
            <div class="movie-synopsis">
                <p>${movieData.synopsis}</p>
            </div>
            ${castHTML}
            <div class="movie-details">
                <h3>Details</h3>
                <div class="details-list">
                    <div class="details-item">
                        <span class="details-label">Director:</span>
                        <span>${movieData.director}</span>
                    </div>
                    ${movieData.language ? `
                    <div class="details-item">
                        <span class="details-label">Language:</span>
                        <span>${movieData.language}</span>
                    </div>` : ''}
                    ${movieData.subtitles ? `
                    <div class="details-item">
                        <span class="details-label">Subtitles:</span>
                        <span>${movieData.subtitles}</span>
                    </div>` : ''}
                    ${movieData.classification ? `
                    <div class="details-item">
                        <span class="details-label">Classification:</span>
                        <span>${movieData.classification}</span>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Generate dates for the next 7 days
function generateDates() {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        dates.push({
            date,
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            weekday: date.toLocaleString('default', { weekday: 'short' }),
            formatted: date.toISOString().split('T')[0]
        });
    }
    
    return dates;
}

// Display date selector
function displayDateSelector() {
    const dates = generateDates();
    selectedDate = dates[0].formatted; // Select first date by default
    
    dateSelector.innerHTML = dates.map((date, index) => `
        <div class="date-option ${index === 0 ? 'active' : ''}" data-date="${date.formatted}">
            <div class="date-weekday">${date.weekday}</div>
            <div class="date-day">${date.day}</div>
            <div class="date-month">${date.month}</div>
        </div>
    `).join('');
    
    // Add click event to date options
    const dateOptions = dateSelector.querySelectorAll('.date-option');
    dateOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            dateOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update selected date
            selectedDate = option.dataset.date;
            
            // Update showtimes
            displayShowtimes();
        });
    });
    
    // Initial showtimes display
    displayShowtimes();
}

// Display showtimes
function displayShowtimes() {
    // In a real app, you'd filter showtimes based on the selected date
    // For the demo, we'll show the same showtimes for all dates
    
    // Sample theaters data (in a real app, this would come from your backend)
    const theaters = [
        {
            id: 1,
            name: "Lincoln Square Cinema",
            address: "123 Main St, New York, NY 10001",
            showtimes: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM", "10:30 PM"]
        },
        {
            id: 2,
            name: "Downtown Multiplex",
            address: "456 Broadway, New York, NY 10002",
            showtimes: ["11:00 AM", "2:30 PM", "6:15 PM", "9:00 PM"]
        },
        {
            id: 3,
            name: "Westside Movie Center",
            address: "789 West End Ave, New York, NY 10003",
            showtimes: ["12:15 PM", "3:30 PM", "7:00 PM", "10:00 PM"]
        }
    ];
    
    showtimesContainer.innerHTML = theaters.map(theater => `
        <div class="theater-card">
            <h3 class="theater-name">${theater.name}</h3>
            <p class="theater-address">${theater.address}</p>
            <div class="time-slots">
                ${theater.showtimes.map(time => `
                    <div class="time-slot" data-theater="${theater.id}" data-time="${time}" data-date="${selectedDate}">
                        ${time}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Add click event to time slots
    const timeSlots = showtimesContainer.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            const theaterId = slot.dataset.theater;
            const time = slot.dataset.time;
            const date = slot.dataset.date;
            
            // Store selected showtime info in localStorage
            localStorage.setItem('selectedShowtimeTheater', theaterId);
            localStorage.setItem('selectedShowtimeTime', time);
            localStorage.setItem('selectedShowtimeDate', date);
            
            // For our demo, we'll just store the theater name and the showtime index
            const theaterName = theaters.find(t => t.id == theaterId).name;
            localStorage.setItem('theaterName', theaterName);
            
            // Navigate to seat selection page
            window.location.href = 'seat-selection.html';
        });
    });
}

// Initialize the page
function init() {
    loadMovieData();
    displayDateSelector();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);