from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course


#  GET all courses
@api_view(['GET'])
def get_courses(request):
    try:
        courses = Course.objects.all().values()
        return Response(list(courses))
    except Exception as e:
        return Response({"error": str(e)})


#  ADD a new course (with notes + auto instructor_id)
@api_view(['POST'])
def add_course(request):
    try:
        #  Get last course to auto increment instructor_id
        last_course = Course.objects.last()

        new_instructor_id = 1
        if last_course:
            new_instructor_id = last_course.instructor_id + 1

        #  Create course
        course = Course.objects.create(
            title=request.data.get('title'),
            description=request.data.get('description'),
            notes=request.data.get('notes'), 
            price=request.data.get('price'),
            instructor_id=new_instructor_id    
        )

        return Response({
            "message": "Course added successfully",
            "course_id": course.id,
            "instructor_id": course.instructor_id
        })

    except Exception as e:
        return Response({"error": str(e)})


#  DELETE course
@api_view(['DELETE'])
def delete_course(request, id):
    try:
        course = Course.objects.get(id=id)
        course.delete()
        return Response({"message": "Course deleted successfully"})
    except Course.DoesNotExist:
        return Response({"error": "Course not found"})
    except Exception as e:
        return Response({"error": str(e)})