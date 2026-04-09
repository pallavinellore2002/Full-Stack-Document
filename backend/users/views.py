from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from .models import User
import uuid

# Simple token storage (in production, use a database table or Redis)
auth_tokens = {}

@api_view(['POST'])
def register(request):
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

@api_view(['POST'])
def login(request):
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

def authenticate_request(request):
    """Helper function to authenticate requests using token"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token in auth_tokens:
        user_id = auth_tokens[token]
        return User.objects.filter(id=user_id).first()
    return None

@api_view(['GET'])
def get_profile(request):
    """Get current user profile"""
    user = authenticate_request(request)
    if user:
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        })
    return Response({'error': 'Unauthorized'}, status=401)

@api_view(['POST'])
def logout(request):
    """Logout user by invalidating token"""
    token = request.data.get('token')
    if token in auth_tokens:
        del auth_tokens[token]
        return Response({'message': 'Logged out successfully'})
    return Response({'error': 'Invalid token'}, status=400)
