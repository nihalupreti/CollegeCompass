from django.db import models


class College(models.Model):
    college_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    fee = models.IntegerField()
    phone_no = models.IntegerField()
    email = models.EmailField()
    affiliation = models.CharField(max_length=30)
    excerpt = models.TextField()
<<<<<<< HEAD
    image = models.ImageField(upload_to='media', default=False)
=======
    college_image = models.ImageField(upload_to = "images/", null=True, blank=True)
>>>>>>> 52f310ee8a090b7f0d22f23f0c9ef597e5c2e813

    def __str__(self):
        return self.college_name + self.address + self.affiliation
