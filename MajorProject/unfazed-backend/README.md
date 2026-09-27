# Unfazed Backend

## Overview

The Unfazed backend is a REST API built with Node.js and Express.js. It supports therapist authentication, appointment booking, availability management, client records, messaging, and subscription-related functionality.

## Technologies

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Socket.IO

## Features

* Therapist registration and login
* JWT-based authentication
* Therapist profile management
* Availability creation and management
* Public appointment booking
* Booking management and cancellation
* Client management
* Session notes
* Real-time messaging
* Packages, payments, and subscriptions
* Analytics and entitlement management

## Installation

### Prerequisites

Install Node.js and npm. A MongoDB Atlas database or compatible MongoDB connection is required.

### Setup

Navigate to the backend directory:

```bash
cd MajorProject/unfazed-backend
npm install
```

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_private_jwt_secret
```

Replace the placeholder values with your own private credentials. Do not commit `.env` to GitHub.

### Run the Server

```bash
npm run dev
```

The local API runs at:

http://localhost:5000

A successful server response at the root URL is:

```json
{
  "message": "Unfazed API is running"
}
```

## API Routes

| Route                | Purpose                                    |
| -------------------- | ------------------------------------------ |
| `/api/auth`          | Therapist registration, login, and profile |
| `/api/availability`  | Therapist availability                     |
| `/api/bookings`      | Booking management                         |
| `/api/clients`       | Client management                          |
| `/api/packages`      | Therapy packages                           |
| `/api/payments`      | Payment-related operations                 |
| `/api/messages`      | Messaging                                  |
| `/api/subscriptions` | Subscription management                    |
| `/api/analytics`     | Analytics                                  |

Most therapist management endpoints require authentication.

## Deployment

The backend is deployed on Render and uses MongoDB Atlas for database storage.

Production API:

https://unfazed-backend-dzvn.onrender.com

## Testing

The API has been tested using Thunder Client, including therapist login, availability retrieval, public booking, and retrieving bookings for the authenticated therapist.

## Author

Saniya

Computer Science and Engineering (CSE)

GitHub: https://github.com/saniya972
