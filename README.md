# QA Learning Platform

A full-stack web platform for QA testers to learn testing skills via interactive challenges.

## Project Overview

This platform allows users to register, log in, and participate in various testing challenges. Challenges cover classical testing techniques (UI bugs, API testing) and AI-related tasks (prompt engineering, AI test generation). Users can submit flags to verify challenge completion, earn points, badges, and track their progress. An admin panel is available for managing challenges, flags, and users.

## Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS (or similar for styling)
*   **Backend:** Node.js, Express, TypeScript
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Tokens)
*   **AI Integration:** OpenAI API (example)
*   **Deployment:** Docker

## Features

*   User registration, login, and authentication.
*   Dashboard with available challenges and user progress.
*   Interactive challenges (UI, API, AI-focused).
*   Flag submission and validation.
*   Gamification: points, badges, progress bars.
*   Admin panel for content and user management.

## Project Structure

```
qa-learning-platform/
├── backend/              # Node.js, Express, TypeScript API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Challenge.ts
│   │   │   ├── Submission.ts
│   │   │   └── Badge.ts
│   │   ├── routes/         # (To be created)
│   │   ├── controllers/    # (To be created)
│   │   ├── middleware/     # (To be created)
│   │   ├── services/       # (To be created)
│   │   ├── utils/          # (To be created)
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example      # Needs to be created manually
│   ├── .eslintrc.js
│   ├── .prettierrc.js
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # React, TypeScript UI
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── (favicon.ico, logo192.png, logo512.png - replace with actuals)
│   ├── src/
│   │   ├── components/     # (To be created)
│   │   ├── pages/          # (To be created)
│   │   ├── layouts/        # (To be created)
│   │   ├── contexts/       # (To be created)
│   │   ├── services/       # (To be created)
│   │   ├── hooks/          # (To be created)
│   │   ├── styles/         # (If not using only Tailwind global)
│   │   ├── utils/          # (To be created)
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   └── reportWebVitals.ts
│   ├── .eslintrc.js
│   ├── .prettierrc.js
│   ├── Dockerfile
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── .env.example          # For docker-compose, needs to be created manually
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (v8.x or later) or yarn
*   Docker and Docker Compose

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd qa-learning-platform
    ```

2.  **Create Environment Files:**

    *   **For Docker Compose (Root Directory):**
        Create a `.env` file in the root of the project by copying `.env.example` (you'll need to create this file first, see content below). This file will be used by `docker-compose.yml`.
        ```bash
        touch .env
        ```
        Content for root `.env` / `.env.example`:
        ```ini
        # docker-compose.yml environment variables

        # Backend Configuration
        PORT=5001
        MONGODB_URI=mongodb://mongo:27017/qa_learning_platform # Internal Docker network URI
        JWT_SECRET=yourSuperSecretKeyForDevelopment # CHANGE THIS IN PRODUCTION!
        JWT_EXPIRES_IN=1d
        # OPENAI_API_KEY=your_openai_api_key_here # Optional
        # CORS_ORIGIN=http://localhost:3000 # Optional, for local dev if frontend runs outside Docker on different port

        # Frontend Configuration (Port mapping)
        FRONTEND_PORT=3000

        # MongoDB Configuration (Credentials if you set them in mongo service, not set by default)
        MONGO_PORT=27017 # Host port for MongoDB
        # MONGO_INITDB_ROOT_USERNAME=admin
        # MONGO_INITDB_ROOT_PASSWORD=secret
        ```

    *   **For Backend (Inside `backend/` directory):**
        Create a `.env` file inside the `backend/` directory. You can copy the relevant variables from the root `.env` or create a `backend/.env.example` first.
        Content for `backend/.env` / `backend/.env.example`:
        ```ini
        # backend/.env
        PORT=5001
        MONGODB_URI=mongodb://localhost:27017/qa_learning_platform_dev # For local native dev if not using Docker mongo
        # If running backend via Docker Compose, it will use the MONGODB_URI from docker-compose.yml
        JWT_SECRET=yourSuperSecretKeyForDevelopment
        JWT_EXPIRES_IN=1d
        OPENAI_API_KEY=
        # CORS_ORIGIN=http://localhost:3000
        ```
        **Note:** When running with Docker Compose, the `MONGODB_URI` in `docker-compose.yml` takes precedence for the backend service. The `backend/.env` is more for local development if you run the backend service natively.

3.  **Replace Frontend Logos:**
    Navigate to `frontend/public/` and replace `favicon.ico`, `logo192.png`, and `logo512.png` with your actual project logos.

4.  **Install Dependencies (Optional - Docker builds will handle this):**
    If you plan to develop locally outside of Docker initially:
    ```bash
    # In backend directory
    cd backend
    npm install
    cd ..

    # In frontend directory
    cd frontend
    npm install
    cd ..
    ```

## Running the Application with Docker Compose

This is the recommended way to run the application for development and production-like testing.

1.  **Ensure Docker Desktop is running.**
2.  **Build and start the services:**
    From the root of the project directory:
    ```bash
    docker-compose up --build
    ```
    To run in detached mode:
    ```bash
    docker-compose up --build -d
    ```

3.  **Access the application:**
    *   Frontend: [http://localhost:3000](http://localhost:3000) (or your `${FRONTEND_PORT}`)
    *   Backend API: [http://localhost:5001](http://localhost:5001) (or your `${PORT}`)
    *   MongoDB: Accessible on `localhost:27017` (or your `${MONGO_PORT}`) from your MongoDB client.

4.  **To stop the services:**
    ```bash
    docker-compose down
    ```
    To stop and remove volumes (e.g., to clear database):
    ```bash
    docker-compose down -v
    ```

## Running Natively (Without Docker - For Development)

### Backend

1.  Navigate to the `backend` directory: `cd backend`
2.  Ensure you have a MongoDB instance running and accessible. Update `MONGODB_URI` in `backend/.env` if it's not the default `mongodb://localhost:27017/qa_learning_platform_dev`.
3.  Install dependencies: `npm install`
4.  Start the development server: `npm run dev`
    The backend will be available at `http://localhost:5001` (or the port specified in `backend/.env`).

### Frontend

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start`
    The frontend will open in your browser, usually at `http://localhost:3000`.

## Deployment

Deployment instructions will vary based on the chosen cloud provider (Heroku, DigitalOcean, AWS, etc.).

**General Steps using Docker:**

1.  **Build Production Docker Images:**
    Ensure your `Dockerfile` for both frontend and backend are optimized for production (e.g., multi-stage builds, remove dev dependencies, etc.).
    Modify `docker-compose.yml` for production:
    *   Remove volume mounts for source code (`./backend/src`, `./frontend/src`, `./frontend/public`).
    *   Set `NODE_ENV=production` for the backend.
    *   Remove `command: npm run dev` from the backend service.
    *   Consider using a production-ready `nginx.conf` for the frontend.
    *   Use specific versions for base images (e.g., `node:18.18-alpine` instead of `node:18-alpine`).

2.  **Push Images to a Container Registry:**
    (e.g., Docker Hub, AWS ECR, Google GCR, Azure CR)
    ```bash
    docker-compose build # Ensure images are built with production settings
    docker tag qa_platform_backend your-registry/qa_platform_backend:latest
    docker tag qa_platform_frontend your-registry/qa_platform_frontend:latest
    docker push your-registry/qa_platform_backend:latest
    docker push your-registry/qa_platform_frontend:latest
    ```

3.  **Deploy to Cloud Provider:**
    *   **Heroku:** Can use `heroku.yml` or deploy Docker images directly. Requires a Heroku add-on for MongoDB (like MongoDB Atlas or JawsDB MongoDB).
    *   **DigitalOcean:** Create Droplets, install Docker, and use `docker-compose` to pull and run your images. Or use DigitalOcean App Platform.
    *   **AWS:** Options include ECS (Elastic Container Service), EKS (Elastic Kubernetes Service), or Elastic Beanstalk with Docker.
    *   **Render, Railway, Fly.io:** These platforms often have good Docker support.

**Example for a simple Docker-based deployment (e.g., on a VPS):**

1.  Install Docker and Docker Compose on your server.
2.  Create a `.env` file on the server with your production environment variables (especially `JWT_SECRET`, `MONGODB_URI` pointing to your production DB, `OPENAI_API_KEY`).
3.  Copy your `docker-compose.yml` (production version) to the server.
4.  Pull your images from the registry:
    ```bash
    docker-compose pull
    ```
5.  Start the application:
    ```bash
    docker-compose up -d
    ```

**Database:**
For production, it's highly recommended to use a managed database service (e.g., MongoDB Atlas, AWS DocumentDB, DigitalOcean Managed MongoDB) instead of running MongoDB in a Docker container on the same server as your application for reliability, backups, and scalability.

**(Further detailed instructions for a specific provider can be added here based on preference)**

<!-- Placeholder for future sections --> 