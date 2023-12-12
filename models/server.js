// Import required packages and configure environment variables
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require("../database/config");
// Create a Server class
class Server {
    constructor() {
        this.app = express(); // Initialize Express application
        this.port = process.env.PORT; // Set the server port from environment variables
        this.userRoutesPath = '/api/user'; // Define the base path for user routes
        this.authPath = '/api/auth'; // Define the base path for auth routes        
        //ConnectDB
        this.connectDb()

        // Middleware setup
        this.middlewares();
        
        // Error handling setup
        this.errorHandling();
        
        // Define routes
        this.routes();
    }

    //database connection

    async connectDb(){
        await dbConnection();
    }

    // Middleware configuration
    middlewares() {
        // Enable Cross-Origin Resource Sharing (CORS)
        this.app.use(cors());
        
        // Parse incoming JSON requests
        this.app.use(express.json());
        
        // Serve static files from the 'public' directory
        this.app.use(express.static('public'));
    }

    // Define routes
    routes() {
        // Use the user routes defined in the 'user' module
        this.app.use(this.userRoutesPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    // Error handling middleware
    errorHandling() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    // Start the server and listen on the defined port
    listen() {
        this.app.listen(this.port, () => {
            console.log("Running server on port:", this.port);
        });
    }
}

// Export the Server class for use in other modules
module.exports = Server;
