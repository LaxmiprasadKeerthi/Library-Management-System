# Library Management System

## Overview
The Library Management System is a web-based application designed to manage and streamline the operations of a library. It provides features for users to browse, pre-book, and manage books, while administrators can oversee library operations.

## Features

### User Features
- **Home Page**: Overview of the library system.
- **Search Bar**: Search for books by title, author, or category.
- **Pre-Booking**: Reserve books online.
- **Profile Management**: Manage user details and view booking history.
- **Signup/Login**: User authentication and account creation.

### Admin Features
- **Admin Dashboard**: Overview of library operations.
- **Add Books**: Add new books to the library.
- **Manage Bookings**: View and manage user bookings.
- **Status Management**: Update the status of books and bookings.

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **CSS**: For styling the application.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.

## Folder Structure

### Client
- `src/`: Contains React components, assets, and styles.
- `public/`: Static files like `index.html` and images.

### Server
- `controllers/`: Handles business logic for various routes.
- `models/`: Defines database schemas.
- `routes/`: Contains route definitions for the API.
- `middleware/`: Custom middleware for authentication and other tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LaxmiprasadKeerthi/Library-Management-System.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Library-Management-System
   ```

3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Start the development servers:
   - Client:
     ```bash
     cd client
     npm start
     ```
   - Server:
     ```bash
     cd server
     npm start
     ```

5. Open the application in your browser at `http://localhost:3000`.

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the LICENSE file for details.