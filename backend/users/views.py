from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
@api_view(['POST'])
def register(request):
    user = User.objects.create(**request.data)
    return Response({'message': 'User registered successfully'})
@api_view(['POST'])
def login(request):
    user = User.objects.filter(
        email=request.data['email'], 
        password=request.data['password']
    ).first()
    if user:
        return Response({"user_id": user.id, "role": user.role})
    return Response({'error': 'Invalid credentials'})
