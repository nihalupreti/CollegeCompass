from django.db import models

class College(models.Model):
    college_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    fee = models.IntegerField()
    phone_no = models.IntegerField()
    email = models.EmailField()
    affiliation = models.CharField(max_length=30)
    excerpt = models.TextField()

    def __str__(self):
        return self.college_name + self.address + self.affiliation
