# Portfolio Backend Server

This directory contains the Node.js, Express, and MongoDB backend for the portfolio application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running on your local machine.

## Setup & Running

Follow these steps to get the backend server running locally.

### 1. Install Dependencies

Navigate to this directory in your terminal and install the required npm packages:

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file by copying the example file:

```bash
cp .env.example .env
```

The default values in this file should work for a standard local MongoDB installation. If your MongoDB is running on a different port or requires credentials, update the `MONGO_URI` variable accordingly.

### 3. Seed the Database

Before starting the server for the first time, you need to populate the database with the initial project data from `projects.json`. Make sure your local MongoDB server is running, then run the seed script from inside the `server` directory:

```bash
npm run seed
```

This command will clear any existing projects and load the ones from the root `projects.json` file.

### 4. Start the Server

To start the server in development mode (with automatic reloading), run the following command from inside the `server` directory:

```bash
npm run dev
```

The backend server will now be running on `http://localhost:5000`. The portfolio frontend will automatically connect to it.

---

### Available Scripts

-   `npm run dev`: Starts the server with `nodemon` for development.
-   `npm run build`: Compiles the TypeScript code to JavaScript in the `dist/` directory.
-   `npm start`: Runs the compiled JavaScript code (for production).
-   `npm run seed`: Populates the database with initial data.
