from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Enrollment
from users.views import authenticate_request

@api_view(['POST'])
def enroll(request):
    """Enroll a user in a course"""
    user = authenticate_request(request)
    if not user:
        return Response({'error': 'Unauthorized'}, status=401)
    
    course_id = request.data.get('course_id')
    if not course_id:
        return Response({'error': 'Course ID is required'}, status=400)
    
    # Check if already enrolled
    existing_enrollment = Enrollment.objects.filter(
        user_id=user.id,
        course_id=course_id
    ).first()
    
    if existing_enrollment:
        return Response({'message': 'Already enrolled in this course', 'enrollment_id': existing_enrollment.id})
    
    enrollment = Enrollment.objects.create(
        user_id=user.id,
        course_id=course_id,
        progress=0
    )
    
    return Response({
        'message': 'Enrolled successfully',
        'enrollment_id': enrollment.id,
        'course_id': enrollment.course_id,
        'progress': enrollment.progress
    }, status=201)

@api_view(['GET'])
def get_enrolled_courses(request):
    """Get all courses a user is enrolled in"""
    user = authenticate_request(request)
    if not user:
        return Response({'error': 'Unauthorized'}, status=401)
    
    enrollments = Enrollment.objects.filter(user_id=user.id).values()
    return Response(list(enrollments))

@api_view(['GET'])
def get_progress(request, course_id):
    """Get progress for a specific course"""
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

@api_view(['PUT'])
def update_progress(request, course_id):
    """Update progress for a specific course"""
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
