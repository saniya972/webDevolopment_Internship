# Unfazed – Therapist Booking Platform

## Project Overview

Unfazed is a web-based therapist booking platform designed to help therapists manage their professional activities and allow clients to book therapy sessions online.

The platform provides therapist authentication, availability management, client bookings, and tools for managing therapy sessions.

## Features

### Therapist Features

* Therapist registration and login
* Therapist dashboard and profile management
* Availability management
* View and manage client bookings
* Calendar and client management
* Session notes
* Client messaging
* Package and subscription management
* Analytics dashboard

### Client Features

* Public therapist booking page
* View available appointment slots
* Book therapy sessions online
* View booking confirmation

## Technologies Used

### Frontend

* React.js
* Vite
* React Router
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO

## Project Structure

```text
MajorProject/
├── unfazed-frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── api/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── unfazed-backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    ├── app.js
    ├── server.js
    └── package.json
```

## Getting Started

### Prerequisites

* Node.js and npm
* MongoDB Atlas account or MongoDB connection
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/saniya972/webDevolopment_Internship.git
```

### 2. Start the Backend

Navigate to the backend directory:

```bash
cd MajorProject/unfazed-backend
npm install
```

Create a `.env` file in the backend directory with the required environment variables:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_private_jwt_secret
```

Use your own private credentials. Never upload your `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

The local backend runs at:

http://localhost:5000

### 3. Start the Frontend

Open a separate terminal:

```bash
cd MajorProject/unfazed-frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local frontend at:

http://localhost:5173

For the deployed version, configure `VITE_API_BASE_URL` to point to the deployed backend API.

## Deployment

* Frontend: React application
* Backend: Node.js and Express API hosted on Render
* Database: MongoDB Atlas

## Testing

The following workflows have been tested:

* Therapist login
* Therapist availability retrieval
* Public appointment booking
* Booking confirmation
* Displaying client bookings in the therapist dashboard

## Author

**Saniya**

Computer Science and Engineering (CSE)

GitHub: [saniya972](https://github.com/saniya972)

## License

This project was developed for academic and educational purposes.
