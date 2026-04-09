# High-Level Design (HLD) Document - Course Platform

## 1. Introduction

### 1.1 Purpose
This document provides the high-level design for the Course Platform, a web-based learning management system. It describes the system architecture, component design, data flow, and technology choices.

### 1.2 Scope
The Course Platform enables:
- Users to register and authenticate with secure password hashing
- Students to browse and enroll in courses
- All users to access comprehensive technology documentation

### 1.3 Definitions & Acronyms
| Term | Definition |
|------|------------|
| LMS | Learning Management System |
| SPA | Single Page Application |
| REST | Representational State Transfer |
| API | Application Programming Interface |
| DRF | Django REST Framework |
| ORM | Object-Relational Mapping |

---

## 2. System Architecture

### 2.1 Architectural Style
The system uses a **Three-Tier Client-Server Architecture**:

```
┌──────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  React.js Frontend (Vite)                                 │ │
│  │  - Component-based UI                                     │ │
│  │  - Client-side routing (React Router)                     │ │
│  │  - State management (Local state)                         │ │
│  │  - HTTP client (Axios)                                    │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                    REST API (JSON over HTTP)
                              │
┌──────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                           │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Django Backend (Python)                                  │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │ │
│  │  │ Users App   │ │ Courses App │ │  Enrollments App    │ │ │
│  │  │ - Register  │ │ - CRUD Ops  │ │  - Enrollment Mgmt  │ │ │
│  │  │ - Login     │ │ - Listing   │ │                     │ │ │
│  │  └─────────────┘ └─────────────┘ └─────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  Django REST Framework (API Layer)                    │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                    Django ORM (MySQL Connector)
                              │
┌──────────────────────────────────────────────────────────────┐
│                    DATA TIER                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  MySQL Database                                           │ │
│  │  - users table                                            │ │
│  │  - courses table                                          │ │
│  │  - enrollments table                                      │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Component Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         COURSE PLATFORM                              │
│                                                                       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐   │
│  │   User Module   │    │  Course Module  │    │ Enrollment Mdl  │   │
│  │                 │    │                 │    │                 │   │
│  │ • Registration  │    │ • View Courses  │    │ • Enroll        │   │
│  │ • Login         │    │ • Course List   │    │ • │   │
│  │ • Profile Mgmt  │    │                 │    │ •  │   │
│  │ • Logout        │    │                 │    │ • │  │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘   │
│           │                      │                      │            │
│           └──────────────────────┼──────────────────────┘            │
│                                  │                                   │
│                    ┌─────────────▼─────────────┐                     │
│                    │     Documentation Hub     │                     │
│                    │                           │                     │
│                    │ • HTML/CSS/JS Docs        │                     │
│                    │ • React/Node.js/Python    │                     │
│                    │ • Database Docs           │                     │
│                    │ • DevOps/Cloud Docs       │                     │
│                    └───────────────────────────┘                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Module Design

### 3.1 User Management Module

#### 3.1.1 Responsibilities
- User registration with role assignment (Student/Instructor)
- User authentication (login)
- User profile management

#### 3.1.2 Components
```
User Module
├── User Model
│   ├── username: CharField(100)
│   ├── email: EmailField(unique)
│   ├── password: CharField(255) [hashed]
│   └── role: CharField(choices=[student, instructor])
├── Views
│   ├── register() - POST
│   ├── login() - POST
│   ├── get_profile() - GET (authenticated)
│   └── logout() - POST
└── URLs
    ├── /api/users/register/
    ├── /api/users/login/
    ├── /api/users/profile/
    └── /api/users/logout/
```

#### 3.1.3 Sequence Diagram - Registration
```
User            Frontend            Backend API           Database
 │                 │                    │                    │
 │──Fill Form─────>│                    │                    │
 │                 │                    │                    │
 │──Submit────────>│                    │                    │
 │                 │──POST /register───>│                    │
 │                 │                    │──Create User──────>│
 │                 │                    │<───Confirm────────│
 │                 │<──Response────────│                    │
 │<──Success Msg──│                    │                    │
```

#### 3.1.4 Sequence Diagram - Login
```
User            Frontend            Backend API           Database
 │                 │                    │                    │
 │──Credentials───>│                    │                    │
 │                 │                    │                    │
 │──Submit────────>│                    │                    │
 │                 │──POST /login─────>│                    │
 │                 │                    │──Query User───────>│
 │                 │                    │<───User Data──────│
 │                 │                    │                    │
 │                 │                    │──Validate Creds    │
 │                 │<──Response────────│                    │
 │<──Redirect─────│                    │                    │
```

---

### 3.2 Course Management Module

#### 3.2.1 Responsibilities
- Course listing and retrieval
- Course viewing for students

#### 3.2.2 Components
```
Course Module
├── Course Model
│   ├── title: CharField(200)
│   ├── description: TextField
│   ├── notes: TextField(nullable)
│   ├── price: FloatField
│   └── instructor_id: IntegerField
├── Views
│   └── get_courses() - GET
└── URLs
    └── /api/courses/
```

#### 3.2.3 Sequence Diagram - Get Courses
```
User            Frontend            Backend API           Database
 │                 │                    │                    │
 │──Visit Page────>│                    │                    │
 │                 │──GET /courses────>│                    │
 │                 │                    │──Query All────────>│
 │                 │                    │<───Course List────│
 │                 │<──JSON Response───│                    │
 │<──Display──────│                    │                    │
```

---

### 3.3 Enrollment Management Module

#### 3.3.1 Responsibilities
- Student enrollment in courses
- ing and updates
- Retrieving enrolled courses for a user

#### 3.3.2 Components
```
Enrollment Module
├── Enrollment Model
│   ├── user_id: IntegerField
│   ├── course_id: IntegerField
│   └── progress: IntegerField(default=0)
├── Views
│   ├── enroll() - POST
│   ├── get_enrolled_courses() - GET
│   ├── get_progress() - GET
│   └── update_progress() - PUT
└── URLs
    ├── /api/enrollments/
    ├── /api/enrollments/my-courses/
    ├── /api/enrollments/<course_id>/progress/
    └── /api/enrollments/<course_id>/progress/update/
```

#### 3.3.3 Sequence Diagram - Enroll
```
Student         Frontend            Backend API           Database
 │                 │                    │                    │
 │──Click Enroll──>│                    │                    │
 │                 │                    │                    │
 │                 │──POST /enroll────>│                    │
 │                 │                    │──Create Enrollment>│
 │                 │                    │<───Confirm────────│
 │                 │<──Response────────│                    │
 │<──Success Msg──│                    │                    │
```

#### 3.3.4 Sequence Diagram - 
```
Student         Frontend            Backend API           Database
 │                 │                    │                    │
 │──>│                   │                    │
 │                 │                    │                    │
 │                 │──PUT /progress──>│                    │
 │                 │                    │────>│
 │                 │                    │<───Confirm────────│
 │                 │<──Response────────│                    │
 │<──Success Msg──│                    │                    │
```

---

### 3.4 Documentation Hub Module

#### 3.4.1 Responsibilities
- Provide comprehensive documentation for 20+ technologies
- Static content delivery
- Easy navigation between documentation pages

#### 3.4.2 Supported Technologies
| Category | Technologies |
|----------|--------------|
| Frontend | HTML, CSS, JavaScript, React, TypeScript |
| Backend | Python, Django, FastAPI, Node.js, Express.js |
| Database | PostgreSQL, MySQL, MongoDB, SQLite, Redis |
| DevOps | Docker, Git, GitHub Actions, Postman |
| Cloud/Deploy | AWS, Vercel, Netlify, GitHub |

---

## 4. API Design

### 4.1 REST API Endpoints

#### Base URL: `http://127.0.0.1:8000/api`

| Module | Method | Endpoint | Request Body | Response |
|--------|--------|----------|--------------|----------|
| Users | POST | `/users/register/` | `{username, email, password, role}` | `{message, user_id, username, email, role}` |
| Users | POST | `/users/login/` | `{email, password}` | `{message, token, user_id, username, role}` or `{error}` |
| Users | GET | `/users/profile/` | - (requires auth token) - | `{user_id, username, email, role}` |
| Users | POST | `/users/logout/` | `{token}` | `{message}` or `{error}` |
| Courses | GET | `/courses/` | - | `[{id, title, description, notes, price, instructor_id}]` |
| Enrollments | POST | `/enrollments/` | `{course_id}` (requires auth) | `{message, enrollment_id, course_id, progress}` |
| Enrollments | GET | `/enrollments/my-courses/` | - (requires auth token) - | `[{id, user_id, course_id, progress}]` |
| Enrollments | GET | `/enrollments/<course_id>/progress/` | - (requires auth token) - | `{course_id, progress}` |
| Enrollments | PUT | `/enrollments/<course_id>/progress/update/` | `{progress}` (requires auth) | `{message, course_id, progress}` |

### 4.2 API Response Format

#### Success Response
```json
{
    "message": "Operation successful",
    "data": { ... }
}
```

#### Error Response
```json
{
    "error": "Error description"
}
```

---

## 5. Data Flow Architecture

### 5.1 Overall Data Flow
```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│ Frontend │────▶│  Backend │────▶│ Database │
│  Action  │     │  (React) │     │ (Django) │     │  (MySQL) │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
      ◀──────────────◀──────────────◀──────────────◀
                    Response Flow
```

### 5.2 Request-Response Cycle
```
1. User triggers action in UI
2. React component makes API call via Axios
3. Request hits Django URL router
4. URL routes to appropriate view function
5. View processes request, interacts with models
6. Model performs database operations via ORM
7. Response flows back through the chain
8. UI updates based on response
```

---

## 6. Technology Stack Justification

### 6.1 Frontend Choices
| Technology | Reason |
|------------|--------|
| React.js | Component-based, virtual DOM, large ecosystem |
| Vite | Fast development, HMR, optimized builds |
| React Router | Declarative routing, nested routes |
| Axios | Promise-based, interceptors, request/response transformation |

### 6.2 Backend Choices
| Technology | Reason |
|------------|--------|
| Django | Batteries-included, ORM, admin panel, security |
| DRF | Serialization, authentication, viewsets, browsable API |
| MySQL | Relational data, ACID compliance, mature ecosystem |

---

## 7. Non-Functional Requirements

### 7.1 Performance
- API response time: < 500ms
- Page load time: < 3 seconds
- Support 100+ concurrent users

### 7.2 Scalability
- Horizontal scaling via load balancers
- Database read replicas for read-heavy workloads
- CDN for static assets

### 7.3 Security
- CORS configuration for allowed origins
- Password hashing (recommended improvement)
- Input validation and sanitization
- SQL injection prevention via ORM

### 7.4 Availability
- Target uptime: 99.5%
- Graceful error handling
- Database backup strategy

---

## 8. Deployment Architecture

### 8.1 Development Environment
```
┌─────────────────────────────────────────────┐
│           Development Machine                │
│                                              │
│  ┌─────────────┐    ┌─────────────┐         │
│  │ Vite Dev    │    │ Django Dev  │         │
│  │ Server      │    │ Server      │         │
│  │ :5173       │    │ :8000       │         │
│  └─────────────┘    └──────┬──────┘         │
│                            │                │
│                     ┌──────▼──────┐         │
│                     │   MySQL     │         │
│                     │   :3306     │         │
│                     └─────────────┘         │
└─────────────────────────────────────────────┘
```

### 8.2 Production Environment (Recommended)
```
┌─────────────────────────────────────────────────────────────┐
│                      Production                              │
│                                                              │
│  ┌─────────────┐         ┌─────────────────────────────┐    │
│  │   Vercel/   │         │         AWS EC2             │    │
│  │  Netlify    │────────▶│  ┌───────────────────────┐  │    │
│  │  (Frontend) │  HTTPS  │  │  Nginx Reverse Proxy  │  │    │
│  └─────────────┘         │  └───────────┬───────────┘  │    │
│                          │              │              │    │
│                          │  ┌───────────▼───────────┐  │    │
│                          │  │  Django (Gunicorn)    │  │    │
│                          │  └───────────┬───────────┘  │    │
│                          │              │              │    │
│                          │  ┌───────────▼───────────┐  │    │
│                          │  │   AWS RDS (MySQL)     │  │    │
│                          │  └───────────────────────┘  │    │
│                          └─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Future Enhancements

### 9.1 Phase 2 Features
- JWT-based authentication
- Video content integration
- Payment gateway integration
- Course reviews and ratings
- Certificate generation
- Email notifications

### 9.2 Phase 3 Features
- Real-time chat between students and instructors
- Discussion forums
- Quiz and assessment system
- Analytics dashboard
- Mobile application
