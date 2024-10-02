# Getting Started with Create React App

# The Gram - Social Media App

A social media platform built with React, Redux, and Material UI. It allows users to create profiles, post content, search for profiles, and manage their authentication with JWT tokens. 

## Features
- User authentication (login, register, logout) with JWT.
- Redux state management with Redux Thunk middleware.
- Axios for data fetching (GET, POST, PUT, PATCH, DELETE).
- Material UI for the user interface.
- Search functionality with debounce to limit API calls.
- Responsive design using CSS.
- Protected routes based on user authentication.

## Technologies Used
- **React**: Frontend framework.
- **Redux**: State management tool.
- **Redux Thunk**: Middleware for handling asynchronous actions.
- **Axios**: HTTP client for API requests.
- **Material UI**: React component library for styling.
- **Moment.js**: Library for date formatting.
- **React-Router-Dom**: Routing for React applications.
- **Redux DevTools**: For debugging the Redux state.

## Installation and Setup Instructions

1. Clone the repository:
   ```bash
   
   git clone https://github.com/your-username/the-gram-frontend.git
   cd the-gram-frontend

# Libraries and Dependencies

{
  "name": "the-gram-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.7",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "redux": "^5.0.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^3.1.0",
    "web-vitals": "^2.1.4"
  }
} 

## API Endpoints

- GET: http://localhost:5000/api/:url - Fetch data from the backend.
- POST: http://localhost:5000/api/:url - Send new data to the backend.
- PUT: http://localhost:5000/api/:url - Update existing data.
- PATCH: http://localhost:5000/api/:url - Partially update data.
- DELETE: http://localhost:5000/api/:url - Remove data from the backend.

## Redux State Management

- Reducers: authReducers.js to manage authentication.
- Actions: authActions.js for login, register, and logout.
- Store: store.js for setting up the Redux store with middleware (Redux Thunk).

# Project Structure
## src/
- components/: Contains reusable components like Navbar, PrivateRouter.
- redux/: Contains actions, reducers, and store for state management.
- utils/: Utility functions like fetchDataApi for API calls.
- styles/: CSS files for styling components.

## This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts



# =============================

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
