import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Authentication APIs
export const authAPI = {
    register: async (userData) => {
        const response = await API.post('/users/register/', userData);
        return response.data;
    },
    
    login: async (credentials) => {
        const response = await API.post('/users/login/', credentials);
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.user_id);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    },
    
    logout: async () => {
        const token = localStorage.getItem('authToken');
        await API.post('/users/logout/', { token });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    },
    
    getProfile: async () => {
        const response = await API.get('/users/profile/');
        return response.data;
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },
    
    getCurrentUser: () => {
        return {
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
        };
    },
};

// Course APIs
export const courseAPI = {
    getCourses: async () => {
        const response = await API.get('/courses/');
        return response.data;
    },
};

// Enrollment APIs
export const enrollmentAPI = {
    enroll: async (courseId) => {
        const response = await API.post('/enrollments/', { course_id: courseId });
        return response.data;
    },
    
    getEnrolledCourses: async () => {
        const response = await API.get('/enrollments/my-courses/');
        return response.data;
    },
    
};

export default API;