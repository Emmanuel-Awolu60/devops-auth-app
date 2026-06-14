# devops-auth-app

A full-stack auth app built as a DevOps learning project.

**Stack:** Next.js 14 · Express.js · PostgreSQL · Docker

---

## Project structure

```
devops-auth-app/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express entry point
│   │   ├── db/index.js       # DB connection + table init
│   │   ├── middleware/auth.js # JWT middleware
│   │   └── routes/auth.js    # Register / Login / Me
│   ├── Dockerfile            # ← You write this
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/app/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── dashboard/page.tsx
│   ├── src/lib/api.ts
│   └── package.json
└── docker-compose.yml
```

---

## 1. Local setup (no Docker)

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### Backend

```bash
cd backend
cp .env.example .env        # fill in your DB credentials
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

App runs at: http://localhost:3000  
API runs at: http://localhost:5000

---

## 2. Inspect the database (DevOps checkpoint)

After registering a user, open a terminal:

```bash
# Connect to the database
psql -U postgres -d devops_auth

# View all users
SELECT id, name, email, created_at FROM users;

# View table schema
\d users

# Count rows
SELECT COUNT(*) FROM users;

# Exit
\q
```

---

## 3. Docker

### Step 1 — Write the Dockerfile

Open `backend/Dockerfile`. Write it yourself. Hints are inside.

### Step 2 — Start everything with Compose

```bash
# From the project root
docker-compose up --build
```

This starts:
- `postgres` — database on port 5432
- `backend`  — Express API on port 5000

The frontend still runs locally via `npm run dev`.

### Step 3 — Verify containers

```bash
docker ps
docker logs devops_auth_backend
docker logs devops_auth_db
```

### Step 4 — Connect to the DB inside Docker

```bash
docker exec -it devops_auth_db psql -U postgres -d devops_auth
SELECT * FROM users;
```

---

## API reference

| Method | Path               | Auth required | Description         |
|--------|--------------------|---------------|---------------------|
| POST   | /api/auth/register | No            | Create account      |
| POST   | /api/auth/login    | No            | Sign in             |
| GET    | /api/auth/me       | Yes (Bearer)  | Get current user    |
| GET    | /health            | No            | Health check        |

---

## Next DevOps steps (after this works)

1. Write the Dockerfile for the frontend and add it to `docker-compose.yml`
2. Add a GitHub Actions CI pipeline that runs on every push
3. Push the image to ECR and deploy to an EC2 instance with Terraform
4. Add a health check endpoint and wire it into your monitoring stack
