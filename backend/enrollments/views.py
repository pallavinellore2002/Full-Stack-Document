from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Enrollment
@api_view(['POST'])
def enroll(request):
    Enrollment.objects.create(**request.data)
    return Response({"message": "Enrolled successfully"})
