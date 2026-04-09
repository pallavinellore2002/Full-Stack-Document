from django.urls import path
from .views import enroll, get_enrolled_courses, get_progress, update_progress
urlpatterns = [
    path('', enroll),
    path('my-courses/', get_enrolled_courses),
    path('<int:course_id>/progress/', get_progress),
    path('<int:course_id>/progress/update/', update_progress),
]    