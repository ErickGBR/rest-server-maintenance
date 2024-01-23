// Import required packages and configure environment variables
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
// Create a Server class
class Server {
  constructor() {
    this.app = express(); // Initialize Express application
    this.port = process.env.PORT; // Set the server port from environment variables
    this.paths = {
      categoriesPath: "/api/categories", // Define the base path for category routes
      searchPath: "/api/search", // Define the base path for search routes
      userRoutesPath: "/api/user", // Define the base path for user routes
      productsPath: "/api/products", // Define the base path for product routes
      uploadPath: "/api/upload", // Define the base path for upload routes
      authPath: "/api/auth", // Define the base path for auth routes
    };
    //ConnectDB
    this.connectDb();

    // Middleware setup
    this.middlewares();

    // Error handling setup
    this.errorHandling();

    // Define routes
    this.routes();
  }

  //database connection

  async connectDb() {
    await dbConnection();
  }

  // Middleware configuration
  middlewares() {
    // Enable Cross-Origin Resource Sharing (CORS)
    this.app.use(cors());

    // Parse incoming JSON requests
    this.app.use(express.json());

    // Serve static files from the 'public' directory
    this.app.use(express.static("public"));
  }

  // Define routes
  routes() {
    // Use the user routes defined in the 'user' module
    this.app.use(this.paths.userRoutesPath, require("../routes/user"));
    this.app.use(this.paths.searchPath, require("../routes/search"));
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.categoriesPath, require("../routes/categories"));
    this.app.use(this.paths.productsPath, require("../routes/products"));
    this.app.use(this.paths.uploadPath, require("../routes/upload"));
  }

  // Error handling middleware
  errorHandling() {
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
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
