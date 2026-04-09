# Low-Level Design (LLD) Document - Course Platform

## 1. Introduction

### 1.1 Purpose
This document provides the low-level design for the Course Platform, detailing class structures, method signatures, data structures, and algorithmic logic for each module.

### 1.2 Scope
This LLD covers:
- User Management Module
- Course Management Module
- Enrollment Management Module
- Frontend Components

---

## 2. User Management Module

### 2.1 Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                          User                                │
├─────────────────────────────────────────────────────────────┤
│ - id: AutoField (Primary Key)                                │
│ - username: CharField(max_length=100)                        │
│ - email: EmailField(unique=True)                             │
│ - password: CharField(max_length=255) [hashed]               │
│ - role: CharField(max_length=20, choices=ROLE_CHOICES)       │
├─────────────────────────────────────────────────────────────┤
│ + register(request: dict) -> Response                        │
│ + login(request: dict) -> Response                           │
│ + get_profile() -> Response                                  │
│ + logout() -> Response                                       │
│ + authenticate_request(request) -> User | None               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Model Definition

```python
# users/models.py
from django.db import models

class User(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
    )
    
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    class Meta:
        db_table = 'users'
        ordering = ['username']
    
    def __str__(self):
        return f"{self.username} ({self.role})"
```

### 2.3 View Functions

#### 2.3.1 Register View

```python
# users/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import User
import uuid

# Simple token storage (in production, use a database table or Redis)
auth_tokens = {}

@api_view(['POST'])
def register(request):
    """
    Register a new user with password hashing.
    
    Request Body:
    {
        "username": str,
        "email": str,
        "password": str,
        "role": str ('student' | 'instructor')
    }
    
    Response:
    {
        "message": "User registered successfully",
        "user_id": int,
        "username": str,
        "email": str,
        "role": str
    }
    """
    try:
        # Validate required fields
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role', 'student')
        
        if not username or not email or not password:
            return Response({'error': 'Username, email, and password are required'}, status=400)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=400)
        
        # Validate role
        if role not in ['student', 'instructor']:
            return Response({'error': 'Invalid role. Must be student or instructor'}, status=400)
        
        # Create user with hashed password
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            role=role
        )
        
        return Response({
            'message': 'User registered successfully',
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
```

#### 2.3.2 Login View

```python
# users/views.py
@api_view(['POST'])
def login(request):
    """
    Authenticate user and return token.
    
    Request Body:
    {
        "email": str,
        "password": str
    }
    
    Response (Success):
    {
        "message": "Login successful",
        "token": str,
        "user_id": int,
        "username": str,
        "role": str
    }
    
    Response (Failure):
    {
        "error": "Invalid credentials"
    }
    """
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=400)
        
        user = User.objects.filter(email=email).first()
        
        if user and check_password(password, user.password):
            # Generate token
            token = str(uuid.uuid4())
            auth_tokens[token] = user.id
            
            return Response({
                'message': 'Login successful',
                'token': token,
                'user_id': user.id,
                'username': user.username,
                'role': user.role
            })
        
        return Response({'error': 'Invalid credentials'}, status=401)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
```

#### 2.3.3 Authentication Helper

```python
# users/views.py
def authenticate_request(request):
    """
    Helper function to authenticate requests using token.
    
    Returns User object if authenticated, None otherwise.
    """
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token in auth_tokens:
        user_id = auth_tokens[token]
        return User.objects.filter(id=user_id).first()
    return None
```

#### 2.3.4 Get Profile View

```python
# users/views.py
@api_view(['GET'])
def get_profile(request):
    """
    Get current user profile (authenticated).
    
    Response:
    {
        "user_id": int,
        "username": str,
        "email": str,
        "role": str
    }
    """
    user = authenticate_request(request)
    if user:
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        })
    return Response({'error': 'Unauthorized'}, status=401)
```

#### 2.3.5 Logout View

```python
# users/views.py
@api_view(['POST'])
def logout(request):
    """
    Logout user by invalidating token.
    
    Request Body:
    {
        "token": str
    }
    
    Response:
    {
        "message": "Logged out successfully"
    }
    """
    token = request.data.get('token')
    if token in auth_tokens:
        del auth_tokens[token]
        return Response({'message': 'Logged out successfully'})
    return Response({'error': 'Invalid token'}, status=400)
```

### 2.4 URL Configuration

```python
# users/urls.py
from django.urls import path
from .views import register, login, get_profile, logout

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('profile/', get_profile, name='get_profile'),
    path('logout/', logout, name='logout'),
]
```

---

## 3. Course Management Module

### 3.1 Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Course                               │
├─────────────────────────────────────────────────────────────┤
│ - id: AutoField (Primary Key)                                │
│ - title: CharField(max_length=200)                           │
│ - description: TextField                                     │
│ - notes: TextField(null=True, blank=True)                    │
│ - price: FloatField                                          │
│ - instructor_id: IntegerField                                │
├─────────────────────────────────────────────────────────────┤
│ + get_courses() -> Response                                  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Model Definition

```python
# courses/models.py
from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    notes = models.TextField(null=True, blank=True)
    price = models.FloatField()
    instructor_id = models.IntegerField()
    
    class Meta:
        db_table = 'courses'
        ordering = ['id']
    
    def __str__(self):
        return self.title
```

### 3.3 View Functions

#### 3.3.1 Get Courses View

```python
# courses/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course

@api_view(['GET'])
def get_courses(request):
    """
    Retrieve all courses.
    
    Response:
    [
        {
            "id": int,
            "title": str,
            "description": str,
            "notes": str | null,
            "price": float,
            "instructor_id": int
        },
        ...
    ]
    """
    try:
        courses = Course.objects.all().values()
        return Response(list(courses), status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
```

### 3.4 URL Configuration

```python
# courses/urls.py
from django.urls import path
from .views import get_courses

urlpatterns = [
    path('', get_courses, name='get_courses'),
]
```

---

## 4. Enrollment Management Module

### 4.1 Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       Enrollment                             │
├─────────────────────────────────────────────────────────────┤
│ - id: AutoField (Primary Key)                                │
│ - user_id: IntegerField                                      │
│ - course_id: IntegerField                                    │
│ - progress: IntegerField(default=0)                          │
├─────────────────────────────────────────────────────────────┤
│ + enroll(request: dict) -> Response                          │
│ + get_enrolled_courses() -> Response                         │
│ + get_progress(course_id: int) -> Response                   │
│ + update_progress(course_id: int, request: dict) -> Response │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Model Definition

```python
# enrollments/models.py
from django.db import models

class Enrollment(models.Model):
    user_id = models.IntegerField()
    course_id = models.IntegerField()
    progress = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'enrollments'
        unique_together = ('user_id', 'course_id')  # Prevent duplicate enrollments
    
    def __str__(self):
        return f"User {self.user_id} - Course {self.course_id} ({self.progress}%)"
```

### 4.3 View Functions

#### 4.3.1 Enroll View

```python
# enrollments/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Enrollment
from users.views import authenticate_request

@api_view(['POST'])
def enroll(request):
    """
    Enroll a user in a course.
    
    Request Body (authenticated):
    {
        "course_id": int
    }
    
    Response:
    {
        "message": "Enrolled successfully",
        "enrollment_id": int,
        "course_id": int,
        "progress": int
    }
    """
    try:
        user = authenticate_request(request)
        if not user:
            return Response({'error': 'Unauthorized'}, status=401)
        
        course_id = request.data.get('course_id')
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=400)
        
        # Check for duplicate enrollment
        existing = Enrollment.objects.filter(
            user_id=user.id,
            course_id=course_id
        ).first()
        
        if existing:
            return Response({
                'message': 'Already enrolled in this course',
                'enrollment_id': existing.id
            })
        
        # Create enrollment
        enrollment = Enrollment.objects.create(
            user_id=user.id,
            course_id=course_id,
            progress=0
        )
        
        return Response({
            "message": "Enrolled successfully",
            "enrollment_id": enrollment.id,
            "course_id": enrollment.course_id,
            "progress": enrollment.progress
        }, status=201)
        
    except Exception as e:
        return Response({"error": str(e)}, status=500)
```

#### 4.3.2 Get Enrolled Courses View

```python
# enrollments/views.py
@api_view(['GET'])
def get_enrolled_courses(request):
    """
    Get all courses a user is enrolled in.
    
    Response (authenticated):
    [
        {
            "id": int,
            "user_id": int,
            "course_id": int,
            "progress": int
        },
        ...
    ]
    """
    user = authenticate_request(request)
    if not user:
        return Response({'error': 'Unauthorized'}, status=401)
    
    enrollments = Enrollment.objects.filter(user_id=user.id).values()
    return Response(list(enrollments))
```

#### 4.3.3 Get Progress View

```python
# enrollments/views.py
@api_view(['GET'])
def get_progress(request, course_id):
    """
    Get progress for a specific course.
    
    URL Parameters:
    - course_id: int
    
    Response (authenticated):
    {
        "course_id": int,
        "progress": int
    }
    """
    user = authenticate_request(request)
    if not user:
        return Response({'error': 'Unauthorized'}, status=401)
    
    enrollment = Enrollment.objects.filter(
        user_id=user.id,
        course_id=course_id
    ).first()
    
    if not enrollment:
        return Response({'error': 'Not enrolled in this course'}, status=404)
    
    return Response({
        'course_id': enrollment.course_id,
        'progress': enrollment.progress
    })
```

#### 4.3.4 Update Progress View

```python
# enrollments/views.py
@api_view(['PUT'])
def update_progress(request, course_id):
    """
    Update progress for a specific course.
    
    URL Parameters:
    - course_id: int
    
    Request Body (authenticated):
    {
        "progress": int (0-100)
    }
    
    Response:
    {
        "message": "Progress updated successfully",
        "course_id": int,
        "progress": int
    }
    """
    user = authenticate_request(request)
    if not user:
        return Response({'error': 'Unauthorized'}, status=401)
    
    enrollment = Enrollment.objects.filter(
        user_id=user.id,
        course_id=course_id
    ).first()
    
    if not enrollment:
        return Response({'error': 'Not enrolled in this course'}, status=404)
    
    progress = request.data.get('progress')
    if progress is None:
        return Response({'error': 'Progress is required'}, status=400)
    
    if not isinstance(progress, int) or progress < 0 or progress > 100:
        return Response({'error': 'Progress must be an integer between 0 and 100'}, status=400)
    
    enrollment.progress = progress
    enrollment.save()
    
    return Response({
        'message': 'Progress updated successfully',
        'course_id': enrollment.course_id,
        'progress': enrollment.progress
    })
```

### 4.4 URL Configuration

```python
# enrollments/urls.py
from django.urls import path
from .views import enroll, get_enrolled_courses, get_progress, update_progress

urlpatterns = [
    path('', enroll, name='enroll'),
    path('my-courses/', get_enrolled_courses, name='get_enrolled_courses'),
    path('<int:course_id>/progress/', get_progress, name='get_progress'),
    path('<int:course_id>/progress/update/', update_progress, name='update_progress'),
]
```

---

## 5. Frontend Components

### 5.1 App Component

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DocumentationHub from "./pages/DocumentationHub";
import JavaScriptDoc from "./pages/JavaScriptDoc";
// ... other imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocumentationHub />} />
        <Route path="/javascript" element={<JavaScriptDoc />} />
        {/* ... other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 5.2 API Service

```javascript
// services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// API Methods
export const courseAPI = {
    getCourses: () => API.get('/courses/'),
    addCourse: (data) => API.post('/courses/add/', data),
    deleteCourse: (id) => API.delete(`/courses/delete/${id}/`),
};

export const userAPI = {
    register: (data) => API.post('/users/register/', data),
    login: (data) => API.post('/users/login/', data),
};

export const enrollmentAPI = {
    enroll: (data) => API.post('/enrollments/enroll/', data),
};

export default API;
```

### 5.3 DocumentationHub Component

```jsx
// pages/DocumentationHub.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentationHub = () => {
  const docCategories = [
    { name: 'HTML', path: '/html' },
    { name: 'CSS', path: '/css' },
    { name: 'JavaScript', path: '/javascript' },
    { name: 'React', path: '/react' },
    // ... more categories
  ];

  return (
    <div className="documentation-hub">
      <h1>Documentation Hub</h1>
      <div className="doc-grid">
        {docCategories.map((doc) => (
          <Link key={doc.path} to={doc.path} className="doc-card">
            <h2>{doc.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DocumentationHub;
```

---

## 6. Algorithm Details

### 6.1 Auto-Increment Instructor ID Algorithm

```python
def generate_instructor_id():
    """
    Generate a new instructor_id by incrementing the last course's instructor_id.
    
    Algorithm:
    1. Fetch the last course from the database
    2. If no course exists, return 1
    3. Otherwise, return last_course.instructor_id + 1
    
    Time Complexity: O(n) where n is the number of courses
    Space Complexity: O(1)
    
    Note: This is not thread-safe. Consider using database sequences
    or a separate counter table for production.
    """
    last_course = Course.objects.last()
    if last_course is None:
        return 1
    return last_course.instructor_id + 1
```

### 6.2 Login Validation Algorithm

```python
def validate_login(email, password):
    """
    Validate user credentials.
    
    Algorithm:
    1. Query database for user with matching email and password
    2. If user exists, return user data
    3. Otherwise, return error
    
    Time Complexity: O(n) where n is the number of users
    Space Complexity: O(1)
    
    Note: Password should be hashed. Use Django's check_password().
    """
    user = User.objects.filter(
        email=email,
        password=password
    ).first()
    
    if user:
        return {"user_id": user.id, "role": user.role}
    return None
```

---

## 7. Error Handling

### 7.1 Error Response Format

```json
{
    "error": "Descriptive error message"
}
```

### 7.2 HTTP Status Codes

| Status Code | Description | Usage |
|-------------|-------------|-------|
| 200 | OK | Successful GET, DELETE |
| 201 | Created | Successful POST (create) |
| 400 | Bad Request | Invalid input, missing fields |
| 401 | Unauthorized | Invalid credentials |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Unexpected server error |

---

## 8. Data Validation

### 8.1 User Registration Validation

```python
def validate_user_data(data):
    """
    Validate user registration data.
    
    Rules:
    - username: required, max 100 chars
    - email: required, valid email format, unique
    - password: required, min 8 chars
    - role: required, must be 'student' or 'instructor'
    """
    errors = []
    
    if not data.get('username'):
        errors.append('Username is required')
    elif len(data['username']) > 100:
        errors.append('Username must be 100 characters or less')
    
    if not data.get('email'):
        errors.append('Email is required')
    elif not is_valid_email(data['email']):
        errors.append('Invalid email format')
    
    if not data.get('password'):
        errors.append('Password is required')
    elif len(data['password']) < 8:
        errors.append('Password must be at least 8 characters')
    
    if not data.get('role'):
        errors.append('Role is required')
    elif data['role'] not in ['student', 'instructor']:
        errors.append('Role must be student or instructor')
    
    return errors
```

### 8.2 Course Data Validation

```python
def validate_course_data(data):
    """
    Validate course creation data.
    
    Rules:
    - title: required, max 200 chars
    - description: required
    - price: required, must be positive number
    - notes: optional
    """
    errors = []
    
    if not data.get('title'):
        errors.append('Title is required')
    elif len(data['title']) > 200:
        errors.append('Title must be 200 characters or less')
    
    if not data.get('description'):
        errors.append('Description is required')
    
    if data.get('price') is None:
        errors.append('Price is required')
    elif not isinstance(data['price'], (int, float)) or data['price'] < 0:
        errors.append('Price must be a positive number')
    
    return errors
```

---

## 9. Middleware Configuration

### 9.1 Django Middleware Stack

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',      # CORS handling
    'django.middleware.security.SecurityMiddleware',  # Security enhancements
    'django.contrib.sessions.middleware.SessionMiddleware',  # Session management
    'django.middleware.common.CommonMiddleware',  # Common utilities
    'django.middleware.csrf.CsrfViewMiddleware',  # CSRF protection
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Auth
    'django.contrib.messages.middleware.MessageMiddleware',  # Messaging
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Clickjacking protection
]
```

### 9.2 CORS Configuration

```python
# Development: Allow all origins
CORS_ALLOW_ALL_ORIGINS = True

# Production: Restrict to specific origins
# CORS_ALLOWED_ORIGINS = [
#     "https://yourdomain.com",
#     "https://www.yourdomain.com",
# ]
```

---

## 10. Database Configuration

### 10.1 MySQL Settings

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'course_db',
        'USER': 'root',
        'PASSWORD': 'your_secure_password',
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        }
    }
}
```

### 10.2 Connection Pooling (Recommended)

```python
# Install django-db-gevent or use mysql-connector-python pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        # ... other settings
        'CONN_MAX_AGE': 600,  # Persistent connections for 10 minutes
        'CONN_HEALTH_CHECKS': True,
    }
}
```
