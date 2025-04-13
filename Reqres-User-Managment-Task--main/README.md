# UserHub - User Management Dashboard



A modern user management application built with React that interacts with the [Reqres](https://reqres.in/) REST API. This project features user authentication, comprehensive user management, and a responsive design that works across all devices.


## Features

### Authentication
- JWT-based authentication
- Login/logout functionality
- Protected routes with automatic redirection
- Persistent sessions with localStorage

### User Management
- View users in grid or table layout
- Sort and filter users with instant search
- Edit user information (name & email)
- Delete users
- Pagination for efficient browsing

### UI/UX Features
- Dark mode cyberpunk-inspired design
- Responsive layout (mobile, tablet, desktop)
- Loading spinners and transition animations
- Toast notifications for user feedback
- Intuitive card-based and table layouts

## Technologies Used

- **Frontend**: React, React Router
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Styling**: Custom CSS (responsive design)
- **Notifications**: React Toastify
- **API**: Reqres REST API

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── common/
│   │   └── Navbar.jsx
│   └── users/
│       ├── UserEditModal.jsx
│       └── UserList.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── UsersPage.jsx
├── services/
│   └── api.js
├── types/
│   └── index.ts
├── utils/
│   └── auth.js
├── App.jsx
└── index.css
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/raunak-111/user_management_system.git
cd userhub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app configuration

## Usage

### Login
- Use the demo credentials:
  - Email: eve.holt@reqres.in
  - Password: cityslicka

### Managing Users
- View users in either grid or table view
- Search for users using the search bar
- Edit a user by clicking the "Edit" button
- Delete a user by clicking the "Delete" button
- Navigate between pages using the pagination controls

## Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

Key responsive features:
- Collapsible sidebar navigation on smaller screens
- Mobile-optimized view toggles and search functionality
- Adaptive layouts for different screen sizes
- Touch-friendly controls for mobile users

## Notes About Reqres API

Since Reqres is a demo API:
- Changes made to users persist only on the client-side
- Updates are not actually saved to the server
- The API returns mock data with predefined responses
- Authenticated requests are simulated


## Future Enhancements

- User registration functionality
- Role-based access control
- Dark/Light theme toggle
- Data export capabilities
- Advanced filtering and sorting options
- User activity tracking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Reqres](https://reqres.in/) for providing a test API
- Icons and illustrations from various open-source projects
- The React community for inspiration and resources 