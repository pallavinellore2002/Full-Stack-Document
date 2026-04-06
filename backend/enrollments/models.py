from django.db import models
class Enrollment(models.Model):
    user_id = models.IntegerField()
    course_id = models.IntegerField()
    progress = models.IntegerField(default=0)
