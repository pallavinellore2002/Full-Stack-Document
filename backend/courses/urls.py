from django.urls import path
from .views import get_courses
urlpatterns = [
    path('', get_courses),
]    