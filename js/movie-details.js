// DOM Elements
const movieDetailsContainer = document.getElementById('movie-details');
const dateSelector = document.getElementById('date-selector');
const showtimesContainer = document.getElementById('showtimes-container');

// Variables
let movieData = null;
let selectedDate = null;

// Sample movies data
const movies = [
    {
        id: 1,
        title: "Interstellar 2",
        poster: "../assets/images/Interstellar2.png",
        genre: "Sci-Fi, Adventure",
        duration: "2h 49m",
        rating: 4.8,
        director: "Christopher Nolan",
        synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2025-03-15",
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
    },
    {
        id: 2,
        title: "The Lost City",
        poster: "../assets/images/TheLostCity.png",
        genre: "Adventure, Comedy",
        duration: "1h 52m",
        rating: 4.2,
        director: "Aaron Nee, Adam Nee",
        synopsis: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.",
        releaseDate: "2025-02-10",
        cast: ["Sandra Bullock", "Channing Tatum", "Daniel Radcliffe", "Brad Pitt"],
        language: "English",
        subtitles: "Available",
        classification: "PG-13",
        showtimes: [
            { time: "11:00 AM", theater: "Theater 2" },
            { time: "2:30 PM", theater: "Theater 1" },
            { time: "6:45 PM", theater: "Theater 3" },
            { time: "9:30 PM", theater: "Theater 2" }
        ]
    },
    {
        id: 3,
        title: "Moonfall",
        poster: "../assets/images/Moonfall.png",
        genre: "Sci-Fi, Action",
        duration: "2h 10m",
        rating: 3.9,
        director: "Roland Emmerich",
        synopsis: "A mysterious force knocks the moon from its orbit and sends it hurtling toward Earth.",
        releaseDate: "2025-01-20",
        cast: ["Halle Berry", "Patrick Wilson", "John Bradley", "Michael Peña"],
        language: "English",
        subtitles: "Available",
        classification: "PG-13",
        showtimes: [
            { time: "10:00 AM", theater: "Theater 3" },
            { time: "1:15 PM", theater: "Theater 2" },
            { time: "4:30 PM", theater: "Theater 1" },
            { time: "7:45 PM", theater: "Theater 3" }
        ]
    },
    {
        id: 4,
        title: "The Batman Returns",
        poster: "../assets/images/BatmanReturns.png",
        genre: "Action, Crime",
        duration: "2h 56m",
        rating: 4.7,
        director: "Matt Reeves",
        synopsis: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
        releaseDate: "2025-03-05",
        cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
        language: "English",
        subtitles: "Available",
        classification: "PG-13",
        showtimes: [
            { time: "11:30 AM", theater: "Theater 1" },
            { time: "3:00 PM", theater: "Theater 3" },
            { time: "6:15 PM", theater: "Theater 2" },
            { time: "9:45 PM", theater: "Theater 1" }
        ]
    },
    {
        id: 5,
        title: "Wonder Woman 3",
        poster: "../assets/images/WonderWoman3.png",
        genre: "Action, Fantasy",
        duration: "2h 25m",
        rating: 4.5,
        director: "Patty Jenkins",
        synopsis: "Diana Prince faces a new threat in the modern world while uncovering secrets from her past.",
        releaseDate: "2025-02-28",
        cast: ["Gal Gadot", "Chris Pine", "Kristen Wiig", "Pedro Pascal"],
        language: "English",
        subtitles: "Available",
        classification: "PG-13",
        showtimes: [
            { time: "10:15 AM", theater: "Theater 2" },
            { time: "1:30 PM", theater: "Theater 1" },
            { time: "4:45 PM", theater: "Theater 3" },
            { time: "8:00 PM", theater: "Theater 2" }
        ]
    },
    {
        id: 6,
        title: "The Haunting",
        poster: "../assets/images/TheHaunting.png",
        genre: "Horror, Thriller",
        duration: "1h 48m",
        rating: 4.1,
        director: "James Wan",
        synopsis: "A family discovers their new home has a dark history and is haunted by a malevolent presence.",
        releaseDate: "2025-03-20",
        cast: ["Vera Farmiga", "Patrick Wilson", "Taissa Farmiga", "Ron Livingston"],
        language: "English",
        subtitles: "Available",
        classification: "R",
        showtimes: [
            { time: "12:00 PM", theater: "Theater 3" },
            { time: "3:15 PM", theater: "Theater 2" },
            { time: "6:30 PM", theater: "Theater 1" },
            { time: "9:15 PM", theater: "Theater 3" }
        ]
    }
];

// Load movie data from localStorage or use sample data
function loadMovieData() {
    const selectedMovieId = localStorage.getItem('selectedMovieId');
    console.log("Movie Details Page - Selected movie ID from localStorage:", selectedMovieId);
    
    // For demo purposes, we'll use sample data if no ID in localStorage
    if (!selectedMovieId) {
        console.log("No movie ID found in localStorage, using default movie data");
        movieData = movies[0]; // Default to first movie
    } else {
        // Find the movie in our local data based on the ID
        const foundMovie = movies.find(movie => movie.id == selectedMovieId);
        
        if (foundMovie) {
            console.log("Found movie in local data:", foundMovie.title);
            movieData = foundMovie;
        } else {
            console.log("Movie ID not found in local data, using default movie data");
            movieData = movies[0]; // Default to first movie
        }
    }
    
    console.log("Movie data loaded:", movieData);
    displayMovieDetails();
}

// Display movie details
function displayMovieDetails() {
    console.log("Displaying movie details:", movieData);
    
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
            
            // IMPORTANT: We keep the selectedMovieId in localStorage for next pages
            // No need to reset it here, as it should already be set
            
            // For our demo, we'll just store the theater name
            const theaterName = theaters.find(t => t.id == theaterId).name;
            localStorage.setItem('theaterName', theaterName);
            
            console.log("Navigating to seat selection with movie ID:", localStorage.getItem('selectedMovieId'));
            
            // Navigate to seat selection page
            window.location.href = 'seat-selection.html';
        });
    });
}

// Initialize the page
function init() {
    console.log("Initializing movie details page");
    loadMovieData();
    displayDateSelector();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);