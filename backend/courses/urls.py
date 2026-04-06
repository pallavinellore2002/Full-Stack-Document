from django.urls import path
from .views import add_course, get_courses, delete_course
urlpatterns = [
    path('', get_courses),
    path('add/', add_course),
    path('delete/<int:id>/', delete_course)
]    