# Watchlist Application

This is a full-stack application designed to manage a watchlist. It features a React frontend and a Node.js backend, utilizing MongoDB for data persistence. The project is structured as a monorepo, allowing for co-located development of both client and server components.

## Features

- **User Authentication**: Secure user login and registration (inferred from common app patterns).
- **Watchlist Management**: Functionality to add, view, update, and delete items from a user's watchlist.
- **Data Persistence**: Stores application data in a MongoDB database.
- **Environment Configuration**: Uses `.env` files for managing sensitive information and configuration settings.
- **Modern Frontend**: Built with React, leveraging `react-router` for navigation and ESLint for code quality.
- **Robust Backend**: Powered by Node.js, interacting with MongoDB using its official driver.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn
- MongoDB (Community Server recommended)

## Installation

Follow these steps to get the application up and running on your local machine.

### 1. Clone the Repository

```bash
# Assuming this is the root of your project
git clone <repository-url>
cd <repository-directory>
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install # or yarn install
```

Create a `.env` file in the `backend` directory based on the example below. This file will store your environment variables, such as MongoDB connection strings and API keys.

```ini
# backend/.env
MONGODB_URI="mongodb://localhost:27017/your_database_name"
PORT=5000
# Add any other necessary backend environment variables here
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd ../frontend
npm install # or yarn install
```

Create a `.env` file in the `frontend` directory. For React applications, environment variables typically need to be prefixed with `REACT_APP_`.

```ini
# frontend/.env
REACT_APP_BACKEND_URL="http://localhost:5000/api"
# Add any other necessary frontend environment variables here
```

## Running the Application

From the root directory of the project (`backend/back`), you can start both the frontend and backend servers concurrently using the provided `run.js` script:

```bash
node run.js
```

This script will:
- Start the backend server (typically on `http://localhost:5000`).
- Start the frontend development server (typically on `http://localhost:3000`).

You can then access the application in your web browser at `http://localhost:3000`.

## Project Structure

The project is organized into two main directories:

- `backend/`: Contains the Node.js Express server, API endpoints, and MongoDB integration.
- `frontend/`: Contains the React application, including components, routing, and UI logic.

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - ESLint (for code quality)
- **Backend**:
  - Node.js
  - Express (likely, given typical Node.js backend patterns)
  - MongoDB (via `mongodb` Node.js driver)
  - `dotenv` (for environment variable management)
- **Development**:
  - npm/Yarn
  - Git
```