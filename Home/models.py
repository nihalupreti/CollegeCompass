from django.db import models


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
