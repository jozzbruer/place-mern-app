# Place-mern-app

Welcome to the MERN Stack! This full-stack application allows users to share and view images. It is built using the MERN (MongoDB, Express.js, React, Node.js) stack and includes authentication and authorization features.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Authorization**: Different user roles (e.g., regular user and admin) with varying levels of access.
- **Image Sharing**: Upload and share images with the community.
- **Responsive Design**: The application is built to be responsive and works on various devices.
- **MongoDB Database**: Utilizes MongoDB as the database for storing user information and images.
- **RESTful API**: The backend follows RESTful principles for a scalable and maintainable API.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jozzbruer/place-mern-app.git
   cd place-mern-app
   ```

2. Install dependencies:

   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory with the following variables:

   ```env
   MONGO_URL=mongodb://localhost:27017/mern-image-sharing
   JWT_KEY=your-secret-key
   ```

2. Create a `.env` file in the `frontend` directory with the following variables:
   ```env
   REACT_APP_SERVER_URI = http://localhost:3001/api // Update with your server's address
   REACT_APP_ASSETS_URI=http://localhost:3001
   ```

## Usage

1. Start the server:

   ```bash
   cd backend
   npm start
   ```

2. Start the client:

   ```bash
   cd frontend
   npm start
   ```

3. Visit `http://localhost:3000` in your browser to use the application.

## Folder Structure

```
mern-image-sharing/
├── frontend/         # React frontend
├── backend/         # Node.js backend
├── .gitignore
├── README.md
└── ...             # Other configuration files
```

## Technologies Used

- **Frontend**:

  - React
  - React Router
  - Axios

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB

- **Authentication**:
  - JSON Web Tokens (JWT)
  - Bcrypt for password hashing
  
![Screenshot 2024-01-14 at 10 04 02 PM](https://github.com/jozzbruer/place-mern-app/assets/21253158/c639bb11-cb21-4e68-99e2-44d48697c2f8)
![Screenshot 2024-01-14 at 10 00 53 PM](https://github.com/jozzbruer/place-mern-app/assets/21253158/ed62122d-63ee-4ffa-9d64-68f971daa1eb)


## Contributing

Feel free to contribute to this project. Create issues for any bugs or feature requests, and submit pull requests to contribute changes.

## License

This project is licensed under the [MIT License](LICENSE).
