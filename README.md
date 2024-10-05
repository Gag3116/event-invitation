
# Event Invitation App

A simple event invitation web application where users can create, preview, and manage event invitations, and guests can RSVP to the event.
You can visit this project at:


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project allows users to create event invitations, generate a unique link to share with guests, and manage RSVPs. Guests can view the invitation and submit their RSVP without needing to log in.

## Features

- User authentication (Login/Logout).
- Create and manage event invitations.
- View invitation previews and RSVP details.
- Guests can RSVP via a unique invitation link.
- Protected routes for logged-in users to manage invitations.

## Tech Stack

- **Frontend**: Vue 3, Vue Router
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Other**: Axios for HTTP requests

## Setup

To get started with this project, you'll need to set up both the frontend and backend locally.

### Prerequisites

- Node.js
- MongoDB
- Git

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wedding-invitation.git
   cd wedding-invitation/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run serve
   ```

4. Access the app by navigating to `http://localhost:8080` in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Creat a mongodb cluster in local or altas and get the connect url like:
   ```
   mongodb+srv://<user>:<password>@cluster0.om0jl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Creat a `.env` file and set up your environment variables in a it:
   ```env
   MONGO_URI=your-mongo-db-uri
   PORT=5001
   JWT_SECRET=your-jwt-secret
   ```

5. Start the backend server:
   ```bash
   node index.js
   ```

6. The backend will be running on `http://localhost:5001`.

### API Endpoints

Here are the key API endpoints used in the application:

- **POST** `/api/login`: User login.
- **POST** `/api/register`: User registration.
- **POST** `/api/create`: Create a new event invitation (authentication required).
- **GET** `/api/invitations`: Get all invitations for a user (authentication required).
- **GET** `/api/invitation/:id`: Get a specific event invitation.
- **POST** `/api/invitation/:id/rsvp`: Submit RSVP for a specific event invitation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request if you want to improve this project or fix any issues.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
