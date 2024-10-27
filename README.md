# Getting Started with Create React App

### Table of Contents

1. [Project Title](#the-gram)
2. [Project Overview](#project-overview)
3. [Features](#feature-set)
4. [Technologies Used](#technologies-used)
5. [Libraries and Dependencies](#libraries-and-dependencies)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [License](#license)


# The Gram

**The Gram** is a modern web-based social media application inspired by Instagram. It offers users a dynamic platform for sharing photos, following friends, interacting with posts, and private messaging.

## Project Overview

The Gram provides a range of features designed to enhance user interaction, engagement, and profile personalization. Users can create and manage profiles, share posts with captions and location information, search for and engage with other users, and communicate privately. 

## Feature Set

The application is designed with a feature-rich set, including:

- **User Accounts**: 
  - Registration and login using email and password, with support for password change or reset. 
  - Future enhancement may include social login options.
  
- **User Profile**: 
  - Displays user details like profile picture, bio, follower and following counts, and posts in reverse chronological order.
  
- **Change Profile**: Allows users to update profile picture and bio.

- **Create Post**: 
  - Users can upload photos with optional captions, location information, and tags.
  
- **Search and Engage**: 
  - Users can search for profiles, follow/unfollow other users.

- **Interact with Posts**:
  - Users can like/unlike and comment on posts.

- **Private Messaging**: 
  - Real-time private messaging with other users.
- **Responsive Design**:
  - Developed with CSS3, react-bootstrap-icons for UI.
- **Real-time Messaging**:
  - Built with socket.io-client for real-time conversations.

## Project Setup

### Frontend Initialization
Create the React frontend:

```bash
npx create-react-app the-gram-frontend
```

## Technologies Used

- **axios**: For API requests.
- **redux and react-redux**: State management.
- **redux-thunk**: Middleware for asynchronous dispatch.
- **redux-devtools-extension**: Debugging Redux state.
- **moment**: Date formatting.
- **react-bootstrap-icons and bootstrap-icons**: Icon libraries.
- **socket.io-client**: Real-time communication (e.g., messaging).
- **React-Router-Dom**: Routing for React applications.

**Note**: Downgraded redux to version 4.2.1 for compatibility.

### Media Storage
- Cloudinary is used to store images and videos uploaded by users.

## Installation and Setup Instructions

1. Clone the repository:
   
   ```bash
   git clone https://github.com/your-username/the-gram-frontend.git

   cd the-gram-frontend

   ```
2. Libraries:
    ```bash
    npm install axios redux react-redux redux-thunk redux-devtools-extension moment react-bootstrap-icons bootstrap-icons socket.io-client --legacy-peer-deps
    ```

# Libraries and Dependencies

```bash
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
    "react-icons": "^5.3.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "redux": "^4.2.1",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^3.1.0",
    "socket.io-client": "^4.8.0",
    "web-vitals": "^2.1.4"
  }
```

## API Endpoints

- GET: http://localhost:5000/api/:url - Fetch data from the backend.
- POST: http://localhost:5000/api/:url - Send new data to the backend.
- PUT: http://localhost:5000/api/:url - Update existing data.
- PATCH: http://localhost:5000/api/:url - Partially update data.
- DELETE: http://localhost:5000/api/:url - Remove data from the backend.

## Project Structure

```bash
the-gram-frontend/
├── public/
├── src/
│   ├── assets/                   # Stores static assets like images, icons, and styles
│   ├── components/               # Reusable UI components
│   │   ├── GlobalComponents/
│   │   │   ├── Alert.js
│   │   │   ├── Loading.js
│   │   │   ├── Toast.js
│   │   │   └── UserCard.js
│   │   ├── HomeComponents/
│   │   │   ├── Banner.js
│   │   │   ├── HomeLeft.js
│   │   │   └── HomeMid.js
│   │   ├── PostsComponents/
│   │   │   ├── PostCardBody.js
│   │   │   ├── PostCardFooter.js
│   │   │   ├── PostCardHeader.js
│   │   │   ├── PostComment.js
│   │   │   ├── InputPostComment.js
│   │   │   ├── PostCommentDisplay.js
│   │   │   ├── PostCommentCard.js
│   │   │   ├── CommentMenuItem.js
│   │   │   └── SingleUserPosts.js
│   │   ├── ProfileComponents/
│   │   │   ├── About.js
│   │   │   ├── EditProfile.js
│   │   │   ├── Following.js
│   │   │   ├── Friends.js
│   │   │   ├── Info.js
│   │   │   ├── ProfilePhotoShow.js
│   │   │   ├── ProfileVideoShow.js
│   │   │   ├── SavedPost.js
│   │   │   ├── ShowFriendsProfile.js
│   │   │   └── ShowFollowingProfile.js
│   │   ├── MessageComponents/
│   │   │   ├── Conversation.js
│   │   │   ├── LeftSideMessage.js
│   │   │   ├── RightSideMessage.js
│   │   │   ├── UserCardMessages.js
│   │   │   └── MessageDisplay.js
│   │   └── Global/
│   │       ├── FollowingCard.js
│   │       ├── FriendsCard.js
│   │       ├── GlobalCard.js
│   │       ├── GlobalFriendBtn.js
│   │       ├── GlobalShortCard.js
│   │       └── ResetPassword.js
│   ├── pages/                    # Main application pages
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Messages.js
│   │   ├── Navbar.js
│   │   ├── Notifications.js
│   │   ├── PageNotFound.js
│   │   ├── Post.js
│   │   ├── Profile.js
│   │   └── Register.js
│   ├── redux/                    # Redux store, actions, and reducers
│   │   ├── actions/
│   │   │   ├── alertActions.js
│   │   │   ├── authActions.js
│   │   │   ├── commentActions.js
│   │   │   ├── messageActions.js
│   │   │   ├── notificationActions.js
│   │   │   ├── postActions.js
│   │   │   └── profileActions.js
│   │   ├── reducers/
│   │   │   ├── alertReducers.js
│   │   │   ├── authReducers.js
│   │   │   ├── detailPostReducers.js
│   │   │   ├── messageReducers.js
│   │   │   ├── notificationReducers.js
│   │   │   ├── postReducers.js
│   │   │   ├── profileReducers.js
│   │   │   ├── socketReducers.js
│   │   │   ├── statusReducers.js
│   │   │   └── index.js
│   │   └── store.js
│   ├── App.js
│   ├── index.js
formatting
├── README.md
└── package.json
```

#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

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

## License
This project is licensed under the MIT License.

## Contact
For questions or suggestions, please contact the developer.