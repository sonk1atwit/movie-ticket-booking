// movies.js - Movie listing and carousel functionality with MongoDB integration

// DOM Elements
const movieGrid = document.getElementById('movie-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const comingSoonCarousel = document.getElementById('coming-soon-carousel');

// API URL - Change this to your deployed API URL in production
const API_URL = 'http://localhost:3000/api';

// Function to fetch movies from API
async function fetchMovies() {
    try {
        const response = await fetch(`${API_URL}/movies`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return []; // Return empty array if there's an error
    }
}

// Function to create a movie card
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.dataset.id = movie._id; // Use MongoDB _id
    
    // Convert rating to stars
    const fullStars = Math.floor(movie.rating);
    const hasHalfStar = movie.rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<span class="star full">★</span>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<span class="star half">★</span>';
        } else {
            starsHTML += '<span class="star empty">☆</span>';
        }
    }
    
    // Poster image HTML - with fallback to green square
    const posterHTML = movie.poster ? 
        `<img src="${movie.poster}" alt="${movie.title} Poster">` : 
        `<div class="placeholder-poster" style="background-color: #4CAF50; width: 100%; height: 100%;"></div>`;
    
    movieCard.innerHTML = `
        <div class="movie-poster">
            ${posterHTML}
            <div class="movie-rating">${movie.rating}</div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-genre">${movie.genre}</p>
            <p class="movie-duration">${movie.duration}</p>
            <div class="movie-stars">${starsHTML}</div>
            <button class="btn book-now-btn" data-id="${movie._id}">Book Now</button>
        </div>
    `;
    
    // Add event listener to the "Book Now" button
    const bookButton = movieCard.querySelector('.book-now-btn');
    bookButton.addEventListener('click', () => {
        navigateToMovieDetails(movie._id);
    });
    
    return movieCard;
}

// Function to navigate to movie details page
function navigateToMovieDetails(movieId) {
    // Store the selected movie ID in local storage
    localStorage.setItem('selectedMovieId', movieId);
    console.log("Navigating to movie details with ID:", movieId);
    
    // Navigate to the details page
    window.location.href = 'pages/movie-details.html';
}

// Carousel Navigation
function setupCarouselNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const movieGrid = document.getElementById('movie-grid');
    
    // Scroll amount (width of one movie card plus gap)
    const scrollAmount = 260; // 240px card width + 20px gap
    
    if (prevBtn && nextBtn && movieGrid) {
        // Previous button click
        prevBtn.addEventListener('click', () => {
            movieGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            movieGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Hide/show buttons based on scroll position
        movieGrid.addEventListener('scroll', () => {
            // Show/hide previous button
            if (movieGrid.scrollLeft <= 10) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            }
            
            // Show/hide next button
            if (movieGrid.scrollLeft >= movieGrid.scrollWidth - movieGrid.clientWidth - 10) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            }
        });
        
        // Initial button state
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    }
    
    // Set up coming soon carousel if it exists
    const prevBtnComing = document.querySelector('.prev-btn-coming');
    const nextBtnComing = document.querySelector('.next-btn-coming');
    
    if (prevBtnComing && nextBtnComing && comingSoonCarousel) {
        // Similar event listeners for coming soon carousel
        prevBtnComing.addEventListener('click', () => {
            comingSoonCarousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtnComing.addEventListener('click', () => {
            comingSoonCarousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

// Function to handle keyboard navigation for carousel
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });
}

// Function to load movies
async function loadMovies() {
    console.log("Loading movies from MongoDB...");
    
    // Show loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    
    try {
        // Fetch movies from API
        const movies = await fetchMovies();
        console.log(`Loaded ${movies.length} movies from database`);
        
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        if (movies.length === 0) {
            if (movieGrid) {
                movieGrid.innerHTML = '<div class="error-message">No movies available at this time. Please check back later.</div>';
            }
            return;
        }
        
        // Add movie cards to the grid
        if (movieGrid) {
            movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieGrid.appendChild(movieCard);
            });
            
            // Setup carousel navigation after adding movies
            setupCarouselNavigation();
        }
        
        // Update the cart count after loading movies
        if (typeof window.updateCartCount === 'function') {
            window.updateCartCount();
        }
    } catch (error) {
        console.error("Error loading movies:", error);
        if (loadingSpinner) {
            loadingSpinner.textContent = "Error loading movies. Please try again later.";
        }
    }
}

// Initialize the page
function init() {
    loadMovies();
    setupKeyboardNavigation();
}

// Load movies when the page is ready
document.addEventListener('DOMContentLoaded', init);