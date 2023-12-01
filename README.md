# rest-server-maintenance

REST server with Node.js for maintenance practice, showcasing robust backend development using Node.js, Express, Mongoose, and Express Validation.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/rest-server-maintenance.git
   cd rest-server-maintenance
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the project root based on the `example.env` template:**

   ```env
   PORT=your_port_number
   MONGODB_CNN=mongo_database_url
   ```

## Scripts

- `npm test`: Run tests.
- `npm run dev`: Start the development server using Nodemon and index.js.
- `npm start`: Start the server using Node.js.

## Endpoints

- **CRUD Operations for Users:**
  - `GET /api/user`: Get all users.
  - `GET /api/user/:id`: Get a user by ID.
  - `POST /api/user`: Create a new user.
  - `PUT /api/user/:id`: Update a user by ID.
  - `DELETE /api/user/:id`: Delete a user by ID.
  - `PATCH /api/user/:id`: patch a user by ID.

## Technologies Used

- Node.js
- Express
- Mongoose
- Express Validation

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Your feedback is highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).
