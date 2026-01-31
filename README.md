# Login Register Backend

This is a simple Node.js backend application for User Login and Registration using Express, MongoDB, and JSON Web Tokens (JWT).

## Tech Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: NoSQL database (via Mongoose).
- **Mongoose**: ODM library for MongoDB.
- **Bcryptjs**: Library for hashing passwords.
- **Jsonwebtoken**: Library for generating JWTs.
- **Nodemon**: Development utility.

## Prerequisites

- Node.js installed.
- MongoDB installed and running locally on default port (27017).

## Installation

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd loginregister
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Register User

- **URL**: `/api/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "exampleuser",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Error message (e.g., User already exists).

### Login User

- **URL**: `/api/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  - `200 OK`: Login successful. Returns token and user info.
  - `401 Unauthorized`: Invalid credentials.
