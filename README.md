# TempTrail Project

## Overview

TempTrail is a full-stack application consisting of a backend built with Node.js and frontend developed with React (Vite). The project helps users explore activities, search locations, and access weather information.

## Directory Structure

```
└── sphllzulu-temptrail/
    ├── backend/             # Node.js Express Backend
    │   ├── package.json      # Backend dependencies
    │   ├── package-lock.json # Package lock file
    │   ├── server.js         # Main backend server file
    │   ├── .env              # Environment variables
    │   ├── .gitignore        # Git ignore file
    │   └── models/           # Database models
    │       └── users.js      # User schema
    ├── frontend/            # React (Vite) Frontend
    │   ├── README.md         # Frontend README file
    │   ├── eslint.config.js  # ESLint config
    │   ├── index.html        # Main HTML file
    │   ├── package.json      # Frontend dependencies
    │   ├── package-lock.json # Package lock file
    │   ├── vite.config.js    # Vite configuration
    │   ├── .env              # Frontend environment variables
    │   ├── .gitignore        # Git ignore file
    │   ├── public/           # Public assets
    │   └── src/              # Frontend source code
    │       ├── App.css       # Global styles
    │       ├── App.jsx       # Main React component
    │       ├── Front.jsx     # Front page component
    │       ├── index.css     # Index styles
    │       ├── main.jsx      # React entry point
    │       ├── assets/       # Static assets
    │       ├── components/   # UI Components
    │       ├── pages/        # Page Components
    └── .history/            # History & backup files
```

## Features

### Backend
- Express.js server with API routes
- User authentication
- Database models (MongoDB/Mongoose)

### Frontend
- Vite-powered React app
- Search and weather components
- Navigation & Map integration

### Development Tools
- ESLint for code linting
- Environment variables for config management

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file and configure environment variables:
   ```bash
   touch .env
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file for frontend settings:
   ```bash
   touch .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request for review

## Collaborators
https://github.com/SbuKhoza- Sibusiso Khoza
https://github.com/sphllzulu- Siphelele Zulu

## Contact

For any inquiries, feel free to reach out via GitHub or email.
