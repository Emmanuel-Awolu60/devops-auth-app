# devops-auth-app

## What is this app?

A full-stack app where users can **register, login, and see a dashboard**. It teaches you how a real app is built and how DevOps tools run it.

---

## The Three Parts

```
FRONTEND          BACKEND           DATABASE
Next.js      →    Express.js   →    PostgreSQL
localhost:3000    localhost:5000    localhost:5432

What user sees    Processes data    Stores data
```

---

## What happens when a user registers

```
1. User fills form on the browser
2. Frontend sends data to the backend
3. Backend hashes the password (so it's never stored as plain text)
4. Backend saves user to the database
5. Backend returns a JWT token (like a wristband — proves you're logged in)
6. Frontend stores the token, redirects to dashboard
```

---

## The Files and What They Do

```
devops-auth-app/
├── backend/
│   ├── src/index.js          → starts the Express server
│   ├── src/db/index.js       → connects to PostgreSQL, creates users table
│   ├── src/middleware/auth.js → checks JWT token on protected routes
│   ├── src/routes/auth.js    → register / login / me endpoints
│   ├── .env                  → secret config (passwords, port, JWT secret)
│   └── Dockerfile            → recipe to package backend into a container
│
├── frontend/
│   ├── src/app/login/        → login page
│   ├── src/app/register/     → register page
│   ├── src/app/dashboard/    → protected page (only logged-in users)
│   ├── src/lib/api.ts        → handles all fetch calls to the backend
│   └── Dockerfile            → recipe to package frontend into a container
│
└── docker-compose.yml        → starts all three services together
```

---

## What is Docker?

A tool that packages your app into a **container** — a self-contained box that runs the same way on any machine.

```
Dockerfile         = recipe for ONE service
docker-compose.yml = runs ALL services together
Container          = the running box
Image              = the built package (before it runs)
```

---

---

# COMMAND REFERENCE

---

## RUN LOCALLY

```bash
# Terminal 1 — start the backend
cd ~/Desktop/devops-auth-app/backend
npm run dev

# Terminal 2 — start the frontend
cd ~/Desktop/devops-auth-app/frontend
npm run dev

# Start Postgres (if not running)
sudo systemctl start postgresql

# Stop Postgres
sudo systemctl stop postgresql

# Check if Postgres is running
sudo systemctl status postgresql
```

---

## RUN WITH DOCKER

```bash
# Start everything (with rebuild)
docker compose up --build

# Start everything (no rebuild)
docker compose up

# Start in background
docker compose up -d

# Stop everything
docker compose down

# Stop and wipe the database
docker compose down -v

# See running containers
docker ps

# See logs
docker logs devops_auth_backend
docker logs devops_auth_db
docker logs devops_auth_frontend

# Follow logs live
docker logs -f devops_auth_backend
```

---

## ACCESS THE DATABASE

**Locally:**

```bash
psql -U postgres -h 127.0.0.1 -d devops_auth
```

**Via Docker:**

```bash
docker exec -it devops_auth_db psql -U postgres -d devops_auth
```

**Once inside psql:**

```sql
-- See all users
SELECT id, name, email, created_at FROM users;

-- See table structure
\d users

-- List all tables
\dt

-- Count users
SELECT COUNT(*) FROM users;

-- Delete all users
DELETE FROM users;

-- Exit
\q
```

---

## GIT / GITHUB

```bash
# Check what changed
git status

# Save changes
git add .
git commit -m "your message"

# Push to GitHub
git push

# See history
git log --oneline
```

---

## APP URLS

```
Frontend      → http://localhost:3000
Backend API   → http://localhost:5000
Health check  → http://localhost:5000/health
```

---

## API ENDPOINTS

| Method | URL                | Protected | What it does       |
| ------ | ------------------ | --------- | ------------------ |
| POST   | /api/auth/register | No        | Create account     |
| POST   | /api/auth/login    | No        | Sign in            |
| GET    | /api/auth/me       | Yes       | Get current user   |
| GET    | /health            | No        | Check server is up |

---

## TWO WAYS TO RUN — QUICK COMPARISON

|          | Local                                          | Docker                                                           |
| -------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Start    | `npm run dev` in each folder                   | `docker compose up --build`                                      |
| Stop     | `Ctrl+C`                                       | `docker compose down`                                            |
| Database | `psql -U postgres -h 127.0.0.1 -d devops_auth` | `docker exec -it devops_auth_db psql -U postgres -d devops_auth` |
| Needs    | Node + Postgres installed                      | Docker only                                                      |
