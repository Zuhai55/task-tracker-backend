# Task Tracker API

A RESTful backend API for a task tracking application, built as a learning project to practice Node.js, Express, MySQL, and authentication from scratch.

**Live API:** [Click Here](https://task-tracker-api-fiod.onrender.com/)
**Frontend repo:** [Click Here](https://github.com/Zuhai55/task_tracker_frontend)
Live Site: [Click here](https://thesaurus-wistful-abnormal.ngrok-free.dev/)

## Features

- User signup and login with hashed passwords (bcrypt)
- JWT-based authentication on protected routes
- Full CRUD for tasks, scoped to the logged-in user
- Each user can only access their own tasks — enforced at the database query level, not just in the UI
- Parameterized SQL queries throughout to prevent SQL injection

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MySQL (hosted on Aiven)
- **Auth:** JSON Web Tokens (jsonwebtoken), bcrypt for password hashing
- **Deployment:** Render (Web Service)

## API Endpoints

| Method | Endpoint | Description | Auth required |
|--------|----------|--------------|----------------|
| POST | `/auth/signup` | Create a new user | No |
| POST | `/auth/login` | Log in, returns a JWT | No |
| GET | `/tasks` | Get all tasks for the logged-in user | Yes |
| POST | `/tasks` | Create a new task | Yes |
| PUT | `/tasks/:id` | Update a task | Yes |
| DELETE | `/tasks/:id` | Delete a task | Yes |

Protected routes require an `Authorization: Bearer <token>` header.

## Project Structure

```
task-tracker-api/
├── config/         # Database connection (pool)
├── controllers/    # Route handler logic
├── middleware/      # JWT auth middleware
├── routes/         # Route definitions
└── server.js        # App entry point
```

## What I Learned

Built this project to learn backend fundamentals from scratch, including relational schema design with foreign keys, parameterized queries, implementing JWT auth and bcrypt password hashing manually (not via a pre-built auth library), Express middleware patterns, and deploying a Node/MySQL app to a live host with a separate managed database.
