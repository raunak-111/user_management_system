# Reqres User Management Application

This is a React application that integrates with the Reqres API to perform basic user management functions.

## Features

### Level 1: Authentication
- Login screen using the Reqres API
- Authentication with email/password
- Token storage for authenticated sessions

### Level 2: User List
- Paginated display of users
- User cards with avatar, name, and email
- Pagination controls

### Level 3: User Management
- Edit user details (first name, last name, email)
- Delete users
- Search and filter users

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm 

### Installation

1. Clone the repository or download the source code
2. Install dependencies:
```
npm install
```

### Running the Application
```
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

### Login Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

## Tech Stack
- React
- JavaScript (converted from TypeScript)
- React Router for navigation
- Axios for API requests
- React Toastify for notifications

## API Reference
The application uses the [Reqres API](https://reqres.in/) for all operations:
- Login: POST /api/login
- Get Users: GET /api/users?page=1
- Update User: PUT /api/users/{id}
- Delete User: DELETE /api/users/{id}

## Important Note About the Reqres API

Reqres.in is a mock API service that simulates real API behavior but doesn't actually persist changes. When you:

1. Edit a user: The API returns a successful response with an "updatedAt" timestamp, but the changes aren't actually saved on their server.
2. Delete a user: The API returns a 204 status code indicating success, but the user isn't actually removed from their database.

For this reason, this application implements client-side updates - when you edit or delete a user, the changes will appear in the UI but will reset if you refresh the page.

In a real-world application with a production API, the changes would persist on the server. 