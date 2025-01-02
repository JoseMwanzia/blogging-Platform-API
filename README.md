# Blog Post Management API

## Overview
This is a RESTful API for managing blog posts. It allows users to create, update, delete, and retrieve blog posts. The API is built with Node.js and Express.js and uses a MySQL database for data storage. TO get the [Projects requirements](https://roadmap.sh/projects/blogging-platform-api).

## Features
- **Create a post**: Add a new blog post with title, content, category, and tags.
- **Update a post**: Edit an existing blog post by ID.
- **Delete a post**: Remove a blog post by ID.
- **Get a post by ID**: Retrieve a specific blog post by ID.
- **Get all posts**: List all blog posts with pagination and search functionality.
- **Redirect to posts**: Redirects from the root URL to the posts endpoint.

## Project Structure
```
.
├── app
│   ├── controller
│   │   └── postController.js
│   ├── model
│   │   └── postModel.js
│   └── routes
│       └── postRoutes.js
├── config
│   └── dbConnect.js
├── app.js
└── README.md
```

## Setup and Installation

### Prerequisites
- Node.js
- MySQL database

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the following variables:
   ```env
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DB_PORT=port-number
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:<port>`.

## Endpoints

### POST `/posts`
Create a new post.
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "category": "string",
    "tags": "string"
  }
  ```
- **Response**: Returns the created post.

### PUT `/posts/:postID`
Update an existing post by ID.
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "category": "string",
    "tags": "string"
  }
  ```
- **Response**: Returns the updated post.

### DELETE `/posts/:postID`
Delete a post by ID.
- **Response**: Status 204 on success, 404 if the post does not exist.

### GET `/posts/:postID`
Retrieve a specific post by ID.
- **Response**: Returns the post data or 404 if not found.

### GET `/posts`
Retrieve all posts with optional search and pagination.
- **Query Parameters**:
  - `term` (optional): Search term for filtering posts.
  - `page` (optional): Page number (default: 1).
  - `limit` (optional): Items per page (default: 10).
- **Response**: Returns a list of posts.

### GET `/`
Redirect to `/posts`.

## Database Schema
The `posts` table:
```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Technologies Used
- **Node.js**: Backend runtime environment
- **Express.js**: Web framework
- **MySQL**: Relational database
- **dotenv**: Environment variable management
- **mysql2**: MySQL client for Node.js

## License
This project is licensed under the MIT License.

