# Athlete Performance Tracking Dashboard

This is a web application for tracking the performance of athletes. It allows users to manage athlete profiles, view their metrics, and add performance data.

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Start the application](#2-start-the-application)
3. [Access the app](#3-access-the-app)
4. [API Endpoints](#api-endpoints)
5. [Development](#development)
6. [Technologies](#technologies)
7. [Production](#production)
8. [License](#license)

## 1. Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/)

## 2. Start the application

Simply run Docker Compose to start the app and the database. This will also handle database migrations automatically:

```bash
docker-compose up
```

This will spin up the following services:
- **Frontend** (React/Ionic): Available at [http://localhost:3000](http://localhost:3000)
- **Backend API** (Node.js with Hono): Available at [http://localhost:4000](http://localhost:4000)

## 3. Access the app

Once Docker Compose is up, visit [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## API Endpoints

The following are the key API routes available from the backend:

- **GET /athletes**: Retrieve all athletes.
- **GET /athletes/:id**: Get a specific athlete by ID.
- **POST /athletes**: Create a new athlete.
- **PUT /athletes/:id**: Update athlete details.
- **DELETE /athletes/:id**: Delete an athlete.
- **POST /athletes/:id/metrics**: Add a performance metric to an athlete.

## Development

To enable hot-reloading for development, the frontend app already supports hot reloading out-of-the-box. For the backend, nodemon is used to restart the server on file changes.

## Technologies

- **React**: Frontend framework with Ionic components for UI.
- **React Query**: Used for fetching, caching, and updating server state.
- **Node.js**: Backend runtime using Hono as the framework.
- **PostgreSQL**: Relational database.
- **Prisma**: ORM for database migrations and querying.
- **Docker**: Containerization of the application for consistent development and deployment.

## Extras
- Resource creation is protected via JWT. Visit homepage to recieve JWT as a cookie
- CI tests and pretty is ran in ci pipeline
- intentionally opted out of caching since there are no major joins and the disadvantage of maintaining a cache outways the performance gain
- code splitting also doesn't provide any benefit in a package this small

## License

This project is licensed under the MIT License.
