// Sample movie data
// In a real application, this would be fetched from a backend API
const movies = [
    {
        id: 1,
        title: "Interstellar 2",
        poster: "assets/images/Interstellar2.png",
        genre: "Sci-Fi, Adventure",
        duration: "2h 49m",
        rating: 4.8,
        director: "Christopher Nolan",
        synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2025-03-15",
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
        poster: null, // This movie will show a green placeholder
        genre: "Adventure, Comedy",
        duration: "1h 52m",
        rating: 4.2,
        director: "Aaron Nee, Adam Nee",
        synopsis: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.",
        releaseDate: "2025-02-10",
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
        poster: "https://source.unsplash.com/300x450/?moon",
        genre: "Sci-Fi, Action",
        duration: "2h 10m",
        rating: 3.9,
        director: "Roland Emmerich",
        synopsis: "A mysterious force knocks the moon from its orbit and sends it hurtling toward Earth.",
        releaseDate: "2025-01-20",
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
        poster: "https://source.unsplash.com/300x450/?batman",
        genre: "Action, Crime",
        duration: "2h 56m",
        rating: 4.7,
        director: "Matt Reeves",
        synopsis: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
        releaseDate: "2025-03-05",
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
        poster: null, // This movie will show a green placeholder
        genre: "Action, Fantasy",
        duration: "2h 25m",
        rating: 4.5,
        director: "Patty Jenkins",
        synopsis: "Diana Prince faces a new threat in the modern world while uncovering secrets from her past.",
        releaseDate: "2025-02-28",
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
        poster: "https://source.unsplash.com/300x450/?horror",
        genre: "Horror, Thriller",
        duration: "1h 48m",
        rating: 4.1,
        director: "James Wan",
        synopsis: "A family discovers their new home has a dark history and is haunted by a malevolent presence.",
        releaseDate: "2025-03-20",
        showtimes: [
            { time: "12:00 PM", theater: "Theater 3" },
            { time: "3:15 PM", theater: "Theater 2" },
            { time: "6:30 PM", theater: "Theater 1" },
            { time: "9:15 PM", theater: "Theater 3" }
        ]
    }
];

// DOM Elements
const movieGrid = document.getElementById('movie-grid');
const loadingSpinner = document.getElementById('loading-spinner');

// Function to create a movie card
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.dataset.id = movie.id;
    
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
            <button class="btn book-now-btn" data-id="${movie.id}">Book Now</button>
        </div>
    `;
    
    // Add event listener to the "Book Now" button
    const bookButton = movieCard.querySelector('.book-now-btn');
    bookButton.addEventListener('click', () => {
        navigateToMovieDetails(movie.id);
    });
    
    return movieCard;
}

// Function to navigate to movie details page
function navigateToMovieDetails(movieId) {
    // Store the selected movie ID in local storage
    localStorage.setItem('selectedMovieId', movieId);
    
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
}

// Function to load movies
function loadMovies() {
    console.log("loadMovies function called");
    
    // In a real application, this would be an API call
    // For now, we'll simulate a small delay
    
    // Show loading spinner
    loadingSpinner.style.display = 'block';
    
    // Simulate API call delay
    setTimeout(() => {
        console.log("Timeout function executing");
        
        // Hide loading spinner after "loading" is complete
        loadingSpinner.style.display = 'none';
        
        console.log("Movies array:", movies.length, "items");
        
        // Add movie cards to the grid
        movies.forEach(movie => {
            console.log(`Creating card for ${movie.title}, poster: ${movie.poster ? "Has poster" : "GREEN PLACEHOLDER"}`);
            const movieCard = createMovieCard(movie);
            movieGrid.appendChild(movieCard);
        });
        
        // Setup carousel navigation
        setupCarouselNavigation();
        
        console.log("Movie grid now contains:", movieGrid.children.length, "children");
    }, 800); // 800ms delay to simulate loading
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

// Load movies when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    setupKeyboardNavigation();
});