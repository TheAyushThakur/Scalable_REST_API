# Scalable REST API (Assignment Complete)

Full-stack assignment project built with Django REST Framework + React.

## What is implemented

### Backend
- JWT authentication (`register`, `login`, `refresh`)
- Password hashing via Django auth
- Role-based access control (`user`, `admin`)
- CRUD for secondary entity (`Task`)
- API versioning using URL path (`/api/v1/...`)
- Input validation + standardized API error format
- Swagger/OpenAPI docs
- PostgreSQL support (with optional SQLite fallback)

### Frontend
- Register and login pages
- Protected dashboard (requires JWT)
- CRUD flows for tasks
- Admin-only users page
- API error/success messaging support

### Assignment deliverables included
- Backend + frontend code with setup docs
- Working auth + CRUD APIs
- UI connected to APIs
- API documentation:
  - Swagger UI: `http://127.0.0.1:8000/docs/`
  - Postman collection: `postman/Scalable_RESTAPI.postman_collection.json`
- Scalability note (see section below)

## Tech stack

- Backend: Python, Django, Django REST Framework, SimpleJWT, drf-yasg, PostgreSQL
- Frontend: React, Vite, React Router, jwt-decode

## Project structure

```text
Scalable_RESTAPI/
├── backend/
│   ├── backend/                   # Django settings + root URLs
│   ├── core/                      # Health endpoint + exception handler
│   ├── users/                     # Auth + RBAC user APIs
│   ├── tasks/                     # Task CRUD APIs
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   └── src/
└── postman/
    └── Scalable_RESTAPI.postman_collection.json
```

## Setup

### 1) Clone

```bash
git clone <your-repo-url>
cd Scalable_RESTAPI
```

### 2) Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Mac/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
```

Create `.env` in `backend/` from `.env.example` and fill values.

```env
SECRET_KEY=replace-with-a-strong-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
TIME_ZONE=UTC
CORS_ALLOWED_ORIGINS=http://localhost:5173

POSTGRES_DB=scalable_api_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

USE_SQLITE=False
```

Run migrations and start server:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 3) Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## API base URL

`http://127.0.0.1:8000/api/v1`

## API endpoints

### Auth
- `POST /api/v1/auth/register/`
- `POST /api/v1/auth/login/`
- `POST /api/v1/auth/token/refresh/`
- `GET /api/v1/auth/users/` (admin only)

### Tasks
- `GET /api/v1/tasks/`
- `POST /api/v1/tasks/`
- `GET /api/v1/tasks/{id}/`
- `PUT /api/v1/tasks/{id}/`
- `DELETE /api/v1/tasks/{id}/`

## Standard error response

Validation and permission failures return:

```json
{
  "success": false,
  "status_code": 400,
  "errors": {
    "field_name": ["message"]
  }
}
```

## Testing

Run backend tests:

```bash
cd backend
python manage.py test
```

## Scalability note (required deliverable)

This codebase is structured into independent modules (`users`, `tasks`, `core`) so each domain can evolve separately.

For production scale:
- Keep API behind a load balancer and run multiple stateless Django instances.
- Store JWT-secret and DB credentials in environment/secret manager.
- Use PostgreSQL with read replicas for heavy read traffic.
- Add Redis for caching frequent list endpoints and short-lived computed responses.
- Add async workers (Celery/RQ) for non-blocking tasks (emails, reports, events).
- Add centralized logging and metrics (ELK/Prometheus/Grafana) for observability.

## Quick verification checklist

- `python manage.py check` passes
- `python manage.py test` passes
- `npm run build` passes
- Swagger opens at `/docs/`
- Register/login works
- User can CRUD own tasks
- Admin can list users and manage tasks
