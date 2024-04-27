
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
   PORT=3000
   MONGODB_CNN=mongodb://your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_or_private_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

## Scripts

- `npm run dev`: Start the development server using Nodemon and `index.js`.
- `npm start`: Start the server using Node.js.

## Endpoints

### Authentication

- **Sign In (Login):**
  - `POST /api/auth/login`
    - Request Body:
      ```json
      {
          "email": "string",
          "password": "string"
      }
      ```
    - Response: Returns a JWT (JSON Web Token) for authentication.

- **Sign In with Google:**
  - `POST /api/auth/google`
    - Redirects to Google OAuth for authentication.

- **Sign Up (Register User):**
  - `POST /api/auth/signup`
    - Request Body:
      ```json
      {
          "name": "string",
          "email": "string",
          "password": "string"
      }
      ```

### Users

- **Get All Users:**
  - `GET /api/user`
    - Requires JWT in `x-token` header for authentication.

- **Get User by ID:**
  - `GET /api/user/:id`
    - The `id` should be a valid user ID.
    - Requires JWT in `x-token` header for authentication.

- **Create a New User:**
  - `POST /api/user`
    - Request Body:
      ```json
      {
          "name": "string",
          "email": "string",
          "password": "string",
          "role": "string (optional)",
          "active": "boolean"
      }
      ```
    - Requires JWT in `x-token` header for authentication.

- **Update User by ID:**
  - `PUT /api/user/:id`
    - The `id` should be a valid user ID.
    - Request Body:
      ```json
      {
          "name": "string",
          "email": "string",
          "password": "string",
          "role": "string (optional)",
          "active": "boolean"
      }
      ```
    - Requires JWT in `x-token` header for authentication.

- **Delete User by ID:**
  - `DELETE /api/user/:id`
    - The `id` should be a valid user ID.
    - Requires JWT in `x-token` header for authentication.

### Categories

- **Get Categories with Pagination:**
  - `GET /api/categories?limit=2&page=1`
    - Requires JWT in `x-token` header for authentication.

- **Get Category by ID:**
  - `GET /api/categories?id=string`
    - The `id` should be a valid MongoDB ID.
    - Requires JWT in `x-token` header for authentication.

- **Create a New Category:**
  - `POST /api/categories`
    - Request Body:
      ```json
      {
          "name": "string",
          "status": "boolean"
      }
      ```
    - Requires JWT in `x-token` header for authentication.

- **Update a Category:**
  - `PUT /api/categories?id=string`
    - The `id` should be a valid MongoDB ID.
    - Request Body:
      ```json
      {
          "name": "string",
          "status": "boolean"
      }
      ```
    - Requires JWT in `x-token` header for authentication.

- **Delete a Category:**
  - `DELETE /api/categories?id=string`
    - The `id` should be a valid MongoDB ID.
    - Requires JWT in `x-token` header for authentication.

### Products

- **Get Products with Pagination:**
  - `GET /api/products?limit=10&page=1`
    - Requires JWT in `x-token` header for authentication.

- **Create a New Product:**
  - `POST /api/products`
    - Request Body:
      ```json
      {
          "name": "string",
          "status": "boolean",
          "price": "number",
          "category": "string (MongoDB ID)",
          "description": "string",
          "available": "boolean"
      }
      ```
    - Requires JWT in `x-token` header for authentication.

- **Update a Product:**
  - `PUT /api/products?id=string`
    - The `id` should be a valid MongoDB ID.
    - Request Body similar to creation of product.
    - Requires JWT in `x-token` header for authentication.

- **Delete a Product:**
  - `DELETE /api/products?id=string`
    - The `id` should be a valid MongoDB ID.
    - Requires JWT in `x-token` header for authentication.

### File Upload

- **Upload File:**
  - `POST /api/upload`
    - Request Body: form-data with `file` property.
    - Requires JWT in `x-token` header for authentication.

## Using JSON Web Token (JWT)

To access protected endpoints that require authentication, include the JWT (JSON Web Token) obtained during login in the request headers.

**Include JWT in Request Headers:**

```plaintext
x-token: <your_jwt_here>
```

Replace `<your_jwt_here>` with the JWT token obtained from the login response.

**Example Usage (using cURL):**

```bash
# Replace <your_jwt_here> with your actual JWT token
curl -X GET \
  'https://your-base-url/api/categories' \
  -H 'x-token: <your_jwt_here>'
```

## Logging In with Google

To log in using Google OAuth, visit the following URL:

```plaintext
https://your-base-url/api/auth/google
```

This endpoint will redirect you to Google's authentication page to sign in with your Google account.

## Technologies Used

- Node.js
- Express
- Mongoose
- Express Validation

## Contributions

Feel free to contribute by opening issues or submitting pull requests. Your feedback is highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).a
