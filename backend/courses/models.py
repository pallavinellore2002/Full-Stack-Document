from django.db import models
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    notes = models.TextField(null=True, blank=True)
    price = models.FloatField()
    instructor_id = models.IntegerField()
