# System Design Document - Course Platform

## 1. Project Overview

The Course Platform is a web-based learning management system (LMS) that allows users to browse, enroll in, and manage online courses. The platform supports two primary user roles: **Students** and **Instructors**.

### 1.1 Purpose
- Provide a platform for instructors to create and manage courses
- Enable students to browse and enroll in courses
- Offer comprehensive documentation for various technologies

### 1.2 Key Features
- User registration with password hashing
- User authentication with token-based login
- Course browsing and viewing
- Course enrollment
- User profile management
- Technology documentation hub
- RESTful API for frontend-backend communication

---

## 2. System Architecture

### 2.1 Architecture Pattern
The system follows a **Client-Server Architecture** with:
- **Frontend**: React.js (Vite) Single Page Application (SPA)
- **Backend**: Django REST Framework (Python)
- **Database**: MySQL

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React.js + Vite | UI Framework & Build Tool |
| Routing | React Router DOM | Client-side routing |
| HTTP Client | Axios | API communication |
| Styling | CSS | UI styling |
| Backend | Django + DRF | REST API Framework |
| Database | MySQL | Relational Data Storage |
| CORS | django-cors-headers | Cross-origin requests |

### 2.3 System Components

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Vite)                       │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │ │
│  │  │  Pages   │ │Components│ │ Services │ │  Router  │   │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Django Backend (DRF)                        │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │ │
│  │  │  Users   │ │ Courses  │ │Enrollments│ │   Admin  │   │ │
│  │  │   App    │ │   App    │ │   App     │ │          │   │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ ORM (Django Models)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                      MySQL Database                      │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │ │
│  │  │  users   │ │ courses  │ │enrollments│                │ │
│  │  │  table   │ │  table   │ │  table    │                │ │
│  │  └──────────┘ └──────────┘ └──────────┘                │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Directory Structure
```
frontend/
├── src/
│   ├── App.jsx                 # Main application component with routing
│   ├── main.jsx                # Entry point
│   ├── pages/                  # Page components
│   │   ├── DocumentationHub.jsx
│   │   ├── JavaScriptDoc.jsx
│   │   ├── TypeScriptDoc.jsx
│   │   └── ... (20+ doc pages)
│   ├── components/             # Reusable components
│   │   └── Hero.jsx
│   ├── services/               # API services
│   │   └── api.js
│   └── assets/                 # Static assets
├── public/                     # Public static files
└── vite.config.js              # Vite configuration
```

### 3.2 Routing Structure
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | DocumentationHub | Main documentation hub |
| `/html` | HTMLDoc | HTML documentation |
| `/css` | CSSDoc | CSS documentation |
| `/javascript` | JavaScriptDoc | JavaScript documentation |
| `/react` | ReactDoc | React documentation |
| `/python` | PythonDoc | Python documentation |
| `/nodejs` | NodeJSDoc | Node.js documentation |
| `/express` | ExpressDoc | Express.js documentation |
| `/postgresql` | PostgreSQLDoc | PostgreSQL documentation |
| `/mongodb` | MongoDBDoc | MongoDB documentation |
| `/docker` | DockerDoc | Docker documentation |
| `/git-basics` | GitBasicsDoc | Git basics documentation |
| ... | ... | Additional documentation pages |

---

## 4. Backend Architecture

### 4.1 Django Apps Structure
```
backend/
├── config/                     # Django project settings
│   ├── settings.py             # Configuration
│   ├── urls.py                 # Root URL configuration
│   ├── wsgi.py                 # WSGI config
│   └── asgi.py                 # ASGI config
├── users/                      # User management app
│   ├── models.py               # User model
│   ├── views.py                # Auth views
│   └── urls.py                 # User routes
├── courses/                    # Course management app
│   ├── models.py               # Course model
│   ├── views.py                # Course CRUD views
│   └── urls.py                 # Course routes
├── enrollments/                # Enrollment management app
│   ├── models.py               # Enrollment model
│   ├── views.py                # Enrollment views
│   └── urls.py                 # Enrollment routes
└── manage.py                   # Django management script
```

### 4.2 API Endpoints

#### Users API (`/api/users/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register/` | Register a new user |
| POST | `/api/users/login/` | Authenticate user and get token |
| GET | `/api/users/profile/` | Get current user profile (authenticated) |
| POST | `/api/users/logout/` | Logout user and invalidate token |

#### Courses API (`/api/courses/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses/` | Get all courses |

#### Enrollments API (`/api/enrollments/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enrollments/` | Enroll in a course (authenticated) |
| GET | `/api/enrollments/my-courses/` | Get all enrolled courses for current user |
| GET | `/api/enrollments/<course_id>/progress/` | Get progress for a specific course |
| PUT | `/api/enrollments/<course_id>/progress/update/` | Update progress for a specific course |

---

## 5. Data Flow

### 5.1 User Registration Flow
```
User → Frontend Form → POST /api/users/register/ → Django View → User Model → MySQL
```

### 5.2 Course Browsing Flow
```
User → Frontend → GET /api/courses/ → Django View → Course Model → MySQL → Response → UI
```

### 5.3 Enrollment Flow
```
User → Enroll Button → POST /api/enrollments/ → Django View → Enrollment Model → MySQL
```

### 5.5 Authentication Flow
```
User → Login Form → POST /api/users/login/ → Validate Password → Generate Token → Return Token → Store in localStorage
Subsequent Requests → Include Bearer Token → Authenticate → Allow Access

---

## 6. Security Considerations

### 6.1 Current Implementation
- CORS enabled for all origins (development)
- Password hashing implemented with Django's make_password
- Token-based authentication implemented
- Input validation for registration and login

### 6.2 Recommended Improvements
- Migrate to JWT authentication for better scalability
- Implement CSRF protection
- Add rate limiting
- Use environment variables for sensitive data
- Move token storage to database or Redis for persistence

---

## 7. Scalability Considerations

### 7.1 Current Limitations
- Single database instance
- No caching layer
- No load balancing
- Token storage in memory (not persistent across server restarts)

### 7.2 Future Enhancements
- Implement Redis caching
- Add database read replicas
- Implement CDN for static assets
- Add pagination for course listings
- Implement search functionality
- Add video streaming capabilities

---

## 8. Deployment Architecture

### 8.1 Development
- Frontend: Vite dev server (localhost:5173)
- Backend: Django dev server (localhost:8000)
- Database: MySQL (localhost:3306)

### 8.2 Production Recommendations
- Frontend: Vercel/Netlify
- Backend: AWS EC2/Heroku/Docker
- Database: AWS RDS/Cloud MySQL
- Add Nginx reverse proxy
- Implement SSL/TLS
