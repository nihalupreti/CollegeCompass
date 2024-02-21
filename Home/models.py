from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.models import User


class College(models.Model):
    college_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    fee = models.IntegerField()
    phone_no = models.IntegerField()
    email = models.EmailField()
    affiliation = models.CharField(max_length=30)
    excerpt = models.TextField()
    college_website = models.CharField(max_length=50, null=True, blank=True)
    college_image = models.ImageField(upload_to="images/", null=True, blank=True)

    def __str__(self):
        return self.college_name

class Program(models.Model):
    program_name = models.CharField(max_length=100)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='programs')

    def __str__(self):
        return self.program_name

class Subject(models.Model):
    subject_name = models.CharField(max_length=100)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject_name


class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE)


class Inquery(models.Model):
    subject = models.CharField(max_length=100)
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    toCollege = models.ForeignKey(College, on_delete=models.CASCADE)