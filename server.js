// server.js - Express server to connect frontend to MongoDB
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static('.')); // Serve files from the current directory

// MongoDB connection URI - Update with your actual connection string
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

// Database and collection names
const dbName = "cinema_db";
const collectionName = "movies";

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(dbName);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

// API endpoints
// Get all movies
app.get('/api/movies', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const movies = await db.collection(collectionName).find({}).toArray();
        res.json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies", error: error.message });
    }
});

// Get a specific movie by ID
app.get('/api/movies/:id', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const movie = await db.collection(collectionName).findOne({ 
            _id: new ObjectId(req.params.id) 
        });
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        res.json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ message: "Error fetching movie", error: error.message });
    }
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection(collectionName).insertOne(req.body);
        res.status(201).json({ 
            message: "Movie created successfully", 
            movieId: result.insertedId 
        });
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).json({ message: "Error adding movie", error: error.message });
    }
});

// Update a movie
app.put('/api/movies/:id', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection(collectionName).updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        res.json({ message: "Movie updated successfully" });
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ message: "Error updating movie", error: error.message });
    }
});

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const result = await db.collection(collectionName).deleteOne({ 
            _id: new ObjectId(req.params.id) 
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle application shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});