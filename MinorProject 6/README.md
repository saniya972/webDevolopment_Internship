# Blog REST API

## Project Overview

This project is a Blog REST API developed using Node.js and Express.js.

It allows users to create, read, update and delete blog posts using REST API endpoints.

## Technologies Used

- Node.js
- Express.js
- REST API
- JavaScript
- JSON

## Project Structure

MinorProject 6/
│
├── routes/
│   └── postRoutes.js
│
├── controllers/
│   └── postController.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── data/
│   └── posts.js
│
├── app.js
├── package.json
└── README.md

## Installation

Open the terminal inside the project folder.

Run:

npm install

## Run the Project

Run:

npm start

The server will start at:

http://localhost:3000

## API Endpoints

### 1. Create Post

POST /posts

Request body:

{
    "title": "My First Blog",
    "content": "This is my first blog post.",
    "author": "Saniya",
    "category": "Technology"
}

### 2. Get All Posts

GET /posts

### 3. Get Single Post

GET /posts/1

### 4. Update Post

PUT /posts/1

Request body:

{
    "title": "Updated Blog",
    "content": "Updated content",
    "author": "Saniya",
    "category": "Programming"
}

### 5. Delete Post

DELETE /posts/1

## HTTP Status Codes

200 - Successful request

201 - Post created successfully

400 - Bad request

404 - Post not found

500 - Server error

## API Testing

The APIs can be tested using Postman or Thunder Client.

## Data Storage

This project uses an in-memory JavaScript array for storing blog posts.