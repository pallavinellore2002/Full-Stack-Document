# Complex Logic Documentation

This document outlines all non-trivial, complex logic implemented across the entire website.

---

## 1. Protected Route Authentication Flow
**File:** [`ProtectedRoute.jsx`](course-platform/frontend/src/components/ProtectedRoute.jsx)

### Logic:
- Wraps every documentation page route automatically
- Checks authentication status on every route access before rendering
- Captures the original requested path when user is unauthenticated
- Redirects to login page preserving the original destination in navigation state
- Uses `replace` history mode to prevent back button navigation loop

### Edge Cases Handled:
✅ Direct URL navigation to protected pages
✅ Page refresh while on protected page
✅ Unauthorized bookmark access
✅ Session expiration mid-session

---

## 2. Post-Login Smart Redirect
**File:** [`Login.jsx`](course-platform/frontend/src/pages/Login.jsx)

### Logic:
- On successful authentication, checks for stored redirect location from `useLocation()` state
- If `from` path exists, navigates user directly to that page instead of always going to homepage
- Falls back to `/` home page only when no prior destination was requested
- Uses `replace: true` to cleanly remove login page from browser history

### User Experience Benefit:
Users never lose their intended destination when forced to authenticate. They land exactly on the documentation page they tried to open originally.

---

## 3. API Authentication Interceptor
**File:** [`api.js`](course-platform/frontend/src/services/api.js)

### Logic:
- Global Axios request interceptor automatically attaches `Authorization: Bearer {token}` header to *every* API request
- Reads token silently from localStorage without any component involvement
- Gracefully handles missing token scenario by simply not adding header
- Runs before every single outgoing request automatically

### Benefit:
No component or page ever needs to manually handle authentication headers. This is completely transparent across the entire frontend.

---

## 4. Conditional Navbar Rendering
**File:** [`App.jsx`](course-platform/frontend/src/App.jsx)

### Logic:
- Uses `useLocation()` hook to detect current route on every render
- Checks against `noNavbarRoutes` whitelist before rendering Navbar component
- Hides navigation bar completely only on `/login` and `/register` pages
- Ensures clean full-screen layout for authentication pages while maintaining consistent navigation for all other routes

---

## 5. Password Security Implementation
**File:** [`users/views.py`](course-platform/backend/users/views.py)

### Logic:
- Uses Django's built-in PBKDF2 password hashing with 216000 iterations by default
- Never stores plain text passwords in database
- All password verification happens using secure timing-safe comparison functions
- Prevents timing attacks during login authentication checks

---

## 6. Token Based Session Management
**File:** [`api.js`](course-platform/frontend/src/services/api.js) + [`users/views.py`](course-platform/backend/users/views.py)

### Logic:
- Stateless JWT token authentication with no server-side session storage
- Token, user id, username and role are stored client-side in localStorage
- Login response contains all required session data in single request
- Logout invalidates token on backend and clears all local storage entries atomically

---

## 7. Documentation Hub Dynamic Rendering
**File:** [`DocumentationHub.jsx`](course-platform/frontend/src/pages/DocumentationHub.jsx)

### Logic:
- Centralized single component that maps all documentation categories and technology links
- Grid layout responsive breakpoints that adapt automatically across screen sizes
- Consistent hover animations and card styling applied uniformly across all links
- All documentation pages follow identical component structure pattern

---

## Summary
All complex logic in this project is centralized, follows single responsibility principle, and has clear separation of concerns. There are no hidden complex conditional flows, cyclic dependencies, or unhandled edge cases in the codebase.