# News Aggregator API

This is a **News Aggregator API** built using Node.js, Express, and MongoDB. The API allows users to register, log in, manage their preferences, and fetch news articles based on their preferences.

---

## Features

1. **User Authentication**:
   - User registration with email, name, password, and preferences.
   - User login with email and password.
   - JWT-based authentication for secure access to protected routes.

2. **Preferences Management**:
   - Retrieve user preferences.
   - Update user preferences.

3. **News Aggregation**:
   - Fetch news articles based on user preferences using the News API.

4. **Error Handling**:
   - Comprehensive error handling for missing fields, invalid tokens, and other edge cases.

---

## Endpoints

### **Authentication**

#### `POST /users/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
      "name": "Clark Kent",
      "email": "clark@superman.com",
      "password": "Krypt()n8",
      "preferences": ["movies", "comics"]
  }
  ```
- **Response**:
  - **201 Created**: User successfully registered.
  - **400 Bad Request**: Missing mandatory fields.

#### `POST /users/login`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
      "email": "clark@superman.com",
      "password": "Krypt()n8"
  }
  ```
- **Response**:
  - **200 OK**: Returns a JWT token.
  - **401 Unauthorized**: Incorrect password or user not found.

---

### **Preferences**

#### `GET /users/preferences`
- **Description**: Retrieve user preferences.
- **Headers**:
  ```json
  {
      "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  - **200 OK**: Returns user preferences.
  - **401 Unauthorized**: Missing or invalid token.

#### `PUT /users/preferences`
- **Description**: Update user preferences.
- **Headers**:
  ```json
  {
      "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
      "preferences": ["movies", "comics", "games"]
  }
  ```
- **Response**:
  - **200 OK**: Returns updated preferences.
  - **401 Unauthorized**: Missing or invalid token.

---

### **News**

#### `GET /news`
- **Description**: Fetch news articles based on user preferences.
- **Headers**:
  ```json
  {
      "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  - **200 OK**: Returns news articles.
  - **400 Bad Request**: No preferences found.
  - **401 Unauthorized**: Missing or invalid token.

---

## Project Structure

```
news-aggregator-api-yaswanth2204/
├── controllers/
│   ├── usersController.js       # Handles user-related logic
├── middlewares/
│   ├── authorization.js         # Middleware for JWT-based authorization
├── models/
│   ├── usersModel.js            # MongoDB schema for users
├── routes/
│   ├── usersRouter.js           # Routes for user-related endpoints
│   ├── newsRouter.js            # Routes for news-related endpoints
├── test/
│   ├── server.test.js           # Test cases for API endpoints
├── app.js                       # Main application file
├── server.js                    # Entry point for the server
├── README.md                    # Project documentation
```

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Axios**: HTTP client for making requests to the News API.
- **Tap**: Testing framework for writing and running test cases.

---

## Environment Variables

The following environment variables are required to run the project:

- `JWT_SECRET`: Secret key for signing JWT tokens.
- `NEWS_API_KEY`: API key for accessing the News API.
- `MONGO_URI`: Connection string for MongoDB.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd news-aggregator-api-yaswanth2204
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     JWT_SECRET=your_jwt_secret
     NEWS_API_KEY=your_news_api_key
     MONGO_URI=your_mongo_connection_string
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Run tests:
   ```bash
   npm test
   ```

---

## Testing

The project includes test cases for all major endpoints. The tests are located in the `test/server.test.js` file and can be run using the following command:
```bash
npm test
```

---

## API Workflow

1. **User Registration**:
   - A new user registers using the `/users/signup` endpoint.
   - The user provides their name, email, password, and preferences.

2. **User Login**:
   - The user logs in using the `/users/login` endpoint.
   - A JWT token is returned upon successful login.

3. **Manage Preferences**:
   - The user retrieves or updates their preferences using the `/users/preferences` endpoints.

4. **Fetch News**:
   - The user fetches news articles based on their preferences using the `/news` endpoint.

---
