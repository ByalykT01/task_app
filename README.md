# Task app

## Description
This project is a combination of a React frontend and a Node.js backend, designed to provide task management functionalities.

## Installation
To run this project locally, follow these steps:

### Backend (Node.js)
1. Navigate to the `server` directory: `cd server`.
2. Install dependencies: `npm install`.
3. Set up environment variables by creating a `.env` file 
  PORT=5000
  SENDGRID_API_KEY=your_sendgrid_api_key
  MONGODB_URL=your_database_connection_string
  JWT_SECRET=your_secret_for_json_web_token

4. Run the server: `npm run dev`.
5. The backend will run on `http://localhost:5000`.

### Frontend (React)
1. Navigate to the `client` directory: `cd client`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.
4. The React app will be available at `http://localhost:3000`.

## Usage
- Access the React frontend by visiting `http://localhost:3000` in your web browser.
- The API endpoints and functionalities can be accessed through the backend routes as described in the API documentation.

## Technologies Used
- React
- Node.js
- MongoDB

## Folder Structure
- `server`: Contains the Node.js server files.
- `client`: Holds the React frontend files.