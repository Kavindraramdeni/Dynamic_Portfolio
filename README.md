# Personal Portfolio Website

This project is a personal portfolio website built with React, TypeScript, and Vite on the frontend, and Node.js, Express, and MongoDB on the backend.

## Project Structure

This is a monorepo containing both the frontend and backend code.

-   `/` (root): Contains the frontend application code (inside `/src`), Vite configuration, and this README.
-   `/server`: Contains the backend Node.js application.
-   `/projects.json`: Provides initial/fallback project data for the portfolio.

## Local Development Setup

To run this project locally, you need to run both the frontend and backend servers.

### 1. Backend Server (Node.js)

First, set up and run the backend.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory by copying the example file.
    ```bash
    cp .env.example .env
    ```
    The default `MONGO_URI` should work if you have MongoDB running locally on the default port. If not, update it with your MongoDB connection string.

4.  **Seed the database:**
    Make sure your MongoDB instance is running. Then, run the seed script to populate the database with initial project data.
    ```bash
    npm run seed
    ```

5.  **Start the server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

### 2. Frontend Application (React)

Now, in a **new terminal window**, set up and run the frontend.

1.  **Navigate to the project root directory:**
    ```bash
    # If you are in the server directory, go back to the root
    cd ..
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    This project uses a `.env` file in the root directory to connect to the backend API. A `.env` file with the correct local URL is already provided.

4.  **Start the application:**
    ```bash
    npm run dev
    ```
    The frontend will open in your browser, usually at `http://localhost:5173`. It will fetch data from your local backend server.

---

## Deployment to Render

You can deploy this project for free on Render. You will need to create two separate services: one for the backend and one for the frontend.

### 1. Setup Database

Before deploying, you need a cloud-hosted MongoDB database. You can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

1.  Create a free cluster on MongoDB Atlas.
2.  In "Network Access", add `0.0.0.0/0` to allow connections from anywhere (Render IPs can change).
3.  Create a database user and save the username and password.
4.  Get the connection string (URI) for your cluster. Replace `<password>` with your user's password. This URI will be your `MONGO_URI` environment variable on the Render backend service.

### 2. Deploy the Backend Service

1.  On your Render dashboard, click **New +** > **Web Service**.
2.  Connect your GitHub/GitLab repository.
3.  Configure the service with the following settings:
    *   **Name**: `portfolio-backend` (or your choice)
    *   **Region**: Your choice
    *   **Branch**: `main` (or your primary branch)
    *   **Root Directory**: `server`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
4.  Click **Advanced**, then add your environment variables:
    *   **Key**: `MONGO_URI`
    *   **Value**: *Your MongoDB Atlas connection string from the previous step.*
5.  Click **Create Web Service**. Wait for the build and deployment to complete. Once live, copy the service's public URL (e.g., `https://portfolio-backend-xxxx.onrender.com`).

### 3. Deploy the Frontend Service

1.  On your Render dashboard, click **New +** > **Static Site**.
2.  Connect the same repository.
3.  Configure the site with the following settings:
    *   **Name**: `portfolio-frontend` (or your choice)
    *   **Branch**: `main`
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `dist`
4.  Click **Advanced**, then add an environment variable:
    *   **Key**: `VITE_API_URL`
    *   **Value**: *Your backend service's public URL from step 2, with `/api` appended.* (e.g., `https://portfolio-backend-xxxx.onrender.com/api`)
5.  Add a **Rewrite Rule** to handle client-side routing:
    *   **Source**: `/*`
    *   **Destination**: `/index.html`
    *   **Action**: `Rewrite`
6.  Click **Create Static Site**.

Your portfolio should now be live!

### Seeding the Production Database

Your deployed backend starts with an empty database. The easiest way to seed it is to run the seed script from your local machine, pointed at the production database.

1.  In your `server/.env` file on your local machine, temporarily replace the local `MONGO_URI` with your production MongoDB Atlas URI.
2.  Run the seed script:
    ```bash
    cd server
    npm run seed
    ```
3.  Once it's done, **remember to change the `MONGO_URI` in your local `server/.env` file back to your local database URI.**