// Sample movie data
// In a real application, this would be fetched from a backend API
const movies = [
    {
        id: 1,
        title: "Interstellar 2",
        poster: "https://source.unsplash.com/300x450/?space",
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
        poster: "https://source.unsplash.com/300x450/?adventure",
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
        poster: "https://source.unsplash.com/300x450/?superhero",
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
]