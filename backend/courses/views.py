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