# Scalable REST API

A full-stack scalable REST API application built with **Django** (backend) and **React** (frontend), featuring JWT authentication, role-based access control (RBAC), and task management functionality.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Role-Based Access Control](#role-based-access-control)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This project demonstrates a production-ready REST API with:
- **User Authentication** using JWT tokens (SimpleJWT)
- **Role-Based Access Control** (Admin & User roles)
- **Task Management System** with CRUD operations
- **API Documentation** with Swagger/OpenAPI
- **PostgreSQL Database** for data persistence
- **CORS Support** for cross-origin requests
- **Production-Ready Deployment** with Gunicorn

---

## ✨ Features

### Backend Features
- ✅ JWT authentication with refresh tokens
- ✅ Custom User model with role-based permissions
- ✅ Task CRUD operations with owner-based filtering
- ✅ Admin dashboard to view all users and tasks
- ✅ API documentation (Swagger UI)
- ✅ Environment-based configuration
- ✅ PostgreSQL database integration
- ✅ CORS headers support

### Frontend Features
- ✅ User registration and login
- ✅ Dashboard displaying tasks (filtered by role)
- ✅ Create, edit, and delete tasks
- ✅ View all users (admin only)
- ✅ Role-based UI elements (navbar links)
- ✅ Responsive design with inline styling
- ✅ JWT token management in localStorage
- ✅ Error handling and user feedback

---

## 🛠 Tech Stack

### Backend
- **Python 3.11+**
- **Django 5.2** - Web framework
- **Django REST Framework** - REST API framework
- **SimpleJWT** - JWT authentication
- **PostgreSQL** - Database
- **Gunicorn** - Production WSGI server
- **django-cors-headers** - CORS support
- **drf-yasg** - Swagger/OpenAPI documentation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **jwt-decode** - JWT token decoding
- **npm** - Package manager

---

## 📁 Project Structure

```
Scalable_RESTAPI/
├── backend/                          # Django backend
│   ├── backend/                      # Main Django project settings
│   │   ├── settings.py               # Django configuration
│   │   ├── urls.py                   # Main URL routing
│   │   └── wsgi.py                   # WSGI configuration
│   ├── users/                        # User authentication app
│   │   ├── models.py                 # Custom User model
│   │   ├── views.py                  # Auth views (login, register)
│   │   ├── serializers.py            # User serializers with JWT claims
│   │   ├── urls.py                   # Auth endpoints
│   │   └── permissions.py            # Custom permission classes
│   ├── tasks/                        # Task management app
│   │   ├── models.py                 # Task model
│   │   ├── views.py                  # Task CRUD views
│   │   ├── serializers.py            # Task serializer
│   │   ├── urls.py                   # Task endpoints
│   │   └── permissions.py            # Task ownership checks
│   ├── core/                         # Core app
│   ├── .env                          # Environment variables
│   ├── manage.py                     # Django CLI
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   ├── Dashboard.jsx         # Task dashboard
│   │   │   ├── CreateTask.jsx        # Create task page
│   │   │   ├── EditTask.jsx          # Edit task page
│   │   │   └── Users.jsx             # All users page (admin)
│   │   ├── components/               # Reusable components
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   └── Loader.jsx            # Loading spinner
│   │   ├── api/                      # API utilities
│   │   │   └── api.js                # API calls and token management
│   │   └── App.jsx                   # Main app with routing
│   ├── package.json                  # Node dependencies
│   └── vite.config.js                # Vite configuration
│
└── README.md                         # This file
```

---

## 📦 Prerequisites

- **Python 3.11 or higher**
- **Node.js 18+ and npm**
- **PostgreSQL 12+** (or SQLite for development)
- **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TheAyushThakur/Scalable_REST_API.git
cd SCALABLE_RESTAPI
```

### 2. Backend Setup

#### Create and activate virtual environment

```powershell
cd backend
python -m venv env
.\env\Scripts\Activate.ps1
```

#### Install Python dependencies

```powershell
pip install -r requirements.txt
```

#### Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
# Database (PostgreSQL)
POSTGRES_DB=scalable_api_db
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
```

**For development with SQLite**, update `backend/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### Run migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

#### Create a superuser (admin)

```powershell
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 3. Frontend Setup

#### Install Node dependencies

```powershell
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### Start Backend Server

```powershell
cd backend
python manage.py runserver
```

Backend will run at: `http://127.0.0.1:8000`

- **API Base URL**: `http://127.0.0.1:8000/api/v1`
- **Django Admin**: `http://127.0.0.1:8000/admin`
- **Swagger Docs**: `http://127.0.0.1:8000/docs`

### Start Frontend Dev Server

```powershell
cd frontend
npm run dev
```

Frontend will run at: `http://localhost:5173` (or a different port if 5173 is in use)

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register/` | Register a new user |
| POST | `/api/v1/auth/login/` | Login and get JWT tokens |
| GET | `/api/v1/auth/users/` | Get all users (admin only) |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks/` | List tasks (all for admin, own for users) |
| POST | `/api/v1/tasks/` | Create a new task |
| GET | `/api/v1/tasks/{id}/` | Get task details |
| PUT | `/api/v1/tasks/{id}/` | Update task (owner only) |
| DELETE | `/api/v1/tasks/{id}/` | Delete task (owner only) |

---

## 🔐 Authentication

### Login Flow

1. **Register** at `/register`
   - Username, email, password
   - User is created with `role='user'`

2. **Login** at `/login`
   - Send username and password
   - Receive `access` and `refresh` JWT tokens
   - JWT payload includes: `username`, `role`, `user_id`

3. **Store Token**
   - Frontend stores `access` token in localStorage
   - Include in requests: `Authorization: Bearer <access_token>`

### Token Structure

Access token contains:
```json
{
  "token_type": "Bearer",
  "exp": 1234567890,
  "iat": 1234567800,
  "jti": "abc123...",
  "user_id": 1,
  "username": "admin",
  "role": "admin"
}
```

---

## 👥 Role-Based Access Control

### Admin Role
- ✅ View all tasks (across all users)
- ✅ View all users
- ✅ Create tasks
- ✅ Edit/delete own tasks
- ✅ Access admin panel

### User Role
- ✅ Create tasks
- ✅ View only own tasks
- ✅ Edit/delete own tasks
- ❌ Cannot view other users' tasks
- ❌ Cannot access admin panel

### User Creation

**Regular User** (via registration):
- `role='user'` by default

**Admin User**:
- Create via `python manage.py createsuperuser`
- Or update in Django admin: set `is_superuser=True` and `role='admin'`

---

## 💡 Usage Examples

### Register a New User

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login

```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "username": "john_doe",
  "role": "user"
}
```

### Create a Task

```bash
curl -X POST http://127.0.0.1:8000/api/v1/tasks/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the REST API",
    "is_completed": false
  }'
```

### Get All Tasks (as Admin)

```bash
curl -X GET http://127.0.0.1:8000/api/v1/tasks/ \
  -H "Authorization: Bearer <admin_access_token>"
```

---

## 🐛 Troubleshooting

### Issue: "Connection to server at localhost:5432 failed"
**Solution**: 
- Ensure PostgreSQL is running
- OR use SQLite for development (edit `settings.py`)
- Check `.env` database credentials

### Issue: "No password supplied"
**Solution**:
- Add `POSTGRES_PASSWORD` to `.env`
- Restart Django server

### Issue: Cannot see all tasks as admin
**Solution**:
- Ensure admin user was created with `python manage.py createsuperuser`
- Verify JWT token includes `"role": "admin"`
- Check browser console for errors
- Clear localStorage and re-login

### Issue: Frontend shows 403 error on `/users` endpoint
**Solution**:
- Verify you're logged in as admin
- Check that the token includes `"role": "admin"`
- Restart backend server

### Issue: CORS errors
**Solution**:
- Ensure `CORS_ALLOW_ALL_ORIGINS = True` in `backend/settings.py` (development)
- For production, set `CORS_ALLOWED_ORIGINS` with specific domains

### Issue: "Module does not provide an export named 'default'"
**Solution**:
- Use named import: `import { jwtDecode } from "jwt-decode"`
- Restart dev server: `npm run dev`

---

## 📝 Database Models

### User Model
```python
class User(AbstractUser):
    role = CharField(choices=[('admin', 'Admin'), ('user', 'User')], default='user')
```

### Task Model
```python
class Task(models.Model):
    title = CharField(max_length=200)
    description = TextField()
    owner = ForeignKey(User, on_delete=CASCADE)
    is_completed = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```