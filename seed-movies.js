// seed-movies.js
const { MongoClient } = require('mongodb');

// Your MongoDB connection string (use the local one for now)
const uri = "mongodb://localhost:27017/cinema_db";
const client = new MongoClient(uri);

// Your movie data
const movies = [
    {
        title: "Interstellar 2",
        poster: "assets/images/Interstellar2.png",
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
        title: "The Lost City",
        poster: "assets/images/TheLostCity.png",
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
        title: "Moonfall",
        poster: "assets/images/Moonfall.png",
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
        title: "The Batman Returns",
        poster: "assets/images/BatmanReturns.png",
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
        title: "Wonder Woman 3",
        poster: "assets/images/WonderWoman3.png",
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
        title: "The Haunting",
        poster: "assets/images/TheHaunting.png",
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

// Function to seed the database
async function seedMovies() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");
        
        // Get reference to the database and collection
        const database = client.db("cinema_db");
        const moviesCollection = database.collection("movies");
        
        // Clear existing data (optional)
        await moviesCollection.deleteMany({});
        console.log("Cleared existing movies");
        
        // Insert the movies
        const result = await moviesCollection.insertMany(movies);
        console.log(`${result.insertedCount} movies added to database`);
    } catch (error) {
        console.error("Error seeding movies:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run the seeding function
seedMovies();